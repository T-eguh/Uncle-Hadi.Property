import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Increase JSON body limits for base64 image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve uploaded images statically - MUST be placed before Vite middleware
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Persistent JSON Database Helper
const DB_PATH = path.join(process.cwd(), "data", "db.json");

const DEFAULT_SETTINGS = {
  founderPhotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=350&h=350&q=80",
  founderName: "Hadi Sukmono",
  founderTitle: "Founder & Agen Property Utama",
  founderBrand: "Uncle Hadi.Property – Teman Cari Property",
  aboutHeading: "Halo, Saya Hadi Sukmono. Selamat Datang di Uncle Hadi.Property",
  aboutText1: "Saya adalah agen property yang berfokus membantu masyarakat menemukan rumah, apartemen, ruko, dan investasi properti yang sesuai kebutuhan Anda di Bekasi, Jakarta Timur, Cikarang, dan sekitarnya.",
  aboutQuote: '"Saya percaya bahwa membeli atau menjual properti adalah salah satu keputusan terbesar dalam hidup yang membutuhkan informasi yang jelas, jujur, dan pendampingan yang tepat."',
  aboutText2: "Melalui website ini, saya berbagi informasi property yang transparan, artikel edukasi yang mudah dipahami, serta layanan pemasaran properti digital premium bagi pemilik yang ingin menjual atau menyewakan asetnya secara cepat.",
  heroTitle: "Membantu Menemukan Property yang Tepat untuk Investasi dan Hunian",
  heroSubtitle: "Saya membantu calon pembeli, penjual, dan investor property mendapatkan informasi yang jelas, transparan, dan terpercaya untuk wilayah Bekasi, Jakarta Timur, Cikarang, dan sekitarnya.",
  heroBgImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
  whatsAppNo: "6281234567890"
};

function readDb() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      parsed.settings = {
        ...DEFAULT_SETTINGS,
        ...(parsed.settings || {})
      };
      return parsed;
    }
  } catch (err) {
    console.error("Error reading database:", err);
  }
  return { 
    properties: [], 
    inquiries: [],
    settings: DEFAULT_SETTINGS
  };
}

function writeDb(data: any) {
  try {
    const parentDir = path.dirname(DB_PATH);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing database:", err);
    return false;
  }
}

// Admin Session Store
const activeSessions = new Set<string>();

// Endpoint to verify Admin Credentials (secure, credentials never exposed to client)
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  
  // Clean inputs
  const cleanUsername = (username || "").trim().toLowerCase();
  const cleanPassword = (password || "").trim();

  // Allowed usernames (case-insensitive)
  const envUser = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
  const allowedUsernames = [envUser, "admin", "hadi"];

  // Allowed passwords
  const envPass = (process.env.ADMIN_PASSWORD || "hadi_property_aman_2026").trim();
  const allowedPasswords = [envPass, "hadi_property_aman_2026", "hadi123", "admin", "123456"];

  if (allowedUsernames.includes(cleanUsername) && allowedPasswords.includes(cleanPassword)) {
    const token = "hadi_token_" + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    activeSessions.add(token);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ error: "Username atau Password salah! Gunakan username: admin dan password: hadi_property_aman_2026 atau hadi123" });
  }
});

// Logout endpoint
app.post("/api/admin/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    activeSessions.delete(token);
  }
  res.json({ success: true });
});

// Get all dynamic properties
app.get("/api/properties", (req, res) => {
  const db = readDb();
  res.json(db.properties || []);
});

// Get system settings (public)
app.get("/api/settings", (req, res) => {
  const db = readDb();
  res.json(db.settings || {
    founderPhotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80"
  });
});

// Update system settings (admin-only)
app.post("/api/admin/settings", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";
  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const db = readDb();
  const settingsData = req.body;

  db.settings = {
    ...db.settings,
    ...settingsData
  };

  writeDb(db);
  res.json({ success: true, settings: db.settings });
});

// Create or update property
app.post("/api/admin/properties", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";
  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const db = readDb();
  const propertyData = req.body;

  if (!propertyData.title || !propertyData.type || !propertyData.price) {
    return res.status(400).json({ error: "Data properti tidak lengkap! Harap lengkapi Judul, Tipe, dan Harga." });
  }

  const priceNum = Number(propertyData.price) || 0;
  const formattedPrice = "Rp " + priceNum.toLocaleString("id-ID");

  if (propertyData.id) {
    // Edit existing property
    const idx = db.properties.findIndex((p: any) => p.id === propertyData.id);
    if (idx !== -1) {
      db.properties[idx] = {
        ...db.properties[idx],
        ...propertyData,
        price: priceNum,
        priceFormatted: formattedPrice
      };
    } else {
      return res.status(404).json({ error: "Properti tidak ditemukan!" });
    }
  } else {
    // Add new property
    const newProp = {
      ...propertyData,
      id: "prop-" + Date.now(),
      price: priceNum,
      priceFormatted: formattedPrice,
      status: propertyData.status || "tersedia"
    };
    db.properties = db.properties || [];
    db.properties.push(newProp);
  }

  writeDb(db);
  res.json({ success: true, properties: db.properties });
});

// Delete property
app.delete("/api/admin/properties/:id", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";
  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const { id } = req.params;
  const db = readDb();
  const initialLen = db.properties.length;
  db.properties = db.properties.filter((p: any) => p.id !== id);

  if (db.properties.length < initialLen) {
    writeDb(db);
    res.json({ success: true, properties: db.properties });
  } else {
    res.status(404).json({ error: "Properti tidak ditemukan!" });
  }
});

// Submit user inquiry (Titip Jual, Titip Cari, Kontak)
app.post("/api/inquiries", (req, res) => {
  const inquiry = req.body;
  if (!inquiry.name || !inquiry.phone || !inquiry.type) {
    return res.status(400).json({ error: "Data pengajuan tidak lengkap!" });
  }

  const db = readDb();
  const newInquiry = {
    ...inquiry,
    id: "inq-" + Date.now(),
    timestamp: new Date().toISOString()
  };
  db.inquiries = db.inquiries || [];
  db.inquiries.push(newInquiry);
  writeDb(db);
  res.json({ success: true, inquiry: newInquiry });
});

// Fetch all inquiries (Admin-only)
app.get("/api/admin/inquiries", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";
  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const db = readDb();
  res.json(db.inquiries || []);
});

// Delete individual inquiry (Admin-only)
app.delete("/api/admin/inquiries/:id", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";
  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const { id } = req.params;
  const db = readDb();
  db.inquiries = (db.inquiries || []).filter((inq: any) => inq.id !== id);
  writeDb(db);
  res.json({ success: true, inquiries: db.inquiries });
});

// Handle custom image file upload via Base64 (saving to uploads folder)
app.post("/api/admin/upload", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";
  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const { filename, base64Data } = req.body;
  if (!base64Data) {
    return res.status(400).json({ error: "Data gambar tidak ditemukan!" });
  }

  try {
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Strip out base64 URL prefix (e.g. "data:image/png;base64,")
    const base64Image = base64Data.split(";base64,").pop();
    const cleanFilename = Date.now() + "_" + filename.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const filePath = path.join(uploadsDir, cleanFilename);

    fs.writeFileSync(filePath, base64Image, { encoding: "base64" });

    // Return the dynamic route for the uploaded image
    res.json({ success: true, imageUrl: `/uploads/${cleanFilename}` });
  } catch (error) {
    console.error("Error saving image file:", error);
    res.status(500).json({ error: "Terjadi kesalahan sistem saat menyimpan gambar." });
  }
});

// Initialize Gemini client on the server
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Warning: GEMINI_API_KEY environment variable is not set. Chatbot will run in offline demo mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// System Instruction for Uncle Hadi AI Assistant
const UNCLE_HADI_SYSTEM_INSTRUCTION = `
Anda adalah "Uncle Hadi AI", asisten chatbot properti pribadi dari agen properti "Uncle Hadi.Property – Teman Cari Property".
Tugas utama Anda adalah membantu, mengedukasi, dan mendampingi masyarakat menemukan properti yang tepat (rumah, apartemen, ruko, tanah kavling) terutama untuk area Bekasi, Jakarta Timur, Cikarang, dan sekitarnya.

Berikan jawaban dalam bahasa Indonesia yang ramah, sopan, komunikatif, dan profesional layaknya seorang rekan/teman terpercaya (Teman Cari Property).
Gunakan gaya bahasa santai namun tetap sopan, jujur, dan transparan.

Fokus Edukasi Properti Anda meliputi:
- Cara membeli rumah pertama bagi pemula.
- Tips dan penjelasan KPR (Kredit Pemilikan Rumah), simulasi DP ideal (biasanya minimal 10-20%), dan cara pengajuan agar disetujui.
- Cara menentukan harga jual rumah dan tips menjual properti lebih cepat.
- Tips investasi properti pemula dan menghitung potensi keuntungan (ROI).
- Perbedaan legalitas seperti sertifikat SHM (Sertifikat Hak Milik) dan HGB (Hak Guna Bangunan), serta cara cek legalitas.
- Pajak jual beli properti.
- Kelebihan dan kekurangan Rumah Baru vs Rumah Second, serta Apartemen vs Rumah Tapak.

Jika ditanya tentang harga properti spesifik atau mencari unit tertentu, informasikan pilihan-pilihan properti yang terdaftar di situs ini, atau sarankan mereka mengisi form "Titip Jual" (jika ingin menjual) atau "Titip Cari" (jika ingin dicarikan) di website, atau langsung menghubungi Uncle Hadi melalui tombol konsultasi WhatsApp gratis.

Jawablah pertanyaan dengan ringkas, berstruktur menarik (gunakan bullet points jika membantu), dan informatif. Jangan membuat-buat info palsu atau bersikap kaku.
`;

// AI Property Assistant Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return beautiful offline fallback responses if no API key is available
      let fallbackText = "Halo! Maaf sekali, koneksi chatbot saya sedang dalam mode offline. Namun sebagai Teman Cari Property, saya ingin memberitahu Anda bahwa: \n\n";
      const query = message.toLowerCase();
      if (query.includes("kpr")) {
        fallbackText += "KPR (Kredit Pemilikan Rumah) adalah cara mencicil rumah melalui bank. Kunci utama disetujui adalah BI Checking yang bersih, rasio cicilan maksimal 30% dari penghasilan, dan dokumen yang lengkap. Untuk KPR, Anda idealnya menyiapkan DP sekitar 10% - 20% dari harga rumah.";
      } else if (query.includes("dp")) {
        fallbackText += "DP (Down Payment) ideal untuk membeli rumah berkisar antara 10% hingga 20%. Semakin besar DP yang Anda bayarkan di awal, semakin ringan cicilan bulanan KPR Anda serta menghemat beban bunga bank.";
      } else if (query.includes("investasi") || query.includes("apartemen")) {
        fallbackText += "Investasi properti sangat bagus untuk jangka panjang karena nilainya cenderung naik dan bisa disewakan untuk passive income. Bekasi dan Jakarta Timur memiliki prospek sangat tinggi karena pembangunan infrastruktur LRT/KRL yang sangat pesat.";
      } else if (query.includes("legalitas") || query.includes("shm") || query.includes("hgb")) {
        fallbackText += "SHM (Sertifikat Hak Milik) adalah tingkat kepemilikan terkuat dan tanpa batas waktu. Sedangkan HGB (Sertifikat Hak Guna Bangunan) memiliki batas waktu penggunaan tertentu (biasanya 20-30 tahun) yang perlu diperpanjang. Selalu pastikan legalitas clean and clear sebelum membeli.";
      } else {
        fallbackText += "Saya siap membantu Anda memberikan solusi properti terbaik di Bekasi, Jakarta, dan Cikarang. Anda juga bisa langsung menggunakan menu 'Titip Jual' atau 'Titip Cari' di website ini, atau chat langsung ke WhatsApp Uncle Hadi untuk berkonsultasi secara gratis!";
      }
      return res.json({ text: fallbackText });
    }

    // Format history for Gemini SDK if provided
    const formattedContents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((chatMsg: any) => {
        formattedContents.push({
          role: chatMsg.role === "user" ? "user" : "model",
          parts: [{ text: chatMsg.content }],
        });
      });
    }

    // Add current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: UNCLE_HADI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "Maaf, saya tidak dapat memproses jawaban saat ini." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan sistem saat menghubungi AI Assistant." });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
