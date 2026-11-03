import { Link } from 'react-router';
export default function EnquirySuccess({ isDemo = true }: { isDemo?: boolean }) {
  return <section role="status" className="rounded-2xl border border-teal-300/30 bg-teal-300/10 p-8 text-white">
    <h2 className="text-2xl font-semibold">{isDemo ? 'Enquiry details validated' : 'Enquiry received'}</h2>
    <p className="mt-4 text-slate-200">{isDemo ? 'This is a frontend preview. Your details have NOT been sent or saved to ConXport. Secure database submission will be enabled after Supabase setup.' : 'Thank you. Your enquiry has been recorded.'}</p>
    <Link to="/products" className="mt-6 inline-block rounded-lg border border-teal-300/40 px-5 py-3 text-teal-200">Explore more equipment</Link>
  </section>;
}
