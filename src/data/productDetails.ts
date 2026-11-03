import { featuredProducts, type ShowcaseProduct } from './showcase';
export type ProductSpec = { label: string; value: string };
export type ProductDocument = { id: string; label: string; url?: string; access: 'public' | 'enquiry' };
export type ProductDetail = ShowcaseProduct & { description: string; features: string[]; applications: string[]; warranty: string; specifications: ProductSpec[]; images: string[]; videoUrl?: string; modelUrl?: string; documents: ProductDocument[] };
/** All entries are demonstration concepts. They are NOT verified stock, certifications or manufacturer specifications. */
export const productDetails: ProductDetail[] = featuredProducts.map((product) => ({
  ...product,
  description: `This is a visual presentation concept for ${product.name}. Product capabilities, exact specifications, warranty and availability will be published only after the ConXport team verifies them.`,
  features: ['Illustrative equipment showcase', 'Model-specific information pending review', 'Contact ConXport for confirmed capabilities'],
  applications: ['Institutional enquiry and equipment planning', 'Final clinical suitability to be confirmed by the supplier'],
  warranty: 'To be confirmed in the official quotation',
  specifications: [
    { label: 'Product', value: product.name },
    { label: 'Category', value: product.category },
    { label: 'Model', value: 'Not yet assigned' },
    { label: 'Technical datasheet', value: 'Pending official product publication' },
    { label: 'Availability', value: 'Please enquire' },
  ],
  images: [], documents: [],
}));
export function findProduct(slug: string | undefined): ProductDetail | undefined {
  return productDetails.find((product) => product.slug === slug);
}
