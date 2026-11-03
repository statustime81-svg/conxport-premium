import {useEffect,useState} from 'react';import {requireSupabase} from '../../../lib/supabase/client';
type Media={id:string;storage_path:string;media_type:string;sort_order:number};
export default function ProductMediaPanel({productId}:{productId:string}){const [media,setMedia]=useState<Media[]>([]);const [error,setError]=useState('');
 useEffect(()=>{let live=true;requireSupabase().from('product_media').select('id,storage_path,media_type,sort_order').eq('product_id',productId).order('sort_order').then(({data,error})=>{if(!live)return;if(error)setError(error.message);else setMedia((data??[]) as Media[])});return()=>{live=false}},[productId]);
 return <section className="cx-panel"><h2>Product media</h2><p>Read-only review of uploaded media. Secure upload permissions are not deployed yet.</p>{error&&<p role="alert">{error}</p>}{media.length?media.map(m=><p key={m.id}>{m.media_type}: {m.storage_path}</p>):<p>No media attached.</p>}</section>}
