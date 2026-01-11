import React, { useState, useEffect } from 'react';
import TopBar from './components/Layout/TopBar';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import Features from './components/Sections/Features';
import Insights from './components/Sections/Insights';
import Services from './components/Sections/Services';
import Achievements from './components/Sections/Achievements';
import Timeline from './components/Sections/Timeline';
import Testimonials from './components/Sections/Testimonials';
import Certs from './components/Sections/Certs';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';
import AboutMe from './components/Sections/AboutMe';
import Blog from './components/Sections/Blog';

export type View = 'home' | 'about' | 'blog' | 'post';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        setCurrentView('post');
        setSelectedPostId(hash.replace('#blog/', ''));
      } else if (hash === '#about') {
        setCurrentView('about');
      } else if (hash === '#blog') {
        setCurrentView('blog');
      } else {
        setCurrentView('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <Hero />
            <div id="how"><Features /></div>
            <Insights />
            <div id="services"><Services /></div>
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
    </div>
  );
};

export default App;