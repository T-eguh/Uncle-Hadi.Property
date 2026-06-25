import React, { useState } from 'react';
import { Send, CheckCircle, Search, Sparkles, User, Phone, MapPin, Compass, Info } from 'lucide-react';

interface TitipCariFormProps {
  onOpenConsultation: () => void;
}

export default function TitipCariForm({ onOpenConsultation }: TitipCariFormProps) {
  // Form states
  const [dealType, setDealType] = useState<'Beli' | 'Sewa'>('Beli');
  const [propertyType, setPropertyType] = useState('rumah hunian');
  const [specificArea, setSpecificArea] = useState('');
  const [landArea, setLandArea] = useState('');
  const [streetWidth, setStreetWidth] = useState('');
  const [floors, setFloors] = useState('');
  const [buildingArea, setBuildingArea] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [certificate, setCertificate] = useState('SHM');
  const [facing, setFacing] = useState('Bebas / Hadap Mana Saja');
  const [budget, setBudget] = useState('');

  // Conditional field
  const [rentDurationYears, setRentDurationYears] = useState('1');
  const [landIntendedUse, setLandIntendedUse] = useState(''); // Peruntukan tanah kavling
  const [landLengthWidth, setLandLengthWidth] = useState(''); // Panjang x lebar tanah kavling

  // Contact info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientDomicile, setClientDomicile] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getFormattedSearchText = () => {
    let text = `*FORM REQUEST TITIP CARI PROPERTY*\n`;
    text += `-----------------------------------------\n`;
    text += `*Status Transaksi:* ${dealType}\n`;
    text += `*Jenis Properti:* ${propertyType}\n`;
    text += `*Wilayah Spesifik:* ${specificArea}\n\n`;

    text += `*SPESIFIKASI IMPIAN:* \n`;
    text += `- Budget Dana: Rp ${budget}\n`;
    if (propertyType !== 'tanah kavling') {
      text += `- Luas Bangunan: ${buildingArea || 'Bebas'} m²\n`;
      text += `- Tingkat Lantai: ${floors || 'Bebas'} Lantai\n`;
      text += `- Kamar Tidur: ${bedrooms || 'Bebas'}\n`;
      text += `- Kamar Mandi: ${bathrooms || 'Bebas'}\n`;
    }
    
    text += `- Luas Tanah Minimal: ${landArea || 'Bebas'} m²\n`;
    text += `- Lebar Jalan depan: Min ${streetWidth || 'Bebas'} meter\n`;
    text += `- Syarat Surat: ${certificate}\n`;
    text += `- Hadap Favorit: ${facing}\n`;

    if (dealType === 'Sewa') {
      text += `- Rencana Sewa: ${rentDurationYears} Tahun\n`;
    }

    if (propertyType === 'tanah kavling') {
      text += `\n*SPESIFIKASI TANAH KAVLING:* \n`;
      text += `- Peruntukan Bangun: ${landIntendedUse || 'Rumah / Ruko'}\n`;
      text += `- Panjang & Lebar ideal: ${landLengthWidth || 'Bebas'}\n`;
    }

    text += `\n*INFORMASI KONTAK PEMINTA:* \n`;
    text += `- Nama Lengkap: ${clientName}\n`;
    text += `- No. Telp WhatsApp: ${clientPhone}\n`;
    text += `- Wilayah Domisili Anda: ${clientDomicile}\n`;

    return text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inquiryData = {
        type: 'titip-cari',
        name: clientName,
        phone: clientPhone,
        details: {
          dealType,
          propertyType,
          specificArea,
          landArea,
          streetWidth,
          floors,
          buildingArea,
          bedrooms,
          bathrooms,
          certificate,
          facing,
          budget,
          rentDurationYears,
          landIntendedUse,
          landLengthWidth,
          clientDomicile
        }
      };

      await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      setIsSuccess(true);
    } catch (err) {
      console.error('Error saving search inquiry:', err);
      // fallback to visual success so user experience is not disrupted offline
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendToWhatsApp = () => {
    const text = getFormattedSearchText();
    const phone = "6281234567890"; // WhatsApp Uncle Hadi
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleResetForm = () => {
    setDealType('Beli');
    setPropertyType('rumah hunian');
    setSpecificArea('');
    setLandArea('');
    setStreetWidth('');
    setFloors('');
    setBuildingArea('');
    setBedrooms('');
    setBathrooms('');
    setCertificate('SHM');
    setFacing('Bebas / Hadap Mana Saja');
    setBudget('');
    setRentDurationYears('1');
    setLandIntendedUse('');
    setLandLengthWidth('');
    setClientName('');
    setClientPhone('');
    setClientDomicile('');
    setIsSuccess(false);
  };

  return (
    <div className="bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8" id="titip-cari-section">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-10" id="titip-cari-header">
          <span className="text-[#D4A017] font-semibold tracking-wider text-xs uppercase bg-[#D4A017]/10 px-3 py-1.5 rounded-full border border-[#D4A017]/30">
            Layanan Pencarian Khusus Pembeli & Investor
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] mt-3 sm:text-4xl">
            Bantu Saya Cari Property Terbaik
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-2xl mx-auto">
            Tidak menemukan unit impian di katalog kami? Jangan khawatir! Silakan isi spesifikasi rumah, ruko, apartemen, atau tanah yang Anda cari. Uncle Hadi akan mencarikan pilihan unit terbaik langsung dari listing internal kami.
          </p>
        </div>

        {/* Success Alert */}
        {isSuccess ? (
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl p-8 text-center animate-in fade-in duration-300" id="success-panel-cari">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Permintaan Pencarian Berhasil!</h3>
            <p className="text-sm text-gray-600 max-w-lg mx-auto mb-6">
              Terima kasih, kriteria property impian Anda telah dicatat oleh sistem. Silakan klik tombol di bawah untuk langsung mengirimkan format data pencarian ini ke WhatsApp Uncle Hadi agar pencarian bisa langsung dimulai hari ini!
            </p>

            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-4 text-left font-mono text-xs max-h-48 overflow-y-auto mb-6 scrollbar-thin text-gray-600 whitespace-pre-line">
              {getFormattedSearchText()}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleSendToWhatsApp}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2"
              >
                {/* Simplified WhatsApp icon */}
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Kirim via WhatsApp
              </button>
              <button
                onClick={handleResetForm}
                className="bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold text-sm px-5 py-3 rounded-xl transition"
              >
                Cari Unit Lain
              </button>
            </div>
          </div>
        ) : (
          /* Main Form Layout */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden" id="titip-cari-form">
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Type of transaction */}
              <div id="cari-deal-type">
                <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3 mb-4">
                  1. Jenis Pembelian / Sewa
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDealType('Beli')}
                    className={`p-4 rounded-xl border-2 text-center transition font-bold text-sm flex items-center justify-center gap-2 ${
                      dealType === 'Beli'
                        ? 'border-[#D4A017] bg-[#D4A017]/10 text-[#0F172A]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    💰 Ingin Membeli
                  </button>
                  <button
                    type="button"
                    onClick={() => setDealType('Sewa')}
                    className={`p-4 rounded-xl border-2 text-center transition font-bold text-sm flex items-center justify-center gap-2 ${
                      dealType === 'Sewa'
                        ? 'border-[#D4A017] bg-[#D4A017]/10 text-[#0F172A]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    🗝️ Ingin Menyewa
                  </button>
                </div>
              </div>

              {/* Property types and Domicile */}
              <div className="space-y-4" id="cari-types-section">
                <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3">
                  2. Jenis & Lokasi Property Impian
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Jenis Properti <span className="text-red-500">*</span></label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      id="search-property-type"
                    >
                      <option value="rumah hunian">Rumah Hunian</option>
                      <option value="apartement">Apartemen</option>
                      <option value="ruko">Ruko / Komersial</option>
                      <option value="tanah kavling">Tanah Kavling</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Target Area / Perumahan Spesifik <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={specificArea}
                        onChange={(e) => setSpecificArea(e.target.value)}
                        placeholder="Contoh: Bekasi Timur / Summarecon Bekasi"
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        id="search-specific-area"
                      />
                      <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Budget Maksimal Dana (Rp) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 500 Juta - 1 Milyar"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700"
                      id="search-budget"
                    />
                  </div>

                  {dealType === 'Sewa' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Rencana Durasi Sewa (Tahun)</label>
                      <select
                        value={rentDurationYears}
                        onChange={(e) => setRentDurationYears(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm"
                        id="search-rent-duration"
                      >
                        <option value="1">1 Tahun</option>
                        <option value="2">2 Tahun</option>
                        <option value="3">3 Tahun / Lebih</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Specific specifications based on property type */}
              {propertyType === 'tanah kavling' ? (
                <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 space-y-4 animate-in fade-in duration-200" id="tanah-kavling-extra-fields">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-[#D4A017]" />
                    Detail Tambahan Khusus Tanah Kavling
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-2xs font-bold text-gray-600 uppercase mb-1">Rencana Peruntukan Tanah</label>
                      <input
                        type="text"
                        value={landIntendedUse}
                        onChange={(e) => setLandIntendedUse(e.target.value)}
                        placeholder="Contoh: Bangun Rumah Tinggal, Ruko Niaga, Kebun"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-bold text-gray-600 uppercase mb-1">Ukuran Panjang & Lebar ideal</label>
                      <input
                        type="text"
                        value={landLengthWidth}
                        onChange={(e) => setLandLengthWidth(e.target.value)}
                        placeholder="Contoh: Lebar minimal 8m, panjang 15m"
                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-200" id="residential-extra-fields">
                  <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3">
                    3. Kriteria Bangunan (Opsional)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Luas Bangunan Minimal (m²)</label>
                      <input
                        type="number"
                        placeholder="Contoh: 60"
                        value={buildingArea}
                        onChange={(e) => setBuildingArea(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Jumlah Lantai</label>
                      <input
                        type="number"
                        placeholder="Contoh: 1 atau 2"
                        value={floors}
                        onChange={(e) => setFloors(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Luas Tanah Min (m²)</label>
                      <input
                        type="number"
                        placeholder="Contoh: 72"
                        value={landArea}
                        onChange={(e) => setLandArea(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Kamar Tidur Minimal</label>
                      <input
                        type="number"
                        placeholder="Contoh: 2"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Kamar Mandi Minimal</label>
                      <input
                        type="number"
                        placeholder="Contoh: 1"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Kebutuhan Lebar Jalan depan</label>
                      <input
                        type="text"
                        placeholder="Contoh: Muat 2 mobil (min 6m)"
                        value={streetWidth}
                        onChange={(e) => setStreetWidth(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Legalities & Face orientations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="cari-legal-section">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Syarat Legalitas Utama</label>
                  <select
                    value={certificate}
                    onChange={(e) => setCertificate(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm"
                  >
                    <option value="Wajib SHM">Wajib SHM (Sertifikat Hak Milik)</option>
                    <option value="Bisa HGB / SHMRS">Bisa HGB / SHMRS (Untuk Apartemen)</option>
                    <option value="Apa Saja (AJB/Girik Bisa)">Apa saja (Bisa AJB/Girik)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Arah Hadap Rumah Favorit</label>
                  <select
                    value={facing}
                    onChange={(e) => setFacing(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm"
                  >
                    <option value="Bebas / Hadap Mana Saja">Bebas / Hadap Mana Saja</option>
                    <option value="Wajib Hadap Utara">Utara (Adem siang hari)</option>
                    <option value="Wajib Hadap Timur">Timur (Pagi segar matahari)</option>
                    <option value="Wajib Hadap Selatan">Selatan</option>
                    <option value="Wajib Hadap Barat">Barat</option>
                  </select>
                </div>
              </div>

              {/* Requester Personal Details */}
              <div className="space-y-4 pt-4 border-t border-gray-100" id="cari-contact-section">
                <h3 className="text-base font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3">
                  4. Detail Informasi Komunikasi Anda
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Nama Lengkap Anda <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bambang"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      />
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Nomor Telp / WhatsApp <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      />
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Wilayah Domisili Anda <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Jakarta Timur"
                        value={clientDomicile}
                        onChange={(e) => setClientDomicile(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      />
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="bg-[#0F172A] p-6 text-right flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D4A017]/20">
              <span className="text-xs text-gray-300 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-[#D4A017]" />
                Uncle Hadi akan menghubungi Anda dalam waktu maksimal 1x24 jam!
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#D4A017] hover:bg-[#C29014] disabled:bg-gray-400 text-[#0F172A] font-extrabold text-sm px-8 py-3.5 rounded-xl transition duration-300 shadow-lg flex items-center justify-center gap-2"
                id="btn-submit-search"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Permintaan Cari Property'}
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
