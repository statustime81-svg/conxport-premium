import { useOnlineStatus } from '../../hooks/useOnlineStatus';
export default function ConnectionBanner(){const online=useOnlineStatus();if(online)return null;return <div role="status" className="fixed bottom-4 left-4 right-4 z-50 rounded-lg border border-amber-400 bg-slate-950 p-4 text-amber-100 md:right-auto">You are offline. Enquiries cannot be submitted until your connection returns.</div>}
