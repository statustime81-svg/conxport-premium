import { requireCrmAdmin } from './crmAccess';
import { crmStatusSchema,crmUuidSchema } from '../lib/validations/crm';
import type { EnquiryStatus } from '../types/crm';
export async function changeEnquiryStatus(id:string,status:EnquiryStatus){crmUuidSchema.parse(id);crmStatusSchema.parse(status);const db=await requireCrmAdmin();const {data,error}=await db.from('enquiries').update({status}).eq('id',id).select('id,status').single();if(error)throw error;return data;}
