import React from 'react';
import { Building, Phone, Mail, MapPin, Facebook, Instagram, Send, Video, Lock } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenConsultation: () => void;
  settings?: any;
}

export default function Footer({ setActiveTab, onOpenConsultation, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneNo = settings?.whatsAppNo || "6281234567890";

  return (
    <footer className="bg-[#0F172A] text-[#F8FAFC] border-t-2 border-[#D4A017]/30" id="main-footer">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4" id="footer-brand-section">
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('beranda')}>
              {settings?.logoImageUrl ? (
                <div className="w-10 h-10 rounded-lg mr-3 shadow-md overflow-hidden shrink-0 border border-[#D4A017]/30 bg-slate-800 flex items-center justify-center">
                  <img src={settings.logoImageUrl} alt="Logo" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-[#D4A017] to-[#AA7C11] p-2 rounded-lg mr-3">
                  <Building className="h-5 w-5 text-[#0F172A]" />
                </div>
              )}
              <span className="text-xl font-bold tracking-tight text-white">
                {settings?.logoText || "Uncle Hadi"}<span className="text-[#D4A017]">{settings?.logoColorText || ".Property"}</span>
              </span>
            </div>
            <p className="text-sm text-[#F8FAFC]/70 leading-relaxed">
              {settings?.founderBrand ? `Layanan professional ${settings.founderBrand}` : "Membantu Anda menemukan property yang tepat untuk hunian maupun investasi jangka panjang di Bekasi, Jakarta Timur, Cikarang, dan sekitarnya dengan jujur, transparan, dan terpercaya."}
            </p>
            <div className="flex space-x-3 pt-2" id="footer-social-links">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#1E293B] hover:bg-[#D4A017] text-[#D4A017] hover:text-[#0F172A] p-2 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#1E293B] hover:bg-[#D4A017] text-[#D4A017] hover:text-[#0F172A] p-2 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#1E293B] hover:bg-[#D4A017] text-[#D4A017] hover:text-[#0F172A] p-2 rounded-full transition-all duration-300"
                aria-label="TikTok"
              >
                {/* Custom TikTok icon style */}
                <Video className="h-5 w-5" />
              </a>
              <a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#1E293B] hover:bg-[#D4A017] text-[#D4A017] hover:text-[#0F172A] p-2 rounded-full transition-all duration-300"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Menu */}
          <div id="footer-menu-section">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-4 border-[#D4A017] pl-3 mb-6">
              Menu Utama
            </h3>
            <ul className="space-y-3 text-sm text-[#F8FAFC]/75">
              {[
                { id: 'beranda', label: 'Beranda' },
                { id: 'tentang-saya', label: 'Tentang Saya' },
                { id: 'property', label: 'Properti Pilihan' },
                { id: 'titip-jual', label: 'Titip Jual' },
                { id: 'titip-cari', label: 'Titip Cari' },
                { id: 'edukasi', label: 'Edukasi & Artikel' },
                { id: 'ai-property', label: 'AI Properti Assistant' },
              ].map((menu) => (
                <li key={menu.id}>
                  <button
                    onClick={() => handleNavClick(menu.id)}
                    className="hover:text-[#D4A017] transition-colors duration-200 text-left focus:outline-none"
                  >
                    &raquo; {menu.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact & Action */}
          <div id="footer-contact-section">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-4 border-[#D4A017] pl-3 mb-6">
              Hubungi Kami
            </h3>
            <ul className="space-y-4 text-sm text-[#F8FAFC]/75">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#D4A017] mr-3 shrink-0 mt-0.5" />
                <span>{settings?.officeAddress || "Bekasi Timur, Bekasi, Jawa Barat (Samping Stasiun KRL Bekasi Timur)"}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#D4A017] mr-3 shrink-0" />
                <a href={`https://wa.me/${phoneNo}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A017] transition">
                  {settings?.officePhone || "+62 812-3456-7890"}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#D4A017] mr-3 shrink-0" />
                <a href={`mailto:${settings?.officeEmail || 'hadi@unclehadi.property'}`} className="hover:text-[#D4A017] transition">
                  {settings?.officeEmail || "hadi@unclehadi.property"}
                </a>
              </li>
            </ul>
          </div>

          {/* Special Branding Slogan / Work Area */}
          <div className="space-y-4" id="footer-area-section">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-4 border-[#D4A017] pl-3 mb-6">
              Area Kerja Utama
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Bekasi', 'Jakarta Timur', 'Cikarang', 'Karawang', 'Tambun', 'Cibitung'].map((area) => (
                <span key={area} className="bg-[#1E293B] border border-[#D4A017]/20 text-[#F8FAFC]/90 text-xs px-3 py-1.5 rounded font-medium">
                  {area}
                </span>
              ))}
            </div>
            <div className="pt-4">
              <p className="text-xs text-[#D4A017] font-semibold italic">
                "Teman Cari Property Anda - Menemukan Hunian & Investasi Terbaik Tanpa Keraguan"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="bg-[#0b1120] py-6 border-t border-[#F8FAFC]/10" id="footer-bottom-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#F8FAFC]/50 gap-4">
          <div>
            &copy; {currentYear} <strong>Uncle Hadi.Property</strong>. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#header-container" onClick={() => handleNavClick('beranda')} className="hover:text-[#D4A017] transition">Kembali Ke Atas</a>
            <span>•</span>
            <button onClick={() => handleNavClick('tentang-saya')} className="hover:text-[#D4A017] transition">Profil Hadi</button>
            <span>•</span>
            <button onClick={onOpenConsultation} className="hover:text-[#D4A017] transition">Konsultasi Gratis</button>
            <span>•</span>
            <button onClick={() => handleNavClick('admin')} className="hover:text-[#D4A017] transition flex items-center gap-1" id="footer-admin-btn">
              <Lock className="h-3 w-3" /> Portal Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
