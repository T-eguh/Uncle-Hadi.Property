import React, { useState } from 'react';
import { Menu, X, Home, User, Building, Landmark, BookOpen, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenConsultation: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenConsultation }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'tentang-saya', label: 'Tentang Saya', icon: User },
    { id: 'property', label: 'Property', icon: Building },
    { id: 'titip-jual', label: 'Titip Jual', icon: Landmark },
    { id: 'titip-cari', label: 'Titip Cari', icon: Sparkles },
    { id: 'edukasi', label: 'Edukasi', icon: BookOpen },
    { id: 'ai-property', label: 'AI Property', icon: MessageSquare },
    { id: 'kontak', label: 'Kontak', icon: PhoneCall },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] text-white shadow-lg border-b border-[#D4A017]/20" id="header-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => handleTabClick('beranda')} id="brand-logo">
            <div className="bg-gradient-to-br from-[#D4A017] to-[#AA7C11] p-2.5 rounded-lg mr-3 shadow-md">
              <Building className="h-6 w-6 text-[#0F172A]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight block text-white">
                Uncle Hadi<span className="text-[#D4A017]">.Property</span>
              </span>
              <span className="text-xs text-[#F8FAFC]/75 font-medium tracking-wider block">
                Teman Cari Property
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" id="desktop-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#D4A017] text-[#0F172A] font-semibold shadow-md'
                      : 'text-[#F8FAFC] hover:bg-[#D4A017]/10 hover:text-[#D4A017]'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block" id="header-cta">
            <button 
              onClick={onOpenConsultation}
              id="header-cta-btn"
              className="bg-transparent border border-[#D4A017] hover:bg-[#D4A017] text-[#D4A017] hover:text-[#0F172A] px-5 py-2 rounded-md text-sm font-semibold transition-all duration-300 shadow-md flex items-center gap-1.5"
            >
              <PhoneCall className="h-4 w-4" />
              Konsultasi Gratis
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden" id="mobile-menu-trigger">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-btn"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#F8FAFC] hover:text-[#D4A017] hover:bg-[#D4A017]/10 focus:outline-none transition"
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
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] border-b border-[#D4A017]/20' : 'max-h-0'
        } bg-[#1E293B]`}
        id="mobile-nav-panel"
      >
        <div className="px-2 pt-2 pb-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center w-full px-4 py-3 rounded-md text-base font-medium transition-all ${
                  isActive
                    ? 'bg-[#D4A017] text-[#0F172A] font-semibold'
                    : 'text-[#F8FAFC] hover:bg-[#D4A017]/10 hover:text-[#D4A017]'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 pb-1 px-4">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenConsultation();
              }}
              id="mobile-cta-btn"
              className="w-full bg-[#D4A017] text-[#0F172A] hover:bg-[#C29014] text-center px-4 py-2.5 rounded-md text-sm font-semibold transition shadow-md flex items-center justify-center gap-2"
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
