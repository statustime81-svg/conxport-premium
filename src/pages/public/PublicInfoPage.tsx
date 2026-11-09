import { Link } from 'react-router';
import { ArrowUpRight, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';
import { useDocumentMeta } from '../../seo/useDocumentMeta';

type Item = { title: string; description: string };
type InfoProps = { title: string; eyebrow?: string; intro: string; points?: Item[]; note?: string; path: string; contact?: boolean };

/** Reusable Option 4 layout for industry, legal and information pages. */
export default function PublicInfoPage({ title, eyebrow = 'CONXPORT', intro, points = [], note, path, contact = true }: InfoProps) {
  useDocumentMeta({ title: `${title} | ConXport`, description: intro, canonicalPath: path });
  const words = title.trim().split(/\s+/);
  const emphasis = words.length > 1 ? words.pop() : null;
  const leading = words.join(' ');
  return (
    <main className="min-h-[70vh] bg-[#FFFCF9] font-['Manrope',system-ui,sans-serif] text-[#043C50]">
      <section className="relative isolate overflow-hidden border-b border-[#efe6df] bg-[linear-gradient(115deg,#FFFCF9_5%,#FFF5ED_100%)] py-20 sm:py-24 lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-36 h-[520px] w-[520px] rounded-full border border-[#D84312]/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-24 h-[360px] w-[360px] rounded-full border border-[#D84312]/10" />
        <div className="container relative mx-auto max-w-[1320px] px-5 sm:px-8">
          <p className="!mb-0 inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]">
            <span className="h-px w-8 bg-[#D84312]" />{eyebrow}
          </p>
          <h1 className="!mb-0 mt-6 max-w-[1020px] !text-[clamp(2.8rem,5.8vw,5.7rem)] !font-normal !leading-[1.07] !tracking-[-.045em] !text-[#043C50]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            {leading}{emphasis ? <> <span className="italic !text-[#D84312]">{emphasis}</span></> : null}
          </h1>
          <p className="!mb-0 mt-7 max-w-[800px] text-[16px] leading-[1.9] !text-[#596B73] sm:text-[18px]">{intro}</p>
          {contact && <Link to="/contact" className="group mt-9 inline-flex items-center gap-3 rounded-full !bg-[#D84312] px-8 py-4 text-[14px] font-extrabold !text-white shadow-[0_15px_35px_-17px_rgba(216,67,18,.55)] transition-all duration-300 hover:-translate-y-1 hover:!bg-[#043C50]">Talk to our team <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>}
        </div>
      </section>
      {points.length > 0 && <section className="container mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-9"><p className="!mb-0 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#D84312]">WHAT TO KNOW</p>
          <h2 className="!mb-0 mt-3 !font-normal !text-[clamp(2.1rem,3.8vw,3.8rem)] !leading-[1.12] !text-[#043C50]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Explore the <span className="italic !text-[#D84312]">essentials.</span></h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{points.map((point, index) => <article key={`${point.title}-${index}`} className="group rounded-[26px] border border-[#e7e7e3] bg-white p-7 shadow-[0_15px_50px_-35px_rgba(4,60,80,.16)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D84312]/35 hover:shadow-[0_25px_58px_-30px_rgba(4,60,80,.2)] sm:p-9">
          <div className="mb-7 flex items-center justify-between"><span className="grid h-14 w-14 place-items-center rounded-[17px] bg-[#FFF1EA] text-[#D84312]"><CheckCircle2 size={25}/></span><span className="text-[12px] font-extrabold text-[#a4b6bb]">{String(index + 1).padStart(2, '0')}</span></div>
          <h3 className="!mb-0 !text-[clamp(1.55rem,2.2vw,2rem)] !font-normal !leading-[1.22] !text-[#043C50]" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{point.title}</h3>
          <p className="!mb-0 mt-4 text-[14px] leading-[1.85] !text-[#627580]">{point.description}</p>
          <div className="mt-7 h-[3px] w-10 rounded-full bg-[#D84312] transition-all duration-300 group-hover:w-20" />
        </article>)}</div>
      </section>}
      {note && <section className="container mx-auto max-w-[1320px] px-5 pb-16 sm:px-8"><div className="flex items-start gap-4 rounded-[24px] border border-[#f1e5dd] bg-[#FFF5EE] p-6 sm:p-9"><ShieldCheck size={25} className="mt-1 shrink-0 text-[#D84312]"/><p className="!m-0 text-[15px] leading-[1.9] !text-[#596B73]">{note}</p></div></section>}
      {contact && <section className="container mx-auto max-w-[1320px] px-5 pb-20 sm:px-8 sm:pb-28"><div className="relative flex flex-col gap-8 overflow-hidden rounded-[30px] bg-[#043C50] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-14"><div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/10"/><div className="relative"><p className="!mb-0 text-[11px] font-extrabold uppercase tracking-[.2em] !text-[#FFB69D]">GET IN TOUCH</p><h2 className="!mb-0 mt-3 max-w-[740px] !text-[clamp(1.9rem,3.4vw,3.3rem)] !font-normal !leading-[1.15] !text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Need help with <span className="italic !text-[#FFB69D]">equipment sourcing?</span></h2></div><Link to="/contact" className="group relative inline-flex shrink-0 items-center gap-3 self-start rounded-full !bg-[#D84312] px-7 py-4 font-bold !text-white transition duration-300 hover:-translate-y-1 hover:!bg-white hover:!text-[#043C50]"><Mail size={18}/>Contact ConXport<ArrowUpRight size={17}/></Link></div></section>}
    </main>
  );
}
