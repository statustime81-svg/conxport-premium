import type { InventoryBalance } from '../../../types/inventory';
import { Package, Layers3, AlertTriangle } from 'lucide-react';
export default function InventorySummary({ balances }: { balances: InventoryBalance[] }) {
  const metrics = [
    { title: 'Total stock units', value: balances.reduce((a, b) => a + b.quantity, 0), icon: Package },
    { title: 'Stock positions', value: balances.length, icon: Layers3 },
    { title: 'Low / out of stock', value: balances.filter(b => b.quantity <= b.low_stock_threshold).length, icon: AlertTriangle },
  ];
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{metrics.map(({title,value,icon:Icon})=><div key={title} className="rounded-2xl border border-[#e0ebe7] bg-white p-5 shadow-[0_5px_20px_rgba(22,68,66,0.025)]"><div className="mb-3 flex items-center justify-between"><span className="text-[12px] font-semibold text-[#658087]">{title}</span><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#E7F5F7] text-[#07546B]"><Icon size={18}/></span></div><strong className="text-[29px] font-extrabold tabular-nums tracking-tight text-[#15323b]">{value.toLocaleString()}</strong></div>)}</div>;
}
