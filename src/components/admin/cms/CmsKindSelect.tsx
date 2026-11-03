import{cmsKinds,type CmsKind}from '../../../types/cms';
export default function CmsKindSelect({value,onChange}:{value:CmsKind;onChange:(v:CmsKind)=>void}){return <label style={{display:'grid',gap:6}}>Content type<select className="cx-input" value={value} onChange={e=>onChange(e.target.value as CmsKind)}>{cmsKinds.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select></label>;}
