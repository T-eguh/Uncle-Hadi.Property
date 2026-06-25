import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, Instagram, Facebook, Globe, Video, Clock } from 'lucide-react';

export default function KontakSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Konsultasi Property');
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const inquiryData = {
        type: 'kontak',
        name: name,
        phone: phone,
        details: {
          subject,
          message
        }
      };

      await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });
    } catch (err) {
      console.error('Error saving contact inquiry:', err);
    }

    let text = `*KONSULTASI KLIEN VIA WEB*\n`;
    text += `-----------------------------------------\n`;
    text += `*Nama Pengirim:* ${name}\n`;
    text += `*No. WhatsApp:* ${phone}\n`;
    text += `*Topik:* ${subject}\n\n`;
    text += `*Pesan:* \n${message}`;

    const waPhone = "6281234567890"; // WhatsApp Uncle Hadi
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const socialChannels = [
    { name: 'WhatsApp', detail: '+62 812-3456-7890', actionText: 'Hubungi via Chat', url: 'https://wa.me/6281234567890', colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100', icon: MessageSquare },
    { name: 'Instagram', detail: '@unclehadi.property', actionText: 'Kunjungi Profile', url: 'https://instagram.com', colorClass: 'bg-pink-50 text-pink-600 border-pink-100 hover:bg-pink-100', icon: Instagram },
    { name: 'TikTok', detail: '@unclehadi.property', actionText: 'Tonton Video Edukasi', url: 'https://tiktok.com', colorClass: 'bg-slate-50 text-slate-900 border-slate-200 hover:bg-slate-200', icon: Video },
    { name: 'Facebook Page', detail: 'Uncle Hadi Property', actionText: 'Kunjungi Page', url: 'https://facebook.com', colorClass: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100', icon: Facebook },
    { name: 'Telegram Channel', detail: 't.me/temancariproperty', actionText: 'Gabung Channel', url: 'https://telegram.org', colorClass: 'bg-sky-50 text-sky-600 border-sky-100 hover:bg-sky-100', icon: Send },
  ];

  return (
    <div className="bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 min-h-screen" id="kontak-page-section">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <span className="text-[#D4A017] font-semibold tracking-wider text-xs uppercase bg-[#D4A017]/10 px-3 py-1.5 rounded-full border border-[#D4A017]/30">
            Hubungi Teman Cari Property Anda
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] mt-3 sm:text-4xl">
            Hubungi Uncle Hadi Sekarang
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-2xl mx-auto">
            Kami siap melayani kebutuhan konsultasi jual beli rumah, KPR, titip jual unit property, atau investasi di Bekasi dan Jakarta Timur kapan pun Anda butuhkan.
          </p>
        </div>

        {/* Grid: Details and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Details Left */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between" id="kontak-left-col">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100 space-y-6 flex-1">
              <h3 className="text-lg font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3 leading-tight">
                Informasi Kontak Utama
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D4A017]/10 text-[#AA7C11] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lokasi Kantor Resmi</h4>
                    <p className="text-sm text-gray-800 font-semibold mt-0.5">Bekasi Timur, Kota Bekasi</p>
                    <p className="text-xs text-gray-500">Samping Stasiun KRL Bekasi Timur, Jawa Barat 17113</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D4A017]/10 text-[#AA7C11] rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nomor WhatsApp Aktif</h4>
                    <p className="text-sm text-gray-800 font-bold mt-0.5">+62 812-3456-7890</p>
                    <p className="text-xs text-gray-500">Pelayanan respon cepat setiap hari</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D4A017]/10 text-[#AA7C11] rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alamat Email Resmi</h4>
                    <p className="text-sm text-gray-800 font-semibold mt-0.5">hadi@unclehadi.property</p>
                    <p className="text-xs text-gray-500">Kirim berkas kerjasama developer di sini</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#D4A017]/10 text-[#AA7C11] rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Jam Operasional Layanan</h4>
                    <p className="text-sm text-gray-800 font-semibold mt-0.5">Setiap Hari: 08.00 WIB - 21.00 WIB</p>
                    <p className="text-xs text-gray-500">Survey lokasi harap melakukan janji temu H-1</p>
                  </div>
                </div>
              </div>

              {/* Simulated Map View block */}
              <div className="bg-slate-50 border border-gray-100 rounded-2xl p-4 text-center space-y-2">
                <Globe className="h-8 w-8 text-blue-500 mx-auto" />
                <h4 className="text-xs font-bold text-[#0F172A]">Area Kerja Utama</h4>
                <p className="text-3xs text-gray-400">Bekasi (Timur, Barat, Utara, Selatan), Cikarang, Tambun, Karawang, dan Jakarta Timur.</p>
                <a
                  href="https://maps.google.com/?q=Bekasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#D4A017] inline-block hover:underline"
                >
                  Buka Google Maps &raquo;
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form Right */}
          <div className="lg:col-span-7 flex flex-col justify-between" id="kontak-form-col">
            <form onSubmit={handleSendMessage} className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100 space-y-4 flex-1">
              <h3 className="text-lg font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3 leading-tight mb-4">
                Kirim Pertanyaan Langsung ke WhatsApp
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Nama Anda <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">No. Telp / WhatsApp <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 08123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Topik Konsultasi</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm"
                >
                  <option value="Konsultasi Pembelian Rumah">Membeli Rumah / Unit Baru (Primary)</option>
                  <option value="Survey Unit Rumah Second">Tanya Unit Seken (Secondary)</option>
                  <option value="Titip Jual Property">Ingin Titip Jual Aset Properti Saya</option>
                  <option value="Konsultasi KPR Pemula">Tanya KPR & Perencanaan DP</option>
                  <option value="Lainnya">Lainnya / Kerjasama Bisnis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Isi Pesan Konsultasi <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ketik pertanyaan atau detail kebutuhan unit property yang Anda cari..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  Kirim Pesan WhatsApp
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Social Media Grid Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-extrabold text-[#0F172A]">Social Media & Komunitas</h3>
            <p className="text-xs text-gray-400 mt-1">Ngelink ke seluruh Sosmed resmi Uncle Hadi untuk update konten harian terbaru seputar edukasi property.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {socialChannels.map((channel, idx) => {
              const Icon = channel.icon;
              return (
                <a
                  key={idx}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border rounded-2xl p-5 text-center flex flex-col justify-between items-center space-y-4 transition-all duration-300 transform hover:-translate-y-1 ${channel.colorClass} shadow-sm`}
                >
                  <div className="p-3 bg-white rounded-full shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-800">{channel.name}</h4>
                    <p className="text-3xs text-gray-400 mt-0.5">{channel.detail}</p>
                  </div>
                  <span className="text-3xs font-extrabold uppercase tracking-wider underline">
                    {channel.actionText}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
