import { ArrowUpRight, BedDouble, HeartPulse, Microscope, Monitor, Plus } from 'lucide-react';
import { Link } from 'react-router';
import type { ShowcaseProduct } from '../../data/showcase';

const icons = { monitor: Monitor, microscope: Microscope, stethoscope: HeartPulse, bed: BedDouble };

export default function ProductCard({ product }: { product: ShowcaseProduct }) {
  const Icon = icons[product.icon];
  return <article style={{ background: '#fff', color: '#14252c', border: '1px solid #dde5e7', borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
    <Link to={`/products/${product.slug}`} aria-label={`View preview of ${product.name}`} style={{ display: 'grid', placeItems: 'center', height: 255, position: 'relative', background: 'linear-gradient(140deg,#eef4f4,#e1eded)' }}>
      <div style={{ position: 'absolute', width: 175, height: 175, borderRadius: '50%', background: product.accent, filter: 'blur(66px)', opacity: .25 }} />
      <Icon size={135} strokeWidth={.7} color="#39575d" style={{ zIndex: 1, filter: 'drop-shadow(10px 18px 12px #20353b35)' }} aria-hidden="true"/>
      <span style={{ position: 'absolute', top: 18, left: 20, fontSize: 10, fontWeight: 800, letterSpacing: '.15em', color: '#507178' }}>CONCEPT PREVIEW</span>
      <ArrowUpRight size={20} style={{ position: 'absolute', right: 20, top: 20 }} aria-hidden="true" />
    </Link>
    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
      <span style={{ color: '#28887e', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 800 }}>{product.category}</span>
      <h3 style={{ font: '800 clamp(1.25rem,2vw,1.55rem)/1.25 Manrope,sans-serif', letterSpacing: '-.04em', margin: 0 }}>{product.name}</h3>
      <p style={{ color: '#607781', fontSize: 13, lineHeight: 1.8, flex: 1, margin: 0 }}>{product.summary}</p>
      <span style={{ fontSize: 11, color: '#789097' }}>{product.model}</span>
      <Link to={`/products/${product.slug}`} style={{ marginTop: 12, display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, color: '#11665d', fontWeight: 800, fontSize: 13 }}>View concept <Plus size={19} aria-hidden="true" /></Link>
    </div>
  </article>;
}
