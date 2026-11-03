import { requireCrmAdmin } from './crmAccess';
import type { CrmEnquiry } from '../types/crm';
import { crmUuidSchema } from '../lib/validations/crm';
export async function getCrmEnquiries():Promise<CrmEnquiry[]>{const db=await requireCrmAdmin();const{data,error}=await db.from('enquiries').select('id,reference,user_id,full_name,email,phone,company,country,city,buyer_type,quantity,requirements,status,created_at').order('created_at',{ascending:false}).limit(500);if(error)throw error;return(data??[]) as CrmEnquiry[];}
export async function getCrmEnquiry(id:string):Promise<CrmEnquiry|null>{crmUuidSchema.parse(id);const db=await requireCrmAdmin();const{data,error}=await db.from('enquiries').select('id,reference,user_id,full_name,email,phone,company,country,city,buyer_type,quantity,requirements,status,created_at').eq('id',id).maybeSingle();if(error)throw error;return data as CrmEnquiry|null;}
