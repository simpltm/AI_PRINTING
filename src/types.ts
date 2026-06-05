export type Language = 'uz' | 'ru' | 'en';

export interface PrintFormat {
  id: string;
  name: Record<Language, string>;
  dimensions: string;
  ratio: number; // width / height for visual canvas simulation
  basePrice: number;
}

export interface PrintMaterial {
  id: string;
  name: Record<Language, string>;
  multiplier: number;
}

export interface UrgencyOption {
  id: string;
  name: Record<Language, string>;
  multiplier: number;
  timeframe: Record<Language, string>;
}

export interface SampleImage {
  id: string;
  name: Record<Language, string>;
  url: string;
  category: string;
}

export interface SimulationStep {
  id: 'upload' | 'analysis' | 'layout' | 'payment' | 'queue' | 'delivery';
  label: Record<Language, string>;
  description: Record<Language, string>;
  status: 'idle' | 'running' | 'success' | 'error';
}

export interface PricingPlan {
  id: 'start' | 'business' | 'enterprise';
  name: Record<Language, string>;
  tagline: Record<Language, string>;
  price: number;
  features: Record<Language, string[]>;
  badge?: Record<Language, string>;
  icon: string;
}
