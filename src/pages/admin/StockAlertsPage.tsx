import { useCallback, useMemo, useState } from 'react';
import { AlertTriangle, BellRing, CircleCheck, PackageX, Search } from 'lucide-react';
import InventoryShell from '../../components/admin/inventory/InventoryShell';
import InventoryNotice from '../../components/admin/inventory/InventoryNotice';
import StockTable from '../../components/admin/inventory/StockTable';
import ThresholdForm from '../../components/admin/inventory/ThresholdForm';
import { useInventoryData } from '../../hooks/useInventoryData';
import { getInventoryBalances } from '../../services/inventoryBalances';
import { inventoryProducts } from '../../services/inventoryProducts';
import { getWarehouses } from '../../services/warehouses';

export default function StockAlertsPage() {
  const balances = useInventoryData(useCallback(getInventoryBalances, []), []);
  const products = useInventoryData(useCallback(inventoryProducts, []), []);
  const warehouses = useInventoryData(useCallback(getWarehouses, []), []);
  const [query, setQuery] = useState('');
  const [warehouseId, setWarehouseId] = useState('all');
  const [level, setLevel] = useState<'all' | 'out' | 'low'>('all');
  const loading = balances.loading || products.loading || warehouses.loading;
  const alerts = useMemo(() => balances.data.filter(row => row.quantity <= row.low_stock_threshold), [balances.data]);
  const outCount = alerts.filter(row => row.quantity <= 0).length;
  const lowCount = alerts.filter(row => row.quantity > 0).length;
  const visible = useMemo(() => alerts.filter(row => {
    const product = products.data.find(item => item.id === row.product_id);
    const warehouse = warehouses.data.find(item => item.id === row.warehouse_id);
    const text = `${product?.name ?? ''} ${product?.sku ?? ''} ${warehouse?.name ?? ''}`.toLowerCase();
    return text.includes(query.toLowerCase().trim()) &&
      (warehouseId === 'all' || row.warehouse_id === warehouseId) &&
      (level === 'all' || (level === 'out' ? row.quantity <= 0 : row.quantity > 0));
  }), [alerts, products.data, warehouses.data, query, warehouseId, level]);

  return (
    <InventoryShell title="Stock alerts" description="Review low and out-of-stock equipment and configure reorder thresholds for each warehouse.">
      <InventoryNotice error={balances.error || products.error || warehouses.error} />
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Active alerts', value: alerts.length, icon: BellRing, tone: 'text-[#07546B] bg-[#E7F5F7]' },
          { label: 'Out of stock', value: outCount, icon: PackageX, tone: 'text-red-700 bg-red-50' },
          { label: 'Low stock', value: lowCount, icon: AlertTriangle, tone: 'text-amber-700 bg-amber-50' },
        ].map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border border-[#DCECF0] bg-white p-5 shadow-[0_6px_24px_rgba(10,40,45,0.035)]">
            <div><p className="!m-0 !text-[12px] !font-semibold !text-[#61757c]">{label}</p><p className="!mb-0 !mt-2 !text-[28px] !font-extrabold !text-[#17313b]">{loading ? '…' : value}</p></div>
            <span className={`grid h-11 w-11 place-items-center rounded-xl ${tone}`}><Icon size={21} /></span>
          </div>
        ))}
      </div>
      <section className="rounded-2xl border border-[#DCECF0] bg-white p-5 sm:p-6">
        <div className="mb-5"><h2 className="!m-0 !text-[19px] !font-extrabold !text-[#17313b]">Set reorder threshold</h2><p className="!mb-0 !mt-1 !text-[13px] !leading-6 !text-[#687d83]">Select a product and warehouse, then enter the quantity that should trigger a stock alert.</p></div>
        <ThresholdForm products={products.data} warehouses={warehouses.data} onSaved={() => void balances.reload()} />
      </section>
      <section className="rounded-2xl border border-[#DCECF0] bg-white p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div><h2 className="!m-0 !text-[19px] !font-extrabold !text-[#17313b]">Current stock alerts</h2><p className="!mb-0 !mt-1 !text-[13px] !text-[#687d83]">Showing {visible.length} of {alerts.length} alerts</p></div>
          {!loading && alerts.length === 0 && <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-[12px] font-semibold text-emerald-700"><CircleCheck size={16} /> No active alerts</span>}
        </div>
        <div className="mb-5 grid gap-3 md:grid-cols-[minmax(200px,1fr)_200px_160px]">
          <label className="relative"><span className="sr-only">Search alerts</span><Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search product or SKU" className="h-11 w-full rounded-xl border border-[#DCECF0] bg-white pl-10 pr-3 text-[13px] text-[#17313b] outline-none focus:border-[#07546B]"/></label>
          <label><span className="sr-only">Filter warehouse</span><select value={warehouseId} onChange={e => setWarehouseId(e.target.value)} className="h-11 w-full rounded-xl border border-[#DCECF0] bg-white px-3 text-[13px] text-[#17313b]"><option value="all">All warehouses</option>{warehouses.data.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}</select></label>
          <label><span className="sr-only">Filter alert type</span><select value={level} onChange={e => setLevel(e.target.value as typeof level)} className="h-11 w-full rounded-xl border border-[#DCECF0] bg-white px-3 text-[13px] text-[#17313b]"><option value="all">All alerts</option><option value="out">Out of stock</option><option value="low">Low stock</option></select></label>
        </div>
        {loading ? <p role="status" className="!text-sm !text-slate-500">Loading stock alerts…</p> : <StockTable balances={visible} products={products.data} warehouses={warehouses.data} />}
      </section>
    </InventoryShell>
  );
}
