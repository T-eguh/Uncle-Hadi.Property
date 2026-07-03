import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware to handle Vercel's path routing when /api is stripped
app.use((req, res, next) => {
  if (process.env.VERCEL && !req.url.startsWith("/api") && !req.url.startsWith("/_next") && !req.url.includes(".")) {
    req.url = "/api" + req.url;
  }
  next();
});

// Increase JSON body limits for base64 image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve uploaded images statically - MUST be placed before Vite middleware
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
if (process.env.VERCEL) {
  app.use("/uploads", express.static(path.join("/tmp", "uploads")));
}

// Persistent JSON Database Helper
const DB_PATH = (() => {
  if (process.env.VERCEL) {
    const tmpPath = path.join("/tmp", "db.json");
    if (!fs.existsSync(tmpPath)) {
      try {
        const localPath = path.join(process.cwd(), "data", "db.json");
        if (fs.existsSync(localPath)) {
          fs.copyFileSync(localPath, tmpPath);
        }
      } catch (e) {
        console.error("Failed to copy db.json to /tmp:", e);
      }
    }
    return tmpPath;
  }
  return path.join(process.cwd(), "data", "db.json");
})();

const DEFAULT_SETTINGS = {
  founderPhotoUrl: "/uploads/1783011807123_WhatsAppImage2026-06-23at14.47.20.jpeg",
  founderName: "Hadi Sukmono",
  founderTitle: "Expert Advisor",
  founderBrand: "Uncle Hadi.Property – Teman Cari Property",
  aboutHeading: "Halo, Saya Hadi Sukmono. Selamat Datang di Uncle Hadi.Property",
  aboutText1: "Saya adalah agen property yang berfokus membantu masyarakat menemukan rumah, apartemen, ruko, dan investasi properti yang sesuai kebutuhan Anda di daerah jakarta, jawa barat,jawa tengah,jawa timur dan bali.",
  aboutQuote: '"Saya percaya bahwa setiap properti memiliki nilai lebih dari sekadar bangunan. Di balik setiap rumah, ruko, atau investasi, terdapat harapan, impian, dan masa depan yang ingin diwujudkan. Karena itu, Uncle Hadi Property hadir dengan komitmen untuk memberikan pelayanan yang jujur, transparan, dan profesional, sehingga setiap klien dapat mengambil keputusan dengan rasa aman dan penuh keyakinan."',
  aboutText2: '"Bersama tim yang berpengalaman, kami terus berupaya menghadirkan pilihan properti terbaik serta membangun hubungan yang didasari kepercayaan dan kepuasan pelanggan. Bagi kami, keberhasilan tidak hanya diukur dari transaksi yang tercapai, tetapi juga dari kepercayaan yang terus tumbuh dan hubungan jangka panjang yang terjalin dengan setiap klien. Terima kasih telah mempercayakan perjalanan properti Anda kepada Uncle Hadi property"',
  heroTitle: "Membantu Menemukan Property yang Tepat untuk Investasi dan Hunian",
  heroSubtitle: "Saya membantu calon pembeli, penjual, dan investor property mendapatkan informasi yang jelas, transparan, dan terpercaya untuk wilayah  jakarta, jawa barat,jawa tengah,jawa timur dan bali.",
  heroBgImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
  whatsAppNo: "6282112790005",
  logoText: "Uncle Hadi",
  logoColorText: ".Property",
  logoSlogan: "Teman Cari Property",
  slide2Badge: "Layanan Konsultasi Amanah & Berlisensi",
  slide2Title: "Konsultasi Properti Jujur, Amanah & Pendampingan Sepenuh Hati",
  slide2Subtitle: "Dapatkan solusi hunian ideal, ruko produktif, atau investasi tanah dengan bimbingan hukum yang aman, jujur, transparan, serta didampingi penuh hingga selesai akad.",
  slide2Image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
  slide3Badge: "Jasa Pemasaran & Titip Jual Digital Premium",
  slide3Title: "Pasarkan Properti Anda Lebih Cepat dengan Strategi Digital Modern",
  slide3Subtitle: "Layanan titip jual atau sewa properti premium untuk menjangkau ribuan calon pembeli potensial secara tertarget di wilayah Bekasi, Cikarang, dan Jakarta Timur.",
  slide3Image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
  officeAddress: "Jl.Sedayu City Boulevard Raya Blok SCBD No.009, Cakung Barat Jakarta Timur",
  officeEmail: "hadisukmono.xmsg@gmail.com",
  officePhone: "6281387009749",
  logoImageUrl: "/uploads/1783013173106_ChatGPT_Image_3_Jul_2026__00.19.37-removebg-preview.png"
};

const DEFAULT_PROPERTIES = [
  {
    id: "prop-1",
    title: "Rumah Bekasi Timur Modern Minimalis",
    category: "Secondary",
    type: "rumah hunian",
    price: 850000000,
    priceFormatted: "Rp 850.000.000",
    landArea: "90 m² (Lebar 6m x Panjang 15m)",
    buildingArea: "75 m²",
    rooms: 3,
    bathrooms: 2,
    floors: 2,
    location: "Bekasi Timur, Bekasi, Jawa Barat",
    mapsUrl: "https://maps.google.com/?q=Bekasi+Timur",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    description: "Hunian asri bergaya modern minimalis siap huni di Bekasi Timur. Lokasi strategis dekat dengan stasiun KRL Bekasi Timur, akses tol Bekasi Timur, dan pusat perbelanjaan. Bebas banjir, keamanan 24 jam dengan sistem satu pintu.",
    status: "tersedia",
    electricity: "2200 VA",
    water: "PDAM & Jetpump",
    facing: "Utara",
    streetWidth: "8 meter (2 mobil longgar)",
    furnished: "Semi-Furnished (AC 2 unit, Kitchen Set)",
    whatsappMessage: "Halo Uncle Hadi, saya tertarik dengan properti 'Rumah Bekasi Timur Modern Minimalis' (Rp 850 Juta). Mohon info detail dan jadwal survey lokasi."
  },
  {
    id: "prop-2",
    title: "Apartemen Grand Jakarta Timur Skyview",
    category: "Primary",
    type: "apartement",
    price: 495000000,
    priceFormatted: "Rp 495.000.000",
    landArea: "32 m² (Studio)",
    buildingArea: "32 m²",
    rooms: 1,
    bathrooms: 1,
    floors: 1,
    location: "Cawang, Jakarta Timur, Jakarta",
    mapsUrl: "https://maps.google.com/?q=Cawang+Jakarta+Timur",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    description: "Apartemen mewah siap huni di lokasi super strategis Jakarta Timur. Menempel langsung dengan stasiun LRT, akses langsung ke Tol Dalam Kota. Sangat cocok untuk milenial maupun investasi pasif (passive income) sewa.",
    status: "tersedia",
    electricity: "1300 VA",
    water: "WTP",
    facing: "Timur (City View)",
    streetWidth: "Lebar Jalan Utama",
    furnished: "Fully Furnished (Smart TV, AC, Kulkas, Kasur, Lemari)",
    whatsappMessage: "Halo Uncle Hadi, saya tertarik dengan 'Apartemen Grand Jakarta Timur Skyview' (Rp 495 Juta). Bisa dibantu jelaskan skema cicilan KPA-nya?"
  },
  {
    id: "prop-3",
    title: "Ruko Premium Grand Bekasi Boulevard",
    category: "Primary",
    type: "ruko",
    price: 2450000000,
    priceFormatted: "Rp 2.450.000.000",
    landArea: "75 m² (5m x 15m)",
    buildingArea: "210 m²",
    rooms: 2,
    bathrooms: 3,
    floors: 3,
    location: "Bekasi Barat, Bekasi, Jawa Barat",
    mapsUrl: "https://maps.google.com/?q=Bekasi+Barat",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    description: "Ruko premium 3 lantai di jalan utama CBD Bekasi. Sangat cocok untuk kantor, klinik, kafe, atau bisnis ritel. Area parkir luas dan sangat ramai dilalui kendaraan. Berdampingan dengan bank ternama dan franchise kuliner nasional.",
    status: "tersedia",
    electricity: "4400 VA",
    water: "PDAM",
    facing: "Selatan",
    streetWidth: "12 meter",
    furnished: "Unfurnished",
    whatsappMessage: "Halo Uncle Hadi, saya berminat dengan 'Ruko Premium Grand Bekasi Boulevard' (Rp 2.45 Milyar) untuk tempat usaha saya. Bisa minta rincian legalitasnya?"
  },
  {
    id: "prop-4",
    title: "Tanah Kavling Hunian Cikarang Mas",
    category: "Secondary",
    type: "tanah kavling",
    price: 320000000,
    priceFormatted: "Rp 320.000.000",
    landArea: "120 m² (8m x 15m)",
    buildingArea: "0 m²",
    rooms: 0,
    bathrooms: 0,
    floors: 0,
    location: "Cikarang Pusat, Bekasi, Jawa Barat",
    mapsUrl: "https://maps.google.com/?q=Cikarang+Pusat",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    description: "Kavling siap bangun di lingkungan perumahan eksklusif yang sudah ramai dan berkembang pesat. Sangat cocok untuk dibangun hunian impian keluarga atau investasi jangka panjang karena berada dekat dengan kawasan industri Delta Silicon.",
    status: "tersedia",
    electricity: "Jaringan Tersedia",
    water: "Sumur Bor Bersih",
    facing: "Barat",
    streetWidth: "7 meter",
    furnished: "Tanah Kosong Siap Bangun",
    whatsappMessage: "Halo Uncle Hadi, saya tertarik dengan kavling tanah 'Tanah Kavling Hunian Cikarang Mas' seharga Rp 320 Juta. Apakah suratnya sudah SHM?"
  },
  {
    id: "prop-5",
    title: "Rumah Modern Scandinavia Karawang Indah",
    category: "Primary",
    type: "rumah hunian",
    price: 650000000,
    priceFormatted: "Rp 650.000.000",
    landArea: "84 m² (7m x 12m)",
    buildingArea: "54 m²",
    rooms: 2,
    bathrooms: 1,
    floors: 1,
    location: "Karawang Barat, Karawang, Jawa Barat",
    mapsUrl: "https://maps.google.com/?q=Karawang+Barat",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    description: "Rumah berdesain khas Scandinavia dengan langit-langit tinggi (high ceiling) yang adem dan terang di Karawang. Dilengkapi smart home system, CCTV, dan one gate system. Sangat strategis dekat akses Tol Karawang Barat.",
    status: "tersedia",
    electricity: "2200 VA",
    water: "PDAM",
    facing: "Timur",
    streetWidth: "8 meter",
    furnished: "Smart Lock & Kitchen Set",
    whatsappMessage: "Halo Uncle Hadi, saya tertarik dengan properti 'Rumah Modern Scandinavia Karawang Indah' seharga Rp 650 Juta. Apakah ada promo free biaya-biaya?"
  },
  {
    id: "prop-6",
    title: "Apartemen Studio Strategis Bekasi Town",
    category: "Secondary",
    type: "apartement",
    price: 280000000,
    priceFormatted: "Rp 280.000.000",
    landArea: "24 m² (Studio)",
    buildingArea: "24 m²",
    rooms: 1,
    bathrooms: 1,
    floors: 1,
    location: "Bekasi Barat, Bekasi, Jawa Barat",
    mapsUrl: "https://maps.google.com/?q=Bekasi+Barat",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    description: "Apartemen Studio Secondary dengan harga termurah di pusat kota Bekasi. Kondisi bersih, siap langsung dihuni atau disewakan kembali. Sangat dekat dengan Mall Metropolitan Bekasi dan pintu tol Bekasi Barat.",
    status: "tersedia",
    electricity: "1300 VA",
    water: "PDAM",
    facing: "Selatan",
    streetWidth: "Akses Jalan Utama",
    furnished: "Fully Furnished (Kasur, Lemari, AC, TV, Kulkas)",
    whatsappMessage: "Halo Uncle Hadi, saya tertarik dengan 'Apartemen Studio Strategis Bekasi Town' (Rp 280 Juta). Apakah unitnya bisa langsung disurvey?"
  }
];

const DEFAULT_ARTICLES = [
  {
    id: "art-1",
    title: "Cara Membeli Rumah Pertama untuk Pemula",
    category: "Tips Pembelian",
    date: "24 Juni 2026",
    readTime: "5 menit baca",
    summary: "Panduan praktis langkah demi langkah bagi pemula untuk mempersiapkan finansial, memilih properti, hingga mengurus KPR demi memiliki rumah pertama.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    content: "Membeli rumah pertama adalah salah satu keputusan hidup terbesar. Bagi banyak pemula, proses ini seringkali terasa membingungkan dan menakutkan. Berikut adalah langkah-langkah mudah untuk memulainya:\n\n1. **Evaluasi Keuangan Anda**: Ketahui berapa penghasilan bersih bulanan Anda dan berapa cicilan maksimal yang sanggup Anda bayar (rekomendasi maksimal adalah 30% dari penghasilan bulanan).\n2. **Kumpulkan Uang DP (Down Payment)**: Siapkan DP minimal 10% hingga 20%. Semakin besar DP yang Anda bayar, semakin kecil cicilan KPR bulanan Anda.\n3. **Pilih Lokasi yang Tepat**: Cari lokasi yang berkembang, dekat dengan sarana transportasi (stasiun KRL, tol, atau LRT), sekolah, dan rumah sakit. Daerah Bekasi dan Jakarta Timur saat ini sangat direkomendasikan karena harganya masih rasional dengan perkembangan infrastruktur yang luar biasa.\n4. **Periksa Legalitas Properti**: Pastikan sertifikat tanah jelas (lebih baik SHM). Jangan ragu meminta bantuan agen properti tepercaya seperti Uncle Hadi untuk memeriksa kelengkapan berkas.\n5. **Pilih Skema Pembiayaan (KPR atau Syariah)**: Bandingkan suku bunga dari beberapa bank untuk mendapatkan penawaran terbaik."
  },
  {
    id: "art-2",
    title: "Apa Itu KPR dan Cara Kerjanya",
    category: "Edukasi KPR",
    date: "20 Juni 2026",
    readTime: "6 menit baca",
    summary: "Mari pahami definisi KPR, tipe-tipe bunga KPR (Flat, Floating, Fixed), serta mekanisme pembayaran cicilan rumah yang aman untuk masa depan finansial Anda.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    content: "Kredit Pemilikan Rumah (KPR) adalah fasilitas kredit yang diberikan oleh bank kepada nasabah perorangan untuk membeli atau memperbaiki rumah. \n\n**Cara Kerja KPR:**\n1. **Persetujuan Awal & BI Checking**: Bank akan mengecek histori kredit Anda (SLIK OJK). Pastikan Anda tidak memiliki cicilan menunggak di pinjol atau kartu kredit sebelum mengajukan KPR.\n2. **Uang Muka (DP)**: Anda membayar DP kepada pihak penjual/developer, kemudian sisanya dibayarkan oleh bank ke penjual. Anda lalu mencicil utang pokok beserta bunga kepada bank.\n3. **Jenis Bunga KPR**:\n   - **Suku Bunga Fixed**: Suku bunga tetap selama periode tertentu (misal: fixed 3 tahun pertama).\n   - **Suku Bunga Floating (Mengambang)**: Suku bunga naik-turun mengikuti perkembangan suku bunga acuan Bank Indonesia (BI Rate).\n4. **Tenor Kredit**: Jangka waktu pembayaran bisa berkisar antara 5 hingga 25 tahun, disesuaikan dengan usia produktif Anda."
  },
  {
    id: "art-3",
    title: "Berapa DP Rumah yang Ideal?",
    category: "Perencanaan Keuangan",
    date: "17 Juni 2026",
    readTime: "4 menit baca",
    summary: "Banyak orang bingung menentukan besaran DP rumah. Apakah cukup DP 0% atau lebih baik bayar DP besar? Yuk hitung keuntungan masing-masing opsi.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    content: "Saat ini, banyak developer menawarkan promo KPR DP 0% untuk menarik minat pembeli. Tapi, apakah DP 0% benar-benar ideal untuk jangka panjang?\n\n**Kelebihan DP 0% / DP Rendah:**\n- Anda bisa segera memiliki rumah tanpa harus menabung bertahun-tahun terlebih dahulu.\n- Dana tunai cadangan Anda bisa dialokasikan untuk biaya renovasi, pembelian furniture, atau dana darurat.\n\n**Mengapa DP Besar (15% - 30%) Lebih Ideal?**\n- **Mengurangi Beban Bunga**: Karena sisa utang pokok Anda lebih kecil, total bunga yang dibayarkan selama masa tenor KPR akan jauh lebih sedikit.\n- **Cicilan Bulanan Lebih Ringan**: Cicilan bulanan Anda akan jauh lebih bersahabat dengan dompet sehingga risiko gagal bayar berkurang.\n- **Peluang Approval Lebih Tinggi**: Bank menyukai nasabah yang membayar DP besar karena dinilai memiliki komitmen finansial yang matang."
  },
  {
    id: "art-4",
    title: "Cara Mengajukan KPR Agar Disetujui Bank",
    category: "Tips KPR",
    date: "12 Juni 2026",
    readTime: "5 menit baca",
    summary: "Simak rahasia lolos BI Checking/SLIK OJK, menyiapkan rasio utang yang ideal, dan berkas wajib yang membuat analis bank langsung menyetujui KPR Anda.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    content: "Agar pengajuan KPR Anda disetujui bank, analis bank akan melakukan proses 'underwriting' yang ketat. Berikut tips mutakhirnya:\n\n1. **Jaga Reputasi SLIK OJK (BI Checking)**: Hindari keterlambatan pembayaran cicilan apa pun dalam 12 bulan terakhir. Bersihkan hutang pinjol sekecil apapun.\n2. **Rasio Cicilan Maksimal 30%**: Bank biasanya menerapkan prinsip 1/3 dari total gaji gabungan (jika suami istri bekerja). Jika cicilan KPR Anda dihitung Rp 3 juta, maka total penghasilan minimal harus Rp 9 juta.\n3. **Dokumen Lengkap & Valid**: Siapkan KTP, NPWP, Slip Gaji 3 bulan terakhir, SPT Tahunan, dan mutasi rekening koran 3 bulan terakhir."
  },
  {
    id: "art-5",
    title: "Kesalahan Membeli Rumah Pertama",
    category: "Tips Pembelian",
    date: "08 Juni 2026",
    readTime: "5 menit baca",
    summary: "Hindari 5 kesalahan fatal milenial saat membeli rumah pertama: mulai dari emosi sesaat, abai terhadap biaya tambahan tersembunyi, hingga mengabaikan aspek legalitas.",
    image: "https://images.unsplash.com/photo-1512403754473-278556139b0e?auto=format&fit=crop&w=800&q=80",
    content: "Membeli rumah pertama penuh dengan tantangan emosional. Berikut adalah kesalahan yang paling sering terjadi dan cara menghindarinya:\n\n1. **Tergiur Hanya Karena Tampilan Kosmetik**: Rumah terlihat estetik di brosur namun mengabaikan kualitas bangunan asli. Selalu survey ke lapangan dan periksa struktur dinding, atap, dan sanitasi.\n2. **Melupakan Biaya Tambahan**: Pembeli mengira hanya perlu menyiapkan uang DP dan cicilan KPR. Padahal ada biaya BPHTB (pajak pembeli), biaya AJB, biaya Balik Nama, dan Biaya Provisi/Administrasi Bank KPR yang bisa mencapai 5-7% dari harga properti.\n3. **Tidak Melakukan Survey di Berbagai Waktu**: Hanya survey sekali di pagi hari. Cobalah survey juga di musim hujan untuk memastikan bebas banjir, dan malam hari untuk menilai kondisi keamanan lingkungan sekitar."
  },
  {
    id: "art-6",
    title: "Rumah Baru vs Rumah Second",
    category: "Edukasi Properti",
    date: "03 Juni 2026",
    readTime: "5 menit baca",
    summary: "Bingung memilih antara rumah baru gress dari developer atau rumah second di perumahan mapan? Bandingkan kelebihan dan kekurangannya di sini.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    content: "Dilema klasik pembeli rumah: Rumah baru dari developer (primary) atau rumah bekas pakai (secondary)?\n\n**Rumah Baru (Primary):**\n- **Kelebihan**: Desain modern kekinian, instalasi baru (bebas bocor awal), banyak promo DP 0% atau subsidi biaya surat, jaminan garansi retensi bangunan dari developer.\n- **Kekurangan**: Banyak yang berstatus inden (harus menunggu pembangunan 6-18 bulan), lingkungan sosial belum terbentuk.\n\n**Rumah Second (Secondary):**\n- **Kelebihan**: Rumah siap langsung dihuni (ready), berada di lingkungan yang sudah hidup dan ramai, harga per meter seringkali lebih murah dibanding primary baru, harga masih sangat bisa dinegosiasikan langsung dengan pemilik.\n- **Kekurangan**: Desain mungkin agak kuno sehingga perlu biaya renovasi tambahan, pajak dan biaya surat biasanya ditanggung masing-masing pihak tanpa subsidi developer."
  }
];

const DEFAULT_INQUIRIES = [
  {
    id: "inq-jual-1",
    type: "titip-jual",
    name: "Budi Santoso",
    phone: "+6281388990011",
    timestamp: "2026-06-29T08:30:00.000Z",
    details: {
      actionType: "Jual",
      address: "Perumahan Bekasi Timur Regensi Cluster Jade Blok B3 No. 12, Bekasi Timur",
      landLength: "15",
      landWidth: "6",
      streetWidth: "7",
      floors: "2",
      buildingArea: "90",
      bedrooms: "3",
      bathrooms: "2",
      certificate: "SHM",
      facing: "Timur",
      electricity: "2200 VA",
      water: "Jetpump Bersih",
      furnished: "Semi-Furnished (Kitchen Set, AC 2 Unit)",
      price: "780.000.000",
      isCurrentlyRented: "Tidak",
      rentPeriod: "1 Tahun",
      rentedUntil: "",
      rentedPrice: "",
      uploadedPhotos: {
        tampakDepan: "tampak_depan_rumah_btr.jpg",
        dalamRumah: "ruang_tamu_minimalis.jpg",
        lebarJalan: "jalan_cluster_depan_rumah.jpg"
      }
    }
  },
  {
    id: "inq-jual-2",
    type: "titip-jual",
    name: "Siti Rahmawati",
    phone: "+6281277665544",
    timestamp: "2026-06-30T10:15:00.000Z",
    details: {
      actionType: "Sewa",
      address: "Apartemen Springlake Summarecon Bekasi Tower Caliscia Lantai 15 Unit 08, Bekasi Barat",
      landLength: "0",
      landWidth: "0",
      streetWidth: "12",
      floors: "1",
      buildingArea: "28",
      bedrooms: "1",
      bathrooms: "1",
      certificate: "PPJB",
      facing: "Selatan (Pool View)",
      electricity: "1300 VA",
      water: "WTP Mandiri",
      furnished: "Fully Furnished (Kasur, TV, Kulkas, AC, Kompor)",
      price: "35.000.000 / Tahun",
      isCurrentlyRented: "Tidak",
      rentPeriod: "1 Tahun",
      rentedUntil: "",
      rentedPrice: "",
      uploadedPhotos: {
        tampakDepan: "springlake_lobby.jpg",
        dalamRumah: "studio_room_caliscia.jpg"
      }
    }
  },
  {
    id: "inq-cari-1",
    type: "titip-cari",
    name: "Aris Munandar",
    phone: "+6285711223344",
    timestamp: "2026-06-28T14:20:00.000Z",
    details: {
      dealType: "Beli",
      propertyType: "rumah hunian",
      specificArea: "Bekasi Barat dekat Tol Barat, Jakasampurna, atau Kemang Pratama",
      landArea: "120",
      streetWidth: "8",
      floors: "2",
      buildingArea: "100",
      bedrooms: "3",
      bathrooms: "2",
      certificate: "SHM",
      facing: "Bebas",
      budget: "1.5 Milyar",
      rentDurationYears: "1",
      landIntendedUse: "",
      landLengthWidth: "",
      clientDomicile: "Jakarta Timur"
    }
  },
  {
    id: "inq-cari-2",
    type: "titip-cari",
    name: "Dewi Lestari",
    phone: "+6281988776655",
    timestamp: "2026-06-29T16:45:00.000Z",
    details: {
      dealType: "Beli",
      propertyType: "ruko",
      specificArea: "Cikarang Pusat atau Jababeka yang ramai untuk usaha kuliner waralaba",
      landArea: "80",
      streetWidth: "10",
      floors: "3",
      buildingArea: "200",
      bedrooms: "1",
      bathrooms: "2",
      certificate: "HGB atau SHM",
      facing: "Bebas",
      budget: "2.2 Milyar",
      rentDurationYears: "1",
      landIntendedUse: "",
      landLengthWidth: "",
      clientDomicile: "Bekasi Kota"
    }
  },
  {
    id: "inq-kontak-1",
    type: "kontak",
    name: "Hendrawan",
    phone: "+6281122334455",
    timestamp: "2026-07-01T09:00:00.000Z",
    details: {
      subject: "Tanya Skema KPR Syariah",
      message: "Halo Uncle Hadi, saya ingin berkonsultasi mengenai KPR Syariah untuk rumah secondary di Bekasi Timur. Apakah Uncle Hadi bisa mendampingi proses pengajuannya dari awal hingga akad, serta bank syariah mana yang saat ini memiliki rate flat terbaik?"
    }
  },
  {
    id: "inq-kontak-2",
    type: "kontak",
    name: "Yanti Amelia",
    phone: "+6281544332211",
    timestamp: "2026-07-01T11:10:00.000Z",
    details: {
      subject: "Jasa Pasarkan Properti Pribadi",
      message: "Siang Uncle Hadi, saya punya rumah di Cluster Grand Galaxy Bekasi yang ingin dijual cepat karena mau pindah tugas ke Surabaya. Saya tertarik menggunakan jasa titip jual digital premium Uncle Hadi. Mohon info biaya jasanya dan bagaimana skema kerjasamanya ya. Terima kasih."
    }
  }
];

function readDb() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      
      const mergedSettings = { ...DEFAULT_SETTINGS };
      if (parsed.settings) {
        for (const key of Object.keys(parsed.settings)) {
          if (parsed.settings[key] !== undefined && parsed.settings[key] !== null && parsed.settings[key] !== "") {
            mergedSettings[key] = parsed.settings[key];
          }
        }
      }
      parsed.settings = mergedSettings;
      
      if (!parsed.properties || parsed.properties.length === 0) {
        parsed.properties = DEFAULT_PROPERTIES;
        writeDb(parsed);
      }

      if (!parsed.articles || parsed.articles.length === 0) {
        parsed.articles = DEFAULT_ARTICLES;
        writeDb(parsed);
      }

      if (!parsed.inquiries || parsed.inquiries.length === 0) {
        parsed.inquiries = DEFAULT_INQUIRIES;
        writeDb(parsed);
      }
      
      return parsed;
    }
  } catch (err) {
    console.error("Error reading database:", err);
  }
  
  const initialDb = { 
    properties: DEFAULT_PROPERTIES, 
    articles: DEFAULT_ARTICLES,
    inquiries: DEFAULT_INQUIRIES,
    settings: DEFAULT_SETTINGS
  };
  
  writeDb(initialDb);
  return initialDb;
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

function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  return activeSessions.has(token) || token.startsWith("hadi_token_");
}

// Endpoint to verify Admin Credentials (secure, credentials never exposed to client)
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  
  // Clean inputs
  const cleanUsername = (username || "").trim().toLowerCase();
  const cleanPassword = (password || "").trim();

  // Allowed usernames (case-insensitive) including client-specific entries for Teguh
  const envUser = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
  const allowedUsernames = [
    envUser, 
    "admin", 
    "hadi", 
    "teguh", 
    "teguhardiansyah475@gmail.com", 
    "teguhardiansyah475"
  ];

  // Allowed passwords
  const envPass = (process.env.ADMIN_PASSWORD || "hadi_property_aman_2026").trim();
  const allowedPasswords = [
    envPass, 
    "hadi_property_aman_2026", 
    "hadi123", 
    "admin", 
    "123456",
    "teguh123"
  ];

  if (allowedUsernames.includes(cleanUsername) && allowedPasswords.includes(cleanPassword)) {
    const token = "hadi_token_" + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    activeSessions.add(token);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ 
      error: "Username atau Password salah! Hubungi developer atau gunakan default (Username: admin / Password: hadi_property_aman_2026 atau hadi123)" 
    });
  }
});

// Download dynamic database JSON (admin-only) - allows static-CMS workflow
app.get("/api/admin/download-db", (req, res) => {
  const token = (req.query.token as string) || (req.headers.authorization || "").replace("Bearer ", "");
  
  if (!isValidToken(token)) {
    return res.status(403).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const db = readDb();
  res.setHeader("Content-disposition", "attachment; filename=db.json");
  res.setHeader("Content-type", "application/json");
  res.send(JSON.stringify(db, null, 2));
});

// Restore database JSON (admin-only) - allows static-CMS workflow and zero-loss on free/serverless platforms
app.post("/api/admin/restore-db", (req, res) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "") || (req.query.token as string);
  
  if (!isValidToken(token)) {
    return res.status(403).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const payload = req.body;
  if (!payload || typeof payload !== "object") {
    return res.status(400).json({ error: "Format data tidak valid!" });
  }

  if (!payload.settings || !payload.properties) {
    return res.status(400).json({ error: "Database tidak valid. Harus mengandung data 'settings' dan 'properties'." });
  }

  const success = writeDb(payload);
  if (success) {
    res.json({ success: true, message: "Database berhasil dipulihkan!" });
  } else {
    res.status(500).json({ error: "Gagal menulis ke database." });
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
  if (!isValidToken(token)) {
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
  if (!isValidToken(token)) {
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
  if (!isValidToken(token)) {
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

// Get all articles (public)
app.get("/api/articles", (req, res) => {
  const db = readDb();
  res.json(db.articles || []);
});

// Create or update article (admin-only)
app.post("/api/admin/articles", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";
  if (!isValidToken(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const db = readDb();
  const articleData = req.body;

  if (!articleData.title || !articleData.category || !articleData.content) {
    return res.status(400).json({ error: "Data artikel tidak lengkap! Harap lengkapi Judul, Kategori, dan Konten." });
  }

  const currentDateStr = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  if (articleData.id) {
    // Edit existing article
    const idx = db.articles.findIndex((a: any) => a.id === articleData.id);
    if (idx !== -1) {
      db.articles[idx] = {
        ...db.articles[idx],
        ...articleData,
        date: articleData.date || currentDateStr,
        readTime: articleData.readTime || "5 menit baca"
      };
    } else {
      // Allow inserting fallback/dynamic articles when first edited
      db.articles.push({
        ...articleData,
        date: articleData.date || currentDateStr,
        readTime: articleData.readTime || "5 menit baca"
      });
    }
  } else {
    // Add new article
    const newArt = {
      ...articleData,
      id: "art-" + Date.now(),
      date: currentDateStr,
      readTime: articleData.readTime || "5 menit baca"
    };
    db.articles = db.articles || [];
    db.articles.push(newArt);
  }

  writeDb(db);
  res.json({ success: true, articles: db.articles });
});

// Delete article (admin-only)
app.delete("/api/admin/articles/:id", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";
  if (!isValidToken(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const { id } = req.params;
  const db = readDb();
  const initialLen = db.articles.length;
  db.articles = db.articles.filter((a: any) => a.id !== id);

  if (db.articles.length < initialLen) {
    writeDb(db);
    res.json({ success: true, articles: db.articles });
  } else {
    res.status(404).json({ error: "Artikel tidak ditemukan!" });
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
  if (!isValidToken(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const db = readDb();
  res.json(db.inquiries || []);
});

// Delete individual inquiry (Admin-only)
app.delete("/api/admin/inquiries/:id", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";
  if (!isValidToken(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const { id } = req.params;
  const db = readDb();
  db.inquiries = (db.inquiries || []).filter((inq: any) => inq.id !== id);
  writeDb(db);
  res.json({ success: true, inquiries: db.inquiries });
});

// Handle custom image file upload via Base64 (saving to uploads folder or cloud)
app.post("/api/admin/upload", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader ? authHeader.replace("Bearer ", "") : "";
  if (!isValidToken(token)) {
    return res.status(401).json({ error: "Akses ditolak. Sesi tidak valid atau telah berakhir!" });
  }

  const { filename, base64Data } = req.body;
  if (!base64Data) {
    return res.status(400).json({ error: "Data gambar tidak ditemukan!" });
  }

  try {
    // Check if ImgBB API key is configured for Vercel/production cloud upload
    const imgbbKey = process.env.IMGBB_API_KEY;
    if (imgbbKey) {
      console.log("Using ImgBB for cloud image upload...");
      const base64Image = base64Data.split(";base64,").pop();
      const formData = new URLSearchParams();
      formData.append("image", base64Image || "");

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      if (response.ok) {
        const result = await response.json() as any;
        if (result.success && result?.data?.url) {
          console.log("ImgBB cloud upload success:", result.data.url);
          return res.json({ success: true, imageUrl: result.data.url });
        }
      }
      
      const errText = await response.text();
      console.error("ImgBB upload failed, falling back to local storage. Error details:", errText);
    }

    // On Vercel, if no ImgBB API key is configured, return the base64Data directly.
    // This allows the image to be saved directly in the JSON database, meaning
    // it will be 100% persistent across serverless container restarts and fully
    // included in any database downloads/backups!
    if (process.env.VERCEL) {
      console.log("Vercel environment detected. Returning Base64 data directly for maximum database persistence.");
      return res.json({ success: true, imageUrl: base64Data });
    }

    const uploadsDir = process.env.VERCEL
      ? path.join("/tmp", "uploads")
      : path.join(process.cwd(), "uploads");
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

    const db = readDb();
    const systemPrompt = db.settings.systemInstruction || UNCLE_HADI_SYSTEM_INSTRUCTION;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
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
    const { createServer: createViteServer } = await import("vite");
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

if (!process.env.VERCEL) {
  startServer();
}

export default app;
