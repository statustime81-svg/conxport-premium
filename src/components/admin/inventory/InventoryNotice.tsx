import { AlertCircle, CheckCircle2 } from 'lucide-react';
export default function InventoryNotice({error,success}:{error?:string;success?:string}){
 if(!error&&!success)return null;
 const Icon=error?AlertCircle:CheckCircle2;
 return <div role={error?'alert':'status'} className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${error?'border-red-200 bg-red-50 text-red-700':'border-emerald-200 bg-emerald-50 text-emerald-800'}`}><Icon size={18} className="mt-0.5 shrink-0"/><span>{error||success}</span></div>;
}
