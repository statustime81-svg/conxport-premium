import { CheckCircle2 } from 'lucide-react';
import type { ProductDetail } from '../../data/productDetails';
export default function ProductOverview({ product }: { product: ProductDetail }) {
  return <section aria-labelledby="overview-title" style={{ paddingBlock: 'clamp(45px,7vw,100px)', borderBottom: '1px solid #d7e3e5' }}>
    <p style={{ color: '#147a75', fontWeight: 800, letterSpacing: '.16em', fontSize: 12 }}>EQUIPMENT OVERVIEW</p>
    <h2 id="overview-title" style={{ fontSize: 'clamp(2.2rem,5vw,4.8rem)', letterSpacing: '-.06em', lineHeight: 1.1, margin: '18px 0 24px' }}>Designed for clarity.</h2>
    <p style={{ maxWidth: 820, lineHeight: 1.9, fontSize: 'clamp(1rem,2vw,1.3rem)', color: '#425d64' }}>{product.description}</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 50, marginTop: 45 }}>
      <div><h3>Features</h3>{product.features.map(f => <p key={f} style={{ display: 'flex', gap: 12, color: '#4b656b' }}><CheckCircle2 size={19} color="#138b7e" style={{ flexShrink: 0 }}/>{f}</p>)}</div>
      <div><h3>Applications</h3>{product.applications.map(a => <p key={a} style={{ display: 'flex', gap: 12, color: '#4b656b' }}><CheckCircle2 size={19} color="#138b7e" style={{ flexShrink: 0 }}/>{a}</p>)}<p><strong>Warranty:</strong> {product.warranty}</p></div>
    </div>
  </section>;
}
