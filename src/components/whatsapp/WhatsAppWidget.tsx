import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ArrowUpRight, CheckCircle2, ChevronDown, FileText, Headphones, MessageCircle, PackageSearch, X } from 'lucide-react';
import { getGeneralSettings } from '../../services/siteSettings';
import { getPublishedProduct } from '../../services/publicCatalogue';
import './whatsapp-widget.css';

type SelectedProduct = { name: string; sku: string } | null;
// Dismissal lasts for the current browser tab session.
const SENTINEL = 'cx-wa-dismissed';

function WhatsAppMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path fill="currentColor" d="M16 2.6A13.4 13.4 0 0 0 4.5 22.8L2.8 29l6.4-1.7A13.4 13.4 0 1 0 16 2.6Zm0 24.3c-2.2 0-4.4-.7-6.2-1.9l-.4-.3-3.8 1 1-3.7-.3-.4a10.9 10.9 0 1 1 9.7 5.3Zm6-8.1c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2c-.2.3-.8 1-1 1.1s-.4.2-.7.1a9 9 0 0 1-4.4-3.8c-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9a12 12 0 0 0 4.6 4.1 4.1 0 0 0 2.8.7c1.1-.1 3.4-1.4 3.8-2.8.2-.7.2-1.3.1-1.4Z"/>
    </svg>
  );
}

export default function WhatsAppWidget() {
  const { pathname } = useLocation();
  const [enabled, setEnabled] = useState(false);
  const [phone, setPhone] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(SENTINEL) === '1'; } catch { return false; }
  });
  const [product, setProduct] = useState<SelectedProduct>(null);

  useEffect(() => {
    let active = true;
    getGeneralSettings().then((settings) => {
      if (!active) return;
      const digits = settings.whatsapp.replace(/\D/g, '');
      const valid = /^\d{10,15}$/.test(digits) && !/^(\d)\1+$/.test(digits) && !/9000000000$/.test(digits);
      setEnabled(settings.whatsappWidgetEnabled === true && valid);
      setPhone(valid ? digits : '');
    }).catch(() => { if (active) setEnabled(false); });
    return () => { active = false; };
  }, [pathname]);

  useEffect(() => {
    let active = true;
    setProduct(null);
    const match = pathname.match(/^\/products\/([^/]+)\/?$/);
    if (match) {
      let slug = match[1];
      try { slug = decodeURIComponent(slug); } catch { /* Keep original slug. */ }
      getPublishedProduct(slug).then((result) => {
        if (active && result) setProduct({ name: result.product.name, sku: result.product.sku });
      }).catch(() => {});
    }
    setExpanded(false);
    return () => { active = false; };
  }, [pathname]);

  if (!enabled || !phone) return null;

  const openMessage = (kind: 'product' | 'quote' | 'sales') => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const message = kind === 'product'
      ? product
        ? `Hello ConXport Team,\n\nI am interested in this product:\nProduct: ${product.name}\nModel: ${product.sku}\nLink: ${url}\n\nPlease share its specifications, availability and quotation.`
        : `Hello ConXport Team,\n\nI would like to enquire about your hospital and medical equipment.\nPage: ${url}\n\nPlease assist me with the product details.`
      : kind === 'quote'
        ? `Hello ConXport Team,\n\nI would like to request a quotation for medical or hospital equipment. Please share pricing, availability and ordering details.\nPage: ${url}`
        : `Hello ConXport Team,\n\nI would like to speak with your sales team about medical equipment. Please assist me.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  function dismiss() {
    setExpanded(false);
    setDismissed(true);
    try { sessionStorage.setItem(SENTINEL, '1'); } catch { /* Optional persistence. */ }
  }
  // Visitors can remove the widget entirely until this tab session ends.
  if (dismissed) return null;

  return (
    <aside className="cx-wa-root" aria-label="WhatsApp assistance">
      {expanded && (
        <div className="cx-wa-panel" role="dialog" aria-modal="false" aria-label="ConXport WhatsApp enquiry">
          <div className="cx-wa-panel-header">
            <div className="cx-wa-avatar"><WhatsAppMark size={24}/><span className="cx-wa-presence"/></div>
            <div className="cx-wa-heading"><strong>ConXport Assistance</strong><small><span className="cx-wa-online-dot"/> Sales & Product Support</small></div>
            <button type="button" className="cx-wa-control" onClick={() => setExpanded(false)} aria-label="Minimize chat" title="Minimize"><ChevronDown size={19}/></button>
            <button type="button" className="cx-wa-control" onClick={dismiss} aria-label="Dismiss WhatsApp widget" title="Dismiss for this session"><X size={19}/></button>
          </div>
          <div className="cx-wa-panel-body">
            <div className="cx-wa-note"><span className="cx-wa-hello">Hello there! 👋</span><p>Welcome to ConXport. Looking for trusted medical or hospital equipment? Choose how we can help.</p></div>
            <span className="cx-wa-choose">HOW CAN WE HELP?</span>
            <button type="button" className="cx-wa-option" onClick={() => openMessage('product')}>
              <span className="cx-wa-option-icon cx-wa-option-blue"><PackageSearch size={20}/></span>
              <span className="cx-wa-option-copy"><strong>Product Enquiry</strong><small>{product ? `Ask about ${product.name}` : 'Ask about any medical equipment'}</small></span>
              <ArrowUpRight size={17} className="cx-wa-arrow"/>
            </button>
            <button type="button" className="cx-wa-option" onClick={() => openMessage('quote')}>
              <span className="cx-wa-option-icon cx-wa-option-orange"><FileText size={20}/></span>
              <span className="cx-wa-option-copy"><strong>Request Quotation</strong><small>Get pricing and availability details</small></span>
              <ArrowUpRight size={17} className="cx-wa-arrow"/>
            </button>
            <button type="button" className="cx-wa-option" onClick={() => openMessage('sales')}>
              <span className="cx-wa-option-icon cx-wa-option-green"><Headphones size={20}/></span>
              <span className="cx-wa-option-copy"><strong>Talk to Sales</strong><small>Connect with our team directly</small></span>
              <ArrowUpRight size={17} className="cx-wa-arrow"/>
            </button>
            <div className="cx-wa-trust"><CheckCircle2 size={14}/> Opens WhatsApp with a ready message</div>
          </div>
          <div className="cx-wa-panel-footer"><MessageCircle size={13}/> Powered by WhatsApp <span>·</span> ConXport</div>
        </div>
      )}
      <div className="cx-wa-launch-wrap">
      <button type="button" className="cx-wa-launch" aria-label={expanded ? 'Minimize WhatsApp chat' : 'Open WhatsApp enquiry'} aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
        {expanded ? <X size={21}/> : <WhatsAppMark size={25}/>}
        <span>{expanded ? 'Close chat' : 'WhatsApp Enquiry'}</span>
        {!expanded && <span className="cx-wa-launch-indicator"/>}
      </button>
      <button type="button" className="cx-wa-dismiss-float" aria-label="Remove WhatsApp widget" title="Hide WhatsApp for this visit" onClick={dismiss}><X size={14}/></button>
      </div>
    </aside>
  );
}
