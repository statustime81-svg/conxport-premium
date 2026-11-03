import { requireSupabase } from '../lib/supabase/client';
export async function inventoryClient(){
 const db=requireSupabase();const {data:{user},error}=await db.auth.getUser();
 if(error||!user)throw new Error('Please sign in as an administrator.');
 const result=await db.from('admin_users').select('user_id').eq('user_id',user.id).maybeSingle();
 if(result.error||!result.data)throw new Error('Administrator permission required.');
 return db;
}
