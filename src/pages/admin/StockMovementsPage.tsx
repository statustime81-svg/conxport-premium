import { useCallback, useMemo, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, RefreshCw, Search } from 'lucide-react';
import InventoryShell from '../../components/admin/inventory/InventoryShell';
import MovementTable from '../../components/admin/inventory/MovementTable';
import InventoryNotice from '../../components/admin/inventory/InventoryNotice';
import { useInventoryData } from '../../hooks/useInventoryData';
import { getInventoryMovements } from '../../services/inventoryMovements';
import { inventoryProducts } from '../../services/inventoryProducts';
import { getWarehouses } from '../../services/warehouses';
export default function StockMovementsPage(){
 const m=useInventoryData(useCallback(getInventoryMovements,[]),[]);const p=useInventoryData(useCallback(inventoryProducts,[]),[]);const w=useInventoryData(useCallback(getWarehouses,[]),[]);
 const[q,setQ]=useState('');const[direction,setDirection]=useState('all');
 const rows=useMemo(()=>m.data.filter(x=>{const product=p.data.find(z=>z.id===x.product_id);const warehouse=w.data.find(z=>z.id===x.warehouse_id);return (!q||`${product?.name??''} ${product?.sku??''} ${warehouse?.name??''} ${x.reason}`.toLowerCase().includes(q.toLowerCase()))&&(direction==='all'||(direction==='in'?x.delta>0:x.delta<0))}),[m.data,p.data,w.data,q,direction]);
 const inbound=m.data.filter(x=>x.delta>0);const outbound=m.data.filter(x=>x.delta<0);
 return <InventoryShell title="Stock movements" description="Review the latest 300 stock transactions and their recorded reasons.">
 <InventoryNotice error={m.error||p.error||w.error}/>
 <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{[{title:'Movements',value:m.data.length,icon:RefreshCw},{title:'Stock IN records',value:inbound.length,icon:ArrowDownLeft},{title:'Stock OUT records',value:outbound.length,icon:ArrowUpRight}].map(({title,value,icon:Icon})=><div key={title} className="rounded-2xl border border-[#e0ebe7] bg-white p-5"><div className="mb-3 flex justify-between text-[12px] font-semibold text-[#698087]">{title}<Icon size={18} className="text-[#07546B]"/></div><strong className="text-[29px] font-extrabold tabular-nums text-[#15323b]">{value}</strong></div>)}</div>
 <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex flex-1 flex-wrap gap-2"><label className="relative w-full max-w-[340px]"><span className="sr-only">Search stock movements</span><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#83989e]"/><input placeholder="Search product, warehouse, reason..." value={q} onChange={e=>setQ(e.target.value)} className="h-11 w-full rounded-xl border border-[#DCECF0] bg-white pl-10 pr-3 text-[12px] text-[#17353c] outline-none focus:border-[#07546B]"/></label><select aria-label="Movement direction" value={direction} onChange={e=>setDirection(e.target.value)} className="h-11 rounded-xl border border-[#DCECF0] bg-white px-3 text-[12px] font-bold text-[#345961]"><option value="all">All movements</option><option value="in">Stock IN</option><option value="out">Stock OUT</option></select></div><button type="button" onClick={()=>{void m.reload();void p.reload();void w.reload()}} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#DCECF0] bg-white px-4 py-2 text-[12px] font-bold text-[#31535a] hover:bg-[#f2faf7]"><RefreshCw size={15}/>Refresh history</button></div>
 {m.loading||p.loading||w.loading?<div role="status" className="rounded-xl bg-white p-6 text-sm text-[#71898d]">Loading stock movements...</div>:<MovementTable items={rows} products={p.data} warehouses={w.data}/>}
 </InventoryShell>;
}
