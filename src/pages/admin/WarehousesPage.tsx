import { useCallback, useRef, useState } from 'react';
import { RefreshCw, Plus } from 'lucide-react';
import InventoryShell from '../../components/admin/inventory/InventoryShell';
import WarehouseForm from '../../components/admin/inventory/WarehouseForm';
import WarehouseTable from '../../components/admin/inventory/WarehouseTable';
import InventoryNotice from '../../components/admin/inventory/InventoryNotice';
import { useInventoryData } from '../../hooks/useInventoryData';
import { getWarehouses, removeWarehouse } from '../../services/warehouses';
import type { Warehouse } from '../../types/inventory';
export default function WarehousesPage(){
 const warehouses=useInventoryData(useCallback(getWarehouses,[]),[]);const[editing,setEditing]=useState<Warehouse|null>(null);const[error,setError]=useState('');const editorRef=useRef<HTMLDivElement>(null);
 const focusEditor=()=>editorRef.current?.scrollIntoView({behavior:'smooth',block:'center'});
 async function remove(w:Warehouse){if(!window.confirm(`Delete ${w.name}? Stock-linked warehouses cannot be deleted.`))return;setError('');try{await removeWarehouse(w.id);void warehouses.reload()}catch(e){setError(e instanceof Error?e.message:'Delete failed')}}
 return <InventoryShell title="Warehouses" description="Manage warehouse locations while keeping existing stock records and history safe.">
 <InventoryNotice error={error||warehouses.error}/>
 <div className="flex flex-wrap items-center justify-between gap-3"><div className="rounded-xl border border-[#DCECF0] bg-white px-5 py-3"><span className="mr-3 text-[12px] font-semibold text-[#758b90]">Active locations</span><strong className="text-[20px] font-extrabold text-[#143740]">{warehouses.data.length}</strong></div><div className="flex gap-2"><button type="button" onClick={()=>{setEditing(null);focusEditor()}} className="inline-flex min-h-10 items-center gap-2 rounded-xl !bg-[#07546B] px-4 py-2 text-[12px] font-bold !text-white"><Plus size={16}/>Add warehouse</button><button type="button" onClick={()=>void warehouses.reload()} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#DCECF0] bg-white px-4 py-2 text-[12px] font-bold text-[#31535a]"><RefreshCw size={15}/>Refresh</button></div></div>
 <div ref={editorRef}><WarehouseForm key={editing?.id??'new'} value={editing??undefined} onSaved={()=>{setEditing(null);void warehouses.reload()}} onCancel={editing?()=>setEditing(null):undefined}/></div>
 {warehouses.loading?<div role="status" className="rounded-xl bg-white p-6 text-sm text-[#71898d]">Loading warehouses...</div>:<WarehouseTable items={warehouses.data} onEdit={w=>{setEditing(w);window.requestAnimationFrame(focusEditor)}} onDelete={w=>void remove(w)}/>}
 </InventoryShell>;
}
