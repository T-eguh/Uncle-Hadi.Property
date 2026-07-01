import React from 'react';
import { Award, Compass, MapPin, CheckCircle, ShieldCheck, HeartHandshake, PhoneCall, Mail } from 'lucide-react';

interface TentangSayaProps {
  onOpenConsultation: () => void;
  onNavigateToTab: (tabId: string) => void;
  settings?: any;
}

export default function TentangSaya({ onOpenConsultation, onNavigateToTab, settings }: TentangSayaProps) {
  const defaultPhoto = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80";
  const finalFounderPhoto = settings?.founderPhotoUrl || defaultPhoto;
  const workAreas = [
    { name: 'Bekasi Barat', detail: 'Dekat dengan Jakarta Timur, pertumbuhan komersial pesat.' },
    { name: 'Bekasi Timur', detail: 'Kawasan residensial asri, dekat KRL & LRT Bekasi.' },
    { name: 'Cikarang', detail: 'Pusat industri terbesar se-Asia Tenggara, ROI sewa tinggi.' },
    { name: 'Jakarta Timur', detail: 'Akses premium, dekat koridor MRT & LRT, sangat dinamis.' },
    { name: 'Karawang', detail: 'Kawasan industri baru dengan prospek investasi masa depan.' },
  ];

  const certifications = [
    { title: 'Sertifikasi AREBI (Asosiasi Real Estate Broker Indonesia)', issuer: 'LSP Broker Properti', year: '2025' },
    { title: 'Sertifikasi Keahlian Negosiasi Properti', issuer: 'Hadi Property Academy', year: '2026' },
    { title: 'Sertifikasi Digital Marketing Properti Indonesia', issuer: 'Kemenkominfo RI & AREBI', year: '2026' },
  ];

  return (
    <div className="bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 min-h-screen" id="about-page-section">
      <div className="max-w-6xl mx-auto">
        
        {/* Banner Title */}
        <div className="text-center mb-12" id="about-heading-block">
          <span className="text-[#D4A017] font-semibold tracking-wider text-xs uppercase bg-[#D4A017]/10 px-3 py-1.5 rounded-full border border-[#D4A017]/30">
            Profil Agen Property Anda
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] mt-3 sm:text-4xl">
            Kenali {settings?.founderName || "Uncle Hadi"} Lebih Dekat
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-2xl mx-auto">
            "Membantu, mengedukasi, dan mendampingi masyarakat menemukan property yang tepat."
          </p>
        </div>

        {/* Profile Card and Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16" id="about-profile-grid">
          {/* Photo Column left */}
          <div className="lg:col-span-5 flex flex-col justify-between" id="about-photo-col">
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 relative overflow-hidden flex-1 flex flex-col items-center justify-center text-center">
              {/* Decorative Gold Rings */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017]/5 rounded-full -mr-10 -mt-10"></div>
              
              {/* Profile Image (Simulated professional avatar) */}
              <div className="w-44 h-44 rounded-full border-4 border-[#D4A017] overflow-hidden shadow-lg mb-6 relative">
                <img
                  src={finalFounderPhoto}
                  alt={`${settings?.founderName || "Hadi"} - Uncle Hadi.Property`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and brand */}
              <h3 className="text-2xl font-black text-[#0F172A]">{settings?.founderName || "Hadi Sukmono"}</h3>
              <p className="text-xs font-bold text-[#D4A017] uppercase tracking-widest mt-1">{settings?.founderTitle || "Founder & Agen Property Utama"}</p>
              <p className="text-xs text-gray-400 mt-0.5">{settings?.founderBrand || "Uncle Hadi.Property – Teman Cari Property"}</p>

              {/* Contact mini bar */}
              <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-6 border-t border-gray-100">
                <a
                  href={`https://wa.me/${settings?.whatsAppNo || '6281234567890'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
                <button
                  onClick={onOpenConsultation}
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-[#D4A017] font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1"
                >
                  Konsultasi
                </button>
              </div>
            </div>
          </div>

          {/* Biography right */}
          <div className="lg:col-span-7 flex flex-col justify-between" id="about-story-col">
            <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#0F172A] border-l-4 border-[#D4A017] pl-3 leading-tight">
                  {settings?.aboutHeading || "Halo, Saya Hadi Sukmono. Selamat Datang di Uncle Hadi.Property"}
                </h3>
                
                <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                  <p>
                    {settings?.aboutText1 || "Saya adalah agen property yang berfokus membantu masyarakat menemukan rumah, apartemen, ruko, dan investasi properti yang sesuai kebutuhan Anda di Bekasi, Jakarta Timur, Cikarang, dan sekitarnya."}
                  </p>
                  
                  <p className="font-semibold text-[#0F172A] italic border-l-2 border-[#D4A017] pl-4">
                    {settings?.aboutQuote || '"Saya percaya bahwa membeli atau menjual properti adalah salah satu keputusan terbesar dalam hidup yang membutuhkan informasi yang jelas, jujur, dan pendampingan yang tepat."'}
                  </p>

                  <p>
                    {settings?.aboutText2 || "Melalui website ini, saya berbagi informasi property yang transparan, artikel edukasi yang mudah dipahami, serta layanan pemasaran properti digital premium bagi pemilik yang ingin menjual atau menyewakan asetnya secara cepat."}
                  </p>

                  <p className="text-xs text-gray-500">
                    *Jangan ragu untuk berkembang bersama saya. Walaupun saya terus memperbesar jaringan broker, bagi saya kejujuran dan kepuasan klien konsultasi adalah prioritas nomor satu.*
                  </p>
                </div>
              </div>

              {/* Core capabilities list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D4A017]" />
                  <span className="text-xs font-bold text-gray-800">100% Transparan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D4A017]" />
                  <span className="text-xs font-bold text-gray-800">Respon Sangat Cepat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#D4A017]" />
                  <span className="text-xs font-bold text-gray-800">Pasti Didampingi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Area of Work section */}
        <div className="mb-16" id="about-areas-section">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-[#0F172A]">Area Kerja Utama</h3>
            <p className="text-xs text-gray-400 mt-1">Kami sangat menguasai geografi, harga pasar wajar, dan potensi perkembangan di wilayah berikut:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workAreas.map((area, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="w-8 h-8 bg-[#D4A017]/10 text-[#AA7C11] rounded-lg flex items-center justify-center mb-3">
                  <MapPin className="h-4 w-4" />
                </div>
                <h4 className="font-bold text-sm text-[#0F172A]">{area.name}</h4>
                <p className="text-2xs text-gray-500 mt-1.5 leading-relaxed">{area.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications and Licencing Section */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 shadow-lg border border-[#D4A017]/30" id="about-certs-section">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left badge */}
            <div className="w-24 h-24 bg-[#D4A017]/10 text-[#D4A017] rounded-full flex items-center justify-center border border-[#D4A017]/30 shrink-0">
              <Award className="h-12 w-12" />
            </div>
            
            {/* Detail right */}
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-lg font-extrabold text-white">Sertifikasi & Kredensial Resmi</h3>
                <p className="text-xs text-gray-400">Kami menjamin seluruh aktivitas broker didasari oleh standar profesional tinggi dan kepatuhan hukum penuh.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-start gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-[#D4A017] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{cert.title}</h4>
                      <p className="text-3xs text-gray-400 mt-0.5">Oleh: {cert.issuer} ({cert.year})</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
