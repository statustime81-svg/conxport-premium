import { requireCrmAdmin } from './crmAccess';
import type { CrmCustomer } from '../types/crm';
export async function listRegisteredCustomers():Promise<CrmCustomer[]>{const db=await requireCrmAdmin();const{data,error}=await db.from('profiles').select('id,full_name,company,created_at').order('created_at',{ascending:false}).limit(500);if(error)throw error;return(data??[]) as CrmCustomer[];}
