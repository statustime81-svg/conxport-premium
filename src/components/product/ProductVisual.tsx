import { BedDouble, HeartPulse, Microscope, Monitor } from 'lucide-react';
import type { ProductDetail } from '../../data/productDetails';
const icons = { monitor: Monitor, microscope: Microscope, stethoscope: HeartPulse, bed: BedDouble };
export default function ProductVisual({ product, size = 170 }: { product: ProductDetail; size?: number }) {
  const Icon = icons[product.icon];
  return <div style={{ minHeight: '100%', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at 50% 45%, #294d53, #0b151b 69%)' }}>
    <div aria-hidden="true" style={{ position: 'absolute', width: '55%', aspectRatio: '1', borderRadius: '50%', filter: 'blur(70px)', opacity: .23, background: product.accent }} />
    <Icon size={size} strokeWidth={.65} color="#c7eeee" aria-hidden="true" style={{ maxWidth: '70%', filter: 'drop-shadow(12px 24px 16px #0009)', zIndex: 1 }} />
    <span style={{ position: 'absolute', bottom: 18, color: '#90b2b9', fontSize: 11, letterSpacing: '.16em', zIndex: 2 }}>ILLUSTRATIVE VISUAL ONLY</span>
  </div>;
}
