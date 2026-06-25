import React from 'react';
import { Building, Sparkles, PhoneCall, CheckCircle, ArrowRight, BedDouble, Bath, Square, Navigation, ShieldCheck, MapPin, Star, HeartHandshake, HelpCircle } from 'lucide-react';
import { PROPERTIES_DATA, ARTICLES_DATA, TESTIMONIALS_DATA } from '../data';
import { Property } from '../types';

interface BerandaProps {
  onNavigateToTab: (tabId: string) => void;
  onOpenConsultation: () => void;
  properties?: Property[];
  founderPhotoUrl?: string;
}

export default function Beranda({ onNavigateToTab, onOpenConsultation, properties, founderPhotoUrl }: BerandaProps) {
  // Fallback for founder photo
  const defaultPhoto = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=350&h=350&q=80";
  const finalFounderPhoto = founderPhotoUrl || defaultPhoto;
  // Use dynamic properties if passed, otherwise fall back to static PROPERTIES_DATA
  const featuredProperties = (properties && properties.length > 0) ? properties.slice(0, 6) : PROPERTIES_DATA.slice(0, 6);
  // Use the first 3 articles as featured articles
  const featuredArticles = ARTICLES_DATA.slice(0, 3);

  const handleWhatsAppContact = (prop: Property, e: React.MouseEvent) => {
    e.stopPropagation();
    const phone = "6281234567890"; // WhatsApp Uncle Hadi
    const encodedText = encodeURIComponent(prop.whatsappMessage);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
  };

  const handleConsultationWhatsApp = () => {
    const phone = "6281234567890";
    const text = encodeURIComponent("Halo Uncle Hadi, saya ingin melakukan konsultasi gratis mengenai property.");
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div id="beranda-container" className="bg-[#FFFFFF] text-[#0F172A] overflow-x-hidden">
      
      {/* SECTION 1 — Hero Banner */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center bg-cover bg-center py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-[#D4A017]"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.93) 40%, rgba(15, 23, 42, 0.4) 100%), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')` 
        }}
        id="hero-section"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero left details */}
          <div className="lg:col-span-7 space-y-8 text-left text-white" id="hero-left-content">
            <div className="inline-flex items-center gap-2 bg-[#D4A017]/20 border border-[#D4A017]/40 text-[#D4A017] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
              <Sparkles className="h-4 w-4" />
              Uncle Hadi.Property – Teman Cari Property
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight" id="hero-headline">
              Membantu Menemukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A017] to-[#F1C40F]">Property yang Tepat</span> untuk Investasi dan Hunian
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed" id="hero-subheadline">
              Saya membantu calon pembeli, penjual, dan investor property mendapatkan informasi yang jelas, transparan, dan terpercaya untuk wilayah Bekasi, Jakarta Timur, Cikarang, dan sekitarnya.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-4" id="hero-cta-buttons">
              <button
                onClick={() => onNavigateToTab('properti')}
                className="bg-[#D4A017] hover:bg-[#C29014] text-[#0F172A] font-extrabold text-sm px-8 py-4 rounded-xl transition-all duration-300 shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
                id="hero-btn-properties"
              >
                Lihat Property
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={onOpenConsultation}
                className="bg-[#1E293B] hover:bg-[#2D3748] border border-gray-600 text-white font-bold text-sm px-6 py-4 rounded-xl transition duration-300 shadow flex items-center gap-2"
                id="hero-btn-consultation"
              >
                <PhoneCall className="h-4 w-4 text-[#D4A017]" />
                Konsultasi Gratis
              </button>

              <button
                onClick={() => onNavigateToTab('titip-jual')}
                className="bg-transparent hover:bg-white/5 border-2 border-dashed border-[#D4A017] text-[#D4A017] font-semibold text-sm px-6 py-4 rounded-xl transition duration-300 flex items-center gap-2"
                id="hero-btn-titip"
              >
                Titip Jual Property
              </button>
            </div>
          </div>

          {/* Hero right floating card - premium trust message */}
          <div className="lg:col-span-5 hidden lg:block" id="hero-right-badge">
            <div className="bg-[#1E293B]/80 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D4A017]/20 rounded-xl flex items-center justify-center border border-[#D4A017]/40 text-[#D4A017]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">Layanan Broker Berlisensi</h4>
                  <p className="text-3xs text-gray-400">Terpercaya & Berstandar Nasional</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                "Membeli atau menjual property adalah keputusan besar. Di Uncle Hadi.Property, kami melayani dengan kejujuran mutlak dan analisis data pasar real-time."
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-2xs text-gray-400 font-semibold">
                <span>📍 Bekasi - Jakarta Timur</span>
                <span className="text-[#D4A017]">★ Sertifikat AREBI</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — Kenapa Memilih Saya */}
      <section className="py-20 bg-white" id="why-choose-me-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4A017] bg-[#D4A017]/10 px-3.5 py-1.5 rounded-full">
              Pilar Integritas Kami
            </span>
            <h2 className="text-3xl font-black text-[#0F172A] mt-4 sm:text-4xl">
              Kenapa Memilih Uncle Hadi?
            </h2>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              Membangun kemitraan berdasarkan rasa percaya. Kami meyakinkan Anda mendapatkan pelayanan property teraman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 shadow-xs hover:shadow-md transition duration-300 space-y-4">
              <div className="w-14 h-14 bg-[#D4A017]/10 text-[#AA7C11] rounded-2xl flex items-center justify-center border border-[#D4A017]/30">
                <CheckCircle className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">Transparan</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Informasi property kami jabarkan apa adanya tanpa ada yang disembunyikan. Status hukum, kondisi bangunan asli, maupun skema KPR dijelaskan sejujur-jujurnya.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 shadow-xs hover:shadow-md transition duration-300 space-y-4">
              <div className="w-14 h-14 bg-[#D4A017]/10 text-[#AA7C11] rounded-2xl flex items-center justify-center border border-[#D4A017]/30">
                <PhoneCall className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">Responsif</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Kami merespon cepat seluruh pertanyaan Anda mengenai property via WhatsApp. Konsultasi, survey lokasi, maupun komunikasi penawaran berlangsung lancar tanpa bertele-tele.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100 shadow-xs hover:shadow-md transition duration-300 space-y-4">
              <div className="w-14 h-14 bg-[#D4A017]/10 text-[#AA7C11] rounded-2xl flex items-center justify-center border border-[#D4A017]/30">
                <HeartHandshake className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">Pendampingan</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Mulai dari pencarian awal unit, negosiasi langsung ke pemilik, survey, pengurusan legalitas di notaris, hingga persetujuan KPR bank, Anda didampingi sepenuhnya.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3 — Property Pilihan / Unggulan */}
      <section className="py-20 bg-[#F8FAFC] border-y border-gray-100" id="featured-properties-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider block">Katalog Rekomendasi</span>
              <h2 className="text-3xl font-black text-[#0F172A] mt-1 sm:text-4xl">Property Pilihan Unggulan</h2>
            </div>
            <button
              onClick={() => onNavigateToTab('properti')}
              className="inline-flex items-center gap-1.5 text-xs text-[#0F172A] font-extrabold uppercase tracking-widest hover:text-[#D4A017] transition self-start md:self-end"
            >
              Lihat Semua Unit Pilihan
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <div 
                key={prop.id}
                onClick={() => onNavigateToTab('properti')}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                id={`featured-card-${prop.id}`}
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#0F172A] text-[#D4A017] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1.5 rounded">
                    {prop.category}
                  </span>
                  <span className="absolute bottom-4 right-4 bg-black/70 text-[#D4A017] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 rounded border border-[#D4A017]/30 backdrop-blur-xs">
                    {prop.type}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-2xs text-[#D4A017] font-semibold flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      {prop.location}
                    </p>
                    <h3 className="text-sm font-bold text-[#0F172A] line-clamp-2 group-hover:text-[#D4A017] transition-colors">
                      {prop.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-xl text-3xs font-semibold text-gray-500">
                    {prop.type === 'rumah hunian' && (
                      <>
                        <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5 text-gray-400" />{prop.rooms} Bed</span>
                        <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-gray-400" />{prop.bathrooms} Bath</span>
                      </>
                    )}
                    {prop.landArea && <span>LT: {prop.landArea.split(' (')[0]}</span>}
                    {prop.buildingArea && prop.buildingArea !== '0 m²' && <span>LB: {prop.buildingArea}</span>}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-3xs text-gray-400 font-bold uppercase">Harga Mulai</p>
                      <p className="text-base font-black text-[#0F172A] tracking-tight">{prop.priceFormatted}</p>
                    </div>
                    <button
                      onClick={(e) => handleWhatsAppContact(prop, e)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-2 rounded-lg transition"
                    >
                      Hubungi WA
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4 — Ingin Menjual Property? (Standout Dark Banner) */}
      <section className="py-20 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white relative overflow-hidden" id="selling-banner-section">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D4A017]/5 rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4A017]/5 rounded-full blur-2xl translate-y-1/4 translate-x-1/4"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-[#D4A017] text-xs font-extrabold uppercase tracking-widest bg-[#D4A017]/10 px-4 py-2 rounded-full border border-[#D4A017]/30">
            Layanan Pemasaran Property Terbaik
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Punya Rumah, Tanah, Apartemen atau Ruko yang Ingin Dijual?
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Saya membantu memasarkan property Anda secara masif melalui website pribadi, promosi media sosial harian, jaringan investor, dan listing marketplace terkemuka agar terjual lebih cepat dengan harga maksimal.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigateToTab('titip-jual')}
              className="bg-[#D4A017] hover:bg-[#C29014] text-[#0F172A] font-extrabold text-sm px-8 py-4 rounded-xl transition duration-300 shadow-lg transform hover:-translate-y-1 w-full sm:w-auto"
            >
              Daftarkan Property Anda
            </button>
            <button
              onClick={handleConsultationWhatsApp}
              className="bg-transparent hover:bg-white/5 border border-gray-400 text-white font-bold text-sm px-6 py-4 rounded-xl transition w-full sm:w-auto"
            >
              Konsultasi Pemasaran Gratis
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Edukasi Property */}
      <section className="py-20 bg-white" id="featured-articles-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider bg-[#D4A017]/10 px-3 py-1.5 rounded-full">Literasi Cerdas</span>
            <h2 className="text-3xl font-black text-[#0F172A] mt-3 sm:text-4xl">Edukasi & Tips Property Terkini</h2>
            <p className="text-sm text-gray-500 mt-2">Dapatkan wawasan seputar KPR, DP ideal, perizinan, dan perpajakan untuk membantu Anda mengambil keputusan tepat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((art) => (
              <div 
                key={art.id}
                onClick={() => onNavigateToTab('edukasi')}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute bottom-4 left-4 bg-[#0F172A]/90 text-[#D4A017] text-3xs font-bold px-2 py-1 rounded">
                    {art.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-3xs text-gray-400 font-semibold">{art.date} • {art.readTime}</p>
                  <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#D4A017] transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-2xs text-gray-500 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                  <p className="text-2xs text-[#D4A017] font-bold inline-flex items-center gap-1 group-hover:underline pt-2">
                    Baca Selengkapnya
                    <ArrowRight className="h-3 w-3" />
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6 — Tentang Saya (Brief Profile) */}
      <section className="py-20 bg-[#F8FAFC] border-y border-gray-100" id="brief-profile-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Photo avatar */}
            <div className="lg:col-span-5 flex justify-center" id="brief-photo">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A017] to-yellow-600 rounded-3xl rotate-3 scale-102 opacity-40"></div>
                <div className="bg-white p-4 rounded-3xl shadow-xl relative border border-gray-100 max-w-xs">
                  <img
                    src={finalFounderPhoto}
                    alt="Hadi Agen"
                    className="rounded-2xl object-cover h-72 w-full shadow-inner"
                  />
                  <div className="text-center pt-4">
                    <p className="text-sm font-black text-[#0F172A]">Hadi</p>
                    <p className="text-3xs font-bold text-[#D4A017] uppercase tracking-wider">Agen Property Teman Anda</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right details */}
            <div className="lg:col-span-7 space-y-6" id="brief-bio">
              <span className="text-[#D4A017] text-xs font-bold uppercase tracking-wider bg-[#D4A017]/10 px-3.5 py-1.5 rounded-full">
                Halo, Saya Hadi
              </span>
              
              <h2 className="text-3xl font-black text-[#0F172A] leading-tight">
                Mendampingi Anda Mencari Solusi Terbaik untuk Masa Depan Investasi Property
              </h2>

              <p className="text-xs text-gray-500 leading-relaxed">
                Saya membantu masyarakat mendapatkan informasi property yang jelas dan terpercaya. Melalui website ini saya juga berbagi edukasi bagi calon pembeli, penjual, maupun investor property demi menghindari kesalahan fatal dalam membeli rumah pertama.
              </p>

              <div className="flex flex-wrap gap-3">
                {['Bekasi', 'Jakarta Timur', 'Cikarang', 'Karawang'].map((item) => (
                  <span key={item} className="bg-white border border-gray-200 text-gray-700 text-xs px-3.5 py-1.5 rounded-lg font-semibold">
                    📍 {item}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex gap-4">
                <button
                  onClick={() => onNavigateToTab('tentang-saya')}
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-[#D4A017] font-extrabold text-xs px-5 py-3 rounded-xl transition shadow"
                >
                  Selengkapnya Tentang Saya
                </button>
                <button
                  onClick={onOpenConsultation}
                  className="bg-transparent border border-[#0F172A] text-[#0F172A] font-bold text-xs px-5 py-3 rounded-xl transition hover:bg-slate-100"
                >
                  Konsultasi Sekarang
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7 — AI Property Chatbot Teaser */}
      <section className="py-20 bg-white" id="ai-teaser-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-3xl p-8 border border-[#D4A017]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-lg">
              <div className="inline-flex items-center gap-1.5 bg-[#D4A017]/20 border border-[#D4A017]/40 text-[#D4A017] px-3.5 py-1.5 rounded-full text-3xs font-black uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                Fitur Cerdas Terbaru
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white">Tanya AI Seputar Property</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Bingung apa itu KPR, berapa DP rumah ideal Anda, atau bagaimana cara investasi apartemen? Tanyakan langsung pada asisten AI property kami kapan saja secara instan.
              </p>
            </div>
            
            <button
              onClick={() => onNavigateToTab('ai-properti')}
              className="bg-[#D4A017] hover:bg-[#C29014] text-[#0F172A] font-extrabold text-xs px-6 py-4 rounded-xl transition duration-300 transform hover:scale-103 shrink-0 flex items-center gap-1.5 shadow"
            >
              Coba AI Sekarang
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Testimoni */}
      <section className="py-20 bg-[#F8FAFC] border-t border-gray-100" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider bg-[#D4A017]/10 px-3 py-1.5 rounded-full">Testimoni Kemitraan</span>
            <h2 className="text-3xl font-black text-[#0F172A] mt-3 sm:text-4xl">Apa Kata Rekan & Klien?</h2>
            <p className="text-sm text-gray-500 mt-2">Dengarkan ulasan jujur dari teman, keluarga, serta klien konsultasi yang telah berkolaborasi bersama kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((test) => (
              <div key={test.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex text-[#D4A017]">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 italic leading-relaxed">
                    "{test.text}"
                  </p>
                </div>

                {/* Profile card avatar */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#D4A017]/30">
                    <img src={test.avatar} alt={test.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">{test.name}</h4>
                    <p className="text-3xs text-gray-400 font-semibold">{test.role} ({test.relation})</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
