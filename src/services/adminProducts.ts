import { requireSupabase } from '../lib/supabase/client';
import { adminProductSchema, type AdminProductInput } from '../lib/validations/adminProduct';
export type AdminProduct = AdminProductInput & { id: string; created_at: string; updated_at: string };
export type AdminCategory = { id:string; name:string; parent_id:string|null; is_published:boolean };
async function verifiedClient() {
  const client = requireSupabase();
  const { data: auth, error: authError } = await client.auth.getUser();
  if (authError || !auth.user) throw new Error('Sign in as an administrator first.');
  const {data, error} = await client.from('admin_users').select('user_id').eq('user_id',auth.user.id).maybeSingle();
  if(error || !data) throw new Error('Administrator access required.');
  return client;
}
export async function listAdminProducts(search = ''): Promise<AdminProduct[]> {
  const db=await verifiedClient();
  let query=db.from('products').select('id,name,slug,sku,summary,description,primary_category_id,is_published,created_at,updated_at').order('created_at',{ascending:false}).limit(100);
  const term=search.trim().replace(/[%_,()]/g,'');
  if(term) query=query.ilike('name',`%${term}%`);
  const {data,error}=await query;
  if(error) throw error;
  return (data ?? []) as AdminProduct[];
}
export async function getAdminProduct(id:string):Promise<AdminProduct|null> {
  const db=await verifiedClient();
  const {data,error}=await db.from('products').select('id,name,slug,sku,summary,description,primary_category_id,is_published,created_at,updated_at').eq('id',id).maybeSingle();
  if(error) throw error;
  return data as AdminProduct|null;
}
export async function listAdminCategories():Promise<AdminCategory[]> {
  const db=await verifiedClient();
  const {data,error}=await db.from('categories').select('id,name,parent_id,is_published').order('name').limit(500);
  if(error) throw error;
  return (data??[]) as AdminCategory[];
}
export async function saveAdminProduct(values:AdminProductInput,id?:string):Promise<string>{
  const payload=adminProductSchema.parse(values); const db=await verifiedClient();
  if(id){
    const {data,error}=await db.from('products').update({...payload,updated_at:new Date().toISOString()}).eq('id',id).select('id').single();
    if(error) throw error;
    return data.id as string;
  }
  const {data,error}=await db.from('products').insert(payload).select('id').single();
  if(error) throw error;
  return data.id as string;
}
export async function deleteAdminProduct(id:string){
  const db=await verifiedClient();
  const {data,error}=await db.from('products').delete().eq('id',id).select('id');
  if(error) throw error;
  if(!data?.length) throw new Error('Product not deleted. Check admin permissions.');
}
