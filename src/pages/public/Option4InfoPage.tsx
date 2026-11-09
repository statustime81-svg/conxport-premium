import { Link } from 'react-router';
import { ArrowUpRight, CheckCircle2, Mail } from 'lucide-react';
import { useDocumentMeta } from '../../seo/useDocumentMeta';

type Item = { title: string; description: string };
type InfoProps = { title: string; eyebrow?: string; intro: string; points?: Item[]; note?: string; path: string; contact?: boolean };
export default function Option4InfoPage({ title, eyebrow = 'CONXPORT', intro, points = [], note, path, contact = true }: InfoProps) {
  useDocumentMeta({ title: `${title} | ConXport`, description: intro, canonicalPath: path });
  const words = title.trim().split(/\s+/);
  const highlight = words.length > 1 ? words.pop()! : words[0] || '';
  const first = words.length ? words.join(' ') + ' ' : '';
  return <main className="min-h-[70vh] bg-[#FFFCF9] font-['Manrope',system-ui,sans-serif] text-[#043C50]">
    <section className="relative isolate overflow-hidden border-b border-[#f0e5de] bg-[#FFFCF9] py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-36 h-[540px] w-[540px] rounded-full bg-[#FDEBE2]/70 blur-[115px]"/>
      <div className="container relative mx-auto !max-w-[1320px]">
        <p className="!mb-6 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]">{eyebrow}</p>
        <h1 className="!m-0 max-w-[1100px] font-['DM_Serif_Display',Georgia,serif] text-[clamp(3rem,6vw,6rem)] font-normal leading-[1.06] tracking-[-.06em] !text-[#043C50]">{first}<span className="italic !text-[#D84312]">{highlight}</span></h1>
        <p className="!mb-0 mt-7 max-w-[780px] text-[clamp(16px,1.5vw,19px)] leading-[1.85] !text-[#596670]">{intro}</p>
        {contact && <Link to="/contact" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#D84312] px-7 py-4 font-bold !text-white shadow-[0_14px_35px_-22px_rgba(216,67,18,.6)] transition hover:-translate-y-1 hover:bg-[#AC320E]">Talk to our team <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>}
      </div>
    </section>
    {points.length > 0 && <section className="container mx-auto !max-w-[1320px] py-16 sm:py-24"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{points.map((p, i) => <article key={p.title} className="group relative overflow-hidden rounded-[28px] border border-[#efe1da] bg-white p-8 shadow-[0_18px_50px_-40px_rgba(4,60,80,.25)] transition duration-300 hover:-translate-y-1.5 hover:border-[#e4b8a4] hover:shadow-[0_25px_55px_-35px_rgba(4,60,80,.3)]"><div className="mb-9 flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFF1E9] text-[#D84312]"><CheckCircle2 size={25}/></span><span className="font-['DM_Serif_Display',Georgia,serif] text-3xl text-[#c7bac0]">{String(i+1).padStart(2,'0')}</span></div><h2 className="!mb-4 font-['DM_Serif_Display',Georgia,serif] text-[clamp(1.55rem,2vw,2rem)] font-normal leading-tight !text-[#043C50]">{p.title}</h2><p className="!m-0 text-[15px] leading-[1.85] !text-[#596670]">{p.description}</p><div className="mt-8 h-[3px] w-12 rounded-full bg-[#D84312] transition-all duration-300 group-hover:w-24"/></article>)}</div></section>}
    {note && <section className="container mx-auto !max-w-[1320px] pb-20"><div className="rounded-[25px] border border-[#f0ded5] bg-[#FFF4EF] p-7 sm:p-10"><p className="!m-0 leading-[1.85] !text-[#685750]">{note}</p></div></section>}
    {contact && <section className="container mx-auto !max-w-[1320px] pb-24"><div className="relative flex flex-col gap-8 overflow-hidden rounded-[30px] bg-[#043C50] p-9 sm:p-14 lg:flex-row lg:items-center lg:justify-between"><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 h-80 w-80 rounded-full border border-white/15"/><div className="relative"><p className="text-xs font-bold tracking-[.2em] !text-[#FFC4AD]">GET IN TOUCH</p><h2 className="!mb-0 mt-3 max-w-xl font-['DM_Serif_Display',Georgia,serif] text-[clamp(2rem,3.3vw,3.5rem)] font-normal !text-white">Need help with <em className="!text-[#FFAF90]">equipment sourcing?</em></h2></div><Link to="/contact" className="relative inline-flex items-center gap-3 self-start rounded-full bg-[#D84312] px-8 py-4 font-bold !text-white transition hover:bg-[#AC320E]"><Mail size={18}/> Contact ConXport</Link></div></section>}
  </main>;
}
