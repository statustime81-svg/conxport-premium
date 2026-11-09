import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Send } from 'lucide-react';
import { enquirySchema, type EnquiryValues } from '../../lib/validations/enquiry';
import { useQuoteItems } from '../../store/quote-list';
import { findProduct } from '../../data/productDetails';
import { supabase } from '../../lib/supabase/client';
import { submitEnquiry } from '../../services/enquiries';

const fieldStyle = 'block w-full min-h-[52px] rounded-[14px] border border-[#d6e5df] bg-[#fbfdfc] px-4 py-3 text-[15px] !text-[#102D3C] placeholder:!text-[#82948c] outline-none transition focus:border-[#D84312] focus:bg-white focus:ring-[3px] focus:ring-[#D84312]/10';
const labelStyle = 'mb-2 block text-[13px] font-bold !text-[#243e35]';
const errorStyle = 'mt-1.5 text-xs !text-[#b42318]';

export default function EnquiryForm() {
  const items = useQuoteItems();
  const [reference, setReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { buyerType: 'hospital', quantity: 1, consent: false, website: '' },
  });

  async function onValid(values: EnquiryValues) {
    setSubmitError(null);
    if (!supabase) {
      setSubmitError('The enquiry service is temporarily unavailable. Please contact our team.');
      return;
    }

    try {
      // The quote list stores product slugs, while the submit-enquiry Edge Function
      // validates published product UUIDs. Resolve slugs before submitting.
      let productIds: string[] = [];
      if (items.length) {
        if (items.length > 30) {
          throw new Error('Please select no more than 30 products for one enquiry.');
        }
        const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        const slugs = items.filter(item => !uuid.test(item));
        const ids = items.filter(item => uuid.test(item));
        const [bySlug, byId] = await Promise.all([
          slugs.length
            ? supabase.from('products').select('id,slug').eq('is_published', true).in('slug', slugs)
            : Promise.resolve({ data: [], error: null }),
          ids.length
            ? supabase.from('products').select('id,slug').eq('is_published', true).in('id', ids)
            : Promise.resolve({ data: [], error: null }),
        ]);
        if (bySlug.error || byId.error) {
          throw new Error('Unable to verify your selected products. Please try again.');
        }
        const resolved = [...(bySlug.data ?? []), ...(byId.data ?? [])];
        const bySlugMap = new Map(resolved.map(row => [row.slug, row.id]));
        const idSet = new Set(resolved.map(row => row.id));
        const unresolved = items.filter(item => !(bySlugMap.has(item) || idSet.has(item)));
        if (unresolved.length) {
          throw new Error('Some selected products are no longer available. Please update your quote list and try again.');
        }
        productIds = [...new Set(items.map(item => bySlugMap.get(item) ?? item))];
      }

      const result = await submitEnquiry(values, productIds);
      setReference(result.reference);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your enquiry. Please try again.');
    }
  }

  if (reference) {
    return <div role="status" className="rounded-[24px] border border-[#bde2d1] bg-white p-8 shadow-sm">
      <CheckCircle2 size={38} className="text-[#D84312]" />
      <h2 className="mt-4 text-[26px] font-extrabold !text-[#102D3C]">Enquiry received</h2>
      <p className="mt-2 !text-[#587169]">Your enquiry reference: <strong className="text-[#D84312]">{reference}</strong></p>
    </div>;
  }

  const field = (label: string, key: keyof EnquiryValues, required = true) => (
    <div key={key}>
      <label htmlFor={key} className={labelStyle}>{label}{required ? ' *' : ''}</label>
      <input id={key} className={fieldStyle} {...register(key)} />
      {errors[key]?.message && <p className={errorStyle} role="alert">{errors[key]?.message?.toString()}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate className="space-y-7 rounded-[26px] border border-[#dbe9e3] bg-white p-5 shadow-[0_25px_65px_rgba(13,92,79,.06)] sm:p-8 lg:p-10">
      <div className="rounded-[16px] border border-[#dcece5] bg-[#f3faf6] px-5 py-4">
        <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#D84312]">Requested equipment</span>
        <p className="mt-1 text-[14px] font-semibold leading-6 !text-[#25453b]">
          {items.length ? items.map((s) => findProduct(s)?.name ?? s).join(', ') : 'General equipment enquiry'}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {field('Full name', 'fullName')}
        {field('Business email', 'email')}
        {field('Contact number (+ country code)', 'phone')}
        {field('Company / institution', 'company')}
        {field('Country', 'country')}
        {field('City', 'city', false)}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="buyerType" className={labelStyle}>Buyer type *</label>
          <select id="buyerType" className={fieldStyle} {...register('buyerType')}>
            <option value="hospital">Hospital</option>
            <option value="laboratory">Laboratory</option>
            <option value="distributor">Distributor</option>
            <option value="institution">Institution</option>
            <option value="individual">Individual</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className={labelStyle}>Estimated quantity *</label>
          <input id="quantity" type="number" min="1" className={fieldStyle} {...register('quantity')} />
          {errors.quantity?.message && <p role="alert" className={errorStyle}>{errors.quantity.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="requirements" className={labelStyle}>Your requirements *</label>
        <textarea id="requirements" rows={5} className={`${fieldStyle} min-h-[150px] resize-y`} placeholder="Tell us about equipment, preferred specifications, quantity, or any other requirements..." {...register('requirements')} />
        {errors.requirements?.message && <p role="alert" className={errorStyle}>{errors.requirements.message}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 text-[14px] leading-6 !text-[#526c60]">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#D84312]" {...register('consent')} />
          I agree to be contacted by ConXport regarding this request.
        </label>
        {errors.consent?.message && <p role="alert" className={errorStyle}>{errors.consent.message}</p>}
      </div>
      <input aria-hidden="true" tabIndex={-1} autoComplete="off" className="hidden" {...register('website')} />
      {submitError && <p role="alert" className="rounded-[14px] border border-[#f3c2c2] bg-[#fff4f4] p-4 text-sm !text-[#b42318]">{submitError}</p>}
      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[15px] !bg-[#D84312] px-6 py-4 text-[15px] font-extrabold !text-white shadow-[0_12px_30px_rgba(13,92,79,.16)] transition hover:!bg-[#AE320E] disabled:cursor-not-allowed disabled:opacity-50">
        {isSubmitting ? 'Submitting...' : 'Submit enquiry'} <Send size={18} />
      </button>
    </form>
  );
}
