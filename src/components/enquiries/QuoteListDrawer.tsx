import { Link } from 'react-router';
import { X } from 'lucide-react';
import QuoteListItem from './QuoteListItem';
import { useQuoteItems } from '../../store/quote-list';
export default function QuoteListDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const slugs = useQuoteItems();
  if (!open) return null;
  return <div className="fixed inset-0 z-[100] flex justify-end bg-black/70" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <aside role="dialog" aria-modal="true" aria-label="Quote list" className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-[#101820] p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Quote list ({slugs.length})</h2><button type="button" onClick={onClose} aria-label="Close quote list" className="p-2"><X/></button></div>
      <div className="mt-8 grid flex-1 content-start gap-3">{slugs.length ? slugs.map(slug => <QuoteListItem slug={slug} key={slug}/>) : <p className="text-slate-300">No equipment selected yet.</p>}</div>
      <Link onClick={onClose} to={slugs.length ? '/request-quote' : '/products'} className="mt-6 rounded-lg bg-teal-300 px-6 py-4 text-center font-semibold text-slate-950">{slugs.length ? 'Request quotation' : 'Browse products'}</Link>
    </aside>
  </div>;
}
