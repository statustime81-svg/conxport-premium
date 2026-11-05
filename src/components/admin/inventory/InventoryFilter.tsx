import { Search } from 'lucide-react';
export default function InventoryFilter({search,onSearch}:{search:string;onSearch:(value:string)=>void}){
 return <label className="relative block w-full max-w-[430px]"><span className="sr-only">Search inventory by product name or SKU</span><Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7f969b]"/><input value={search} onChange={e=>onSearch(e.target.value)} placeholder="Search product or SKU..." className="h-11 w-full min-w-0 rounded-xl border border-[#DCECF0] bg-white pl-11 pr-4 text-[13px] text-[#193c42] outline-none transition focus:border-[#07546B] focus:ring-2 focus:ring-[#07546B]/10"/></label>;
}
