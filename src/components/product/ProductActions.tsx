import { useState } from 'react';
import { Check, ClipboardList, MessageCircle, Send } from 'lucide-react';
import { Link } from 'react-router';
import type { ProductDetail } from '../../data/productDetails';
const STORAGE_KEY = 'conxport-quote-list-v1';
function readList(): string[] { try { const v = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as unknown; return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []; } catch { return []; } }
export default function ProductActions({ product }: { product: ProductDetail }) {
  const [added, setAdded] = useState(() => typeof window !== 'undefined' && readList().includes(product.slug));
  const addToQuote = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set([...readList(), product.slug])])); setAdded(true); window.dispatchEvent(new Event('conxport-quote-list-change')); } catch { setAdded(false); } };
  const message = encodeURIComponent(`Hello ConXport, I would like a quotation for ${product.name}. Reference: ${window.location.href}`);
  return <div style={{ display: 'grid', gap: 12 }}>
    <button type="button" onClick={addToQuote} style={{ background: '#47d8c2', border: 0, color: '#09272a', padding: '17px 20px', borderRadius: 10, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>{added ? <Check size={19}/> : <ClipboardList size={19}/>} {added ? 'Added to quote list' : 'Add to quote list'}</button>
    <Link to="/request-quote" style={{ padding: '16px 20px', borderRadius: 10, border: '1px solid #7ea4a9', color: '#eaf9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}><Send size={18}/> Request a quote</Link>
    <a href={`https://api.whatsapp.com/send?text=${message}`} target="_blank" rel="noopener noreferrer" style={{ padding: '16px 20px', borderRadius: 10, color: '#c7eeee', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}><MessageCircle size={18}/> Share enquiry via WhatsApp</a>
    <p style={{ color: '#8ca9ad', fontSize: 12, lineHeight: 1.6, margin: 0 }}>Quote list is stored on this device for now. Submission and CRM integration will be enabled in a later batch.</p>
  </div>;
}
