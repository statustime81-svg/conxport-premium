import { supabase } from '../lib/supabase/client';
import type { EnquiryValues } from '../lib/validations/enquiry';
import type { EnquiryRecord } from '../lib/supabase/types';

export interface SubmitEnquiryResult { reference: string }
export async function submitEnquiry(values: EnquiryValues, productIds: string[]): Promise<SubmitEnquiryResult> {
  if (!supabase) throw new Error('Enquiries are not available until Supabase is configured.');
  const { data, error } = await supabase.functions.invoke<SubmitEnquiryResult>('submit-enquiry', {
    body: { ...values, productIds },
  });
  if (error) throw new Error(error.message || 'Enquiry submission failed');
  if (!data?.reference) throw new Error('No enquiry reference returned. Please try again.');
  return data;
}
export async function listMyEnquiries(): Promise<EnquiryRecord[]> {
  if (!supabase) return [];
  const { data: userResult } = await supabase.auth.getUser();
  if (!userResult.user) return [];
  const { data, error } = await supabase.from('enquiries')
    .select('id,reference,user_id,full_name,email,phone,company,country,city,buyer_type,quantity,requirements,status,created_at')
    .eq('user_id', userResult.user.id).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as EnquiryRecord[];
}
