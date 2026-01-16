
import React, { useState, useEffect } from 'react';
import TopBar from './components/Layout/TopBar';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import Skills from './components/Sections/Skills';
import Features from './components/Sections/Features';
import Services from './components/Sections/Services';
import Achievements from './components/Sections/Achievements';
import Timeline from './components/Sections/Timeline';
import Testimonials from './components/Sections/Testimonials';
import Certs from './components/Sections/Certs';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';
import AboutMe from './components/Sections/AboutMe';
import Blog from './components/Sections/Blog';
import BookingModal from './components/Modals/BookingModal';

export type View = 'home' | 'about' | 'blog' | 'post';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash;

      // Handle Blog Post
      if (hash.startsWith('#blog/')) {
        setCurrentView('post');
        setSelectedPostId(hash.replace('#blog/', ''));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Handle Main Views
      if (hash === '#about') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash === '#blog') {
        setCurrentView('blog');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Handle Home Sections (#services, #contact, etc.)
      setCurrentView('home');

      // If there is a specific hash for a section, scroll to it after a brief delay to allow rendering
      if (hash && hash !== '#') {
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleNavigation);
    handleNavigation(); // Initial check

    return () => window.removeEventListener('hashchange', handleNavigation);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'about':
        return <AboutMe />;
      case 'blog':
      case 'post':
        return <Blog postId={selectedPostId} />;
      default:
        return (
          <>
            <Hero onOpenBooking={() => setIsBookingOpen(true)} />
            <div id="how"><Features /></div>
            <div id="services"><Services /></div>
            <Skills />
            <div id="achievements"><Achievements /></div>
            <div id="experience"><Timeline /></div>
            <Testimonials />
            <Certs />
            <Contact />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header currentView={currentView} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default App;
