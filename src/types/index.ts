// Route types
export type RouteCategory = 'city-tour' | 'inter-city' | 'airport' | 'special-tour';

export interface Route {
  id: string;
  name: string;
  description?: string;
  priceVND: number;
  priceUSD: number;
  price4SeatsVND: number;
  price4SeatsUSD: number;
  price7SeatsVND: number;
  price7SeatsUSD: number;
  image: string;
  category: RouteCategory;
  popular?: boolean;
  vehicle: string;
  nameI18n?: Record<string, string>;
  descriptionI18n?: Record<string, string>;
}

// Booking form data
export interface BookingFormData {
  customerName: string;
  phone: string;
  email?: string;
  language: 'vi' | 'en' | 'fr' | 'zh' | 'ko' | 'ja';
  pickupPoint: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  route?: string;
  notes?: string;
}

// Contact info
export interface ContactInfo {
  hotline: string;
  zalo: string;
  messenger: string;
  whatsapp: string;
  address: string;
}

// Navigation item
export interface NavItem {
  href: string;
  label: string;
  labelKey: string;
}
