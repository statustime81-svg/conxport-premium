import { requireCrmAdmin } from './crmAccess';
import { crmNoteSchema,crmUuidSchema } from '../lib/validations/crm';
import type { CrmNote } from '../types/crm';
export async function listCrmNotes(enquiryId:string):Promise<CrmNote[]>{crmUuidSchema.parse(enquiryId);const db=await requireCrmAdmin();const{data,error}=await db.from('enquiry_notes').select('id,enquiry_id,author_id,body,created_at').eq('enquiry_id',enquiryId).order('created_at',{ascending:false});if(error)throw error;return(data??[])as CrmNote[];}
export async function addCrmNote(enquiryId:string,body:string){crmUuidSchema.parse(enquiryId);const text=crmNoteSchema.parse(body);const db=await requireCrmAdmin();const {data:user,error:authError}=await db.auth.getUser();if(authError||!user.user)throw new Error('Authentication required');const {error}=await db.from('enquiry_notes').insert({enquiry_id:enquiryId,body:text,author_id:user.user.id});if(error)throw error;}
