import { ArrowUpRight, BedDouble, HeartPulse, Microscope, Monitor } from 'lucide-react';
import { Link } from 'react-router';
import TiltCard from '../animations/TiltCard';
import type { ShowcaseCategory } from '../../data/showcase';

const icons = { monitor: Monitor, microscope: Microscope, stethoscope: HeartPulse, bed: BedDouble };

export default function CategoryCard({ category, index }: { category: ShowcaseCategory; index: number }) {
  const Icon = icons[category.icon];
  return (
    <TiltCard intensity={5} className="cx-category-card" style={{ borderRadius: 24, background: '#14252c', border: '1px solid #294047', height: '100%' }}>
      <Link to={`/categories/${category.slug}`} aria-label={`Explore ${category.name}`} style={{ display: 'flex', flexDirection: 'column', minHeight: 350, height: '100%', padding: 'clamp(24px,3vw,42px)', color: '#f4fafa', position: 'relative', isolation: 'isolate' }}>
        <span style={{ color: '#a9bfc4', fontSize: 11, letterSpacing: '.18em' }}>CATEGORY {String(index + 1).padStart(2, '0')}</span>
        <div aria-hidden="true" style={{ flex: 1, minHeight: 160, display: 'grid', placeItems: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', background: category.accent, filter: 'blur(72px)', opacity: .20 }} />
          <Icon size={112} strokeWidth={0.75} color={category.accent} style={{ filter: 'drop-shadow(0 18px 28px #0008)', position: 'relative' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 15 }}>
          <div><h3 style={{ fontSize: 'clamp(1.45rem,2.3vw,2.1rem)', fontWeight: 800, fontFamily: 'Manrope,sans-serif', letterSpacing: '-.045em', marginBottom: 9 }}>{category.name}</h3><p style={{ color: '#a6bdc3', lineHeight: 1.7, fontSize: 13, margin: 0 }}>{category.description}</p></div>
          <ArrowUpRight color={category.accent} aria-hidden="true" style={{ flexShrink: 0 }} />
        </div>
      </Link>
    </TiltCard>
  );
}
