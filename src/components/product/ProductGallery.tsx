import { useState } from 'react';
import { ImageIcon, Maximize2, X } from 'lucide-react';
import type { ProductDetail } from '../../data/productDetails';
import ProductVisual from './ProductVisual';
export default function ProductGallery({ product }: { product: ProductDetail }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const images = product.images.filter(Boolean);
  const active = images[index];
  return <div>
    <div style={{ height: 'clamp(340px,47vw,620px)', borderRadius: 20, overflow: 'hidden', position: 'relative', border: '1px solid #ffffff22' }}>
      {active ? <img src={active} alt={`${product.name}, view ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0d1b22' }} /> : <ProductVisual product={product} size={225} />}
      {active && <button type="button" onClick={() => setExpanded(true)} aria-label="Expand product image" style={{ position: 'absolute', right: 18, top: 18, background: '#142c34', color: 'white', border: '1px solid #ffffff55', padding: 12, borderRadius: 10, cursor: 'pointer' }}><Maximize2 size={20}/></button>}
    </div>
    {images.length > 1 && <div style={{ display: 'flex', gap: 10, marginTop: 12, overflowX: 'auto' }}>{images.map((src, i) => <button key={src + i} type="button" aria-label={`Show product image ${i + 1}`} aria-pressed={i === index} onClick={() => setIndex(i)} style={{ cursor: 'pointer', padding: 0, border: i === index ? '2px solid #47d8c2' : '2px solid #485b60', borderRadius: 10, overflow: 'hidden' }}><img src={src} alt="" style={{ width: 75, height: 70, objectFit: 'cover' }}/></button>)}</div>}
    {!images.length && <p style={{ fontSize: 12, color: '#9bb5b9', marginTop: 12 }}><ImageIcon size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle' }}/> Official product images will be added after catalogue approval.</p>}
    {expanded && active && <div role="dialog" aria-modal="true" aria-label="Expanded product image" onClick={() => setExpanded(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#000e', padding: 25, display: 'grid', placeItems: 'center' }}><button autoFocus onClick={() => setExpanded(false)} aria-label="Close expanded image" style={{ position: 'absolute', top: 24, right: 24, background: 'white', border: 0, borderRadius: 100, padding: 12, cursor: 'pointer' }}><X size={20}/></button><img onClick={(event) => event.stopPropagation()} src={active} alt={`${product.name} enlarged`} style={{ maxWidth: '95vw', maxHeight: '86vh', objectFit: 'contain' }}/></div>}
  </div>;
}
