import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, CalendarDays, ArrowUpRight } from 'lucide-react';
import { getCmsPublic } from '../../services/cmsPublic';
import { safeCmsUrl } from '../../lib/cms/format';
import { useDocumentMeta } from '../../seo/useDocumentMeta';
import type { CmsEntry } from '../../types/cms';
export default function CaseStudyDetailPage(){
  const {slug}=useParams();const[item,setItem]=useState<CmsEntry|null>(null);const[loading,setLoading]=useState(true);const[error,setError]=useState('');
  useEffect(()=>{let active=true;setLoading(true);setError('');setItem(null);void getCmsPublic('case_study',slug??'').then(x=>{if(active)setItem(x)}).catch(e=>{if(active)setError(e instanceof Error?e.message:'Unable to load case study')}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[slug]);
  useDocumentMeta(item?{title:`${item.title} | ConXport`,description:item.seo_description||item.excerpt||item.title,canonicalPath:`/case-studies/${item.slug}`}:{title:'Case Study | ConXport',description:'ConXport case study',noindex:!loading&&!item});
  const image=item?safeCmsUrl(item.image_url):'';const date=item?.published_at||item?.created_at;
  return <main className="min-h-[60vh] bg-[#FFFCF9] font-['Manrope',system-ui,sans-serif]"><div className="container !max-w-[1100px] py-12 sm:py-20">
    <Link to="/case-studies" className="mb-8 inline-flex items-center gap-2 text-sm font-bold !text-[#D84312]"><ArrowLeft size={17}/> All case studies</Link>
    {loading?<p role="status">Loading case study…</p>:error?<p role="alert" className="!text-red-700">{error}</p>:!item?<p className="!text-[#596670]">This case study is unavailable.</p>:<article>
      <p className="!mb-4 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]">CONXPORT / CASE STUDY</p>
      <h1 className="!mb-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2.7rem,5vw,5.3rem)] font-normal leading-[1.07] tracking-[-.04em] !text-[#043C50]">{item.title}<span className="italic !text-[#D84312]">.</span></h1>
      {date&&!Number.isNaN(Date.parse(date))&&<p className="!mb-0 mt-5 flex items-center gap-2 text-sm !text-[#73828a]"><CalendarDays size={16}/>{new Date(date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</p>}
      {item.excerpt&&<p className="!mb-0 mt-6 max-w-[870px] text-lg leading-[1.85] !text-[#596670]">{item.excerpt}</p>}
      {image&&<figure className="!m-0 mt-9 flex h-[230px] items-center justify-center overflow-hidden rounded-[25px] border border-[#efe7e1] bg-white sm:h-[380px]"><img src={image} alt={item.title} className="h-full w-full object-contain"/></figure>}
      <div className="mt-11 whitespace-pre-wrap break-words border-t border-[#eadcd4] pt-9 text-[16px] leading-[2] text-[#344c59]">{item.body||'More details will be published soon.'}</div>
      <Link to="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#D84312] px-7 py-4 text-sm font-bold !text-white hover:bg-[#B9320A]">Discuss a project <ArrowUpRight size={18}/></Link>
    </article>}</div></main>
}
