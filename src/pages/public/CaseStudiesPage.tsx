import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, CalendarDays, BookOpen } from 'lucide-react';
import { listCmsPublic } from '../../services/cmsPublic';
import { safeCmsUrl, cmsPublicPath } from '../../lib/cms/format';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import type { CmsEntry } from '../../types/cms';
export default function CaseStudiesPage() {
  useDocumentMeta({title:'Case Studies | ConXport', description:'Explore published ConXport medical equipment case studies.', canonicalPath:'/case-studies'});
  const [items,setItems]=useState<CmsEntry[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState('');
  useEffect(()=>{let active=true;void listCmsPublic('case_study').then(x=>{if(active)setItems(x)}).catch(e=>{if(active)setError(e instanceof Error?e.message:'Unable to load case studies')}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[]);
  return <main className="min-h-[70vh] bg-[#FFFCF9] font-['Manrope',system-ui,sans-serif]">
    <section className="relative overflow-hidden border-b border-[#f2e6df] bg-[#FFFCF9] py-16 sm:py-24"><div className="container !max-w-[1320px]">
      <p className="!mb-4 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]">CONXPORT / CASE STUDIES</p>
      <h1 className="!mb-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(3rem,6vw,6rem)] font-normal leading-[1.02] tracking-[-.05em] !text-[#043C50]">Our Case <em className="italic !text-[#D84312]">Studies.</em></h1>
      <p className="!mb-0 mt-6 max-w-[650px] text-[16px] leading-8 !text-[#596670]">Explore our published healthcare and medical equipment projects, insights and case studies.</p>
    </div></section>
    <section className="container !max-w-[1320px] py-14 sm:py-20"><h2 className="!mb-8 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2rem,3.5vw,3.6rem)] font-normal !text-[#043C50]">Featured <em className="italic !text-[#D84312]">projects.</em></h2>
      {error ? <p role="alert" className="rounded-xl bg-red-50 p-6 !text-red-700">{error}</p> : loading ? <p role="status" className="!text-[#596670]">Loading case studies…</p> : items.length===0 ? <div className="rounded-[24px] border border-[#efdfd7] bg-white p-10"><BookOpen className="mb-4 text-[#D84312]"/><p className="!m-0 !text-[#596670]">No published case studies yet.</p></div> :
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.map(item=>{const image=safeCmsUrl(item.image_url);const date=item.published_at||item.created_at;return <article key={item.id} className="group overflow-hidden rounded-[26px] border border-[#f0e5df] bg-white shadow-[0_15px_50px_-40px_rgba(4,60,80,.28)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-32px_rgba(4,60,80,.33)]"><Link to={cmsPublicPath(item.kind,item.slug)} className="flex h-full flex-col"><div className="aspect-[16/10] overflow-hidden bg-[#F1F7FA]">{image?<img src={image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy"/>:<div className="grid h-full place-items-center text-[#D84312]"><BookOpen size={42}/></div>}</div><div className="flex flex-1 flex-col p-6"><p className="!mb-3 flex items-center gap-2 text-xs !text-[#6e7a82]"><CalendarDays size={14}/>{date&&!Number.isNaN(Date.parse(date))?new Date(date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):'Case study'}</p><h3 className="!mb-2 font-['DM_Serif_Display',Georgia,serif] text-[clamp(1.5rem,2.2vw,2rem)] font-normal leading-[1.18] !text-[#043C50]">{item.title}</h3>{item.excerpt&&<p className="!mb-0 line-clamp-3 text-sm leading-7 !text-[#596670]">{item.excerpt}</p>}<span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold !text-[#D84312]">Read case study <ArrowUpRight size={17}/></span></div></Link></article>})}</div>}
    </section></main>;
}
