import type { EnquiryStatus } from '../../types/crm';
export function crmDate(value:string){return new Date(value).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'});}
export function crmStatusLabel(s:EnquiryStatus){return s.replaceAll('_',' ').replace(/\b\w/g,c=>c.toUpperCase());}
export function crmShortId(s:string){return s.slice(0,8).toUpperCase();}
