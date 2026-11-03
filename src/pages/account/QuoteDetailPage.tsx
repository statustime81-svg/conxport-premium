import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useAuthState } from '../../app/providers';
import { requireSupabase } from '../../lib/supabase/client';
import type { EnquiryRecord } from '../../lib/supabase/types';
export default function QuoteDetailPage(){const {id}=useParams();const {session}=useAuthState();const [record,setRecord]=useState<EnquiryRecord|null>(null);const [pending,setPending]=useState(true);const [error,setError]=useState('');
 useEffect(()=>{if(!id||!session?.user.id){setPending(false);return;}let active=true;requireSupabase().from('enquiries').select('*').eq('id',id).eq('user_id',session.user.id).maybeSingle().then(({data,error})=>{if(active){setRecord(data as EnquiryRecord|null);setError(error?.message??'');setPending(false);}});return()=>{active=false};},[id,session?.user.id]);
 return <section className="cx-portal"><Link to="/account/quotes">← Quote tracking</Link>{pending?<p>Loading…</p>:error?<p role="alert">{error}</p>:!record?<p>Request not found.</p>:<><p className="cx-overline">QUOTATION REQUEST</p><h1>{record.reference}</h1><div className="cx-panel"><h2>{record.status.replaceAll('_',' ')}</h2><p>We received your request on {new Date(record.created_at).toLocaleDateString()}.</p><p>This view tracks enquiry status only. Final quotation documents are issued separately by the ConXport team.</p><Link to={'/account/enquiries/'+record.id}>View enquiry details</Link></div></>}</section>;
}
