import { useEffect, useState } from 'react';
import { Mail, MapPin, MessageCircle, PhoneCall } from 'lucide-react';
import { ContactMessageForm } from '../../components/public/ContactMessageForm';
import { getGeneralSettings } from '../../services/siteSettings';
import { defaultGeneralSettings, type GeneralSettings } from '../../types/settings';
import { useDocumentMeta } from '../../seo/useDocumentMeta';

export default function ContactPage() {
  useDocumentMeta({ title: 'Contact ConXport', description: 'Speak with ConXport about hospital, laboratory and institutional equipment requirements.', canonicalPath: '/contact' });
  const [settings, setSettings] = useState<GeneralSettings>(defaultGeneralSettings);

  useEffect(() => {
    let live = true;
    void getGeneralSettings().then((data) => { if (live) setSettings(data); }).catch(() => {});
    return () => { live = false; };
  }, []);

  const cards = [
    { icon: PhoneCall, label: 'Call us', value: settings.supportPhone, href: `tel:${settings.supportPhone}` },
    { icon: Mail, label: 'Email', value: settings.supportEmail, href: `mailto:${settings.supportEmail}` },
    { icon: MessageCircle, label: 'WhatsApp', value: settings.whatsapp, href: `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}` },
    { icon: MapPin, label: 'Address', value: `${settings.address}, ${settings.city}, ${settings.country}`, href: undefined },
  ];

  return (
    <main className="cx-public-surface">
      <section className="cx-page-hero">
        <div className="container cx-page-hero-inner">
          <p className="cx-overline">CONXPORT / CONTACT</p>
          <h1>Let’s plan your next healthcare procurement project.</h1>
          <p className="cx-page-lead">Share your requirements and our team can guide you on suitable products, documentation and quotation workflow.</p>
        </div>
      </section>

      <section className="container" style={{ paddingBlock: 'clamp(3rem, 7vw, 6rem)' }}>
        <div className="cx-contact-grid">
          <div className="cx-stack-list">
            {cards.map(({ icon: Icon, label, value, href }) => (
              <article key={label} className="cx-card cx-contact-card">
                <div className="cx-contact-icon"><Icon size={20} /></div>
                <div>
                  <p className="cx-contact-label">{label}</p>
                  {href ? <a href={href}>{value}</a> : <p>{value}</p>}
                </div>
              </article>
            ))}

            <article className="cx-card">
              <p className="cx-overline">WHY CONTACT US</p>
              <h2 style={{ marginBottom: 12 }}>Premium hospital-focused experience</h2>
              <p>Share your equipment requirements, service questions or project details. Our team will review your message and contact you as soon as possible.</p>
            </article>
          </div>

          <div className="cx-card" style={{ padding: 'clamp(1.25rem, 2vw, 2rem)' }}>
            <h2 style={{ marginBottom: 12 }}>Send us a message</h2>
            <p style={{ marginBottom: 20 }}>Fill out the contact form and our team will get back to you as soon as possible.</p>
            <ContactMessageForm />
          </div>
        </div>
      </section>
    </main>
  );
}
