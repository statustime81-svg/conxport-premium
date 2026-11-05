import { useCallback, useState } from 'react';
import { ArrowLeftRight, CircleAlert, ShieldCheck } from 'lucide-react';
import InventoryShell from '../../components/admin/inventory/InventoryShell';
import InventoryNotice from '../../components/admin/inventory/InventoryNotice';
import StockAdjustmentForm from '../../components/admin/inventory/StockAdjustmentForm';
import { useInventoryData } from '../../hooks/useInventoryData';
import { inventoryProducts } from '../../services/inventoryProducts';
import { getWarehouses } from '../../services/warehouses';

export default function StockAdjustmentPage() {
  const products = useInventoryData(useCallback(inventoryProducts, []), []);
  const warehouses = useInventoryData(useCallback(getWarehouses, []), []);
  const [success, setSuccess] = useState('');
  return (
    <InventoryShell title="Stock adjustment" description="Record stock received or issued for a specific product and warehouse.">
      <InventoryNotice error={products.error || warehouses.error} success={success} />
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="rounded-2xl border border-[#DCECF0] bg-white p-5 shadow-[0_8px_30px_rgba(10,40,45,.035)] sm:p-7">
          <div className="mb-6 flex items-start gap-3 border-b border-[#e8eeee] pb-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e9f5f1] text-[#07546B]"><ArrowLeftRight size={21} /></span><div><h2 className="!m-0 !text-[19px] !font-extrabold !text-[#17313b]">New stock movement</h2><p className="!mb-0 !mt-1 !text-[13px] !text-[#63787e]">Choose the product, location, movement type and quantity.</p></div></div>
          {products.loading || warehouses.loading ? <p role="status" className="!text-sm !text-slate-500">Loading products and warehouses…</p> : <StockAdjustmentForm products={products.data} warehouses={warehouses.data} onSaved={() => setSuccess('Stock movement recorded successfully.')} />}
        </section>
        <aside className="rounded-2xl border border-[#DCECF0] bg-[#f4faf7] p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-[#07546B]"><ShieldCheck size={21} /><h2 className="!m-0 !text-[16px] !font-extrabold">Before you save</h2></div>
          <p className="!m-0 !text-[13px] !leading-6 !text-[#526a6f]">Stock IN increases quantity. Stock OUT reduces it. The database prevents negative stock balances.</p>
          <div className="mt-5 flex items-start gap-2 border-t border-[#dceae4] pt-4 text-[#61777d]"><CircleAlert size={18} className="mt-0.5 shrink-0"/><p className="!m-0 !text-[12px] !leading-5">Use a clear reason for every movement. Submitted transactions are recorded in stock movement history.</p></div>
        </aside>
      </div>
    </InventoryShell>
  );
}
