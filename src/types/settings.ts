export type GeneralSettings = {
  companyName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  whatsapp: string;
  address: string;
  city: string;
  country: string;
};

export type SeoSettings = {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  defaultOgImage: string;
  robotsIndex: boolean;
};

export type SiteSettingKey = 'general' | 'seo';

export const defaultGeneralSettings: GeneralSettings = {
  companyName: 'ConXport',
  tagline: 'Premium medical equipment sourcing for hospitals, laboratories and institutions.',
  supportEmail: 'info@conxport.com',
  supportPhone: '+91 90000 00000',
  whatsapp: '+91 90000 00000',
  address: 'Add your registered business address here',
  city: 'Patna',
  country: 'India',
};

export const defaultSeoSettings: SeoSettings = {
  siteTitle: 'ConXport',
  siteDescription: 'Premium medical equipment sourcing for hospitals, laboratories and institutions.',
  siteUrl: 'https://www.example.com',
  defaultOgImage: '',
  robotsIndex: true,
};
