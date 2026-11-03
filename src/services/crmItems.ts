import { requireCrmAdmin } from './crmAccess';
import { crmUuidSchema } from '../lib/validations/crm';
import type { CrmItem } from '../types/crm';
export async function listCrmItems(enquiryId:string):Promise<CrmItem[]>{crmUuidSchema.parse(enquiryId);const db=await requireCrmAdmin();const {data,error}=await db.from('enquiry_items').select('enquiry_id,product_id,quantity,products(name,slug,sku)').eq('enquiry_id',enquiryId);if(error)throw error;return(data??[]).map(x=>({...x,products:Array.isArray(x.products)?x.products[0]??null:x.products??null}))as CrmItem[];}
