import { useState, type ChangeEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AlertCircle, CheckCircle2, FileUp, Send } from 'lucide-react';
import { enquirySchema, validateEnquiryAttachment, type EnquiryValues } from '../../lib/validations/enquiry';
import { useQuoteItems } from '../../store/quote-list';
import { findProduct } from '../../data/productDetails';
import { supabase } from '../../lib/supabase/client';
import { submitEnquiry } from '../../services/enquiries';

const fieldStyle = 'block w-full min-h-[52px] rounded-[14px] border border-[#d6e5df] bg-[#fbfdfc] px-4 py-3 text-[15px] !text-[#102D3C] placeholder:!text-[#82948c] outline-none transition focus:border-[#07546B] focus:bg-white focus:ring-[3px] focus:ring-[#07546B]/10';
const labelStyle = 'mb-2 block text-[13px] font-bold !text-[#243e35]';
const errorStyle = 'mt-1.5 text-xs !text-[#b42318]';

export default function EnquiryForm() {
  const items = useQuoteItems();
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { buyerType: 'hospital', quantity: 1, consent: false, website: '' },
  });

  const selectAttachment = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] ?? null;
    setAttachmentError(validateEnquiryAttachment(file));
    setAttachment(file);
  };

  async function onValid(values: EnquiryValues) {
    if (attachmentError) return;
    setSubmitError(null);
    if (attachment) {
      setSubmitError('Attachments are not enabled yet. Remove the attachment to proceed.');
      return;
    }
    if (!supabase) {
      setSubmitError('Backend setup is pending. Enquiries are not being sent.');
      return;
    }
    const productIds = items.filter((id) => /^[0-9a-f-]{36}$/i.test(id));
    if (items.length && productIds.length !== items.length) {
      setSubmitError('Demo products cannot be submitted. Wait for the live catalogue integration.');
      return;
    }
    try {
      const result = await submitEnquiry(values, productIds);
      setReference(result.reference);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Submission failed. Try again.');
    }
  }

  if (reference) {
    return <div role="status" className="rounded-[24px] border border-[#bde2d1] bg-white p-8 shadow-sm">
      <CheckCircle2 size={38} className="text-[#07546B]" />
      <h2 className="mt-4 text-[26px] font-extrabold !text-[#102D3C]">Enquiry received</h2>
      <p className="mt-2 !text-[#587169]">Your enquiry reference: <strong className="text-[#07546B]">{reference}</strong></p>
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
      <div className="flex items-start gap-3 rounded-[16px] border border-[#f1dfb0] bg-[#fffaf0] p-4 text-[13px] leading-6 !text-[#77571a]">
        <AlertCircle size={19} className="mt-0.5 shrink-0" />
        <span>Enquiries require configured Supabase and a deployed secure Edge Function. Demo products and attachments are not currently supported.</span>
      </div>

      <div className="rounded-[16px] border border-[#dcece5] bg-[#f3faf6] px-5 py-4">
        <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#07546B]">Requested equipment</span>
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
        <label htmlFor="attachment" className={labelStyle}>Optional document (PDF/JPG/PNG, up to 5 MB)</label>
        <label htmlFor="attachment" className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[16px] border border-dashed border-[#bfd7cd] bg-[#f9fcfa] p-6 text-center hover:border-[#07546B] hover:bg-[#f0f8f3]">
          <FileUp size={26} className="text-[#07546B]" />
          <span className="text-sm font-bold text-[#29483e]">{attachment ? attachment.name : 'Choose a document'}</span>
          <span className="text-xs text-[#70847b]">Attachments are not yet enabled for submission</span>
        </label>
        <input id="attachment" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={selectAttachment} className="sr-only" />
        {attachmentError && <p role="alert" className={errorStyle}>{attachmentError}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 text-[14px] leading-6 !text-[#526c60]">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#07546B]" {...register('consent')} />
          I agree to be contacted by ConXport regarding this request.
        </label>
        {errors.consent?.message && <p role="alert" className={errorStyle}>{errors.consent.message}</p>}
      </div>
      <input aria-hidden="true" tabIndex={-1} autoComplete="off" className="hidden" {...register('website')} />
      {submitError && <p role="alert" className="rounded-[14px] border border-[#f3c2c2] bg-[#fff4f4] p-4 text-sm !text-[#b42318]">{submitError}</p>}
      <button type="submit" disabled={isSubmitting || Boolean(attachmentError) || !supabase} className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[15px] !bg-[#07546B] px-6 py-4 text-[15px] font-extrabold !text-white shadow-[0_12px_30px_rgba(13,92,79,.16)] transition hover:!bg-[#09473d] disabled:cursor-not-allowed disabled:opacity-50">
        {isSubmitting ? 'Submitting...' : 'Submit enquiry'} <Send size={18} />
      </button>
      {!supabase && <p className="text-center text-xs !text-[#72877b]">Submission is unavailable until the backend is configured.</p>}
    </form>
  );
}
