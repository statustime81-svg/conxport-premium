import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { Save, RefreshCcw, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { getCmsAdmin, listCmsAdmin, saveCmsEntry } from '../../services/cmsAdmin';
import { defaultTurnkeyInfo, parseTurnkeyInfo, type TurnkeyInfo } from '../public/TurnkeyProjectsPage';

export default function CaseStudiesPage(){
  const [data,setData]=useState<TurnkeyInfo>(defaultTurnkeyInfo);
  const [entryId,setEntryId]=useState<string|undefined>();
  const [published,setPublished]=useState(true);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [notice,setNotice]=useState('');
  const [error,setError]=useState('');
  async function load(){setLoading(true);setError('');try{
    const items=await listCmsAdmin('case_study');
    const item=items.find(x=>x.slug==='turnkey-projects');
    if(item){const full=await getCmsAdmin(item.id);if(full){setEntryId(full.id);setData(parseTurnkeyInfo(full.body));setPublished(full.is_published);}}
    else {setData(defaultTurnkeyInfo);setEntryId(undefined);setPublished(true);}
  }catch(e){setError(e instanceof Error?e.message:'Unable to load data');}finally{setLoading(false);}}
  useEffect(()=>{void load();},[]);
  const update=(field:'eyebrow'|'heading'|'intro'|'conclusion',value:string)=>setData(old=>({...old,[field]:value}));
  const updateItem=(field:'steps'|'benefits'|'reasons',index:number,key:'title'|'description',value:string)=>setData(old=>({...old,[field]:old[field].map((x,i)=>i===index?{...x,[key]:value}:x)}));
  async function save(event:FormEvent<HTMLFormElement>){event.preventDefault();setSaving(true);setNotice('');setError('');try{
    const id=await saveCmsEntry({kind:'case_study',slug:'turnkey-projects',title:data.heading,excerpt:data.intro.slice(0,480),body:JSON.stringify(data),image_url:'',external_url:'',seo_title:data.heading.slice(0,70),seo_description:data.intro.slice(0,180),is_published:published},entryId);
    setEntryId(id);setNotice('Turnkey Projects page saved successfully.');
  }catch(e){setError(e instanceof Error?e.message:'Unable to save page');}finally{setSaving(false);}}
  const input='mt-2 w-full rounded-xl border border-[#d4e4e0] bg-white px-4 py-3 text-sm leading-6 text-[#17343a] outline-none transition focus:border-[#0d7363] focus:ring-2 focus:ring-[#bde6d8]';
  const group=(label:string,field:'steps'|'benefits'|'reasons')=><section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><h3 className="!m-0 !font-sans !text-xl !font-bold !text-[#16353b]">{label}</h3><p className="!mb-0 mt-2 text-xs !text-slate-500">Edit the heading and description for each item.</p><div className="mt-6 grid gap-5 lg:grid-cols-2">{data[field].map((item,i)=><div key={i} className="space-y-3 rounded-2xl border border-[#e2eeeb] bg-[#f8fbfa] p-5"><p className="!m-0 text-xs font-extrabold uppercase tracking-wider !text-[#0d7363]">Section {i+1}</p><label className="block text-sm font-semibold text-slate-700">Title<input className={input} value={item.title} maxLength={160} required onChange={e=>updateItem(field,i,'title',e.target.value)}/></label><label className="block text-sm font-semibold text-slate-700">Description<textarea rows={5} className={input} value={item.description} required onChange={e=>updateItem(field,i,'description',e.target.value)}/></label></div>)}</div></section>;
  return <div className="mx-auto w-full max-w-6xl space-y-6 pb-16"><header className="rounded-[28px] border border-[#dce9e5] bg-gradient-to-r from-white to-[#eff8f5] p-7 sm:p-9"><p className="!m-0 text-[11px] font-bold uppercase tracking-[.2em] !text-[#0d7363]">ConXport Content Manager</p><div className="mt-2 flex flex-wrap items-start justify-between gap-4"><div><h1 className="!m-0 !font-serif !text-4xl !font-bold !text-[#102a32]">Turnkey Projects</h1><p className="!mb-0 mt-2 text-sm !text-slate-500">Manage the live Turnkey Projects page without changing the website layout.</p></div><Link to="/turnkey-projects" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-5 py-3 text-sm font-bold !text-[#0d5c4f]">View Page <ExternalLink size={16}/></Link></div></header>
  {loading?<p className="rounded-xl bg-white p-6 text-sm">Loading turnkey page information…</p>:<form onSubmit={e=>void save(e)} className="space-y-6"><section className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"><h2 className="!m-0 !font-sans !text-xl !font-bold !text-[#16353b]">Page introduction</h2><div className="mt-5 grid gap-4"><label className="block text-sm font-semibold text-slate-700">Eyebrow<input className={input} value={data.eyebrow} onChange={e=>update('eyebrow',e.target.value)}/></label><label className="block text-sm font-semibold text-slate-700">Main heading<input className={input} required value={data.heading} onChange={e=>update('heading',e.target.value)}/></label><label className="block text-sm font-semibold text-slate-700">Introduction<textarea className={input} required rows={6} value={data.intro} onChange={e=>update('intro',e.target.value)}/></label></div></section>
  {group('Key Components of Turnkey Projects','steps')}{group('Benefits of Hospital Setup Turnkey Projects','benefits')}{group('Why Choose Us','reasons')}
  <section className="rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8"><h2 className="!m-0 !font-sans !text-xl !font-bold !text-[#16353b]">Conclusion</h2><textarea className={input} rows={7} required value={data.conclusion} onChange={e=>update('conclusion',e.target.value)}/></section>
  <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#c8e6dc] bg-white/95 p-4 shadow-xl backdrop-blur-md"><label className="flex cursor-pointer items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)}/>Published on website</label><div className="flex gap-3"><button type="button" onClick={()=>void load()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold"><RefreshCcw size={17}/>Reset</button><button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#0d5c4f] px-6 py-3 text-sm font-bold text-white disabled:opacity-50"><Save size={17}/>{saving?'Saving…':'Save Changes'}</button></div></div>
  </form>}
  {notice&&<p role="status" className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-800"><CheckCircle2 size={18}/>{notice}</p>}
  {error&&<p role="alert" className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700"><AlertCircle size={18}/>{error}</p>}
  </div>;
}
