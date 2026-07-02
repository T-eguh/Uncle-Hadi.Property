import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Home, User, Building, Landmark, BookOpen, 
  MessageSquare, PhoneCall, Sparkles, ChevronDown, ChevronRight, 
  Layers, FileText, ArrowRight, Activity, Percent, Compass
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultation: () => void;
  settings?: any;
  setCatalogCategoryFilter?: (val: string) => void;
  setCatalogTypeFilter?: (val: string) => void;
  setCatalogPurposeFilter?: (val: string) => void;
  setCatalogSortFilter?: (val: string) => void;
  setEdukasiSearchTerm?: (val: string) => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenConsultation, 
  settings,
  setCatalogCategoryFilter,
  setCatalogTypeFilter,
  setCatalogPurposeFilter,
  setCatalogSortFilter,
  setEdukasiSearchTerm
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to add background shadow and blur effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDropdownItemClick = (
    tabId: string, 
    filters?: {
      category?: string;
      type?: string;
      purpose?: string;
      sort?: string;
      eduSearch?: string;
    }
  ) => {
    // Reset filters before applying new ones to ensure clean state transitions
    if (tabId === 'property') {
      setCatalogCategoryFilter?.(filters?.category || 'all');
      setCatalogTypeFilter?.(filters?.type || 'all');
      setCatalogPurposeFilter?.(filters?.purpose || 'all');
      setCatalogSortFilter?.(filters?.sort || 'default');
    } else if (tabId === 'edukasi') {
      setEdukasiSearchTerm?.(filters?.eduSearch || '');
    }

    setActiveTab(tabId);
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileDropdown = (menuName: string) => {
    if (activeDropdown === menuName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menuName);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-[#0F172A]/95 backdrop-blur-md shadow-2xl border-[#D4A017]/30 py-2' 
          : 'bg-[#0F172A] border-[#D4A017]/15 py-4'
      } text-white`} 
      id="header-container"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Brand */}
          <div 
            className="flex items-center cursor-pointer group transition-transform duration-300 active:scale-95 shrink-0" 
            onClick={() => handleTabClick('beranda')} 
            id="brand-logo"
          >
            {settings?.logoImageUrl ? (
              <div className="w-12 h-12 rounded-xl mr-3 shadow-lg overflow-hidden shrink-0 border-2 border-[#D4A017] bg-slate-800 flex items-center justify-center transition-all duration-300 group-hover:border-white group-hover:shadow-[#D4A017]/30">
                <img src={settings.logoImageUrl} alt="Logo" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#D4A017] to-[#AA7C11] p-3 rounded-xl mr-3 shadow-lg transition-transform duration-300 group-hover:rotate-6">
                <Building className="h-6 w-6 text-[#0F172A]" />
              </div>
            )}
            <div>
              <span className="text-xl font-extrabold tracking-tight block text-white transition-colors duration-200 group-hover:text-[#D4A017]">
                {settings?.logoText || "Uncle Hadi"}<span className="text-[#D4A017] group-hover:text-white transition-colors duration-200">{settings?.logoColorText || ".Property"}</span>
              </span>
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest block mt-0.5">
                {settings?.logoSlogan || "Teman Cari Property"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1" id="desktop-nav">
            
            {/* Beranda */}
            <button
              onClick={() => handleTabClick('beranda')}
              className={`flex items-center px-2 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === 'beranda'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#AA7C11] text-[#0F172A] shadow-lg shadow-[#D4A017]/20'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Home className="h-4 w-4 mr-1 xl:mr-1.5 shrink-0" />
              Beranda
            </button>

            {/* Tentang Saya */}
            <button
              onClick={() => handleTabClick('tentang-saya')}
              className={`flex items-center px-2 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === 'tentang-saya'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#AA7C11] text-[#0F172A] shadow-lg shadow-[#D4A017]/20'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <User className="h-4 w-4 mr-1 xl:mr-1.5 shrink-0" />
              Tentang Saya
            </button>

            {/* Property */}
            <button
              onClick={() => handleTabClick('property')}
              className={`flex items-center px-2 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === 'property'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#AA7C11] text-[#0F172A] shadow-lg shadow-[#D4A017]/20'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Building className="h-4 w-4 mr-1 xl:mr-1.5 shrink-0" />
              Property
            </button>

            {/* Titip Jual */}
            <button
              onClick={() => handleTabClick('titip-jual')}
              className={`flex items-center px-2 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === 'titip-jual'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#AA7C11] text-[#0F172A] shadow-lg shadow-[#D4A017]/20'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Layers className="h-4 w-4 mr-1 xl:mr-1.5 shrink-0" />
              Titip Jual
            </button>

            {/* Titip Cari */}
            <button
              onClick={() => handleTabClick('titip-cari')}
              className={`flex items-center px-2 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === 'titip-cari'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#AA7C11] text-[#0F172A] shadow-lg shadow-[#D4A017]/20'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Sparkles className="h-4 w-4 mr-1 xl:mr-1.5 shrink-0" />
              Titip Cari
            </button>

            {/* Edukasi */}
            <button
              onClick={() => handleTabClick('edukasi')}
              className={`flex items-center px-2 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === 'edukasi'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#AA7C11] text-[#0F172A] shadow-lg shadow-[#D4A017]/20'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4 mr-1 xl:mr-1.5 shrink-0" />
              Edukasi
            </button>

            {/* AI Property */}
            <button
              onClick={() => handleTabClick('ai-property')}
              className={`flex items-center px-2 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === 'ai-property'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#AA7C11] text-[#0F172A] shadow-lg shadow-[#D4A017]/20'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <MessageSquare className="h-4 w-4 mr-1 xl:mr-1.5 shrink-0" />
              AI Property
            </button>

            {/* Kontak */}
            <button
              onClick={() => handleTabClick('kontak')}
              className={`flex items-center px-2 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === 'kontak'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#AA7C11] text-[#0F172A] shadow-lg shadow-[#D4A017]/20'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <PhoneCall className="h-4 w-4 mr-1 xl:mr-1.5 shrink-0" />
              Kontak
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden xl:block shrink-0" id="header-cta">
            <button 
              onClick={onOpenConsultation}
              id="header-cta-btn"
              className="relative group overflow-hidden bg-gradient-to-r from-[#D4A017] to-[#AA7C11] text-[#0F172A] hover:text-white px-4 py-2.5 rounded-lg text-xs xl:text-sm font-bold whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-[#D4A017]/40 flex items-center gap-1.5 border border-[#D4A017]"
            >
              <div className="absolute inset-0 w-0 bg-[#0F172A] transition-all duration-300 group-hover:w-full -z-10"></div>
              <PhoneCall className="h-4 w-4 transition-transform group-hover:rotate-12 shrink-0" />
              Konsultasi Gratis
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden" id="mobile-menu-trigger">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-btn"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-[#D4A017] hover:bg-slate-800/60 focus:outline-none transition active:scale-95"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`xl:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[90vh] border-b border-[#D4A017]/30 shadow-2xl' : 'max-h-0'
        } bg-[#1E293B]`}
        id="mobile-nav-panel"
      >
        <div className="px-4 pt-3 pb-6 space-y-1 overflow-y-auto max-h-[80vh]">
          
          {/* Beranda */}
          <button
            onClick={() => handleTabClick('beranda')}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'beranda'
                ? 'bg-[#D4A017] text-[#0F172A]'
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Home className="h-4 w-4 mr-3 text-[#D4A017]" />
            Beranda
          </button>

          {/* Tentang Saya */}
          <button
            onClick={() => handleTabClick('tentang-saya')}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'tentang-saya'
                ? 'bg-[#D4A017] text-[#0F172A]'
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <User className="h-4 w-4 mr-3 text-[#D4A017]" />
            Tentang Saya
          </button>

          {/* Property */}
          <button
            onClick={() => handleTabClick('property')}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'property'
                ? 'bg-[#D4A017] text-[#0F172A]'
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Building className="h-4 w-4 mr-3 text-[#D4A017]" />
            Property
          </button>

          {/* Titip Jual */}
          <button
            onClick={() => handleTabClick('titip-jual')}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'titip-jual'
                ? 'bg-[#D4A017] text-[#0F172A]'
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="h-4 w-4 mr-3 text-[#D4A017]" />
            Titip Jual
          </button>

          {/* Titip Cari */}
          <button
            onClick={() => handleTabClick('titip-cari')}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'titip-cari'
                ? 'bg-[#D4A017] text-[#0F172A]'
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Sparkles className="h-4 w-4 mr-3 text-[#D4A017]" />
            Titip Cari
          </button>

          {/* Edukasi */}
          <button
            onClick={() => handleTabClick('edukasi')}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'edukasi'
                ? 'bg-[#D4A017] text-[#0F172A]'
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4 mr-3 text-[#D4A017]" />
            Edukasi
          </button>

          {/* AI Property */}
          <button
            onClick={() => handleTabClick('ai-property')}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'ai-property'
                ? 'bg-[#D4A017] text-[#0F172A]'
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <MessageSquare className="h-4 w-4 mr-3 text-[#D4A017]" />
            AI Property
          </button>

          {/* Kontak */}
          <button
            onClick={() => handleTabClick('kontak')}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'kontak'
                ? 'bg-[#D4A017] text-[#0F172A]'
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <PhoneCall className="h-4 w-4 mr-3 text-[#D4A017]" />
            Kontak
          </button>

          <div className="pt-6 pb-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenConsultation();
              }}
              id="mobile-cta-btn"
              className="w-full bg-gradient-to-r from-[#D4A017] to-[#AA7C11] text-[#0F172A] active:scale-95 text-center px-4 py-3 rounded-xl text-sm font-extrabold transition shadow-lg flex items-center justify-center gap-2 border border-[#D4A017]"
            >
              <PhoneCall className="h-4 w-4" />
              Konsultasi Gratis
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
