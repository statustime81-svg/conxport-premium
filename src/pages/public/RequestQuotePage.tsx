import { Link } from 'react-router';
import { ArrowUpRight, CheckCircle2, ClipboardList, Headphones, ShieldCheck } from 'lucide-react';
import EnquiryForm from '../../components/enquiries/EnquiryForm';
import { useQuoteItems } from '../../store/quote-list';

export default function RequestQuotePage() {
  const items = useQuoteItems();
  return (
    <main className="min-h-screen bg-[#FFFCF9] text-[#102D3C]">
      <section className="relative overflow-hidden border-b border-[#e2eeea] bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-48 h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle,rgba(216,67,18,.07),transparent_67%)]" />
        <div className="relative mx-auto w-[min(1240px,calc(100%-40px))] py-16 sm:py-20 lg:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f0dcd1] bg-[#fff1e9] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.17em] !text-[#D84312]">
            <span className="h-2 w-2 rounded-full bg-[#D84312]" /> CONXPORT / PROCUREMENT
          </div>
          <h1 className="m-0 max-w-[850px] font-['DM_Serif_Display',Georgia,serif] text-[clamp(3rem,6vw,5.7rem)] font-normal leading-[1.06] tracking-[-.065em] !text-[#043C50]">
            Request a <span className="italic !text-[#D84312]">quote.</span>
          </h1>
          <p className="mt-6 max-w-[710px] text-[17px] leading-[1.8] !text-[#617771]">
            Tell us which medical equipment you need and share your specifications. Our team will review your enquiry and get in touch with the next steps.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8e9e3] bg-white px-4 py-2.5 text-sm font-bold text-[#21423a]">
              <ClipboardList size={17} className="text-[#D84312]" /> {items.length} {items.length === 1 ? 'product' : 'products'} selected
            </div>
            <Link to="/quote-list" className="inline-flex items-center gap-2 text-sm font-bold !text-[#D84312] hover:underline">
              Edit quote list <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1240px,calc(100%-40px))] gap-9 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-start lg:gap-12 lg:py-20">
        <div className="min-w-0">
          <div className="mb-7">
            <span className="text-[11px] font-extrabold uppercase tracking-[.17em] text-[#D84312]">ENQUIRY DETAILS</span>
            <h2 className="mt-2 font-['DM_Serif_Display',Georgia,serif] text-[clamp(2rem,3vw,2.8rem)] font-normal tracking-[-.05em] !text-[#043C50]">Tell us about your requirement</h2>
            <p className="mt-2 text-[15px] !text-[#647b74]">Fields marked * are required.</p>
          </div>
          <div className="cx-option4-enquiry"><EnquiryForm /></div>
        </div>
        <aside className="space-y-5 lg:sticky lg:top-28">
          <div className="rounded-[24px] border border-[#dcebe5] bg-white p-7 shadow-[0_18px_40px_rgba(13,92,79,.05)]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f5ee] text-[#D84312]"><ShieldCheck size={24} /></div>
            <h3 className="font-['DM_Serif_Display',Georgia,serif] text-[26px] font-normal tracking-[-.04em] !text-[#043C50]">Clear procurement process</h3>
            <p className="mt-3 text-[14px] leading-7 !text-[#647b74]">Tell us what you need, including model preferences, quantities and technical requirements.</p>
            <div className="mt-6 space-y-4">
              {['Share equipment details','Provide contact information','Submit for team review'].map((step) => <div key={step} className="flex items-center gap-3 text-sm font-semibold text-[#29463d]"><CheckCircle2 size={18} className="shrink-0 text-[#D84312]" /> {step}</div>)}
            </div>
          </div>
          <div className="rounded-[24px] bg-[#043C50] p-7 text-white">
            <Headphones size={25} className="mb-4 text-[#9ce3d0]" />
            <h3 className="font-['DM_Serif_Display',Georgia,serif] text-[26px] font-normal !text-white">Need guidance?</h3>
            <p className="mt-3 text-sm leading-7 !text-[#cce9df]">Contact our team if you need help identifying the right equipment category or preparing your enquiry.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold !text-[#D84312]">Contact us <ArrowUpRight size={16} /></Link>
          </div>
        </aside>
      </section>
      <style>{`
        .cx-option4-enquiry input:focus, .cx-option4-enquiry textarea:focus, .cx-option4-enquiry select:focus { border-color:#D84312!important; box-shadow:0 0 0 3px rgba(216,67,18,.10)!important; }
        .cx-option4-enquiry button[type="submit"] { background:#D84312!important; border-radius:9999px!important; }
        .cx-option4-enquiry button[type="submit"]:hover:not(:disabled) { background:#AE320E!important; }
      `}</style>
    </main>
  );
}
