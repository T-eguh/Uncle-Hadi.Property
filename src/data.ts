import { Property, Article, Testimonial } from "./types";

export const PROPERTIES_DATA: Property[] = [
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
    location: "Bekasi Timur, Bekasi",
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
    location: "Cawang, Jakarta Timur",
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
    location: "Bekasi Barat, Bekasi",
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
    location: "Cikarang Pusat, Bekasi",
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
    location: "Karawang Barat, Karawang",
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
    location: "Bekasi Barat, Bekasi",
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

export const ARTICLES_DATA: Article[] = [
  {
    id: "art-1",
    title: "Cara Membeli Rumah Pertama untuk Pemula",
    category: "Tips Pembelian",
    date: "24 Juni 2026",
    readTime: "5 menit baca",
    summary: "Panduan praktis langkah demi langkah bagi pemula untuk mempersiapkan finansial, memilih properti, hingga mengurus KPR demi memiliki rumah pertama.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    content: `Membeli rumah pertama adalah salah satu keputusan hidup terbesar. Bagi banyak pemula, proses ini seringkali terasa membingungkan dan menakutkan. Berikut adalah langkah-langkah mudah untuk memulainya:

1. **Evaluasi Keuangan Anda**: Ketahui berapa penghasilan bersih bulanan Anda dan berapa cicilan maksimal yang sanggup Anda bayar (rekomendasi maksimal adalah 30% dari penghasilan bulanan).
2. **Kumpulkan Uang DP (Down Payment)**: Siapkan DP minimal 10% hingga 20%. Semakin besar DP yang Anda bayar, semakin kecil cicilan KPR bulanan Anda.
3. **Pilih Lokasi yang Tepat**: Cari lokasi yang berkembang, dekat dengan sarana transportasi (stasiun KRL, tol, atau LRT), sekolah, dan rumah sakit. Daerah Bekasi dan Jakarta Timur saat ini sangat direkomendasikan karena harganya masih rasional dengan perkembangan infrastruktur yang luar biasa.
4. **Periksa Legalitas Properti**: Pastikan sertifikat tanah jelas (lebih baik SHM). Jangan ragu meminta bantuan agen properti tepercaya seperti Uncle Hadi untuk memeriksa kelengkapan berkas.
5. **Pilih Skema Pembiayaan (KPR atau Syariah)**: Bandingkan suku bunga dari beberapa bank untuk mendapatkan penawaran terbaik.`
  },
  {
    id: "art-2",
    title: "Apa Itu KPR dan Cara Kerjanya",
    category: "Edukasi KPR",
    date: "20 Juni 2026",
    readTime: "6 menit baca",
    summary: "Mari pahami definisi KPR, tipe-tipe bunga KPR (Flat, Floating, Fixed), serta mekanisme pembayaran cicilan rumah yang aman untuk masa depan finansial Anda.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    content: `Kredit Pemilikan Rumah (KPR) adalah fasilitas kredit yang diberikan oleh bank kepada nasabah perorangan untuk membeli atau memperbaiki rumah. 

**Cara Kerja KPR:**
1. **Persetujuan Awal & BI Checking**: Bank akan mengecek histori kredit Anda (SLIK OJK). Pastikan Anda tidak memiliki cicilan menunggak di pinjol atau kartu kredit sebelum mengajukan KPR.
2. **Uang Muka (DP)**: Anda membayar DP kepada pihak penjual/developer, kemudian sisanya dibayarkan oleh bank ke penjual. Anda lalu mencicil utang pokok beserta bunga kepada bank.
3. **Jenis Bunga KPR**:
   - **Suku Bunga Fixed**: Suku bunga tetap selama periode tertentu (misal: fixed 3 tahun pertama).
   - **Suku Bunga Floating (Mengambang)**: Suku bunga naik-turun mengikuti perkembangan suku bunga acuan Bank Indonesia (BI Rate).
4. **Tenor Kredit**: Jangka waktu pembayaran bisa berkisar antara 5 hingga 25 tahun, disesuaikan dengan usia produktif Anda.`
  },
  {
    id: "art-3",
    title: "Berapa DP Rumah yang Ideal?",
    category: "Perencanaan Keuangan",
    date: "17 Juni 2026",
    readTime: "4 menit baca",
    summary: "Banyak orang bingung menentukan besaran DP rumah. Apakah cukup DP 0% atau lebih baik bayar DP besar? Yuk hitung keuntungan masing-masing opsi.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    content: `Saat ini, banyak developer menawarkan promo KPR DP 0% untuk menarik minat pembeli. Tapi, apakah DP 0% benar-benar ideal untuk jangka panjang?

**Kelebihan DP 0% / DP Rendah:**
- Anda bisa segera memiliki rumah tanpa harus menabung bertahun-tahun terlebih dahulu.
- Dana tunai cadangan Anda bisa dialokasikan untuk biaya renovasi, pembelian furniture, atau dana darurat.

**Mengapa DP Besar (15% - 30%) Lebih Ideal?**
- **Mengurangi Beban Bunga**: Karena sisa utang pokok Anda lebih kecil, total bunga yang dibayarkan selama masa tenor KPR akan jauh lebih sedikit.
- **Cicilan Bulanan Lebih Ringan**: Cicilan bulanan Anda akan jauh lebih bersahabat dengan dompet sehingga risiko gagal bayar berkurang.
- **Peluang Approval Lebih Tinggi**: Bank menyukai nasabah yang membayar DP besar karena dinilai memiliki komitmen finansial yang matang.`
  },
  {
    id: "art-4",
    title: "Cara Mengajukan KPR Agar Disetujui Bank",
    category: "Tips KPR",
    date: "12 Juni 2026",
    readTime: "5 menit baca",
    summary: "Simak rahasia lolos BI Checking/SLIK OJK, menyiapkan rasio utang yang ideal, dan berkas wajib yang membuat analis bank langsung menyetujui KPR Anda.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    content: `Agar pengajuan KPR Anda disetujui bank, analis bank akan melakukan proses 'underwriting' yang ketat. Berikut tips mutakhirnya:

1. **Jaga Reputasi SLIK OJK (BI Checking)**: Hindari keterlambatan pembayaran cicilan apa pun dalam 12 bulan terakhir. Bersihkan hutang pinjol sekecil apapun.
2. **Rasio Cicilan Maksimal 30%**: Bank biasanya menerapkan prinsip 1/3 dari total gaji gabungan (jika suami istri bekerja). Jika cicilan KPR Anda dihitung Rp 3 juta, maka total penghasilan minimal harus Rp 9 juta.
3. **Dokumen Lengkap & Valid**: Siapkan KTP, NPWP, Slip Gaji 3 bulan terakhir, SPT Tahunan, dan mutasi rekening koran 3 bulan terakhir.`
  },
  {
    id: "art-5",
    title: "Kesalahan Membeli Rumah Pertama",
    category: "Tips Pembelian",
    date: "08 Juni 2026",
    readTime: "5 menit baca",
    summary: "Hindari 5 kesalahan fatal milenial saat membeli rumah pertama: mulai dari emosi sesaat, abai terhadap biaya tambahan tersembunyi, hingga mengabaikan aspek legalitas.",
    image: "https://images.unsplash.com/photo-1512403754473-278556139b0e?auto=format&fit=crop&w=800&q=80",
    content: `Membeli rumah pertama penuh dengan tantangan emosional. Berikut adalah kesalahan yang paling sering terjadi dan cara menghindarinya:

1. **Tergiur Hanya Karena Tampilan Kosmetik**: Rumah terlihat estetik di brosur namun mengabaikan kualitas bangunan asli. Selalu survey ke lapangan dan periksa struktur dinding, atap, dan sanitasi.
2. **Melupakan Biaya Tambahan**: Pembeli mengira hanya perlu menyiapkan uang DP dan cicilan KPR. Padahal ada biaya BPHTB (pajak pembeli), biaya AJB, biaya Balik Nama, dan Biaya Provisi/Administrasi Bank KPR yang bisa mencapai 5-7% dari harga properti.
3. **Tidak Melakukan Survey di Berbagai Waktu**: Hanya survey sekali di pagi hari. Cobalah survey juga di musim hujan untuk memastikan bebas banjir, dan malam hari untuk menilai kondisi keamanan lingkungan sekitar.`
  },
  {
    id: "art-6",
    title: "Rumah Baru vs Rumah Second",
    category: "Edukasi Properti",
    date: "03 Juni 2026",
    readTime: "5 menit baca",
    summary: "Bingung memilih antara rumah baru gress dari developer atau rumah second di perumahan mapan? Bandingkan kelebihan dan kekurangannya di sini.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    content: `Dilema klasik pembeli rumah: Rumah baru dari developer (primary) atau rumah bekas pakai (secondary)?

**Rumah Baru (Primary):**
- **Kelebihan**: Desain modern kekinian, instalasi baru (bebas bocor awal), banyak promo DP 0% atau subsidi biaya surat, jaminan garansi retensi bangunan dari developer.
- **Kekurangan**: Banyak yang berstatus inden (harus menunggu pembangunan 6-18 bulan), lingkungan sosial belum terbentuk.

**Rumah Second (Secondary):**
- **Kelebihan**: Rumah siap langsung dihuni (ready), berada di lingkungan yang sudah hidup dan ramai, harga per meter seringkali lebih murah dibanding primary baru, harga masih sangat bisa dinegosiasikan langsung dengan pemilik.
- **Kekurangan**: Desain mungkin agak kuno sehingga perlu biaya renovasi tambahan, pajak dan biaya surat biasanya ditanggung masing-masing pihak tanpa subsidi developer.`
  },
  {
    id: "art-7",
    title: "Cara Menentukan Harga Jual Rumah",
    category: "Tips Penjualan",
    date: "28 Mei 2026",
    readTime: "4 menit baca",
    summary: "Bagi pemilik properti yang ingin menitipkan propertinya untuk dijual, pelajari cara menentukan harga jual yang realistis namun tetap menguntungkan.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    content: `Menentukan harga jual properti yang terlalu tinggi akan membuat rumah Anda lama terjual di pasar, sedangkan terlalu rendah akan merugikan investasi Anda.

1. **Cek Nilai NJOP Terbaru**: NJOP (Nilai Jual Objek Pajak) tertera pada lembar PBB Anda. Ini adalah harga patokan terendah dari pemerintah.
2. **Lakukan Survey Perbandingan Harga**: Cari tahu harga pasaran rumah sejenis dengan spesifikasi yang mirip dalam radius 1-2 kilometer.
3. **Nilai Kondisi dan Fasilitas Tambahan**: Rumah yang terawat baik, semi-furnished, memiliki instalasi air bersih yang prima, atau jalan depan beraspal lebar berhak mendapatkan harga premium dibanding rumah kosong terbengkalai.
4. **Gunakan Jasa Agen Properti**: Agen tepercaya seperti Uncle Hadi memiliki database transaksi real di wilayah Bekasi dan Jakarta Timur sehingga dapat memberikan penilaian harga pasar yang akurat.`
  },
  {
    id: "art-8",
    title: "Tips Menjual Rumah Lebih Cepat",
    category: "Tips Penjualan",
    date: "24 Mei 2026",
    readTime: "4 menit baca",
    summary: "Rumah Anda tidak kunjung terjual? Temukan strategi merapikan rumah (home staging), mengambil foto berkualitas, dan memilih agen promosi digital terbaik.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    content: `Jika rumah Anda sudah dipasarkan berbulan-bulan namun belum juga laku, kemungkinan ada beberapa hal yang perlu dievaluasi:

1. **Rapikan Rumah (Home Staging)**: Cat ulang bagian dinding depan yang kusam atau berjamur. Bersihkan rumput liar di halaman depan. Kesan pertama (first impression) pembeli sangat menentukan!
2. **Kualitas Foto dan Video**: Foto properti yang gelap dan berantakan akan langsung di-skip oleh calon pembeli di media sosial. Ambil foto di siang hari dengan pencahayaan maksimal.
3. **Gunakan Metode 'Titip Jual' Online**: Titipkan properti Anda pada agen yang paham pemasaran digital. Di website Uncle Hadi.Property, kami mengiklankan listing Anda ke media sosial, website premium, dan portal properti khusus.`
  },
  {
    id: "art-9",
    title: "Investasi Properti untuk Pemula",
    category: "Investasi",
    date: "19 Mei 2026",
    readTime: "5 menit baca",
    summary: "Langkah aman memulai investasi properti dengan modal terukur, memahami capital gain dan yield sewa, serta memilih jenis properti yang likuid.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    content: `Mengapa investasi properti dijuluki instrumen pelindung inflasi terbaik? Karena tanah di dunia ini terbatas, sedangkan manusia bertambah banyak.

**Dua Sumber Keuntungan Investasi Properti:**
1. **Capital Gain (Kenaikan Nilai Aset)**: Keuntungan dari selisih harga beli dan harga jual di kemudian hari. Daerah Bekasi dan Karawang memiliki capital gain tinggi karena terus dibangun kawasan industri dan residensial baru.
2. **Rental Yield (Pendapatan Sewa)**: Pendapatan rutin tahunan dari penyewa properti. Ruko dan Apartemen biasanya memiliki rental yield persentase lebih tinggi dibanding rumah hunian biasa.

**Tips Memulai:**
Mulailah dari properti ukuran kecil hingga sedang, pastikan legalitas aman (SHM), dan pilih wilayah penyangga Jakarta yang memiliki konektivitas transportasi tinggi.`
  },
  {
    id: "art-10",
    title: "Cara Memilih Lokasi Properti",
    category: "Edukasi Properti",
    date: "15 Mei 2026",
    readTime: "4 menit baca",
    summary: "Ada istilah legendaris: 'Location, Location, Location!'. Mari bedah cara menganalisis area berkembang, potensi zonasi, dan bebas risiko bencana alam.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
    content: `Lokasi menentukan segalanya: kenyamanan hidup Anda, kemudahan mobilitas harian, serta kecepatan kenaikan harga properti di masa mendatang.

**Kriteria Lokasi Emas Properti:**
1. **Aksesibilitas**: Dekat pintu tol, dekat dengan stasiun commuter line (KRL) atau LRT.
2. **Fasilitas Umum**: Radius maksimal 15-20 menit dari rumah sakit rujukan, sekolah/universitas berkualitas, dan pasar atau pusat perbelanjaan.
3. **Bebas Banjir**: Tanyakan kepada tetangga sekitar atau cek topografi wilayah saat musim hujan lebat.
4. **Rencana Tata Kota**: Pilih area yang direncanakan oleh pemerintah sebagai koridor pertumbuhan ekonomi baru.`
  }
];

// List of the remaining titles to cover the "30 Artikel Pertama" requested by the user
export const THIRTY_ARTICLE_TITLES = [
  "Cara Membeli Rumah Pertama untuk Pemula",
  "Apa Itu KPR dan Cara Kerjanya",
  "Berapa DP Rumah yang Ideal",
  "Cara Mengajukan KPR Agar Disetujui",
  "Kesalahan Membeli Rumah Pertama",
  "Rumah Baru vs Rumah Second",
  "Cara Menentukan Harga Jual Rumah",
  "Tips Menjual Rumah Lebih Cepat",
  "Investasi Properti untuk Pemula",
  "Cara Memilih Lokasi Properti",
  "Perbedaan SHM dan HGB",
  "Cara Cek Legalitas Rumah",
  "Pajak Saat Jual Beli Rumah",
  "Tips Membeli Tanah",
  "Cara Menghitung ROI Properti",
  "Apartemen atau Rumah?",
  "Properti untuk Passive Income",
  "Strategi Cicilan Rumah",
  "Tips Renovasi Rumah",
  "Cara Menilai Harga Pasar Properti",
  "Panduan Investasi Rumah Kost di Bekasi Timur",
  "Prospek Properti Cikarang Terkini",
  "Review Kawasan Hunian Jakarta Timur Dekat LRT",
  "Keunggulan Tinggal di Rumah Penyangga Bekasi",
  "Mengenal Istilah Over Kredit Rumah Secara Aman",
  "Tips Beli Rumah Second di Daerah Tambun-Cikarang",
  "Cara Mengurus Sertifikat Tanah Hilang atau Rusak",
  "Kelebihan Sertifikat Hak Milik (SHM) Dibanding Lainnya",
  "Mengenal BPHTB Pajak Pembeli Properti",
  "Potensi Sewa Properti untuk Karyawan Asing di Cikarang"
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Aris Munandar",
    role: "Klien Konsultasi Properti",
    relation: "Teman Kuliah Hadi & Pembeli Rumah",
    text: "Membeli rumah pertama bersama istri sangat menegangkan, tapi konsultasi gratis dengan Uncle Hadi membuka wawasan kami tentang KPR. Informasinya sangat transparan, tidak ada yang ditutup-tutupi. Sangat direkomendasikan!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    id: "test-2",
    name: "Siti Rahmawati",
    role: "Pemilik Rumah Bekasi",
    relation: "Rekan Kerja & Klien Titip Jual",
    text: "Saya menitipkan penjualan rumah saya di Bekasi Timur lewat website Uncle Hadi. Rumah saya diiklankan dengan foto-foto yang sangat rapi di media sosial dan portal online. Dalam 2 bulan rumah saya berhasil terjual dengan harga yang memuaskan!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    id: "test-3",
    name: "Christian Wijaya",
    role: "Investor Properti Pemula",
    relation: "Klien Konsultasi Investasi",
    text: "Sangat terbantu oleh penjelasan Uncle Hadi mengenai perbedaan investasi apartemen vs rumah tapak. Analisis ROI dan rekomendasi lokasi berkembangnya sangat presisi dan objektif. Sukses terus untuk Uncle Hadi.Property!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
  }
];
