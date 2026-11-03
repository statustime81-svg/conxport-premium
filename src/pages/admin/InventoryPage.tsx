import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import { RefreshCw, SlidersHorizontal } from 'lucide-react';
import InventoryShell from '../../components/admin/inventory/InventoryShell';
import InventorySummary from '../../components/admin/inventory/InventorySummary';
import InventoryFilter from '../../components/admin/inventory/InventoryFilter';
import StockTable from '../../components/admin/inventory/StockTable';
import InventoryNotice from '../../components/admin/inventory/InventoryNotice';
import { useInventoryData } from '../../hooks/useInventoryData';
import { getInventoryBalances } from '../../services/inventoryBalances';
import { inventoryProducts } from '../../services/inventoryProducts';
import { getWarehouses } from '../../services/warehouses';
export default function InventoryPage(){
 const b=useInventoryData(useCallback(getInventoryBalances,[]),[]);
 const p=useInventoryData(useCallback(inventoryProducts,[]),[]);
 const w=useInventoryData(useCallback(getWarehouses,[]),[]);
 const[s,setS]=useState('');const[warehouseId,setWarehouseId]=useState('');
 const ids=new Set(p.data.filter(v=>`${v.name} ${v.sku}`.toLowerCase().includes(s.trim().toLowerCase())).map(v=>v.id));
 const filtered=b.data.filter(v=>ids.has(v.product_id)&&(!warehouseId||v.warehouse_id===warehouseId));
 const busy=b.loading||p.loading||w.loading;
 return <InventoryShell title="Inventory" description="Review live stock levels across products and warehouses.">
 <InventoryNotice error={b.error||p.error||w.error}/>
 <InventorySummary balances={b.data}/>
 <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex w-full flex-wrap gap-2 sm:w-auto"><InventoryFilter search={s} onSearch={setS}/><label><span className="sr-only">Filter by warehouse</span><select value={warehouseId} onChange={e=>setWarehouseId(e.target.value)} className="h-11 max-w-full rounded-xl border border-[#d9e7e3] bg-white px-3 text-[13px] font-semibold text-[#32545b]"><option value="">All warehouses</option>{w.data.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label></div><div className="flex gap-2"><Link to="/admin/stock-adjustment" className="inline-flex min-h-10 items-center gap-2 rounded-xl !bg-[#0d5c4f] px-4 py-2.5 text-[12px] font-bold !text-white hover:!bg-[#084c42]"><SlidersHorizontal size={15}/>Adjust stock</Link><button type="button" onClick={()=>{void b.reload();void p.reload();void w.reload()}} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#d9e7e3] bg-white px-4 py-2.5 text-[12px] font-bold text-[#31535a] hover:bg-[#f0faf6]"><RefreshCw size={15}/>Refresh</button></div></div>
 {busy?<div role="status" className="rounded-2xl border border-[#dce9e5] bg-white px-5 py-12 text-sm text-[#647d83]">Loading stock...</div>:<StockTable balances={filtered} products={p.data} warehouses={w.data}/>}
 </InventoryShell>;
}
