
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

export type PreviewContext = 'blog' | 'landing' | 'mobile' | 'ui';
