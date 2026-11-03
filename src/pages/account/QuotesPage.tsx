import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuthState } from '../../app/providers';
import { requireSupabase } from '../../lib/supabase/client';
import type { EnquiryRecord } from '../../lib/supabase/types';
export default function QuotesPage(){const {session}=useAuthState();const [rows,setRows]=useState<EnquiryRecord[]>([]);const [error,setError]=useState('');const [loading,setLoading]=useState(true);
 useEffect(()=>{if(!session?.user.id){setLoading(false);return;}let active=true;requireSupabase().from('enquiries').select('*').eq('user_id',session.user.id).order('created_at',{ascending:false}).then(({data,error})=>{if(active){setRows((data??[]) as EnquiryRecord[]);setError(error?.message??'');setLoading(false);}});return()=>{active=false};},[session?.user.id]);
 return <section className="cx-portal"><p className="cx-overline">QUOTE TRACKING</p><h1>Quotation status</h1><p>Track the progress of enquiries. Formal quotation documents and prices are not available in this version.</p>{loading?<p>Loading…</p>:error?<p role="alert">{error}</p>:rows.length?<div className="cx-cards">{rows.map(e=><Link className="cx-panel cx-link-card" key={e.id} to={'/account/quotes/'+e.id}><h2>{e.reference}</h2><p>{new Date(e.created_at).toLocaleDateString()}</p><strong>{e.status.replaceAll('_',' ')}</strong></Link>)}</div>:<p className="cx-panel">No quotes requested from this account yet.</p>}</section>;
}
