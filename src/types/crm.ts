import type { BuyerType, EnquiryStatus } from '../lib/supabase/types';
export type { EnquiryStatus };
export type CrmEnquiry={id:string;reference:string;user_id:string|null;full_name:string;email:string;phone:string;company:string;country:string;city:string|null;buyer_type:BuyerType;quantity:number;requirements:string;status:EnquiryStatus;created_at:string};
export type CrmItem={enquiry_id:string;product_id:string;quantity:number;products:{name:string;slug:string;sku:string}|null};
export type CrmNote={id:string;enquiry_id:string;author_id:string;body:string;created_at:string};
export type CrmCustomer={id:string;full_name:string|null;company:string|null;created_at:string};
export const CRM_STATUSES:EnquiryStatus[]=['new','contacted','quoted','closed_won','closed_lost'];
