import { Link } from 'react-router';
import { ArrowRight, ClipboardList, Info, PackageSearch, ShieldCheck, Trash2 } from 'lucide-react';
import QuoteListItem from '../../components/enquiries/QuoteListItem';
import { clearQuoteItems, useQuoteItems } from '../../store/quote-list';

export default function QuoteListPage() {
  const slugs = useQuoteItems();

  return (
    <main className="relative isolate min-h-[70vh] overflow-hidden bg-[#FFFCF9] pb-24 pt-16 text-[#043C50] sm:pt-24 lg:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-56 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(216,67,18,0.07),transparent_70%)]" />
      <div className="relative mx-auto w-[min(1120px,calc(100%-36px))]">
        <div className="max-w-[850px]">
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#efddcf] bg-white px-4 py-2.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#D84312]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#D84312]">ConXport / Procurement</span>
          </div>
          <h1 className="m-0 font-['DM_Serif_Display',Georgia,serif] text-[clamp(3rem,6vw,5.8rem)] font-normal leading-[1.06] tracking-[-0.065em] !text-[#043C50]">
            Your quote <span className="italic !text-[#D84312]">list.</span>
          </h1>
          <p className="mb-0 mt-6 max-w-[720px] text-[clamp(16px,1.5vw,18px)] leading-[1.85] !text-[#596670]">
            Review the medical equipment you've selected and send a single procurement enquiry. No online payment is required.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <section className="min-w-0 overflow-hidden rounded-[28px] border border-[#efe4df] bg-white shadow-[0_20px_65px_-35px_rgba(13,92,79,0.20)]" aria-label="Selected equipment">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6eeeb] px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0E8] text-[#D84312]"><ClipboardList size={23}/></span>
                <div>
                  <h2 className="m-0 font-['DM_Serif_Display',Georgia,serif] text-[27px] font-normal tracking-[-0.035em] !text-[#043C50]">Selected equipment</h2>
                  <p className="m-0 mt-1 text-sm !text-[#73847e]">{slugs.length} {slugs.length === 1 ? 'product' : 'products'} in your list</p>
                </div>
              </div>
              {slugs.length > 0 && (
                <button type="button" onClick={clearQuoteItems} className="inline-flex items-center gap-2 rounded-full border border-[#e5eae7] bg-white px-4 py-2.5 text-sm font-bold !text-[#79645e] transition-colors hover:border-[#efcfca] hover:bg-[#fff5f3] hover:!text-[#a34236]">
                  <Trash2 size={15}/> Clear list
                </button>
              )}
            </div>

            {slugs.length ? (
              <>
                <div className="grid gap-4 p-5 sm:p-7">
                  {slugs.map((slug, index) => <QuoteListItem key={slug} slug={slug} index={index + 1} />)}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e6eeeb] bg-[#fbfdfc] px-6 py-6 sm:px-8">
                  <Link to="/products" className="text-sm font-bold !text-[#D84312] hover:underline">+ Add more equipment</Link>
                  <Link to="/request-quote" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D84312] px-6 py-4 text-sm font-extrabold !text-white shadow-[0_12px_25px_rgba(13,92,79,0.17)] transition-all hover:-translate-y-0.5 hover:bg-[#AE320E]">
                    Continue to enquiry ({slugs.length}) <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="px-6 py-16 text-center sm:px-8">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#FFF0E8] text-[#D84312]"><PackageSearch size={36} strokeWidth={1.5}/></span>
                <h2 className="mt-6 font-['DM_Serif_Display',Georgia,serif] text-[30px] font-normal !text-[#043C50]">Your quote list is empty</h2>
                <p className="mx-auto mt-3 max-w-[430px] text-[15px] leading-7 !text-[#6e817b]">Explore the catalogue and add the equipment you'd like to enquire about.</p>
                <Link to="/products" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#D84312] px-7 py-4 text-sm font-bold !text-white hover:bg-[#AE320E]">Explore products <ArrowRight size={17}/></Link>
              </div>
            )}
          </section>

          <aside className="space-y-5" aria-label="Quote enquiry information">
            <div className="rounded-[26px] border border-[#efe4df] bg-white p-7 shadow-[0_12px_45px_-30px_rgba(13,92,79,0.18)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0E8] text-[#D84312]"><ShieldCheck size={24}/></div>
              <h2 className="m-0 font-['DM_Serif_Display',Georgia,serif] text-[27px] font-normal !text-[#043C50]">How it works</h2>
              <ol className="mt-5 space-y-4">
                <li className="flex gap-3 text-sm leading-6 !text-[#5e736c]"><span className="font-extrabold text-[#D84312]">01</span> Add equipment to your list</li>
                <li className="flex gap-3 text-sm leading-6 !text-[#5e736c]"><span className="font-extrabold text-[#D84312]">02</span> Share your requirements</li>
                <li className="flex gap-3 text-sm leading-6 !text-[#5e736c]"><span className="font-extrabold text-[#D84312]">03</span> Discuss availability and quotation details</li>
              </ol>
            </div>
            <div className="flex gap-3 rounded-[22px] border border-[#dbeae5] bg-[#FFF4EC] p-5">
              <Info size={20} className="mt-0.5 shrink-0 text-[#D84312]"/>
              <p className="m-0 text-sm leading-6 !text-[#456259]">Your quote list is an enquiry request, not a confirmed order. Product availability and pricing require confirmation.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
