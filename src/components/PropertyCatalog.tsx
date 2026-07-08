import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, BedDouble, Bath, Square, ArrowUpRight, CheckCircle2, Navigation, Layers, Compass, Zap, Droplet } from 'lucide-react';
import { Property } from '../types';
import { PROPERTIES_DATA } from '../data';

interface PropertyCatalogProps {
  onOpenConsultation: () => void;
  onNavigateToTab: (tabId: string) => void;
  initialCategoryFilter?: string;
  initialTypeFilter?: string;
  initialPurposeFilter?: string;
  initialSortFilter?: string;
  properties?: Property[] | null;
  settings?: {
    whatsAppNo?: string;
  };
}

export default function PropertyCatalog({ 
  onOpenConsultation, 
  onNavigateToTab, 
  initialCategoryFilter = 'all', 
  initialTypeFilter = 'all',
  initialPurposeFilter = 'all',
  initialSortFilter = 'default',
  properties,
  settings
}: PropertyCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter); // 'all', 'Primary', 'Secondary'
  const [selectedRegion, setSelectedRegion] = useState<string>('all'); 
  const [selectedType, setSelectedType] = useState<string>(initialTypeFilter); // 'all', 'rumah hunian', 'apartement', 'ruko', 'tanah kavling'
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all'); 
  const [selectedPurpose, setSelectedPurpose] = useState<string>(initialPurposeFilter); // 'all', 'jual', 'sewa'
  const [selectedSort, setSelectedSort] = useState<string>(initialSortFilter); // 'default', 'terbaru', 'unggulan'

  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState<Property | null>(null);

  // Synchronize internal state with parent-provided props on changes
  useEffect(() => {
    setSelectedCategory(initialCategoryFilter);
  }, [initialCategoryFilter]);

  useEffect(() => {
    setSelectedType(initialTypeFilter);
  }, [initialTypeFilter]);

  useEffect(() => {
    setSelectedPurpose(initialPurposeFilter);
  }, [initialPurposeFilter]);

  useEffect(() => {
    setSelectedSort(initialSortFilter);
  }, [initialSortFilter]);

  const regions = ['Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Bali'];
  const propertyTypes = [
    { value: 'rumah hunian', label: 'Rumah Hunian' },
    { value: 'apartement', label: 'Apartemen' },
    { value: 'ruko', label: 'Ruko / Komersial' },
    { value: 'tanah kavling', label: 'Tanah Kavling' }
  ];

  const priceRanges = [
    { value: 'under_1b', label: 'Di bawah 1 Miliar' },
    { value: '1b_3b', label: '1 - 3 Miliar' },
    { value: '3b_10b', label: '3 - 10 Miliar' },
    { value: 'above_10b', label: 'Di atas 10 Miliar' }
  ];

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    const list = (properties !== null && properties !== undefined) ? properties : PROPERTIES_DATA;
    let result = list.filter((prop) => {
      // Search text match
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        prop.title.toLowerCase().includes(searchLower) ||
        prop.location.toLowerCase().includes(searchLower) ||
        prop.description.toLowerCase().includes(searchLower) ||
        prop.type.toLowerCase().includes(searchLower) ||
        prop.category.toLowerCase().includes(searchLower) ||
        (prop.landArea && prop.landArea.toLowerCase().includes(searchLower)) ||
        (prop.buildingArea && prop.buildingArea.toLowerCase().includes(searchLower)) ||
        (prop.furnished && prop.furnished.toLowerCase().includes(searchLower)) ||
        (prop.facing && prop.facing.toLowerCase().includes(searchLower)) ||
        (prop.electricity && prop.electricity.toLowerCase().includes(searchLower)) ||
        (prop.water && prop.water.toLowerCase().includes(searchLower)) ||
        (prop.streetWidth && prop.streetWidth.toLowerCase().includes(searchLower)) ||
        (prop.rooms && prop.rooms.toString().includes(searchLower)) ||
        (prop.bathrooms && prop.bathrooms.toString().includes(searchLower)) ||
        (prop.floors && prop.floors.toString().includes(searchLower));

      // Category match
      const matchesCategory = selectedCategory === 'all' || prop.category === selectedCategory;

      // Region match
      const matchesRegion = 
        selectedRegion === 'all' || 
        prop.location.toLowerCase().includes(selectedRegion.toLowerCase());

      // Type match
      const matchesType = selectedType === 'all' || prop.type === selectedType;

      // Transaction Purpose match (rentPrice indicates for rent, lack of it indicates for sale)
      const matchesPurpose = 
        selectedPurpose === 'all' || 
        (selectedPurpose === 'jual' ? !prop.rentPrice : !!prop.rentPrice);

      // Price match
      let matchesPrice = true;
      if (selectedPriceRange === 'under_1b') {
        matchesPrice = prop.price < 1000000000;
      } else if (selectedPriceRange === '1b_3b') {
        matchesPrice = prop.price >= 1000000000 && prop.price <= 3000000000;
      } else if (selectedPriceRange === '3b_10b') {
        matchesPrice = prop.price >= 3000000000 && prop.price <= 10000000000;
      } else if (selectedPriceRange === 'above_10b') {
        matchesPrice = prop.price > 10000000000;
      }

      return matchesSearch && matchesCategory && matchesRegion && matchesType && matchesPurpose && matchesPrice;
    });

    // Apply sorting methods
    if (selectedSort === 'terbaru') {
      result = [...result].sort((a, b) => b.id.localeCompare(a.id));
    } else if (selectedSort === 'unggulan') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchTerm, selectedCategory, selectedRegion, selectedType, selectedPurpose, selectedPriceRange, selectedSort, properties]);

  const handleWhatsAppContact = (prop: Property) => {
    const phone = settings?.whatsAppNo || "6281234567890"; // WhatsApp Uncle Hadi
    const encodedText = encodeURIComponent(prop.whatsappMessage);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 min-h-screen" id="property-catalog-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="text-center mb-10" id="catalog-title-block">
          <span className="text-[#D4A017] font-semibold tracking-wider text-xs uppercase bg-[#D4A017]/10 px-3 py-1.5 rounded-full border border-[#D4A017]/30">
            Katalog Listing Pilihan
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A] mt-3 sm:text-4xl">
            Cari Property Impian Anda
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-2xl mx-auto">
            Gunakan filter cerdas di bawah untuk menemukan rumah hunian, apartemen modern, ruko premium, atau tanah kavling siap bangun.
          </p>
        </div>

        {/* Filter Widget */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-10" id="filters-widget-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
            
            {/* Search Input */}
            <div className="xl:col-span-2 relative" id="filter-search-col">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Cari Kata Kunci</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari perumahan, jalan, area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-all"
                  id="filter-search-input"
                />
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Category Primary / Secondary */}
            <div id="filter-category-col">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kategori Proyek</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-all font-medium text-gray-700"
                id="filter-category-select"
              >
                <option value="all">Semua Kategori</option>
                <option value="Primary">Primary (Proyek Baru)</option>
                <option value="Secondary">Secondary (Seken Siap Huni)</option>
              </select>
            </div>

            {/* Wilayah / Region */}
            <div id="filter-region-col">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Wilayah / Kota</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-all font-medium text-gray-700"
                id="filter-region-select"
              >
                <option value="all">Semua Wilayah</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Jenis Properti */}
            <div id="filter-type-col">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Jenis Property</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-all font-medium text-gray-700"
                id="filter-type-select"
              >
                <option value="all">Semua Jenis</option>
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Tipe Jual (Purpose) */}
            <div id="filter-purpose-col">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Jenis Pembelian / Sewa</label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-all font-medium text-gray-700"
                id="filter-purpose-select"
              >
                <option value="all">Semua Tipe</option>
                <option value="jual">Dijual</option>
                <option value="sewa">Disewakan</option>
              </select>
            </div>

            {/* Urutkan Berdasarkan */}
            <div id="filter-sort-col">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Urutkan</label>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-all font-medium text-gray-700"
                id="filter-sort-select"
              >
                <option value="default">Default</option>
                <option value="terbaru">Listing Terbaru</option>
                <option value="unggulan">Harga Tertinggi</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100 items-end">
            {/* Price range selector */}
            <div className="md:col-span-2" id="filter-price-col">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Rentang Harga</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedPriceRange('all')}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                    selectedPriceRange === 'all'
                      ? 'bg-[#0F172A] border-[#0F172A] text-[#D4A017]'
                      : 'bg-[#F8FAFC] border-gray-200 text-gray-600 hover:bg-slate-100'
                  }`}
                  id="price-range-all"
                >
                  Semua Harga
                </button>
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedPriceRange(range.value)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                      selectedPriceRange === range.value
                        ? 'bg-[#0F172A] border-[#0F172A] text-[#D4A017]'
                        : 'bg-[#F8FAFC] border-gray-200 text-gray-600 hover:bg-slate-100'
                    }`}
                    id={`price-range-${range.value}`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Results */}
            <div className="text-right text-xs text-gray-500 font-semibold self-center" id="filter-results-info">
              Menampilkan <span className="text-[#0F172A] font-bold">{filteredProperties.length}</span> properti pilihan
            </div>

            {/* Reset Filters */}
            <div className="text-right" id="filter-reset-action">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedRegion('all');
                  setSelectedType('all');
                  setSelectedPriceRange('all');
                }}
                className="text-xs text-red-600 hover:text-red-800 font-bold hover:underline transition duration-200"
              >
                Reset Semua Filter &times;
              </button>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="properties-grid">
            {filteredProperties.map((prop) => (
              <div 
                key={prop.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
                id={`property-card-${prop.id}`}
              >
                {/* Image and badges */}
                <div className="relative h-56 overflow-hidden shrink-0">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"></div>
                  
                  {/* Category badge */}
                  <span className={`absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 rounded shadow ${
                    prop.category === 'Primary' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white' 
                      : 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white'
                  }`}>
                    {prop.category}
                  </span>

                  {/* Property Type Badge */}
                  <span className="absolute top-4 right-4 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 bg-slate-900/80 text-[#D4A017] rounded shadow backdrop-blur-sm border border-[#D4A017]/30">
                    {prop.type}
                  </span>

                  {/* Price overlay */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs text-[#D4A017] font-semibold uppercase tracking-wider">Harga Penawaran</p>
                    <p className="text-xl font-extrabold tracking-tight">{prop.priceFormatted}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Location */}
                    <div className="flex items-center text-xs text-gray-500 font-semibold gap-1">
                      <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span>{prop.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-[#0F172A] line-clamp-2 group-hover:text-[#D4A017] transition-colors duration-200">
                      {prop.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {prop.description}
                    </p>

                    {/* Detailed Features Grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-3 border-y border-gray-100 my-2 bg-slate-50/50 rounded-lg p-2.5">
                      {/* Bed/Bath for residential, general info for others */}
                      {prop.type === 'rumah hunian' ? (
                        <>
                          <div className="flex items-center text-xs text-gray-600 gap-1.5 font-medium">
                            <BedDouble className="h-3.5 w-3.5 text-[#0F172A]/70" />
                            <span>{prop.rooms} K. Tidur</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-600 gap-1.5 font-medium">
                            <Bath className="h-3.5 w-3.5 text-[#0F172A]/70" />
                            <span>{prop.bathrooms} K. Mandi</span>
                          </div>
                        </>
                      ) : null}

                      {prop.landArea && prop.landArea !== '0 m²' && (
                        <div className="flex items-center text-xs text-gray-600 gap-1.5 font-medium">
                          <Square className="h-3.5 w-3.5 text-[#0F172A]/70" />
                          <span>LT: {prop.landArea.split(' (')[0]}</span>
                        </div>
                      )}

                      {prop.buildingArea && prop.buildingArea !== '0 m²' && (
                        <div className="flex items-center text-xs text-gray-600 gap-1.5 font-medium col-span-1">
                          <Layers className="h-3.5 w-3.5 text-[#0F172A]/70" />
                          <span>LB: {prop.buildingArea}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 flex gap-2" id="property-card-actions">
                    <button
                      onClick={() => setSelectedPropertyDetail(prop)}
                      className="bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs px-3 py-2 rounded-lg transition duration-200 flex-1"
                      id={`btn-detail-${prop.id}`}
                    >
                      Detail Info
                    </button>
                    <a
                      href={prop.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg transition"
                      title="Lokasi Google Maps"
                      id={`maps-link-${prop.id}`}
                    >
                      <Navigation className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => handleWhatsAppContact(prop)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition duration-200 flex items-center justify-center gap-1.5"
                      id={`btn-wa-${prop.id}`}
                    >
                      {/* Simplified WhatsApp icon as path */}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Tanya WA
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-md" id="catalog-empty-fallback">
            <Layers className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Property Tidak Ditemukan</h3>
            <p className="text-sm text-gray-500 mb-6">
              Maaf, kami tidak dapat menemukan properti dengan kriteria yang Anda masukkan saat ini. Namun, kami bisa mencarikan unit khusus secara gratis untuk Anda!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => onNavigateToTab('titip-cari')}
                className="bg-[#D4A017] hover:bg-[#C29014] text-[#0F172A] font-bold text-xs px-4 py-2.5 rounded-xl transition shadow"
              >
                Gunakan Menu Titip Cari
              </button>
              <button
                onClick={onOpenConsultation}
                className="bg-[#0F172A] hover:bg-[#1E293B] text-[#D4A017] font-bold text-xs px-4 py-2.5 rounded-xl transition shadow"
              >
                Konsultasi WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Property Detail Modal */}
      {selectedPropertyDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs" id="property-detail-modal">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header banner with close button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSelectedPropertyDetail(null)}
                className="bg-black/60 hover:bg-black text-white p-2.5 rounded-full transition"
                title="Tutup"
                id="btn-close-modal"
              >
                &times;
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Photo Left */}
                <div className="relative h-64 md:h-full min-h-[300px]">
                  <img
                    src={selectedPropertyDetail.image}
                    alt={selectedPropertyDetail.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 bg-[#D4A017] text-[#0F172A] rounded mb-2 inline-block">
                      {selectedPropertyDetail.category}
                    </span>
                    <h3 className="text-xl font-black mt-1 leading-tight">{selectedPropertyDetail.title}</h3>
                    <p className="text-sm text-gray-200 flex items-center gap-1 mt-1 font-semibold">
                      <MapPin className="h-4 w-4 text-red-400" />
                      {selectedPropertyDetail.location}
                    </p>
                  </div>
                </div>

                {/* Details Right */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Harga Properti</span>
                    <p className="text-3xl font-black text-[#0F172A] tracking-tight">{selectedPropertyDetail.priceFormatted}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Deskripsi Properti</span>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedPropertyDetail.description}</p>
                  </div>

                  {/* Specification List */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Spesifikasi Detail</span>
                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-gray-100">
                      
                      {selectedPropertyDetail.type === 'rumah hunian' && (
                        <>
                          <div className="flex items-center text-xs text-gray-700 gap-2 font-medium">
                            <BedDouble className="h-4 w-4 text-[#D4A017]" />
                            <span>Kamar Tidur: <strong>{selectedPropertyDetail.rooms}</strong></span>
                          </div>
                          <div className="flex items-center text-xs text-gray-700 gap-2 font-medium">
                            <Bath className="h-4 w-4 text-[#D4A017]" />
                            <span>Kamar Mandi: <strong>{selectedPropertyDetail.bathrooms}</strong></span>
                          </div>
                        </>
                      )}

                      {selectedPropertyDetail.landArea && (
                        <div className="flex items-center text-xs text-gray-700 gap-2 font-medium col-span-2">
                          <Square className="h-4 w-4 text-[#D4A017]" />
                          <span>Luas Tanah: <strong>{selectedPropertyDetail.landArea}</strong></span>
                        </div>
                      )}

                      {selectedPropertyDetail.buildingArea && selectedPropertyDetail.buildingArea !== '0 m²' && (
                        <div className="flex items-center text-xs text-gray-700 gap-2 font-medium">
                          <Layers className="h-4 w-4 text-[#D4A017]" />
                          <span>Luas Bangunan: <strong>{selectedPropertyDetail.buildingArea}</strong></span>
                        </div>
                      )}

                      {selectedPropertyDetail.floors && selectedPropertyDetail.floors > 0 && (
                        <div className="flex items-center text-xs text-gray-700 gap-2 font-medium">
                          <Compass className="h-4 w-4 text-[#D4A017]" />
                          <span>Jumlah Lantai: <strong>{selectedPropertyDetail.floors} Lantai</strong></span>
                        </div>
                      )}

                      {selectedPropertyDetail.facing && (
                        <div className="flex items-center text-xs text-gray-700 gap-2 font-medium">
                          <Compass className="h-4 w-4 text-[#D4A017]" />
                          <span>Hadap: <strong>{selectedPropertyDetail.facing}</strong></span>
                        </div>
                      )}

                      {selectedPropertyDetail.electricity && (
                        <div className="flex items-center text-xs text-gray-700 gap-2 font-medium">
                          <Zap className="h-4 w-4 text-[#D4A017]" />
                          <span>Listrik: <strong>{selectedPropertyDetail.electricity}</strong></span>
                        </div>
                      )}

                      {selectedPropertyDetail.water && (
                        <div className="flex items-center text-xs text-gray-700 gap-2 font-medium">
                          <Droplet className="h-4 w-4 text-[#D4A017]" />
                          <span>Air Bersih: <strong>{selectedPropertyDetail.water}</strong></span>
                        </div>
                      )}

                      {selectedPropertyDetail.streetWidth && (
                        <div className="flex items-center text-xs text-gray-700 gap-2 font-medium col-span-2">
                          <Square className="h-4 w-4 text-[#D4A017]" />
                          <span>Lebar Jalan: <strong>{selectedPropertyDetail.streetWidth}</strong></span>
                        </div>
                      )}

                      {selectedPropertyDetail.furnished && (
                        <div className="flex items-center text-xs text-gray-700 gap-2 font-medium col-span-2 border-t border-gray-100 pt-2 mt-1">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>Furnished: <strong>{selectedPropertyDetail.furnished}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions inside modal */}
                  <div className="pt-4 flex gap-3 border-t border-gray-100">
                    <button
                      onClick={() => handleWhatsAppContact(selectedPropertyDetail)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition duration-200 flex-1 flex items-center justify-center gap-2 shadow"
                    >
                      Hubungi Hubungi Via WhatsApp
                    </button>
                    <a
                      href={selectedPropertyDetail.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-sm px-4 py-3 rounded-xl transition flex items-center gap-1.5"
                    >
                      <Navigation className="h-4 w-4 text-blue-600" />
                      Google Maps
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
