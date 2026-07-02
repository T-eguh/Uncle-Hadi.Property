import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, Clock, Tag, ArrowRight, BookMarked, HelpCircle } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES_DATA, THIRTY_ARTICLE_TITLES } from '../data';

interface EdukasiSectionProps {
  onNavigateToTab: (tabId: string) => void;
  articles?: Article[] | null;
  initialSearchTerm?: string;
  settings?: {
    whatsAppNo?: string;
  };
}

export default function EdukasiSection({ onNavigateToTab, articles, initialSearchTerm = '', settings }: EdukasiSectionProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Synchronize internal search with parent search
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  // Construct full list of articles, preferring dynamic database articles first
  const allArticles: Article[] = useMemo(() => {
    const baseArticles = THIRTY_ARTICLE_TITLES.map((title, index) => {
      // If we have full detailed article text in ARTICLES_DATA, use it
      const detailed = ARTICLES_DATA.find(a => a.title.toLowerCase().trim() === title.toLowerCase().trim());
      if (detailed) return detailed;

      // Otherwise, generate a mock article object so all 30 are fully searchable and readable
      const categories = ['Edukasi Properti', 'Perencanaan KPR', 'Tips Penjualan', 'Investasi Properti', 'Legalitas & Pajak'];
      const category = categories[index % categories.length];
      
      return {
        id: `art-${index + 1}`,
        title,
        category,
        date: `${10 - (index % 10)} Juni 2026`,
        readTime: `${4 + (index % 3)} menit baca`,
        summary: `Edukasi penting seputar "${title}". Pelajari panduan praktis, tips and trik, serta regulasi terbaru dari Uncle Hadi untuk hasil terbaik.`,
        content: `### Pentingnya Memahami: ${title}

Topik ini merupakan bagian krusial dari pemahaman pasar properti modern di Indonesia, khususnya untuk wilayah Bekasi, Jakarta Timur, Cikarang, dan sekitarnya. 

Berikut poin-poin utama yang perlu Anda perhatikan:

1. **Persiapan Matang**: Selalu lakukan riset mendalam sebelum mengambil keputusan transaksi, baik dalam hal legalitas sertifikat (SHM/HGB) maupun kelayakan konstruksi fisik bangunan.
2. **Kalkulasi Keuangan**: Pastikan alokasi budget dan cicilan (bila menggunakan KPR bank) tidak melebihi batas aman keuangan keluarga Anda (maksimal 30% dari total pendapatan bulanan).
3. **Survey Lapangan**: Jangan ragu untuk mengunjungi lokasi properti di berbagai kondisi waktu (pagi, sore, malam) guna memastikan keamanan dan kebebasan dari bencana banjir.
4. **Konsultasikan dengan Ahlinya**: Gunakan jasa Agen Property terpercaya seperti **Uncle Hadi** yang akan mendampingi Anda di setiap tahap pencarian, negosiasi, hingga pengurusan berkas legal secara transparan.

*Ingin berdiskusi lebih mendalam mengenai topik ini? Silakan gunakan fitur **AI Properti Assistant** atau langsung hubungi Uncle Hadi di WhatsApp untuk sesi konsultasi tatap muka gratis!*`,
        image: `https://images.unsplash.com/photo-${1560518883 + index % 10}-ce09059eeffa?auto=format&fit=crop&w=800&q=80`
      };
    });

    const dbArticles = articles || [];

    // Merge baseArticles and dbArticles. If dbArticle has matching id or title, use dbArticle.
    const merged = baseArticles.map(baseArt => {
      const dbArt = dbArticles.find(a => a.id === baseArt.id || a.title.toLowerCase().trim() === baseArt.title.toLowerCase().trim());
      return dbArt ? dbArt : baseArt;
    });

    // Append any dbArticles that are completely new (no matching id AND no matching title in baseArticles)
    dbArticles.forEach(dbArt => {
      const existsInMerged = merged.some(m => m.id === dbArt.id || m.title.toLowerCase().trim() === dbArt.title.toLowerCase().trim());
      if (!existsInMerged) {
        merged.push(dbArt);
      }
    });

    return merged;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim()) return allArticles;
    return allArticles.filter(art => 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allArticles]);

  return (
    <div className="bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 min-h-screen" id="edukasi-page-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Title block */}
        <div className="text-center mb-10" id="edukasi-header">
          <span className="text-[#D4A017] font-semibold tracking-wider text-xs uppercase bg-[#D4A017]/10 px-3 py-1.5 rounded-full border border-[#D4A017]/30">
            Edukasi & Literasi Property
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] mt-3 sm:text-4xl">
            Pusat Edukasi Property Uncle Hadi
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-2xl mx-auto">
            Kami berkomitmen mengupload minimal 2 artikel edukasi berkualitas setiap minggunya untuk mencerdaskan calon pembeli, penjual, dan investor properti di Indonesia.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-12" id="edukasi-search-bar">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari topik artikel... (Contoh: KPR, SHM, DP)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-all text-gray-800"
              id="article-search-input"
            />
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
          </div>
          {searchTerm && (
            <p className="text-xs text-gray-400 mt-2 text-right">
              Menemukan <strong>{filteredArticles.length}</strong> dari 30 artikel edukasi
            </p>
          )}
        </div>

        {/* Articles List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="articles-grid">
          {filteredArticles.map((art) => (
            <div 
              key={art.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              onClick={() => setSelectedArticle(art)}
              id={`article-card-${art.id}`}
            >
              {/* Photo */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span className="absolute bottom-4 left-4 bg-[#0F172A]/85 backdrop-blur-xs text-[#D4A017] text-[10px] font-bold px-2.5 py-1 rounded border border-[#D4A017]/30">
                  {art.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center text-xs text-gray-400 font-semibold space-x-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#D4A017]" />
                      {art.readTime}
                    </span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#D4A017] transition line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 flex items-center text-xs text-[#D4A017] font-bold gap-1 group-hover:underline">
                  Baca Selengkapnya
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Fallback */}
        {filteredArticles.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto shadow-sm" id="edukasi-empty-fallback">
            <BookMarked className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base font-bold text-[#0F172A] mb-2">Artikel Tidak Ditemukan</h3>
            <p className="text-xs text-gray-500 mb-6">
              Maaf, tidak ada artikel edukasi yang cocok dengan pencarian Anda. Silakan coba kata kunci lain seperti 'KPR', 'SHM', atau 'DP'.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-[#0F172A] hover:bg-[#1E293B] text-[#D4A017] font-bold text-xs px-4 py-2 rounded-xl transition"
            >
              Lihat Semua Artikel
            </button>
          </div>
        )}
      </div>

      {/* Article Detail Modal Popup */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs" id="article-detail-modal">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-black/60 hover:bg-black text-white p-2.5 rounded-full transition"
                title="Tutup"
                id="btn-close-article"
              >
                &times;
              </button>
            </div>

            {/* Scrollable Contents */}
            <div className="overflow-y-auto flex-1">
              {/* Photo Banner */}
              <div className="relative h-64 md:h-80 w-full">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-[#D4A017] text-[#0F172A] text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider mb-2 inline-block">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black mt-1 leading-tight">{selectedArticle.title}</h3>
                  <div className="flex items-center text-xs text-gray-200 font-semibold mt-2 space-x-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#D4A017]" />
                      {selectedArticle.readTime}
                    </span>
                    <span>•</span>
                    <span>Diupload: {selectedArticle.date}</span>
                  </div>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="prose prose-slate max-w-none text-sm text-gray-600 leading-relaxed space-y-4">
                  {selectedArticle.content.split('\n\n').map((para, idx) => {
                    if (para.startsWith('###')) {
                      return <h4 key={idx} className="text-base font-extrabold text-[#0F172A] pt-3">{para.replace('###', '').trim()}</h4>;
                    }
                    if (para.startsWith('1.') || para.startsWith('2.') || para.startsWith('3.') || para.startsWith('4.') || para.startsWith('5.')) {
                      // Bullet line conversion helper
                      return <p key={idx} className="pl-4 border-l-2 border-[#D4A017]/50" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                    }
                    return <p key={idx} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                  })}
                </div>

                {/* Footer Action Callout */}
                <div className="bg-slate-50 border border-gray-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-white font-bold shrink-0">
                      UH
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">Butuh Konsultasi Lebih Detil?</p>
                      <p className="text-2xs text-gray-400">Hubungi langsung Uncle Hadi gratis sepuasnya.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setSelectedArticle(null);
                        onNavigateToTab('ai-properti');
                      }}
                      className="bg-transparent border border-[#0F172A] text-[#0F172A] font-bold text-xs px-4 py-2.5 rounded-xl transition hover:bg-[#0F172A] hover:text-white flex-1 text-center"
                    >
                      Tanya AI Properti
                    </button>
                    <a
                      href={`https://wa.me/${settings?.whatsAppNo || '6281234567890'}?text=Halo%20Uncle%20Hadi,%20saya%20ingin%20konsultasi%20seputar%20artikel%20edukasi.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex-1 text-center shadow"
                    >
                      Chat WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
