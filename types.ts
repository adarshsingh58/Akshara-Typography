
export enum Script {
  HINDI = 'Hindi',
  ENGLISH = 'English',
  MIXED = 'Mixed'
}

export enum Category {
  SERIF = 'Serif',
  SANS = 'Sans Serif',
  DISPLAY = 'Display',
  UI = 'UI'
}

export interface Font {
  id: string;
  name: string;
  family: string;
  scripts: Script[];
  category: Category;
  weights: number[];
  licenseType: 'OFL' | 'Commercial' | 'Subscription';
  price: number;
  description: string;
  tone: string[];
}

export interface FontPairing {
  id: string;
  headlineFontId: string;
  bodyFontId: string;
  description: string;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface License {
  id: string;
  userId: string;
  fontId: string;
  licenseType: string;
  scope: 'web' | 'app' | 'print' | 'all';
  domains: string[];
  issuedAt: Date;
  status: 'active' | 'revoked';
  fingerprint: string;
}

export type PreviewContext = 'blog' | 'landing' | 'mobile' | 'ui';
