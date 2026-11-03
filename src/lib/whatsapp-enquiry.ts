import { findProduct } from '../data/productDetails';
export function buildWhatsAppEnquiry(slugs: string[], contactNumber?: string): string {
  const names = slugs.map(slug => { const p = findProduct(slug); return `• ${p?.name ?? slug}`; });
  const content = `Hello ConXport, I would like a quotation for:\n${names.length ? names.join('\n') : 'Medical equipment'}\nPlease contact me with availability and details.`;
  const digits = (contactNumber ?? '').replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(content)}`;
}
