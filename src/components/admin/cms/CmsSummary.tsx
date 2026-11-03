import type{CmsEntry}from '../../../types/cms';
export default function CmsSummary({items}:{items:CmsEntry[]}){return <div style={{display:'flex',gap:28,flexWrap:'wrap'}}><span>Total: <strong>{items.length}</strong></span><span>Published: <strong>{items.filter(x=>x.is_published).length}</strong></span><span>Drafts: <strong>{items.filter(x=>!x.is_published).length}</strong></span></div>;}
