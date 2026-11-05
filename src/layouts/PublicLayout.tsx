import { Outlet } from 'react-router';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import ScrollToTop from '../components/ScrollToTop';
import WhatsAppWidget from '../components/whatsapp/WhatsAppWidget';

export default function PublicLayout() {
  return (
    <div className="site-shell">
      
      
  <ScrollToTop />
      <a href="#main-content" className="cx-skip-link">Skip to main content</a>
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
