import { z } from 'zod';
export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your name').max(120),
  email: z.email('Enter a valid email').max(254),
  phone: z.string().trim().min(7, 'Enter a valid phone number').max(30).regex(/^[+()\d\s.-]+$/, 'Use a valid phone number'),
  company: z.string().trim().min(2, 'Enter company / institution').max(160),
  country: z.string().trim().min(2, 'Enter a country').max(80),
  city: z.string().trim().max(100).optional(),
  buyerType: z.enum(['hospital','laboratory','distributor','institution','individual','other']),
  quantity: z.coerce.number<number>().int().min(1, 'Quantity must be at least 1').max(100000),
  requirements: z.string().trim().min(10, 'Describe your requirements').max(5000),
  consent: z.boolean().refine((value) => value === true, { message: 'Please confirm consent to be contacted' }),
  website: z.string().max(0).optional(),
});
export type EnquiryValues = z.infer<typeof enquirySchema>;
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export function validateEnquiryAttachment(file?: File | null): string | null {
  if (!file) return null;
  if (file.size > MAX_ATTACHMENT_BYTES) return 'Maximum attachment size is 5 MB';
  if (!['application/pdf','image/jpeg','image/png'].includes(file.type)) return 'Only PDF, JPG and PNG attachments are allowed';
  return null;
}
