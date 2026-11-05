import { useState } from 'react';
import { BellPlus, LoaderCircle } from 'lucide-react';
import { setStockThreshold } from '../../../services/stockAdjustments';
import type { InventoryProduct, Warehouse } from '../../../types/inventory';
import InventoryNotice from './InventoryNotice';

const field = 'mt-1.5 h-11 w-full min-w-0 rounded-xl border border-[#DCECF0] bg-white px-3 text-[13px] text-[#17313b] outline-none transition focus:border-[#07546B] focus:ring-2 focus:ring-[#07546B]/10';
export default function ThresholdForm({ products, warehouses, onSaved }: { products: InventoryProduct[]; warehouses: Warehouse[]; onSaved: () => void }) {
  const [productId, setProductId] = useState('');
  const [warehouseId, setWarehouseId] = useState('');
  const [count, setCount] = useState(5);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(''); setSuccess('');
    if (!Number.isInteger(count) || count < 0) { setError('Enter a valid whole-number threshold.'); return; }
    setBusy(true);
    try { await setStockThreshold(productId, warehouseId, count); setSuccess('Reorder threshold saved.'); onSaved(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Threshold save failed'); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="space-y-4">
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_.7fr]">
      <label className="block text-[12px] font-bold text-[#2b4b50]">Product<select className={field} required value={productId} onChange={e => setProductId(e.target.value)}><option value="">Choose product</option>{products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>)}</select></label>
      <label className="block text-[12px] font-bold text-[#2b4b50]">Warehouse<select className={field} required value={warehouseId} onChange={e => setWarehouseId(e.target.value)}><option value="">Choose warehouse</option>{warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}</select></label>
      <label className="block text-[12px] font-bold text-[#2b4b50]">Alert at or below<input className={field} type="number" required min={0} max={1000000} step={1} value={count} onChange={e => setCount(Number(e.target.value))}/></label>
    </div>
    <InventoryNotice error={error} success={success}/>
    <button disabled={busy || !products.length || !warehouses.length} type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl !bg-[#07546B] px-5 py-2 text-[13px] font-bold !text-white transition hover:!bg-[#053F52] disabled:cursor-not-allowed disabled:opacity-50">{busy ? <LoaderCircle size={17} className="animate-spin"/> : <BellPlus size={17}/>} {busy ? 'Saving…' : 'Save threshold'}</button>
  </form>;
}
