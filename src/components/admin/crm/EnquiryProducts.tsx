import{useCallback}from'react';
import{listCrmItems}from '../../../services/crmItems';
import{useCrmResource}from '../../../hooks/useCrmResource';
import type{CrmItem}from '../../../types/crm';
export default function EnquiryProducts({id}:{id:string}){const loader=useCallback(()=>listCrmItems(id),[id]);const{data,error,loading}=useCrmResource<CrmItem[]>(loader,[]);return <div className="cx-panel"><h2>Requested products</h2>{loading?<p>Loading…</p>:error?<p role="alert">{error}</p>:!data.length?<p>General enquiry without linked products.</p>:data.map(item=><p key={item.product_id}>{item.products?.name??'Product unavailable'} · Quantity {item.quantity}</p>)}</div>;}
