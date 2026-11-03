import type { AdminCategory } from '../../../services/adminProducts';
type Props={categories:AdminCategory[];value:string;onChange:(id:string)=>void;disabled?:boolean};
export default function CategorySelector({categories,value,onChange,disabled}:Props){
 return <label className="cx-field">Primary category<select className="cx-admin-input" disabled={disabled} value={value} onChange={e=>onChange(e.target.value)}><option value="">Uncategorized</option>{categories.map(c=><option key={c.id} value={c.id}>{c.name}{c.is_published?'':' (draft)'}</option>)}</select></label>;
}
