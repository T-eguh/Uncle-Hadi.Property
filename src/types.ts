export interface Property {
  id: string;
  title: string;
  category: 'Secondary' | 'Primary';
  type: 'rumah hunian' | 'apartement' | 'ruko' | 'tanah kavling';
  price: number;
  priceFormatted: string;
  landArea?: string; // e.g. "90 m²" or "10 x 15 m"
  buildingArea?: string;
  rooms?: number;
  bathrooms?: number;
  floors?: number;
  location: string;
  mapsUrl: string;
  image: string;
  whatsappMessage: string;
  description: string;
  status: 'tersedia' | 'tersewa' | 'terjual';
  oldPrice?: number;
  rentPrice?: string;
  rentPeriod?: string;
  electricity?: string;
  water?: string;
  furnished?: string;
  facing?: string;
  streetWidth?: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  relation: string; // e.g., "Rekan Kerja", "Teman Kuliah", "Klien Konsultasi"
  text: string;
  rating: number;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
