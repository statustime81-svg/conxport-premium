import { Outlet } from 'react-router';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';

export default function PublicLayout() {
  return (
    <div className="site-shell">
      <a href="#main-content" className="cx-skip-link">Skip to main content</a>
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
    </div>
  );
}
