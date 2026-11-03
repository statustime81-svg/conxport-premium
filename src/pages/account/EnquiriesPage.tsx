import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuthState } from '../../app/providers';
import { requireSupabase } from '../../lib/supabase/client';
import type { EnquiryRecord } from '../../lib/supabase/types';
export default function EnquiriesPage(){const {session}=useAuthState();const [items,setItems]=useState<EnquiryRecord[]>([]);const [error,setError]=useState('');const [loading,setLoading]=useState(true);
 useEffect(()=>{if(!session?.user.id){setLoading(false);return;}let active=true;requireSupabase().from('enquiries').select('*').eq('user_id',session.user.id).order('created_at',{ascending:false}).then(({data,error})=>{if(!active)return;setItems((data??[]) as EnquiryRecord[]);setError(error?.message??'');setLoading(false);});return()=>{active=false};},[session?.user.id]);
 return <section className="cx-portal"><p className="cx-overline">YOUR REQUESTS</p><h1>Enquiry history</h1><p>Only enquiries linked to your signed-in account appear here.</p>{loading?<p>Loading enquiries…</p>:error?<p role="alert">{error}</p>:items.length?<div className="cx-cards">{items.map(e=><Link className="cx-panel cx-link-card" key={e.id} to={'/account/enquiries/'+e.id}><h2>{e.reference}</h2><p>{e.company} · {new Date(e.created_at).toLocaleDateString()}</p><strong>{e.status.replaceAll('_',' ')}</strong></Link>)}</div>:<p className="cx-panel">No linked enquiries found. Guest enquiries will not automatically appear in your account. <Link to="/request-quote">Request a quote</Link></p>}</section>;
}
