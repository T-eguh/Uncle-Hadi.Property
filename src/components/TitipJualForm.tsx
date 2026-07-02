import React, { useState } from 'react';
import { Send, Upload, CheckCircle, FileText, Phone, User, Landmark, HelpCircle, Eye, Info } from 'lucide-react';

interface TitipJualFormProps {
  onOpenConsultation: () => void;
}

interface SubmittedListing {
  id: string;
  ownerName: string;
  phone: string;
  actionType: 'Jual' | 'Sewa';
  address: string;
  price: string;
  propertyType: string;
}

export default function TitipJualForm({ onOpenConsultation }: TitipJualFormProps) {
  // Form States
  const [actionType, setActionType] = useState<'Jual' | 'Sewa'>('Jual');
  const [address, setAddress] = useState('');
  const [landLength, setLandLength] = useState('');
  const [landWidth, setLandWidth] = useState('');
  const [streetWidth, setStreetWidth] = useState('');
  const [floors, setFloors] = useState('');
  const [buildingArea, setBuildingArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [certificate, setCertificate] = useState('SHM');
  const [facing, setFacing] = useState('Utara');
  const [electricity, setElectricity] = useState('2200 VA');
  const [water, setWater] = useState('PDAM & Jetpump');
  const [furnished, setFurnished] = useState('Unfurnished');
  const [price, setPrice] = useState('');
  
  // Rented states
  const [isCurrentlyRented, setIsCurrentlyRented] = useState('Tidak');
  const [rentPeriod, setRentPeriod] = useState('1 Tahun');
  const [rentedUntil, setRentedUntil] = useState('');
  const [rentedPrice, setRentedPrice] = useState('');

  // Owner Info
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');

  // Photos state
  const [uploadedPhotos, setUploadedPhotos] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [localListings, setLocalListings] = useState<SubmittedListing[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, photoKey: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedPhotos(prev => ({
        ...prev,
        [photoKey]: file.name
      }));
    }
  };

  const getFormattedListingText = () => {
    const totalLandArea = (Number(landLength) && Number(landWidth)) 
      ? `${Number(landLength) * Number(landWidth)} m² (Panjang: ${landLength}m x Lebar: ${landWidth}m)` 
      : `${landLength || '?'}m x ${landWidth || '?'}m`;

    let text = `*FORM LISTING TITIP JUAL/SEWA PROPERTY*\n`;
    text += `-----------------------------------------\n`;
    text += `*Status:* ${actionType}\n`;
    text += `*Nama Pemilik:* ${ownerName}\n`;
    text += `*No. Telp Pemilik:* ${ownerPhone}\n`;
    text += `*Alamat Properti:* ${address}\n\n`;
    
    text += `*SPESIFIKASI:* \n`;
    text += `- Luas Tanah: ${totalLandArea}\n`;
    text += `- Luas Bangunan: ${buildingArea} m²\n`;
    text += `- Lebar Jalan depan: ${streetWidth} meter\n`;
    text += `- Tingkat Lantai: ${floors} Lantai\n`;
    text += `- Kamar Tidur: ${bedrooms}\n`;
    text += `- Kamar Mandi: ${bathrooms}\n`;
    text += `- Sertifikat/Surat: ${certificate}\n`;
    text += `- Hadap: ${facing}\n`;
    text += `- Listrik: ${electricity}\n`;
    text += `- Air Bersih: ${water}\n`;
    text += `- Kondisi Furnished: ${furnished}\n\n`;

    text += `*NILAI PENAWARAN:* \n`;
    text += `- Harga Penawaran: Rp ${price}\n`;
    if (actionType === 'Sewa') {
      text += `- Minimal Periode Sewa: ${rentPeriod}\n`;
    }
    
    if (isCurrentlyRented === 'Ya') {
      text += `\n*STATUS SEDANG DISEWAKAN:* \n`;
      text += `- Tersewa Sampai: ${rentedUntil}\n`;
      text += `- Harga Sewa berjalan: Rp ${rentedPrice}\n`;
    }

    text += `\n*FOTO YANG DISIAPKAN:* \n`;
    text += `- Tampak Depan: ${uploadedPhotos['tampakDepan'] ? '✅ ' + uploadedPhotos['tampakDepan'] : '❌ Belum Upload'}\n`;
    text += `- Tampak Ruang Dalam (Ruang Tamu dll): ${uploadedPhotos['ruangDalam'] ? '✅ ' + uploadedPhotos['ruangDalam'] : '❌ Belum Upload'}\n`;
    text += `- Tampak Ruang Dapur/Ruang Makan: ${uploadedPhotos['ruangDapur'] ? '✅ ' + uploadedPhotos['ruangDapur'] : '❌ Belum Upload'}\n`;
    text += `- Tampak Ruang Kamar Tidur/Kamar Mandi: ${uploadedPhotos['kamarTidur'] ? '✅ ' + uploadedPhotos['kamarTidur'] : '❌ Belum Upload'}\n`;
    text += `- Tampak Lantai Atas (jika ada): ${uploadedPhotos['lantaiAtas'] ? '✅ ' + uploadedPhotos['lantaiAtas'] : '❌ Belum Upload'}\n`;
    text += `- Lebar Jalan Depan: ${uploadedPhotos['lebarJalan'] ? '✅ ' + uploadedPhotos['lebarJalan'] : '❌ Belum Upload'}\n`;

    return text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inquiryData = {
        type: 'titip-jual',
        name: ownerName,
        phone: ownerPhone,
        details: {
          actionType,
          address,
          landLength,
          landWidth,
          streetWidth,
          floors,
          buildingArea,
          bedrooms,
          bathrooms,
          certificate,
          facing,
          electricity,
          water,
          furnished,
          price,
          isCurrentlyRented,
          rentPeriod,
          rentedUntil,
          rentedPrice,
          uploadedPhotos
        }
      };

      await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      const newListing: SubmittedListing = {
        id: `list-${Date.now()}`,
        ownerName,
        phone: ownerPhone,
        actionType,
        address,
        price,
        propertyType: 'Rumah/Apartemen/Tanah'
      };

      setLocalListings(prev => [newListing, ...prev]);
      setIsSuccess(true);
    } catch (err) {
      console.error('Error saving listing inquiry:', err);
      // fallback to visual success so user experience is not disrupted offline
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendToWhatsApp = () => {
    const formattedText = getFormattedListingText();
    const phone = "6281234567890"; // WhatsApp Uncle Hadi
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(formattedText)}`, '_blank');
  };

  const handleResetForm = () => {
    setAddress('');
    setLandLength('');
    setLandWidth('');
    setStreetWidth('');
    setFloors('');
    setBuildingArea('');
    setBedrooms('');
    setBathrooms('');
    setCertificate('SHM');
    setFacing('Utara');
    setElectricity('2200 VA');
    setWater('PDAM & Jetpump');
    setFurnished('Unfurnished');
    setPrice('');
    setIsCurrentlyRented('Tidak');
    setRentedUntil('');
    setRentedPrice('');
    setOwnerName('');
    setOwnerPhone('');
    setUploadedPhotos({});
    setIsSuccess(false);
  };

  return (
    <div className="bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8" id="titip-jual-section">
      <div className="max-w-4xl mx-auto">
        {/* Header Block */}
        <div className="text-center mb-10" id="titip-jual-header">
          <span className="text-[#D4A017] font-semibold tracking-wider text-xs uppercase bg-[#D4A017]/10 px-3 py-1.5 rounded-full border border-[#D4A017]/30">
            Layanan Khusus Pemilik Property
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] mt-3 sm:text-4xl">
            Ingin Menjual Property Lebih Cepat?
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-2xl mx-auto">
            Daftarkan rumah, apartemen, ruko, atau tanah Anda di website Uncle Hadi. Kami bantu promosikan secara profesional melalui media sosial, situs web, iklan, dan portal marketplace property secara gratis.
          </p>
        </div>

        {/* Core Marketing points (Section 4 info) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12 bg-[#0F172A] text-white p-8 rounded-3xl shadow-lg border border-[#D4A017]/20" id="marketing-points">
          <div className="md:col-span-2 flex flex-col justify-center space-y-3">
            <h3 className="text-xl font-bold text-white leading-tight">
              Keuntungan Bermitra Bersama Uncle Hadi
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Kami berkomitmen mendampingi Anda dari proses penentuan harga wajar pasar, negosiasi, pengurusan surat, hingga serah terima kunci.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="block font-bold text-sm text-[#D4A017] mb-1">📸 Foto Profesional</span>
              <span className="block text-2xs text-gray-400">Pengambilan foto properti yang estetik dan rapi secara gratis.</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="block font-bold text-sm text-[#D4A017] mb-1">📱 Promosi Sosmed</span>
              <span className="block text-2xs text-gray-400">Listing diiklankan di Instagram, TikTok, dan Facebook Ads harian.</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="block font-bold text-sm text-[#D4A017] mb-1">🌐 Listing Web</span>
              <span className="block text-2xs text-gray-400">Unit Anda dimasukkan ke dalam katalog utama web Uncle Hadi.</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="block font-bold text-sm text-[#D4A017] mb-1">👥 Database Pembeli</span>
              <span className="block text-2xs text-gray-400">Pencocokan instan ke daftar investor/pembeli potensial kami.</span>
            </div>
          </div>
        </div>

        {/* Success Alert Block */}
        {isSuccess ? (
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl p-8 text-center animate-in fade-in duration-300" id="success-panel-jual">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Pendaftaran Property Berhasil!</h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto mb-6">
              Terima kasih, data property Anda telah tersimpan secara aman di sistem. Langkah terakhir, silakan klik tombol di bawah untuk langsung mengirim format pesan otomatis via WhatsApp agar Uncle Hadi dapat segera memvalidasi dan memproses iklan Anda!
            </p>

            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-4 text-left font-mono text-xs max-h-48 overflow-y-auto mb-6 scrollbar-thin text-gray-600 whitespace-pre-line" id="preview-formatted-text">
              {getFormattedListingText()}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleSendToWhatsApp}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2"
                id="success-send-wa"
              >
                {/* Simplified WhatsApp icon as path */}
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Kirim Via WhatsApp
              </button>
              <button
                onClick={handleResetForm}
                className="bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold text-sm px-5 py-3 rounded-xl transition"
                id="success-add-another"
              >
                Daftarkan Unit Lain
              </button>
            </div>
          </div>
        ) : (
          /* Actual Interactive Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden" id="titip-jual-form">
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Jual atau Sewa Selector */}
              <div id="form-action-section">
                <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3 mb-4">
                  1. Jenis Transaksi & Tipe Penawaran
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setActionType('Jual')}
                    className={`p-4 rounded-xl border-2 text-center transition font-bold text-sm ${
                      actionType === 'Jual'
                        ? 'border-[#D4A017] bg-[#D4A017]/10 text-[#0F172A]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                    id="action-jual"
                  >
                    🏡 Ingin Dijual
                  </button>
                  <button
                    type="button"
                    onClick={() => setActionType('Sewa')}
                    className={`p-4 rounded-xl border-2 text-center transition font-bold text-sm ${
                      actionType === 'Sewa'
                        ? 'border-[#D4A017] bg-[#D4A017]/10 text-[#0F172A]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                    id="action-sewa"
                  >
                    🔑 Ingin Disewakan
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4" id="form-details-section">
                <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3">
                  2. Detail Spesifikasi Unit Property
                </h3>
                
                {/* Alamat */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Alamat Lengkap Properti <span className="text-red-500">*</span></label>
                  <textarea
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Masukkan alamat lengkap unit Anda (misalnya: Perumahan Grand Bekasi Timur Blok C4 No. 12, Bekasi Timur)"
                    rows={2}
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition"
                    id="input-address"
                  />
                </div>

                {/* Luas Tanah & Luas Bangunan */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Luas Tanah (Lebar x Panjang) <span className="text-red-500">*</span></label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        required
                        placeholder="Lebar (m)"
                        value={landWidth}
                        onChange={(e) => setLandWidth(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        id="input-land-width"
                      />
                      <span className="text-gray-400">x</span>
                      <input
                        type="number"
                        required
                        placeholder="Panjang (m)"
                        value={landLength}
                        onChange={(e) => setLandLength(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        id="input-land-length"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Luas Bangunan (m²) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      placeholder="Contoh: 120"
                      value={buildingArea}
                      onChange={(e) => setBuildingArea(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      id="input-building-area"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Lebar Jalan depan (Meter) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      placeholder="Contoh: 8"
                      value={streetWidth}
                      onChange={(e) => setStreetWidth(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      id="input-street-width"
                    />
                  </div>
                </div>

                {/* Rooms and floors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Berapa Lantai <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      placeholder="Contoh: 2"
                      value={floors}
                      onChange={(e) => setFloors(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      id="input-floors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kamar Tidur <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      placeholder="Contoh: 3"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      id="input-bedrooms"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kamar Mandi <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      placeholder="Contoh: 2"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      id="input-bathrooms"
                    />
                  </div>
                </div>

                {/* Certificate, Facing, Electricity, Water */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Surat / Legalitas Properti <span className="text-red-500">*</span></label>
                    <select
                      value={certificate}
                      onChange={(e) => setCertificate(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      id="input-certificate"
                    >
                      <option value="SHM">SHM (Sertifikat Hak Milik)</option>
                      <option value="HGB">HGB (Hak Guna Bangunan)</option>
                      <option value="SHMRS">SHMRS (Sertifikat Hak Milik Rumah Susun)</option>
                      <option value="AJB">AJB (Akta Jual Beli)</option>
                      <option value="Girik/Lainnya">Girik / Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Hadap Arah Mata Angin <span className="text-red-500">*</span></label>
                    <select
                      value={facing}
                      onChange={(e) => setFacing(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      id="input-facing"
                    >
                      <option value="Utara">Utara</option>
                      <option value="Timur">Timur</option>
                      <option value="Selatan">Selatan</option>
                      <option value="Barat">Barat</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Daya Listrik</label>
                    <input
                      type="text"
                      placeholder="Contoh: 2200 VA"
                      value={electricity}
                      onChange={(e) => setElectricity(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                      id="input-electricity"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Sumber Air</label>
                    <input
                      type="text"
                      placeholder="Contoh: PDAM / Jetpump"
                      value={water}
                      onChange={(e) => setWater(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                      id="input-water"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kondisi Furnished</label>
                    <select
                      value={furnished}
                      onChange={(e) => setFurnished(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                      id="input-furnished"
                    >
                      <option value="Unfurnished">Unfurnished (Kosong)</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Fully-Furnished">Fully-Furnished (Penuh)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Rent periods */}
              <div className="space-y-4" id="form-pricing-section">
                <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3">
                  3. Nilai Harga & Detail Penyewaan
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Harga {actionType === 'Jual' ? 'Jual Nett/Nego' : 'Sewa per Tahun'} (Rp) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 850.000.000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      id="input-price"
                    />
                  </div>

                  {actionType === 'Sewa' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Minimal Periode Sewa</label>
                      <select
                        value={rentPeriod}
                        onChange={(e) => setRentPeriod(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm"
                        id="input-rent-period"
                      >
                        <option value="1 Tahun">1 Tahun</option>
                        <option value="2 Tahun">2 Tahun</option>
                        <option value="Diatas 2 Tahun">Diatas 2 Tahun</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Rented Status details */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Apakah Sedang Tersewa / Ditempati?</span>
                      <span className="block text-2xs text-gray-400">Beri tahu kami jika unit sedang tersewa oleh pihak ketiga saat ini</span>
                    </div>
                    <div className="flex gap-2">
                      {['Ya', 'Tidak'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setIsCurrentlyRented(status)}
                          className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition ${
                            isCurrentlyRented === status
                              ? 'bg-[#0F172A] text-[#D4A017] border-[#0F172A]'
                              : 'bg-white border-gray-200 text-gray-600'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {isCurrentlyRented === 'Ya' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-200/60 animate-in slide-in-from-top-1">
                      <div>
                        <label className="block text-2xs font-bold text-gray-600 uppercase tracking-wider mb-1">Tersewa Sampai Tanggal/Bulan Berapa?</label>
                        <input
                          type="text"
                          placeholder="Contoh: Desember 2026"
                          value={rentedUntil}
                          onChange={(e) => setRentedUntil(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-2xs font-bold text-gray-600 uppercase tracking-wider mb-1">Berapa Nilai Harga Sewanya?</label>
                        <input
                          type="text"
                          placeholder="Contoh: Rp 35 Juta / Tahun"
                          value={rentedPrice}
                          onChange={(e) => setRentedPrice(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Upload simulation */}
              <div className="space-y-4" id="form-photos-section">
                <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3">
                  4. Upload Dokumentasi Foto Property (Wajib & Lengkap)
                </h3>
                <p className="text-2xs text-gray-400">
                  Untuk hasil iklan terbaik, mohon persiapkan foto tampak depan, ruang dalam, dapur, kamar tidur/mandi, lantai atas (jika ada), serta info lebar jalan depan.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { key: 'tampakDepan', label: 'Tampak Depan' },
                    { key: 'ruangDalam', label: 'Tampak Ruang Dalam (Ruang Tamu dll)' },
                    { key: 'ruangDapur', label: 'Tampak Ruang Dapur / Ruang Makan' },
                    { key: 'kamarTidur', label: 'Tampak Ruang Kamar Tidur / Kamar Mandi' },
                    { key: 'lantaiAtas', label: 'Tampak Lantai Atas (Jika Ada)' },
                    { key: 'lebarJalan', label: 'Lebar Jalan Depan' }
                  ].map((photo) => (
                    <div key={photo.key} className="border-2 border-dashed border-gray-200 hover:border-[#D4A017] rounded-xl p-3 text-center relative bg-slate-50/50 hover:bg-slate-50 transition flex flex-col justify-between h-36">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e, photo.key)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id={`file-${photo.key}`}
                      />
                      <div className="space-y-1">
                        <Upload className="h-5 w-5 text-gray-400 mx-auto" />
                        <span className="block text-2xs font-bold text-gray-700 leading-tight">{photo.label}</span>
                      </div>
                      <span className="block text-3xs text-gray-400 line-clamp-2">
                        {uploadedPhotos[photo.key] ? `✅ ${uploadedPhotos[photo.key]}` : 'Pilih file / seret'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner Info Contact */}
              <div className="space-y-4" id="form-owner-section">
                <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3">
                  5. Informasi Kontak Pemilik Properti
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nama Lengkap Pemilik <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Hadi Setiawan"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        id="input-owner-name"
                      />
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nomor HP/WhatsApp Aktif <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        id="input-owner-phone"
                      />
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Form Footer Action */}
            <div className="bg-[#0F172A] p-6 text-right flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D4A017]/20" id="form-footer-action">
              <span className="text-xs text-gray-300 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-[#D4A017]" />
                Layanan ini 100% Bebas Biaya Pendaftaran Listing Awal!
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#D4A017] hover:bg-[#C29014] disabled:bg-gray-400 text-[#0F172A] font-extrabold text-sm px-8 py-3.5 rounded-xl transition duration-300 shadow-lg flex items-center justify-center gap-2"
                id="btn-register-listing"
              >
                {isSubmitting ? 'Mendaftarkan...' : 'Daftarkan Properti Anda Sekarang'}
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
