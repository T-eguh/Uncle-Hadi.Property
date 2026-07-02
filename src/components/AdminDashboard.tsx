import React, { useState, useEffect } from 'react';
import { 
  Building, Lock, LogIn, LogOut, FileText, CheckCircle2, 
  Trash2, Plus, Edit2, Upload, AlertCircle, Eye, 
  X, MapPin, Compass, Zap, Droplet, User, Phone, 
  Search, ShieldAlert, ArrowLeft, ExternalLink, MessageSquare,
  BookOpen, Sparkles, Settings, Image as ImageIcon
} from 'lucide-react';
import { Property, Article } from '../types';

interface AdminDashboardProps {
  onBackToWebsite: () => void;
  onRefreshProperties: () => void;
  onRefreshSettings?: () => void;
  onRefreshArticles?: () => void;
  articles?: Article[] | null;
}

interface Inquiry {
  id: string;
  type: 'titip-jual' | 'titip-cari' | 'kontak';
  timestamp: string;
  name: string;
  phone: string;
  details: any;
}

export default function AdminDashboard({ 
  onBackToWebsite, 
  onRefreshProperties, 
  onRefreshSettings,
  onRefreshArticles,
  articles = []
}: AdminDashboardProps) {
  // Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Core Data States
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'properties' | 'inquiries_jual' | 'inquiries_beli' | 'inquiries_kontak' | 'articles' | 'ai-property' | 'founder' | 'settings'>('properties');
  
  // Founder & Website Settings States
  const [founderPhotoUrl, setFounderPhotoUrl] = useState('');
  const [founderName, setFounderName] = useState('');
  const [founderTitle, setFounderTitle] = useState('');
  const [founderBrand, setFounderBrand] = useState('');
  const [aboutHeading, setAboutHeading] = useState('');
  const [aboutText1, setAboutText1] = useState('');
  const [aboutQuote, setAboutQuote] = useState('');
  const [aboutText2, setAboutText2] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroBgImage, setHeroBgImage] = useState('');
  const [whatsAppNo, setWhatsAppNo] = useState('');
  
  // New Customizable Website Identity & Sliders States
  const [logoText, setLogoText] = useState('Uncle Hadi');
  const [logoColorText, setLogoColorText] = useState('.Property');
  const [logoSlogan, setLogoSlogan] = useState('Teman Cari Property');
  const [logoImageUrl, setLogoImageUrl] = useState('');
  const [uploadLogoLoading, setUploadLogoLoading] = useState(false);
  const [slide2Badge, setSlide2Badge] = useState('Layanan Konsultasi Amanah & Berlisensi');
  const [slide2Title, setSlide2Title] = useState('Konsultasi Properti Jujur, Amanah & Pendampingan Sepenuh Hati');
  const [slide2Subtitle, setSlide2Subtitle] = useState('Dapatkan solusi hunian ideal, ruko produktif, atau investasi tanah dengan bimbingan hukum yang aman, jujur, transparan, serta didampingi penuh hingga selesai akad.');
  const [slide2Image, setSlide2Image] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80');
  const [slide3Badge, setSlide3Badge] = useState('Jasa Pemasaran & Titip Jual Digital Premium');
  const [slide3Title, setSlide3Title] = useState('Pasarkan Properti Anda Lebih Cepat dengan Strategi Digital Modern');
  const [slide3Subtitle, setSlide3Subtitle] = useState('Layanan titip jual atau sewa properti premium untuk menjangkau ribuan calon pembeli potensial secara tertarget di wilayah Bekasi, Cikarang, dan Jakarta Timur.');
  const [slide3Image, setSlide3Image] = useState('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80');
  const [officeAddress, setOfficeAddress] = useState('Bekasi Timur, Bekasi, Jawa Barat (Samping Stasiun KRL Bekasi Timur)');
  const [officeEmail, setOfficeEmail] = useState('hadi@unclehadi.property');
  const [officePhone, setOfficePhone] = useState('+62 812-3456-7890');
  const [systemInstruction, setSystemInstruction] = useState('');

  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');
  const [uploadFounderLoading, setUploadFounderLoading] = useState(false);

  // Articles States
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [articleFormError, setArticleFormError] = useState('');
  const [articleFormSaving, setArticleFormSaving] = useState(false);
  const [articleUploadLoading, setArticleUploadLoading] = useState(false);
  const [articleUploadError, setArticleUploadError] = useState('');
  const [searchArticleTerm, setSearchArticleTerm] = useState('');

  // Search & Filter States
  const [searchPropertyTerm, setSearchPropertyTerm] = useState('');
  const [searchInquiryTerm, setSearchInquiryTerm] = useState('');
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState<'all' | 'titip-jual' | 'titip-cari' | 'kontak'>('all');

  // Property Form/Modal States
  const [showFormModal, setShowFormModal] = useState(false);

  // Custom Confirm & Alert Modal States
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    message: string;
  } | null>(null);

  const triggerConfirm = (message: string, action: () => void | Promise<void>) => {
    setConfirmModal({
      isOpen: true,
      message,
      onConfirm: async () => {
        setConfirmModal(null);
        await action();
      }
    });
  };
  const [editingProp, setEditingProp] = useState<Partial<Property> | null>(null);
  const [formError, setFormError] = useState('');
  const [formSaving, setFormSaving] = useState(false);

  // Image Upload States
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Check Local Storage for active session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('hadi_admin_token');
    if (savedToken) {
      setAuthToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch properties & inquiries when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, authToken]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      // 1. Fetch properties
      const propRes = await fetch('/api/properties');
      if (propRes.ok) {
        const propData = await propRes.json();
        setProperties(propData);
      }

      // 2. Fetch inquiries with auth token
      const inqRes = await fetch('/api/admin/inquiries', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (inqRes.status === 401) {
        localStorage.removeItem('hadi_admin_token');
        setAuthToken('');
        setIsLoggedIn(false);
        return;
      }
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        // Sort inquiries newest first
        setInquiries(inqData.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
      }

      // 3. Fetch current system settings
      const settingsRes = await fetch('/api/settings');
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setFounderPhotoUrl(settingsData.founderPhotoUrl || '');
        setFounderName(settingsData.founderName || 'Hadi Sukmono');
        setFounderTitle(settingsData.founderTitle || 'Founder & Agen Property Utama');
        setFounderBrand(settingsData.founderBrand || 'Uncle Hadi.Property – Teman Cari Property');
        setAboutHeading(settingsData.aboutHeading || 'Halo, Saya Hadi Sukmono. Selamat Datang di Uncle Hadi.Property');
        setAboutText1(settingsData.aboutText1 || 'Saya adalah agen property yang berfokus membantu masyarakat menemukan rumah, apartemen, ruko, dan investasi properti yang sesuai kebutuhan Anda di Bekasi, Jakarta Timur, Cikarang, dan sekitarnya.');
        setAboutQuote(settingsData.aboutQuote || '"Saya percaya bahwa membeli atau menjual properti adalah salah satu keputusan terbesar dalam hidup yang membutuhkan informasi yang jelas, jujur, dan pendampingan yang tepat."');
        setAboutText2(settingsData.aboutText2 || 'Melalui website ini, saya berbagi informasi property yang transparan, artikel edukasi yang mudah dipahami, serta layanan pemasaran properti digital premium bagi pemilik yang ingin menjual atau menyewakan asetnya secara cepat.');
        setHeroTitle(settingsData.heroTitle || 'Membantu Menemukan Property yang Tepat untuk Investasi dan Hunian');
        setHeroSubtitle(settingsData.heroSubtitle || 'Saya membantu calon pembeli, penjual, dan investor property mendapatkan informasi yang jelas, transparan, dan terpercaya untuk wilayah Bekasi, Jakarta Timur, Cikarang, dan sekitarnya.');
        setHeroBgImage(settingsData.heroBgImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80');
        setWhatsAppNo(settingsData.whatsAppNo || '6281234567890');
        
        // Populate customizable identity, slider 2 & 3, and footer contacts
        setLogoText(settingsData.logoText || 'Uncle Hadi');
        setLogoColorText(settingsData.logoColorText || '.Property');
        setLogoSlogan(settingsData.logoSlogan || 'Teman Cari Property');
        setLogoImageUrl(settingsData.logoImageUrl || '');
        setSlide2Badge(settingsData.slide2Badge || 'Layanan Konsultasi Amanah & Berlisensi');
        setSlide2Title(settingsData.slide2Title || 'Konsultasi Properti Jujur, Amanah & Pendampingan Sepenuh Hati');
        setSlide2Subtitle(settingsData.slide2Subtitle || 'Dapatkan solusi hunian ideal, ruko produktif, atau investasi tanah dengan bimbingan hukum yang aman, jujur, transparan, serta didampingi penuh hingga selesai akad.');
        setSlide2Image(settingsData.slide2Image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80');
        setSlide3Badge(settingsData.slide3Badge || 'Jasa Pemasaran & Titip Jual Digital Premium');
        setSlide3Title(settingsData.slide3Title || 'Pasarkan Properti Anda Lebih Cepat dengan Strategi Digital Modern');
        setSlide3Subtitle(settingsData.slide3Subtitle || 'Layanan titip jual atau sewa properti premium untuk menjangkau ribuan calon pembeli potensial secara tertarget di wilayah Bekasi, Cikarang, dan Jakarta Timur.');
        setSlide3Image(settingsData.slide3Image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80');
        setOfficeAddress(settingsData.officeAddress || 'Bekasi Timur, Bekasi, Jawa Barat (Samping Stasiun KRL Bekasi Timur)');
        setOfficeEmail(settingsData.officeEmail || 'hadi@unclehadi.property');
        setOfficePhone(settingsData.officePhone || '+62 812-3456-7890');
        setSystemInstruction(settingsData.systemInstruction || '');
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAuthToken(data.token);
        localStorage.setItem('hadi_admin_token', data.token);
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
      } else {
        setLoginError(data.error || 'Username atau Password tidak cocok!');
      }
    } catch (err) {
      setLoginError('Koneksi ke server gagal. Harap pastikan server backend berjalan.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    } catch (err) {
      console.error('Logout error:', err);
    }

    localStorage.removeItem('hadi_admin_token');
    setAuthToken('');
    setIsLoggedIn(false);
    onBackToWebsite();
  };

  // Image File Upload Helper (converts to Base64 and POSTs to server)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Validate type
    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa format gambar!');
      return;
    }

    setUploadLoading(true);
    setUploadError('');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            filename: file.name,
            base64Data
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setEditingProp(prev => ({
            ...prev,
            image: data.imageUrl
          }));
        } else {
          setUploadError(data.error || 'Gagal mengunggah gambar.');
        }
      } catch (err) {
        setUploadError('Kesalahan jaringan saat mengunggah gambar.');
      } finally {
        setUploadLoading(false);
      }
    };
    reader.onerror = () => {
      setUploadError('Gagal membaca file gambar.');
      setUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle Founder photo upload
  const handleFounderPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Validate type
    if (!file.type.startsWith('image/')) {
      setSettingsError('File harus berupa format gambar!');
      return;
    }

    setUploadFounderLoading(true);
    setSettingsError('');
    setSettingsSuccess('');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            filename: file.name,
            base64Data
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setFounderPhotoUrl(data.imageUrl);
          setSettingsSuccess('Foto berhasil diunggah! Klik "Simpan Perubahan" untuk menerapkan secara permanen.');
        } else {
          setSettingsError(data.error || 'Gagal mengunggah foto founder.');
        }
      } catch (err) {
        setSettingsError('Kesalahan jaringan saat mengunggah foto.');
      } finally {
        setUploadFounderLoading(false);
      }
    };
    reader.onerror = () => {
      setSettingsError('Gagal membaca file gambar.');
      setUploadFounderLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle Hero bg upload
  const handleHeroBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      setSettingsError('File harus berupa format gambar!');
      return;
    }

    setUploadFounderLoading(true);
    setSettingsError('');
    setSettingsSuccess('');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            filename: file.name,
            base64Data
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setHeroBgImage(data.imageUrl);
          setSettingsSuccess('Foto background hero berhasil diunggah! Klik "Simpan Perubahan" untuk menerapkan secara permanen.');
        } else {
          setSettingsError(data.error || 'Gagal mengunggah foto hero.');
        }
      } catch (err) {
        setSettingsError('Kesalahan jaringan saat mengunggah foto.');
      } finally {
        setUploadFounderLoading(false);
      }
    };
    reader.onerror = () => {
      setSettingsError('Gagal membaca file gambar.');
      setUploadFounderLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Handle logo image upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      setSettingsError('File harus berupa format gambar!');
      return;
    }

    setUploadLogoLoading(true);
    setSettingsError('');
    setSettingsSuccess('');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            filename: file.name,
            base64Data
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setLogoImageUrl(data.imageUrl);
          setSettingsSuccess('Foto Logo berhasil diunggah! Klik "Simpan Perubahan" untuk menerapkan secara permanen.');
        } else {
          setSettingsError(data.error || 'Gagal mengunggah logo.');
        }
      } catch (err) {
        setSettingsError('Kesalahan jaringan saat mengunggah foto.');
      } finally {
        setUploadLogoLoading(false);
      }
    };
    reader.onerror = () => {
      setSettingsError('Gagal membaca file gambar.');
      setUploadLogoLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Save founder photo to server settings
  const handleSaveFounderSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');
    setIsSavingSettings(true);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          founderPhotoUrl,
          founderName,
          founderTitle,
          founderBrand,
          aboutHeading,
          aboutText1,
          aboutQuote,
          aboutText2,
          heroTitle,
          heroSubtitle,
          heroBgImage,
          whatsAppNo,
          logoText,
          logoColorText,
          logoSlogan,
          logoImageUrl,
          slide2Badge,
          slide2Title,
          slide2Subtitle,
          slide2Image,
          slide3Badge,
          slide3Title,
          slide3Subtitle,
          slide3Image,
          officeAddress,
          officeEmail,
          officePhone,
          systemInstruction
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSettingsSuccess('Pengaturan website berhasil disimpan dan langsung diperbarui di seluruh website!');
        if (onRefreshSettings) {
          onRefreshSettings();
        }
      } else {
        setSettingsError(data.error || 'Gagal menyimpan konfigurasi.');
      }
    } catch (err) {
      setSettingsError('Koneksi ke server terputus.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Open article modal for Add
  const handleOpenAddArticle = () => {
    setEditingArticle({
      title: '',
      category: 'Edukasi Properti',
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
    });
    setArticleFormError('');
    setShowArticleModal(true);
  };

  // Open article modal for Edit
  const handleOpenEditArticle = (art: any) => {
    setEditingArticle({ ...art });
    setArticleFormError('');
    setShowArticleModal(true);
  };

  // Handle saving article (Add or Edit)
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setArticleFormError('');

    if (!editingArticle?.title || !editingArticle?.category || !editingArticle?.content) {
      setArticleFormError('Kolom Judul, Kategori, dan Konten wajib diisi!');
      return;
    }

    if (!editingArticle?.image) {
      setArticleFormError('Harap sertakan gambar artikel!');
      return;
    }

    setArticleFormSaving(true);

    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(editingArticle)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setShowArticleModal(false);
        setEditingArticle(null);
        if (onRefreshArticles) onRefreshArticles();
      } else {
        setArticleFormError(data.error || 'Gagal menyimpan data artikel.');
      }
    } catch (err) {
      setArticleFormError('Gagal menghubungi server.');
    } finally {
      setArticleFormSaving(false);
    }
  };

  // Delete Article
  const handleDeleteArticle = (id: string) => {
    triggerConfirm('Apakah Anda yakin ingin menghapus artikel edukasi ini?', async () => {
      try {
        const res = await fetch(`/api/admin/articles/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (res.ok) {
          if (onRefreshArticles) onRefreshArticles();
        } else {
          setAlertModal({ isOpen: true, message: 'Gagal menghapus artikel.' });
        }
      } catch (err) {
        setAlertModal({ isOpen: true, message: 'Kesalahan jaringan saat menghapus artikel.' });
      }
    });
  };

  // Article Image Upload
  const handleArticleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      setArticleUploadError('File harus berupa format gambar!');
      return;
    }

    setArticleUploadLoading(true);
    setArticleUploadError('');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            filename: file.name,
            base64Data
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setEditingArticle(prev => ({
            ...prev,
            image: data.imageUrl
          }));
        } else {
          setArticleUploadError(data.error || 'Gagal mengunggah gambar.');
        }
      } catch (err) {
        setArticleUploadError('Kesalahan jaringan saat mengunggah gambar.');
      } finally {
        setArticleUploadLoading(false);
      }
    };
    reader.onerror = () => {
      setArticleUploadError('Gagal membaca file gambar.');
      setArticleUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Open property modal for Add
  const handleOpenAdd = () => {
    setEditingProp({
      title: '',
      category: 'Secondary',
      type: 'rumah hunian',
      price: undefined,
      location: '',
      mapsUrl: '',
      image: '',
      description: '',
      status: 'tersedia',
      landArea: '',
      buildingArea: '',
      rooms: undefined,
      bathrooms: undefined,
      floors: undefined,
      electricity: '',
      water: '',
      facing: '',
      streetWidth: '',
      furnished: 'Unfurnished',
      whatsappMessage: ''
    });
    setFormError('');
    setShowFormModal(true);
  };

  // Open property modal for Edit
  const handleOpenEdit = (prop: Property) => {
    setEditingProp({ ...prop });
    setFormError('');
    setShowFormModal(true);
  };

  // Handle saving property (Add or Edit)
  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!editingProp?.title || !editingProp?.type || !editingProp?.price || !editingProp?.location) {
      setFormError('Kolom Judul, Tipe, Harga, dan Lokasi wajib diisi!');
      return;
    }

    if (!editingProp?.image) {
      setFormError('Harap lampirkan gambar properti (bisa upload file atau masukkan URL)!');
      return;
    }

    setFormSaving(true);

    try {
      // Auto generate whatsappMessage if empty
      const updatedProp = { ...editingProp };
      if (!updatedProp.whatsappMessage) {
        updatedProp.whatsappMessage = `Halo Uncle Hadi, saya tertarik dengan properti "${updatedProp.title}" seharga Rp ${Number(updatedProp.price).toLocaleString('id-ID')}. Bisa dibantu jelaskan detail unitnya?`;
      }

      const res = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(updatedProp)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setShowFormModal(false);
        setEditingProp(null);
        fetchData();
        onRefreshProperties(); // refresh the main app context
      } else {
        setFormError(data.error || 'Gagal menyimpan data properti.');
      }
    } catch (err) {
      setFormError('Gagal menghubungi server.');
    } finally {
      setFormSaving(false);
    }
  };

  // Delete Property
  const handleDeleteProperty = (id: string) => {
    triggerConfirm('Apakah Anda yakin ingin menghapus properti ini dari katalog?', async () => {
      try {
        const res = await fetch(`/api/admin/properties/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (res.ok) {
          fetchData();
          onRefreshProperties();
        } else {
          setAlertModal({ isOpen: true, message: 'Gagal menghapus properti.' });
        }
      } catch (err) {
        setAlertModal({ isOpen: true, message: 'Kesalahan jaringan saat menghapus properti.' });
      }
    });
  };

  // Delete Inquiry
  const handleDeleteInquiry = (id: string) => {
    triggerConfirm('Hapus log pengajuan ini?', async () => {
      try {
        const res = await fetch(`/api/admin/inquiries/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (res.ok) {
          fetchData();
        } else {
          setAlertModal({ isOpen: true, message: 'Gagal menghapus pengajuan.' });
        }
      } catch (err) {
        setAlertModal({ isOpen: true, message: 'Kesalahan jaringan.' });
      }
    });
  };

  // Filter properties based on search term
  const filteredProperties = properties.filter(prop => 
    prop.title.toLowerCase().includes(searchPropertyTerm.toLowerCase()) ||
    prop.location.toLowerCase().includes(searchPropertyTerm.toLowerCase())
  );

  // Filter inquiries based on sub-tab and search term
  const filteredInquiriesJual = inquiries.filter(inq => {
    if (inq.type !== 'titip-jual') return false;
    const term = searchInquiryTerm.toLowerCase();
    return !term || 
      inq.name.toLowerCase().includes(term) ||
      inq.phone.toLowerCase().includes(term) ||
      (inq.details?.address && inq.details.address.toLowerCase().includes(term));
  });

  const filteredInquiriesBeli = inquiries.filter(inq => {
    if (inq.type !== 'titip-cari') return false;
    const term = searchInquiryTerm.toLowerCase();
    return !term || 
      inq.name.toLowerCase().includes(term) ||
      inq.phone.toLowerCase().includes(term) ||
      (inq.details?.specificArea && inq.details.specificArea.toLowerCase().includes(term));
  });

  const filteredInquiriesKontak = inquiries.filter(inq => {
    if (inq.type !== 'kontak') return false;
    const term = searchInquiryTerm.toLowerCase();
    return !term || 
      inq.name.toLowerCase().includes(term) ||
      inq.phone.toLowerCase().includes(term) ||
      (inq.details?.message && inq.details.message.toLowerCase().includes(term));
  });

  // Filter articles based on search term
  const filteredArticles = (articles || []).filter(art => {
    const term = searchArticleTerm.toLowerCase();
    return !term ||
      art.title.toLowerCase().includes(term) ||
      art.category.toLowerCase().includes(term) ||
      art.summary.toLowerCase().includes(term);
  });

  // Render Login Card
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center px-4" id="admin-login-screen">
        <div className="max-w-md w-full bg-slate-900 border border-[#D4A017]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Dynamic Light Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A017]/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#AA7C11]/5 rounded-full filter blur-3xl"></div>

          {/* Return Button */}
          <button 
            onClick={onBackToWebsite}
            className="absolute top-6 left-6 text-xs text-gray-400 hover:text-[#D4A017] flex items-center gap-1.5 transition duration-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali
          </button>

          <div className="text-center space-y-3 mb-8 pt-4">
            <div className="bg-gradient-to-br from-[#D4A017] to-[#AA7C11] p-3 rounded-2xl w-14 h-14 mx-auto flex items-center justify-center shadow-lg">
              <Lock className="h-6 w-6 text-[#0F172A]" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Admin Portal</h2>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Masuk menggunakan kredensial resmi administrator untuk memantau pengajuan masuk dan mengelola katalog properti.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs flex items-start gap-2 animate-shake">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-2xs font-extrabold text-gray-400 uppercase tracking-widest mb-2">Username Admin</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-2xs font-extrabold text-gray-400 uppercase tracking-widest mb-2">Password Admin</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#D4A017] hover:bg-[#AA7C11] text-[#0F172A] font-extrabold text-sm py-3.5 rounded-xl transition duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-700 disabled:text-slate-500"
            >
              {loginLoading ? 'Memproses Masuk...' : 'Masuk Dashboard'}
              <LogIn className="h-4 w-4" />
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-500 mt-8">
            Keamanan Terenkripsi. Kredensial tidak disimpan dalam browser atau kode klien.
          </p>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800" id="admin-dashboard-layout">
      
      {/* Header Panel */}
      <header className="bg-[#0F172A] text-white py-4 px-6 border-b border-[#D4A017]/30 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-[#D4A017] p-2 rounded-xl text-[#0F172A] shadow">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-black block tracking-tight">
              Uncle Hadi<span className="text-[#D4A017]">.Property</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider block">
              Sistem Admin Kendali & Monitoring
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToWebsite}
            className="text-xs text-slate-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-slate-800 border border-slate-700/60 transition flex items-center gap-1.5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Lihat Web
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 px-3.5 py-2 rounded-xl hover:bg-red-500/10 border border-red-500/20 transition flex items-center gap-1.5"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main content body with tabs */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-4 border-r border-slate-800 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div className="px-2">
              <p className="text-2xs font-extrabold text-slate-500 uppercase tracking-widest">Menu Navigasi</p>
            </div>
            
            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveSubTab('properties')}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeSubTab === 'properties'
                    ? 'bg-[#D4A017] text-[#0F172A]'
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Building className="h-4 w-4 mr-2.5" />
                Property
              </button>

              <button
                onClick={() => setActiveSubTab('inquiries_jual')}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition relative ${
                  activeSubTab === 'inquiries_jual'
                    ? 'bg-[#D4A017] text-[#0F172A]'
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <FileText className="h-4 w-4 mr-2.5" />
                Titip Jual
                {inquiries.filter(i => i.type === 'titip-jual').length > 0 && (
                  <span className="absolute right-4 bg-amber-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-slate-900">
                    {inquiries.filter(i => i.type === 'titip-jual').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveSubTab('inquiries_beli')}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition relative ${
                  activeSubTab === 'inquiries_beli'
                    ? 'bg-[#D4A017] text-[#0F172A]'
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Search className="h-4 w-4 mr-2.5" />
                Titip Beli
                {inquiries.filter(i => i.type === 'titip-cari').length > 0 && (
                  <span className="absolute right-4 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-slate-900">
                    {inquiries.filter(i => i.type === 'titip-cari').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveSubTab('inquiries_kontak')}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition relative ${
                  activeSubTab === 'inquiries_kontak'
                    ? 'bg-[#D4A017] text-[#0F172A]'
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-2.5" />
                Kontak
                {inquiries.filter(i => i.type === 'kontak').length > 0 && (
                  <span className="absolute right-4 bg-teal-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-slate-900">
                    {inquiries.filter(i => i.type === 'kontak').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveSubTab('articles')}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeSubTab === 'articles'
                    ? 'bg-[#D4A017] text-[#0F172A]'
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="h-4 w-4 mr-2.5" />
                Edukasi
              </button>

              <button
                onClick={() => setActiveSubTab('ai-property')}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeSubTab === 'ai-property'
                    ? 'bg-[#D4A017] text-[#0F172A]'
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles className="h-4 w-4 mr-2.5" />
                AI Property
              </button>

              <button
                onClick={() => setActiveSubTab('founder')}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeSubTab === 'founder'
                    ? 'bg-[#D4A017] text-[#0F172A]'
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <User className="h-4 w-4 mr-2.5" />
                Tentang Saya
              </button>

              <button
                onClick={() => setActiveSubTab('settings')}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeSubTab === 'settings'
                    ? 'bg-[#D4A017] text-[#0F172A]'
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <Settings className="h-4 w-4 mr-2.5" />
                Logo & Tampilan
              </button>
            </nav>
          </div>

          <div className="p-2 border-t border-slate-800/60 pt-4 text-center">
            <p className="text-4xs text-slate-500 font-semibold tracking-widest uppercase">Admin Terminal v1.2</p>
          </div>
        </aside>

        {/* Content Section */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* SubTab 1: Manajemen Properti */}
          {activeSubTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Katalog Properti Pilihan</h1>
                  <p className="text-xs text-gray-500">Tambah, ubah spesifikasi, edit penawaran harga, atau ganti foto dari daftar properti secara langsung.</p>
                </div>
                <button
                  onClick={handleOpenAdd}
                  className="bg-[#D4A017] hover:bg-[#C29014] text-[#0F172A] font-extrabold text-xs px-5 py-3 rounded-xl transition shadow flex items-center justify-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus className="h-4 w-4" />
                  Tambah Unit Baru
                </button>
              </div>

              {/* Filtering bar */}
              <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-4 flex items-center relative">
                <Search className="absolute left-7 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari properti berdasarkan judul atau wilayah..."
                  value={searchPropertyTerm}
                  onChange={(e) => setSearchPropertyTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                />
              </div>

              {/* Data Table */}
              {dataLoading ? (
                <div className="text-center py-20 text-gray-500 font-semibold">Memuat katalog properti...</div>
              ) : filteredProperties.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                          <th className="py-4 px-6">Foto & Judul</th>
                          <th className="py-4 px-6">Kategori / Tipe</th>
                          <th className="py-4 px-6">Lokasi</th>
                          <th className="py-4 px-6">Harga Penawaran</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {filteredProperties.map((prop) => (
                          <tr key={prop.id} className="hover:bg-slate-50/50 transition">
                            {/* Title & Image */}
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-4">
                                <img 
                                  src={prop.image} 
                                  alt={prop.title} 
                                  className="w-16 h-12 rounded-lg object-cover shrink-0 border border-gray-100"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=120&q=80';
                                  }}
                                />
                                <div className="max-w-xs">
                                  <span className="block font-bold text-gray-900 line-clamp-1">{prop.title}</span>
                                  <span className="block text-[10px] text-gray-400 font-mono">ID: {prop.id}</span>
                                </div>
                              </div>
                            </td>
                            {/* Category & Type */}
                            <td className="py-4 px-6">
                              <span className={`inline-block text-[10px] font-extrabold uppercase px-2 py-1 rounded mr-2 ${
                                prop.category === 'Primary' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                              }`}>
                                {prop.category}
                              </span>
                              <span className="text-xs text-gray-500 capitalize">{prop.type}</span>
                            </td>
                            {/* Location */}
                            <td className="py-4 px-6 text-gray-600 font-medium">
                              {prop.location}
                            </td>
                            {/* Price */}
                            <td className="py-4 px-6 text-gray-900 font-extrabold">
                              {prop.priceFormatted}
                            </td>
                            {/* Status */}
                            <td className="py-4 px-6">
                              <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded-full border uppercase ${
                                prop.status === 'tersedia' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 
                                prop.status === 'tersewa' ? 'bg-orange-50 border-orange-100 text-orange-600' : 
                                'bg-red-50 border-red-100 text-red-600'
                              }`}>
                                {prop.status}
                              </span>
                            </td>
                            {/* Actions */}
                            <td className="py-4 px-6 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEdit(prop)}
                                  className="p-2 bg-slate-100 hover:bg-[#D4A017] hover:text-[#0F172A] rounded-lg transition"
                                  title="Edit Properti"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProperty(prop.id)}
                                  className="p-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg transition"
                                  title="Hapus Properti"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-dashed rounded-3xl p-8">
                  <ShieldAlert className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-semibold text-sm">Tidak ada properti yang ditemukan</p>
                  <p className="text-xs text-gray-400 mt-1">Coba sesuaikan kata pencarian Anda.</p>
                </div>
              )}
            </div>
          )}

          {/* SubTab 2A: Monitoring Titip Jual */}
          {activeSubTab === 'inquiries_jual' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Permohonan Titip Jual / Sewa</h1>
                <p className="text-xs text-gray-500">Monitor dan kelola setiap pengajuan "Titip Jual" yang dikirim pemilik properti secara instan.</p>
              </div>

              {/* Filtering and search widgets */}
              <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari pengaju berdasarkan nama, nomor telepon, alamat..."
                    value={searchInquiryTerm}
                    onChange={(e) => setSearchInquiryTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                  />
                </div>
              </div>

              {/* Inquiries list */}
              {dataLoading ? (
                <div className="text-center py-20 text-gray-500 font-semibold">Memuat data pengajuan...</div>
              ) : filteredInquiriesJual.length > 0 ? (
                <div className="space-y-4">
                  {filteredInquiriesJual.map((inq) => (
                    <div 
                      key={inq.id}
                      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow transition relative animate-in fade-in duration-200"
                    >
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border bg-gradient-to-r from-orange-500 to-amber-600 text-white">
                            Titip Jual/Sewa
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(inq.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-xl transition"
                          title="Hapus Log"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Content details split */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Pengaju Info Column */}
                        <div className="space-y-2 border-r border-gray-100/80 pr-2">
                          <span className="block text-2xs font-extrabold uppercase text-gray-400 tracking-wider">Identitas Pengaju</span>
                          <div className="space-y-1.5">
                            <span className="block text-base font-black text-slate-900">{inq.name}</span>
                            <span className="block text-xs text-gray-600 font-semibold">{inq.phone}</span>
                            <div className="pt-2">
                              <a 
                                href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(inq.name)},%20saya%20Hadi%20dari%20Uncle%20Hadi%20Property.%20Saya%20melihat%20pengajuan%20titip%20jual%20Anda.`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-3xs uppercase tracking-wider px-3 py-2 rounded-lg transition"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                                Hubungi via WA
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Details content column */}
                        <div className="md:col-span-2 space-y-3">
                          <span className="block text-2xs font-extrabold uppercase text-gray-400 tracking-wider">Spesifikasi Properti</span>
                          
                          {inq.details && (
                            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl text-xs text-gray-700 border border-gray-100">
                              <div className="col-span-2">
                                <strong className="text-gray-400 block uppercase text-3xs">Alamat Properti:</strong>
                                <span className="font-semibold text-slate-800">{inq.details.address}</span>
                              </div>
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Harga Penawaran:</strong>
                                <span className="font-extrabold text-slate-900">Rp {inq.details.price} ({inq.details.actionType})</span>
                              </div>
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Sertifikat:</strong>
                                <span className="font-semibold text-slate-800">{inq.details.certificate}</span>
                              </div>
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Dimensi Tanah:</strong>
                                <span className="font-semibold text-slate-800">{inq.details.landLength}m x {inq.details.landWidth}m</span>
                              </div>
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Luas Bangunan:</strong>
                                <span className="font-semibold text-slate-800">{inq.details.buildingArea} m² ({inq.details.floors} Lantai)</span>
                              </div>
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Kamar:</strong>
                                <span className="font-semibold text-slate-800">{inq.details.bedrooms} KT / {inq.details.bathrooms} KM</span>
                              </div>
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Kelisrikan & Air:</strong>
                                <span className="font-semibold text-slate-800">{inq.details.electricity} / {inq.details.water}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-dashed rounded-3xl p-8 animate-in fade-in duration-200">
                  <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-semibold text-sm">Tidak ada permohonan titip jual</p>
                  <p className="text-xs text-gray-400 mt-1">Belum ada pemohon titip jual yang mendaftarkan formulir.</p>
                </div>
              )}
            </div>
          )}

          {/* SubTab 2B: Monitoring Titip Beli */}
          {activeSubTab === 'inquiries_beli' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Permohonan Titip Beli / Cari Properti</h1>
                <p className="text-xs text-gray-500">Monitor dan kelola setiap kebutuhan cari properti dari calon pembeli secara transparan.</p>
              </div>

              {/* Filtering and search widgets */}
              <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari pengaju berdasarkan nama, nomor telepon, wilayah dicari..."
                    value={searchInquiryTerm}
                    onChange={(e) => setSearchInquiryTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                  />
                </div>
              </div>

              {/* Inquiries list */}
              {dataLoading ? (
                <div className="text-center py-20 text-gray-500 font-semibold">Memuat data pengajuan...</div>
              ) : filteredInquiriesBeli.length > 0 ? (
                <div className="space-y-4">
                  {filteredInquiriesBeli.map((inq) => (
                    <div 
                      key={inq.id}
                      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow transition relative animate-in fade-in duration-200"
                    >
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border bg-gradient-to-r from-indigo-500 to-violet-600 text-white">
                            Titip Cari/Beli
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(inq.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-xl transition"
                          title="Hapus Log"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Content details split */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Pengaju Info Column */}
                        <div className="space-y-2 border-r border-gray-100/80 pr-2">
                          <span className="block text-2xs font-extrabold uppercase text-gray-400 tracking-wider">Identitas Pengaju</span>
                          <div className="space-y-1.5">
                            <span className="block text-base font-black text-slate-900">{inq.name}</span>
                            <span className="block text-xs text-gray-600 font-semibold">{inq.phone}</span>
                            <div className="pt-2">
                              <a 
                                href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(inq.name)},%20saya%20Hadi%20dari%20Uncle%20Hadi%20Property.%20Saya%20melihat%20minat%20beli%20Anda.`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-3xs uppercase tracking-wider px-3 py-2 rounded-lg transition"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                                Hubungi via WA
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Details content column */}
                        <div className="md:col-span-2 space-y-3">
                          <span className="block text-2xs font-extrabold uppercase text-gray-400 tracking-wider">Kriteria Pembelian</span>
                          
                          {inq.details && (
                            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl text-xs text-gray-700 border border-gray-100">
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Tipe Layanan:</strong>
                                <span className="font-extrabold text-[#0F172A]">{inq.details.dealType} {inq.details.propertyType}</span>
                              </div>
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Budget Dana:</strong>
                                <span className="font-extrabold text-slate-900">Rp {inq.details.budget}</span>
                              </div>
                              <div className="col-span-2">
                                <strong className="text-gray-400 block uppercase text-3xs">Wilayah Spesifik Yang Dicari:</strong>
                                <span className="font-semibold text-slate-800">{inq.details.specificArea}</span>
                              </div>
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Min Luas Tanah / Jalan:</strong>
                                <span className="font-semibold text-slate-800">{inq.details.landArea || 'Bebas'} m² / Min {inq.details.streetWidth || 'Bebas'} m</span>
                              </div>
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Domisili Klien:</strong>
                                <span className="font-semibold text-slate-800">{inq.details.clientDomicile}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-dashed rounded-3xl p-8 animate-in fade-in duration-200">
                  <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-semibold text-sm">Tidak ada permohonan titip beli</p>
                  <p className="text-xs text-gray-400 mt-1">Belum ada pemohon titip beli yang mendaftarkan formulir.</p>
                </div>
              )}
            </div>
          )}

          {/* SubTab 2C: Monitoring Pesan Kontak */}
          {activeSubTab === 'inquiries_kontak' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Pesan Kontak & Konsultasi</h1>
                <p className="text-xs text-gray-500">Monitor dan kelola setiap pesan kontak langsung maupun permohonan konsultasi dari pengunjung.</p>
              </div>

              {/* Filtering and search widgets */}
              <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari pengaju berdasarkan nama, nomor telepon, pesan..."
                    value={searchInquiryTerm}
                    onChange={(e) => setSearchInquiryTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                  />
                </div>
              </div>

              {/* Inquiries list */}
              {dataLoading ? (
                <div className="text-center py-20 text-gray-500 font-semibold">Memuat data pengajuan...</div>
              ) : filteredInquiriesKontak.length > 0 ? (
                <div className="space-y-4">
                  {filteredInquiriesKontak.map((inq) => (
                    <div 
                      key={inq.id}
                      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow transition relative animate-in fade-in duration-200"
                    >
                      {/* Top Header Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
                            Kontak/Pesan
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(inq.timestamp).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-xl transition"
                          title="Hapus Log"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Content details split */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Pengaju Info Column */}
                        <div className="space-y-2 border-r border-gray-100/80 pr-2">
                          <span className="block text-2xs font-extrabold uppercase text-gray-400 tracking-wider">Identitas Pengaju</span>
                          <div className="space-y-1.5">
                            <span className="block text-base font-black text-slate-900">{inq.name}</span>
                            <span className="block text-xs text-gray-600 font-semibold">{inq.phone}</span>
                            <div className="pt-2">
                              <a 
                                href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(inq.name)},%20saya%20Hadi%20dari%20Uncle%20Hadi%20Property.`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-3xs uppercase tracking-wider px-3 py-2 rounded-lg transition"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                                Hubungi via WA
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Details content column */}
                        <div className="md:col-span-2 space-y-3">
                          <span className="block text-2xs font-extrabold uppercase text-gray-400 tracking-wider">Pesan Masuk</span>
                          
                          {inq.details && (
                            <div className="bg-slate-50 p-4 rounded-xl text-xs text-gray-700 border border-gray-100 space-y-2">
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Topik Konsultasi:</strong>
                                <span className="font-bold text-slate-800">{inq.details.subject}</span>
                              </div>
                              <div>
                                <strong className="text-gray-400 block uppercase text-3xs">Isi Pesan:</strong>
                                <span className="block font-medium text-slate-700 leading-relaxed italic whitespace-pre-line bg-white p-2.5 rounded-lg border border-gray-200 mt-1">"{inq.details.message}"</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-dashed rounded-3xl p-8 animate-in fade-in duration-200">
                  <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-semibold text-sm">Tidak ada pesan kontak</p>
                  <p className="text-xs text-gray-400 mt-1">Belum ada pesan masuk dari form hubungi kami.</p>
                </div>
              )}
            </div>
          )}

          {/* SubTab 2D: Manajemen Artikel Edukasi */}
          {activeSubTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Manajemen Artikel Edukasi</h1>
                  <p className="text-xs text-gray-500">Tulis, edit, hapus, dan unggah foto artikel edukasi properti yang akan dibaca pengunjung web.</p>
                </div>
                <button
                  onClick={handleOpenAddArticle}
                  className="bg-[#D4A017] hover:bg-[#C29014] text-[#0F172A] font-extrabold text-xs px-5 py-3 rounded-xl transition shadow flex items-center justify-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus className="h-4 w-4" />
                  Tambah Artikel Baru
                </button>
              </div>

              {/* Search article bar */}
              <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari artikel berdasarkan judul atau kategori..."
                    value={searchArticleTerm}
                    onChange={(e) => setSearchArticleTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                  />
                </div>
              </div>

              {/* Article table */}
              {filteredArticles.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden animate-in fade-in duration-200">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                          <th className="py-4 px-6">Foto & Judul</th>
                          <th className="py-4 px-6">Kategori</th>
                          <th className="py-4 px-6">Tanggal Upload</th>
                          <th className="py-4 px-6">Waktu Baca</th>
                          <th className="py-4 px-6 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {filteredArticles.map((art) => (
                          <tr key={art.id} className="hover:bg-slate-50/50 transition">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-4">
                                <img
                                  src={art.image}
                                  alt={art.title}
                                  className="w-16 h-12 rounded-lg object-cover shrink-0 border border-gray-100"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=120&q=80';
                                  }}
                                />
                                <div className="max-w-md">
                                  <span className="block font-bold text-gray-900 line-clamp-1">{art.title}</span>
                                  <span className="block text-2xs text-gray-400 line-clamp-1 mt-0.5">{art.summary}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                {art.category}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-gray-500 text-xs">
                              {art.date}
                            </td>
                            <td className="py-4 px-6 text-gray-900 font-semibold text-xs">
                              {art.readTime}
                            </td>
                            <td className="py-4 px-6 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditArticle(art)}
                                  className="p-2 bg-slate-100 hover:bg-[#D4A017] hover:text-[#0F172A] rounded-lg transition"
                                  title="Edit Artikel"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteArticle(art.id)}
                                  className="p-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg transition"
                                  title="Hapus Artikel"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-dashed rounded-3xl p-8 animate-in fade-in duration-200">
                  <BookOpen className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-semibold text-sm">Tidak ada artikel yang ditemukan</p>
                  <p className="text-xs text-gray-400 mt-1">Coba tulis artikel edukasi baru pertama Anda!</p>
                </div>
              )}
            </div>
          )}

          {/* SubTab 2E: Konfigurasi AI Property Assistant */}
          {activeSubTab === 'ai-property' && (
            <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
              <div>
                <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Pengaturan Asisten AI (Uncle Hadi AI)</h1>
                <p className="text-xs text-gray-500">Sesuaikan kepribadian, instruksi sistem, promosi unit, atau cara komunikasi yang dipakai bot AI Anda saat mengobrol dengan calon pembeli.</p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100">
                <form onSubmit={handleSaveFounderSettings} className="space-y-6">
                  {settingsError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-xs flex items-start gap-2.5">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{settingsError}</span>
                    </div>
                  )}

                  {settingsSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-4 rounded-xl text-xs flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{settingsSuccess}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="block text-xs font-black text-[#0F172A] uppercase tracking-wider">Instruksi Sistem AI (System Prompt / Persona)</label>
                    <p className="text-2xs text-gray-500 leading-relaxed">
                      Ubah teks di bawah untuk merestrukturisasi cara Uncle Hadi AI menjawab pertanyaan. Anda bisa menginstruksikannya mempromosikan unit tertentu, melarang menjawab di luar lingkup properti, menggunakan bahasa kasual atau formal, dll.
                    </p>
                    <textarea
                      rows={14}
                      value={systemInstruction}
                      onChange={(e) => setSystemInstruction(e.target.value)}
                      placeholder="Masukkan instruksi khusus untuk asisten AI di sini..."
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-2xl p-4 text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#D4A017] leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="bg-[#0F172A] hover:bg-[#1E293B] text-[#D4A017] font-black text-xs px-6 py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2"
                    >
                      {isSavingSettings ? 'Menyimpan...' : 'Simpan Prompt AI'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        triggerConfirm('Apakah Anda yakin ingin mengembalikan instruksi AI ke default bawaan pabrik?', () => {
                          setSystemInstruction(
                            `Anda adalah "Uncle Hadi AI", asisten properti virtual berlisensi, jujur, amanah, dan jenaka yang mewakili Hadi Sukmono (Uncle Hadi), agen real estat legendaris Bekasi, Jakarta Timur, Cikarang, dan sekitarnya.\n\nFokus utama Anda:\n1. Bantu pengguna mencari unit hunian ideal, ruko produktif, tanah strategis, atau KPR.\n2. Berikan informasi transparan, detail teknis jujur, and hitungan finansial cerdas.\n3. Pertahankan gaya bicara humoris, interaktif, penuh kearifan lokal, ramah, amanah, tanpa mengorbankan profesionalisme.\n4. Ajak pengguna menghubungi WhatsApp Uncle Hadi (+6281234567890) jika butuh kunjungan survey lapangan.`
                          );
                        });
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs px-5 py-3.5 rounded-xl transition"
                    >
                      Reset ke Default
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* SubTab 3: Logo & Tampilan Website */}
          {activeSubTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Logo & Tampilan Website</h1>
                <p className="text-xs text-gray-500">Kelola identitas merek, slogan, teks logo, serta gambar hero banner yang dipajang di halaman depan website.</p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100">
                <form onSubmit={handleSaveFounderSettings} className="space-y-8">
                  {settingsError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-xs flex items-start gap-2.5">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{settingsError}</span>
                    </div>
                  )}

                  {settingsSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-4 rounded-xl text-xs flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{settingsSuccess}</span>
                    </div>
                  )}

                  {/* 1A. IDENTITAS MEREK & LOGO WEBSITE */}
                  <div className="space-y-4 border-b border-gray-100 pb-6">
                    <h3 className="text-sm font-black text-[#0F172A] border-l-4 border-[#D4A017] pl-3">1A. Konfigurasi Identitas & Logo Merek</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Teks Utama Logo</label>
                        <input
                          type="text"
                          value={logoText}
                          onChange={(e) => setLogoText(e.target.value)}
                          placeholder="Contoh: Uncle Hadi"
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Teks Suffix Samping Logo</label>
                        <input
                          type="text"
                          value={logoColorText}
                          onChange={(e) => setLogoColorText(e.target.value)}
                          placeholder="Contoh: .Property"
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Slogan Singkat Di Header</label>
                        <input
                          type="text"
                          value={logoSlogan}
                          onChange={(e) => setLogoSlogan(e.target.value)}
                          placeholder="Contoh: Teman Cari Property"
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>

                    {/* Upload Logo Gambar */}
                    <div className="pt-2">
                      <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Gambar Logo Kustom (Opsional)</label>
                      <div className="flex items-center gap-4">
                        {logoImageUrl ? (
                          <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center">
                            <img src={logoImageUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-xl border border-dashed border-gray-200 shrink-0 flex items-center justify-center text-gray-300">
                            <ImageIcon className="h-6 w-6" />
                          </div>
                        )}
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                            id="upload-logo-img-input"
                          />
                          <label
                            htmlFor="upload-logo-img-input"
                            className="cursor-pointer inline-flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                          >
                            <Upload className="h-3.5 w-3.5" />
                            {uploadLogoLoading ? 'Mengunggah...' : 'Unggah Logo Kustom'}
                          </label>
                          <p className="text-3xs text-gray-400 mt-1">
                            Disarankan rasio kotak (1:1), format PNG/JPG transparan. Jika diunggah, ini akan menggantikan icon bangunan default di header/footer.
                          </p>
                        </div>
                        {logoImageUrl && (
                          <button
                            type="button"
                            onClick={() => setLogoImageUrl('')}
                            className="text-red-500 hover:text-red-700 text-xs font-semibold"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 1B. SEKSI HERO BANNER - SLIDE 1 */}
                  <div className="space-y-4 border-b border-gray-100 pb-6">
                    <h3 className="text-sm font-black text-[#0F172A] border-l-4 border-[#D4A017] pl-3">1B. Hero Banner - Slide 1 (Utama)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Judul Slide 1</label>
                        <input
                          type="text"
                          value={heroTitle}
                          onChange={(e) => setHeroTitle(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Badge Slogan Slide 1</label>
                        <input
                          type="text"
                          value={founderBrand}
                          onChange={(e) => setFounderBrand(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Sub-judul Slide 1</label>
                        <textarea
                          rows={2}
                          value={heroSubtitle}
                          onChange={(e) => setHeroSubtitle(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>

                    {/* Hero Background Image Upload & Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-gray-100 text-center">
                        <span className="text-4xs font-extrabold text-gray-400 uppercase tracking-widest mb-2">Pratinjau Slide 1</span>
                        <div className="w-full h-24 rounded-xl overflow-hidden shadow-inner bg-slate-200 relative border border-gray-200">
                          {heroBgImage ? (
                            <img src={heroBgImage} alt="Hero Background" className="w-full h-full object-cover animate-in fade-in" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xs">Kosong</div>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1">Unggah Foto Background Slide 1 Baru</label>
                          <div className="border border-dashed border-gray-200 hover:border-[#D4A017] rounded-xl p-3 text-center cursor-pointer relative transition bg-slate-50/50 group">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleHeroBgUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <p className="text-3xs font-bold text-slate-700 group-hover:text-[#D4A017] transition-colors">
                              Klik / seret file gambar ke sini untuk mengganti background rumah
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1">Atau URL Background Slide 1</label>
                          <input
                            type="text"
                            placeholder="https://contoh.com/gambar.jpg"
                            value={heroBgImage}
                            onChange={(e) => setHeroBgImage(e.target.value)}
                            className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-3xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 1C. SEKSI HERO BANNER - SLIDE 2 */}
                  <div className="space-y-4 border-b border-gray-100 pb-6">
                    <h3 className="text-sm font-black text-[#0F172A] border-l-4 border-[#D4A017] pl-3">1C. Hero Banner - Slide 2</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Judul Slide 2</label>
                        <input
                          type="text"
                          value={slide2Title}
                          onChange={(e) => setSlide2Title(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Badge Slogan Slide 2</label>
                        <input
                          type="text"
                          value={slide2Badge}
                          onChange={(e) => setSlide2Badge(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Sub-judul Slide 2</label>
                        <textarea
                          rows={2}
                          value={slide2Subtitle}
                          onChange={(e) => setSlide2Subtitle(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-gray-100 text-center">
                        <span className="text-4xs font-extrabold text-gray-400 uppercase tracking-widest mb-2">Pratinjau Slide 2</span>
                        <div className="w-full h-24 rounded-xl overflow-hidden shadow-inner bg-slate-200 relative border border-gray-200">
                          {slide2Image ? (
                            <img src={slide2Image} alt="Slide 2 Background" className="w-full h-full object-cover animate-in fade-in" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xs">Kosong</div>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-8">
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">URL Gambar Background Slide 2</label>
                        <input
                          type="text"
                          placeholder="https://contoh.com/gambar.jpg"
                          value={slide2Image}
                          onChange={(e) => setSlide2Image(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 1D. SEKSI HERO BANNER - SLIDE 3 */}
                  <div className="space-y-4 pb-4">
                    <h3 className="text-sm font-black text-[#0F172A] border-l-4 border-[#D4A017] pl-3">1D. Hero Banner - Slide 3</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Judul Slide 3</label>
                        <input
                          type="text"
                          value={slide3Title}
                          onChange={(e) => setSlide3Title(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Badge Slogan Slide 3</label>
                        <input
                          type="text"
                          value={slide3Badge}
                          onChange={(e) => setSlide3Badge(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Sub-judul Slide 3</label>
                        <textarea
                          rows={2}
                          value={slide3Subtitle}
                          onChange={(e) => setSlide3Subtitle(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-gray-100 text-center">
                        <span className="text-4xs font-extrabold text-gray-400 uppercase tracking-widest mb-2">Pratinjau Slide 3</span>
                        <div className="w-full h-24 rounded-xl overflow-hidden shadow-inner bg-slate-200 relative border border-gray-200">
                          {slide3Image ? (
                            <img src={slide3Image} alt="Slide 3 Background" className="w-full h-full object-cover animate-in fade-in" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xs">Kosong</div>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-8">
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">URL Gambar Background Slide 3</label>
                        <input
                          type="text"
                          placeholder="https://contoh.com/gambar.jpg"
                          value={slide3Image}
                          onChange={(e) => setSlide3Image(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="bg-[#D4A017] hover:bg-[#C29014] text-[#0F172A] font-extrabold text-xs px-8 py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isSavingSettings ? 'Menyimpan...' : 'Simpan Tampilan Web'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* SubTab 3.5: Profil Founder */}
          {activeSubTab === 'founder' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Profil & Informasi Founder</h1>
                <p className="text-xs text-gray-500">Kelola foto profil founder, kutipan sambutan, deskripsi biografi, serta kontak kantor agensi Anda secara instan.</p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100">
                <form onSubmit={handleSaveFounderSettings} className="space-y-8">
                  {settingsError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-xs flex items-start gap-2.5">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{settingsError}</span>
                    </div>
                  )}

                  {settingsSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-4 rounded-xl text-xs flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{settingsSuccess}</span>
                    </div>
                  )}

                  {/* 2. SEKSI PROFIL FOUNDER */}
                  <div className="space-y-4 border-b border-gray-100 pb-6">
                    <h3 className="text-sm font-black text-[#0F172A] border-l-4 border-[#D4A017] pl-3">2. Konfigurasi Profil Founder</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Nama Founder</label>
                        <input
                          type="text"
                          value={founderName}
                          onChange={(e) => setFounderName(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Gelar / Jabatan Founder</label>
                        <input
                          type="text"
                          value={founderTitle}
                          onChange={(e) => setFounderTitle(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                      {/* Live Preview Column */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-gray-100 text-center">
                        <span className="text-4xs font-extrabold text-gray-400 uppercase tracking-widest mb-2">Foto Profil Founder</span>
                        <div className="w-24 h-24 rounded-full border-2 border-[#D4A017] overflow-hidden shadow-md bg-slate-200 relative">
                          {founderPhotoUrl ? (
                            <img src={founderPhotoUrl} alt="Foto Founder" className="w-full h-full object-cover animate-in fade-in" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400"><User className="h-6 w-6" /></div>
                          )}
                          {uploadFounderLoading && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white"><span className="text-3xs font-bold">...</span></div>
                          )}
                        </div>
                      </div>

                      {/* Inputs and Controls Column */}
                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1">Unggah Foto Profil Founder</label>
                          <div className="border border-dashed border-gray-200 hover:border-[#D4A017] rounded-xl p-3 text-center cursor-pointer relative transition bg-slate-50/50 group">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFounderPhotoUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <p className="text-3xs font-bold text-slate-700 group-hover:text-[#D4A017] transition-colors">
                              Klik / seret file gambar untuk mengganti foto founder
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1">Atau URL Foto Profil</label>
                          <input
                            type="text"
                            value={founderPhotoUrl}
                            onChange={(e) => setFounderPhotoUrl(e.target.value)}
                            className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-3xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. SEKSI TENTANG SAYA */}
                  <div className="space-y-4 border-b border-gray-100 pb-6">
                    <h3 className="text-sm font-black text-[#0F172A] border-l-4 border-[#D4A017] pl-3">3. Konfigurasi Halaman Tentang Saya</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Judul Sambutan Tentang Saya</label>
                        <input
                          type="text"
                          value={aboutHeading}
                          onChange={(e) => setAboutHeading(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Paragraf Pembuka (About Text 1)</label>
                        <textarea
                          rows={3}
                          value={aboutText1}
                          onChange={(e) => setAboutText1(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Kutipan / Quote Kunci</label>
                        <input
                          type="text"
                          value={aboutQuote}
                          onChange={(e) => setAboutQuote(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Paragraf Penutup (About Text 2)</label>
                        <textarea
                          rows={3}
                          value={aboutText2}
                          onChange={(e) => setAboutText2(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. KONTAK UTAMA */}
                  <div className="space-y-4 pb-4">
                    <h3 className="text-sm font-black text-[#0F172A] border-l-4 border-[#D4A017] pl-3">4. Konfigurasi Kontak & Kantor (Footer & Info)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Nomor WhatsApp Agen (Tanpa +, contoh: 6281234567890)</label>
                        <input
                          type="text"
                          value={whatsAppNo}
                          onChange={(e) => setWhatsAppNo(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Nomor Telepon Kantor (Format Bebas)</label>
                        <input
                          type="text"
                          value={officePhone}
                          onChange={(e) => setOfficePhone(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div>
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Email Kantor / Hubungi</label>
                        <input
                          type="email"
                          value={officeEmail}
                          onChange={(e) => setOfficeEmail(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-3xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Alamat Kantor Lengkap</label>
                        <textarea
                          rows={2}
                          value={officeAddress}
                          onChange={(e) => setOfficeAddress(e.target.value)}
                          className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={isSavingSettings || uploadFounderLoading}
                      className="bg-[#D4A017] hover:bg-[#C29014] text-[#0F172A] font-extrabold text-xs px-8 py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isSavingSettings ? 'Menyimpan Perubahan...' : 'Simpan Profil & Kontak'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Property Form Add/Edit Modal */}
      {showFormModal && editingProp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs" id="property-form-modal">
          <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#0F172A] text-white p-5 border-b border-[#D4A017]/30 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                <Building className="h-5 w-5 text-[#D4A017]" />
                {editingProp.id ? 'Edit Data Properti' : 'Tambah Unit Properti Baru'}
              </h3>
              <button
                onClick={() => setShowFormModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full bg-white/5 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content Form Scroll */}
            <form onSubmit={handleSaveProperty} className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6">
              {formError && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs border border-red-100 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Grid 1: Basic Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider border-l-4 border-[#D4A017] pl-2.5">1. Informasi Utama</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Judul Properti <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rumah Bekasi Timur Modern Scandinavia"
                      value={editingProp.title || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kategori Proyek <span className="text-red-500">*</span></label>
                    <select
                      value={editingProp.category || 'Secondary'}
                      onChange={(e: any) => setEditingProp(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700"
                    >
                      <option value="Primary">Primary (Proyek Baru)</option>
                      <option value="Secondary">Secondary (Seken Siap Huni)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Jenis Properti <span className="text-red-500">*</span></label>
                    <select
                      value={editingProp.type || 'rumah hunian'}
                      onChange={(e: any) => setEditingProp(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700"
                    >
                      <option value="rumah hunian">Rumah Hunian</option>
                      <option value="apartement">Apartemen</option>
                      <option value="ruko">Ruko / Komersial</option>
                      <option value="tanah kavling">Tanah Kavling</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Harga Penawaran (Angka) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      required
                      placeholder="Contoh: 850000000"
                      value={editingProp.price || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Status Unit <span className="text-red-500">*</span></label>
                    <select
                      value={editingProp.status || 'tersedia'}
                      onChange={(e: any) => setEditingProp(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700"
                    >
                      <option value="tersedia">Tersedia / Dipasarkan</option>
                      <option value="tersewa">Sudah Tersewa</option>
                      <option value="terjual">Sudah Terjual</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Lokasi / Wilayah <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bekasi Timur, Bekasi"
                      value={editingProp.location || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Link Google Maps</label>
                    <input
                      type="url"
                      placeholder="Contoh: https://maps.google.com/?q=Bekasi"
                      value={editingProp.mapsUrl || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, mapsUrl: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Deskripsi Lengkap Properti <span className="text-red-500">*</span></label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Masukkan deskripsi detail mengenai keunggulan unit properti..."
                    value={editingProp.description || ''}
                    onChange={(e) => setEditingProp(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm"
                  />
                </div>
              </div>

              {/* Grid 2: Media & Image (CRITICAL SPEC - CHANGE & ENTER IMAGE) */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider border-l-4 border-[#D4A017] pl-2.5">2. Gambar Properti</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-gray-200/50 p-5 rounded-2xl">
                  {/* Left option: Drag file upload */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Opsi A: Upload Gambar Dari Komputer</label>
                    <div className="border-2 border-dashed border-gray-300 hover:border-[#D4A017] bg-white rounded-2xl p-6 text-center relative hover:bg-slate-50 transition cursor-pointer flex flex-col justify-center min-h-[140px]">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <span className="block text-xs font-extrabold text-slate-700">Pilih / Seret File Gambar</span>
                      <span className="block text-[10px] text-gray-400 mt-1">Mendukung format JPG, PNG, WEBP. Maksimal 5MB.</span>
                    </div>
                    {uploadLoading && <span className="block text-[11px] text-[#D4A017] font-bold animate-pulse">Mengunggah file ke server...</span>}
                    {uploadError && <span className="block text-[11px] text-red-500 font-bold">⚠️ {uploadError}</span>}
                  </div>

                  {/* Right option: Paste image URL */}
                  <div className="space-y-3 flex flex-col justify-between">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Opsi B: Masukkan URL Gambar (Misal Unsplash)</label>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={editingProp.image || ''}
                        onChange={(e) => setEditingProp(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                      />
                    </div>

                    {/* Preview Image Frame */}
                    {editingProp.image && (
                      <div className="pt-2">
                        <span className="block text-[10px] text-gray-400 font-bold mb-1">Preview Gambar Aktif:</span>
                        <div className="relative h-20 w-32 rounded-lg border border-gray-200 overflow-hidden bg-slate-100 shadow-sm shrink-0">
                          <img 
                            src={editingProp.image} 
                            alt="preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=120&q=80';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setEditingProp(prev => ({ ...prev, image: '' }))}
                            className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white p-0.5 rounded-full"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Grid 3: Structural/Technical Specs */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider border-l-4 border-[#D4A017] pl-2.5">3. Spesifikasi Teknis</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Luas Tanah (LT)</label>
                    <input
                      type="text"
                      placeholder="Contoh: 120 m²"
                      value={editingProp.landArea || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, landArea: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Luas Bangunan (LB)</label>
                    <input
                      type="text"
                      placeholder="Contoh: 90 m²"
                      value={editingProp.buildingArea || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, buildingArea: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Hadap Arah</label>
                    <input
                      type="text"
                      placeholder="Contoh: Utara / Timur"
                      value={editingProp.facing || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, facing: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kamar Tidur</label>
                    <input
                      type="number"
                      placeholder="Contoh: 3"
                      value={editingProp.rooms || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, rooms: e.target.value ? Number(e.target.value) : undefined }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kamar Mandi</label>
                    <input
                      type="number"
                      placeholder="Contoh: 2"
                      value={editingProp.bathrooms || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, bathrooms: e.target.value ? Number(e.target.value) : undefined }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Jumlah Lantai</label>
                    <input
                      type="number"
                      placeholder="Contoh: 2"
                      value={editingProp.floors || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, floors: e.target.value ? Number(e.target.value) : undefined }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Listrik</label>
                    <input
                      type="text"
                      placeholder="Contoh: 2200 VA"
                      value={editingProp.electricity || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, electricity: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Sumber Air</label>
                    <input
                      type="text"
                      placeholder="Contoh: PDAM & Jetpump"
                      value={editingProp.water || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, water: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Lebar Jalan (depan)</label>
                    <input
                      type="text"
                      placeholder="Contoh: 8 meter"
                      value={editingProp.streetWidth || ''}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, streetWidth: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Furnished</label>
                    <select
                      value={editingProp.furnished || 'Unfurnished'}
                      onChange={(e) => setEditingProp(prev => ({ ...prev, furnished: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold"
                    >
                      <option value="Unfurnished">Unfurnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Fully-Furnished">Fully-Furnished</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grid 4: Custom WhatsApp template */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider border-l-4 border-[#D4A017] pl-2.5">4. Pesan WhatsApp Otomatis</h4>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Kustom Format Pesan WA Survey</label>
                  <textarea
                    rows={2}
                    placeholder="Masukkan template pesan yang otomatis dikirim ke WhatsApp Anda saat pengunjung mengklik 'Tanya WA'..."
                    value={editingProp.whatsappMessage || ''}
                    onChange={(e) => setEditingProp(prev => ({ ...prev, whatsappMessage: e.target.value }))}
                    className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-3 text-sm"
                  />
                  <span className="block text-3xs text-gray-400 mt-1">Kosongkan jika ingin sistem membuatkan pesan template secara otomatis berdasarkan judul & harga.</span>
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold text-xs px-5 py-3 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={formSaving}
                  className="bg-[#D4A017] hover:bg-[#C29014] disabled:bg-gray-400 text-[#0F172A] font-extrabold text-xs px-8 py-3.5 rounded-xl transition shadow flex items-center gap-1.5"
                >
                  {formSaving ? 'Menyimpan...' : 'Simpan Unit Properti'}
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Confirm Modal */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-gray-100 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-4">
              <div className="inline-flex p-3 bg-amber-50 text-[#D4A017] rounded-full">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-[#0F172A]">Konfirmasi Tindakan</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{confirmModal.message}</p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setConfirmModal(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-3 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  onClick={confirmModal.onConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-3 rounded-xl transition shadow-lg shadow-red-600/20"
                >
                  Yakin, Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert Modal */}
      {alertModal && alertModal.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-gray-100 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-4">
              <div className="inline-flex p-3 bg-red-50 text-red-600 rounded-full">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-[#0F172A]">Informasi</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{alertModal.message}</p>
              <button
                onClick={() => setAlertModal(null)}
                className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-[#D4A017] font-black text-xs py-3 rounded-xl transition"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
