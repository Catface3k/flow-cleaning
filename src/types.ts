export type ServiceCategory = 'residential' | 'deep' | 'move' | 'commercial' | 'specialty';

export interface CleaningService {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  description: string;
  longDescription: string;
  basePrice: number;
  pricePerSqft: number;
  estimatedHours: string;
  popular?: boolean;
  badge?: string;
  iconName: string;
  heroImage: string;
  highlights: string[];
  includedRooms: {
    room: string;
    tasks: string[];
  }[];
  notIncluded?: string[];
  recommendedFrequency: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMins: number;
  iconName: string;
  category: 'appliances' | 'interior' | 'eco' | 'heavy';
}

export type FrequencyType = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';

export interface BookingDetails {
  id: string;
  serviceId: string;
  serviceName: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  homeType: 'apartment' | 'house' | 'townhouse' | 'office';
  frequency: FrequencyType;
  addOnIds: string[];
  selectedDate: string;
  timeSlot: string;
  address: {
    street: string;
    aptSuite?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    fullName: string;
    email: string;
    phone: string;
  };
  specialInstructions: string;
  hasPets: boolean;
  petDetails?: string;
  entryMethod: 'home' | 'key-lockbox' | 'doorman' | 'hidden-key';
  fragranceFree: boolean;
  pricing: {
    baseRate: number;
    sizeAdjustment: number;
    addOnsTotal: number;
    frequencyDiscount: number;
    frequencyDiscountPercent: number;
    promoDiscount: number;
    promoCode?: string;
    subtotal: number;
    tax: number;
    tip: number;
    total: number;
  };
  status: 'confirmed' | 'in-progress' | 'completed' | 'rescheduled';
  createdAt: string;
  cleanerAssigned?: CleanerProfile;
}

export interface CleanerProfile {
  id: string;
  name: string;
  rating: number;
  totalCleans: number;
  verifiedBackground: boolean;
  backgroundCheckDate: string;
  yearsExperience: number;
  specialty: string;
  avatarUrl: string;
  bio: string;
  badges: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  serviceType: string;
  comment: string;
  verified: boolean;
  cleanerName?: string;
  helpfulCount: number;
}

export interface ChecklistTask {
  id: string;
  task: string;
  isDeepCleanOnly?: boolean;
  ecoSafe: boolean;
  detail: string;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  tasks: ChecklistTask[];
}

export interface LocationCoverage {
  zip: string;
  areaName: string;
  city: string;
  activeCleaners: number;
  status: 'available' | 'high-demand' | 'expanding-soon';
  avgArrivalMinutes: number;
  neighborhoods: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'pricing' | 'service' | 'safety' | 'booking';
}
