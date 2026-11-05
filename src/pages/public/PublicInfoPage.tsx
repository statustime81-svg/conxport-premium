import { Link } from 'react-router';
import { ArrowUpRight, CheckCircle2, Mail } from 'lucide-react';
import { useDocumentMeta } from '../../seo/useDocumentMeta';

type Item = { title: string; description: string };
type InfoProps = { title: string; eyebrow?: string; intro: string; points?: Item[]; note?: string; path: string; contact?: boolean };
export default function PublicInfoPage({title,eyebrow='CONXPORT',intro,points=[],note,path,contact=true}:InfoProps){
 useDocumentMeta({title:`${title} | ConXport`,description:intro,canonicalPath:path});
 return <main className="min-h-[70vh] bg-white text-[#11252a]">
  <section className="relative overflow-hidden bg-[#F1F7FA] py-20 sm:py-28">
   <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(13,92,79,0.11),transparent_68%)]"/>
   <div className="container relative mx-auto">
    <p className="mb-6 text-xs font-bold uppercase tracking-[.22em] !text-[#07546B]">{eyebrow}</p>
    <h1 className="m-0 max-w-[1050px] font-['Manrope',sans-serif] text-[clamp(2.8rem,6vw,5.8rem)] font-extrabold leading-[1.08] tracking-[-.06em] !text-[#11252a]">{title}</h1>
    <p className="mt-7 max-w-[780px] text-lg leading-[1.85] !text-[#5d7377]">{intro}</p>
    {contact&&<Link to="/contact" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#07546B] px-7 py-4 font-bold !text-white hover:bg-[#053F52]">Talk to our team <ArrowUpRight size={18}/></Link>}
   </div>
  </section>
  {points.length>0&&<section className="container mx-auto py-16 sm:py-24"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{points.map(p=><article key={p.title} className="rounded-[26px] border border-[#DCECF0] bg-white p-8 shadow-[0_10px_35px_rgba(13,92,79,.05)]"><CheckCircle2 size={26} className="mb-8 text-[#07546B]"/><h2 className="mb-4 font-['Manrope',sans-serif] text-2xl font-extrabold !text-[#11252a]">{p.title}</h2><p className="m-0 leading-[1.85] !text-[#64787d]">{p.description}</p></article>)}</div></section>}
  {note&&<section className="container mx-auto pb-20"><div className="rounded-[24px] bg-[#F1F7FA] p-7 sm:p-10"><p className="m-0 leading-[1.85] !text-[#526c71]">{note}</p></div></section>}
  {contact&&<section className="container mx-auto pb-24"><div className="flex flex-col gap-8 rounded-[30px] bg-[#0b3934] p-9 sm:p-14 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-bold tracking-[.2em] !text-[#a6e4d5]">GET IN TOUCH</p><h2 className="mt-3 font-['Manrope',sans-serif] text-3xl font-extrabold !text-white sm:text-4xl">Need help with equipment sourcing?</h2></div><Link to="/contact" className="inline-flex items-center gap-3 self-start rounded-full bg-white px-8 py-4 font-bold !text-[#07546B]"><Mail size={18}/>Contact ConXport</Link></div></section>}
 </main>;
}
