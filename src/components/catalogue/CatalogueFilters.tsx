import { useId } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export type CatalogueFilterState = { query: string; category: string; sort: 'featured' | 'name-asc' | 'name-desc' };
type CategoryOption = { slug: string; name: string };
type Props = {
  value: CatalogueFilterState;
  onChange: (next: CatalogueFilterState) => void;
  categories: CategoryOption[];
  count: number;
  showCategory?: boolean;
};
export default function CatalogueFilters({ value, onChange, categories, count, showCategory = true }: Props) {
  const id = useId();
  const set = (patch: Partial<CatalogueFilterState>) => onChange({ ...value, ...patch });
  const isFiltered = Boolean(value.query || value.category || value.sort !== 'featured');
  return (
    <div aria-label="Catalogue filters" style={{ display: 'grid', gap: 18, padding: '24px', background: '#fff', border: '1px solid #dce7e8', borderRadius: 22, color: '#163036' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 800 }}><SlidersHorizontal size={19}/> Refine equipment</span>
        <span role="status" aria-live="polite" style={{ fontSize: 13, color: '#527079' }}>{count} {count === 1 ? 'result' : 'results'}</span>
      </div>
      <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,210px),1fr))' }}>
        <div>
          <label htmlFor={`${id}-query`} style={labelStyle}>Search equipment</label>
          <div style={{ position: 'relative' }}><Search size={17} aria-hidden="true" style={{ position: 'absolute', left: 13, top: 13, color: '#58747a' }}/>
            <input id={`${id}-query`} type="search" value={value.query} onChange={e => set({ query: e.target.value })} placeholder="Product or model" style={{ ...inputStyle, paddingLeft: 40 }}/>
          </div>
        </div>
        {showCategory && <div><label htmlFor={`${id}-category`} style={labelStyle}>Category</label>
          <select id={`${id}-category`} value={value.category} onChange={e => set({ category: e.target.value })} style={inputStyle}>
            <option value="">All categories</option>
            {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select></div>}
        <div><label htmlFor={`${id}-sort`} style={labelStyle}>Sort by</label>
          <select id={`${id}-sort`} value={value.sort} onChange={e => set({ sort: e.target.value as CatalogueFilterState['sort'] })} style={inputStyle}>
            <option value="featured">Featured order</option><option value="name-asc">Name: A to Z</option><option value="name-desc">Name: Z to A</option>
          </select></div>
      </div>
      {isFiltered && <button type="button" onClick={() => onChange({ query: '', category: '', sort: 'featured' })} style={{ color: '#116d63', fontSize: 13, fontWeight: 750, background: 'transparent', border: 0, display: 'inline-flex', alignItems: 'center', gap: 6, justifySelf: 'start', cursor: 'pointer' }}><X size={14}/> Reset filters</button>}
    </div>
  );
}
const labelStyle = { display: 'block', fontSize: 12, fontWeight: 750, marginBottom: 8, color: '#3a5961' } as const;
const inputStyle = { display: 'block', width: '100%', height: 44, padding: '0 12px', borderRadius: 9, border: '1px solid #cadbdc', background: '#f8fbfb', color: '#173239', font: 'inherit', fontSize: 14 } as const;
