import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, LoaderCircle, Save } from 'lucide-react';
import type { InventoryProduct, Warehouse } from '../../../types/inventory';
import { adjustStock } from '../../../services/stockAdjustments';
import InventoryNotice from './InventoryNotice';

const input = 'mt-2 h-12 w-full min-w-0 rounded-xl border border-[#d8e5e2] bg-white px-4 text-[14px] text-[#17313b] outline-none transition focus:border-[#0d7363] focus:ring-2 focus:ring-[#0d7363]/10';
export default function StockAdjustmentForm({ products, warehouses, onSaved }: { products: InventoryProduct[]; warehouses: Warehouse[]; onSaved: () => void }) {
  const [productId, setProductId] = useState('');
  const [warehouseId, setWarehouseId] = useState('');
  const [amount, setAmount] = useState(1);
  const [direction, setDirection] = useState<'in' | 'out'>('in');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError('');
    if (!Number.isInteger(amount) || amount < 1 || amount > 100000) { setError('Quantity must be a whole number from 1 to 100000.'); return; }
    if (reason.trim().length < 3) { setError('Enter a reason of at least 3 characters.'); return; }
    setBusy(true);
    try { await adjustStock({ productId, warehouseId, delta: direction === 'in' ? amount : -amount, reason: reason.trim() }); setReason(''); onSaved(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Stock transaction failed'); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="space-y-5">
    <div className="grid gap-5 md:grid-cols-2">
      <label className="block text-[13px] font-bold text-[#29494e]">Product<select required value={productId} onChange={e => setProductId(e.target.value)} className={input}><option value="">Select product</option>{products.map(p => <option key={p.id} value={p.id}>{p.name} / {p.sku}</option>)}</select></label>
      <label className="block text-[13px] font-bold text-[#29494e]">Warehouse<select required value={warehouseId} onChange={e => setWarehouseId(e.target.value)} className={input}><option value="">Select warehouse</option>{warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}</select></label>
    </div>
    <fieldset><legend className="mb-2 text-[13px] font-bold text-[#29494e]">Movement type</legend><div className="grid grid-cols-2 gap-3">
      <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-4 text-[13px] font-bold transition ${direction === 'in' ? 'border-[#0d5c4f] bg-[#ecf7f3] text-[#0d5c4f]' : 'border-[#d8e5e2] bg-white text-[#60777d]'}`}><input className="sr-only" type="radio" name="direction" value="in" checked={direction === 'in'} onChange={() => setDirection('in')}/><ArrowDownToLine size={18}/> Stock IN</label>
      <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-4 text-[13px] font-bold transition ${direction === 'out' ? 'border-[#0d5c4f] bg-[#ecf7f3] text-[#0d5c4f]' : 'border-[#d8e5e2] bg-white text-[#60777d]'}`}><input className="sr-only" type="radio" name="direction" value="out" checked={direction === 'out'} onChange={() => setDirection('out')}/><ArrowUpFromLine size={18}/> Stock OUT</label>
    </div></fieldset>
    <label className="block text-[13px] font-bold text-[#29494e]">Quantity<input type="number" min={1} max={100000} step={1} required value={amount} onChange={e => setAmount(Number(e.target.value))} className={input}/></label>
    <label className="block text-[13px] font-bold text-[#29494e]">Reason<textarea required minLength={3} maxLength={300} value={reason} onChange={e => setReason(e.target.value)} placeholder="Example: Received from supplier / Dispatched against order" rows={4} className="mt-2 w-full resize-y rounded-xl border border-[#d8e5e2] bg-white px-4 py-3 text-[14px] leading-6 text-[#17313b] outline-none focus:border-[#0d7363] focus:ring-2 focus:ring-[#0d7363]/10"/></label>
    <InventoryNotice error={error}/>
    <button disabled={busy || !products.length || !warehouses.length} type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl !bg-[#0d5c4f] px-6 py-3 text-[13px] font-bold !text-white transition hover:!bg-[#08483e] disabled:cursor-not-allowed disabled:opacity-50">{busy ? <LoaderCircle size={17} className="animate-spin"/> : <Save size={17}/>} {busy ? 'Recording…' : 'Record stock movement'}</button>
  </form>;
}
