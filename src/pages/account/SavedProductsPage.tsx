import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useAuthState } from '../../app/providers';
import { requireSupabase } from '../../lib/supabase/client';
type Saved = { product_id:string; products: {name:string;slug:string;sku:string}|null };
export default function SavedProductsPage(){
 const {session}=useAuthState(); const [items,setItems]=useState<Saved[]>([]); const [message,setMessage]=useState(''); const [busy,setBusy]=useState('');
 useEffect(()=>{if(!session?.user.id)return; let mounted=true;
  requireSupabase().from('saved_products').select('product_id, products(name,slug,sku)').eq('user_id',session.user.id).order('created_at',{ascending:false}).then(({data,error})=>{if(!mounted)return;if(error)setMessage(error.message);else setItems((data??[]).map(row => ({ product_id: row.product_id, products: Array.isArray(row.products) ? (row.products[0] ?? null) : (row.products ?? null) })) as Saved[]);});
  return()=>{mounted=false};},[session?.user.id]);
 async function remove(id:string){if(!session?.user.id)return;setBusy(id);const {error}=await requireSupabase().from('saved_products').delete().eq('user_id',session.user.id).eq('product_id',id);if(error)setMessage(error.message);else setItems(v=>v.filter(p=>p.product_id!==id));setBusy('');}
 return <section className="cx-portal"><p className="cx-overline">PERSONAL COLLECTION</p><h1>Saved equipment</h1><p>Products saved under your account.</p>{message&&<p role="alert">{message}</p>}
 <div className="cx-cards">{items.map(item=><article key={item.product_id} className="cx-panel"><h2>{item.products?.name??'Product unavailable'}</h2><p>{item.products?.sku??''}</p>{item.products&&<Link to={'/products/'+item.products.slug}>View equipment</Link>}<button type="button" disabled={busy===item.product_id} onClick={()=>void remove(item.product_id)}>Remove</button></article>)}</div>
 {!items.length&&!message&&<p className="cx-panel">No saved products yet. <Link to="/products">Explore equipment</Link></p>}
 </section>;
}
