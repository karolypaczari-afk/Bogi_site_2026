
import React, { useState, useEffect } from 'react';
import TopBar from './components/Layout/TopBar';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import Expertise from './components/Sections/Expertise';
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
import AILab from './components/Sections/AILab';
import BookingModal from './components/Modals/BookingModal';

// Declare global type for aistudio using the expected AIStudio type from the environment to resolve the conflict
declare global {
  interface Window {
    aistudio?: AIStudio;
  }
}

export type View = 'home' | 'about' | 'blog' | 'post';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // API Key State
  const [hasApiKey, setHasApiKey] = useState(false);
  const [checkingKey, setCheckingKey] = useState(true);

  // Key selection helper
  const handleSelectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        // Assume success to mitigate race condition
        setHasApiKey(true);
      } catch (e) {
        console.error("Key selection failed:", e);
      }
    }
  };

  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio) {
          const has = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(has);
        } else {
          // If not running in the specific AI Studio environment, assume true (or handle specifically for dev)
          setHasApiKey(true);
        }
      } catch (e) {
        console.error("Error checking API key status:", e);
        setHasApiKey(true); // Fallback to allow app to load, though AI features might fail
      } finally {
        setCheckingKey(false);
      }
    };
    checkKey();

    // Fix: Handle mandatory "Requested entity was not found." error reset as per guidelines
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.message?.includes("Requested entity was not found.")) {
        setHasApiKey(false);
        handleSelectKey();
      }
    };
    window.addEventListener('unhandledrejection', handleRejection);
    return () => window.removeEventListener('unhandledrejection', handleRejection);
  }, []);

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

    if (hasApiKey) {
      window.addEventListener('hashchange', handleNavigation);
      handleNavigation(); // Initial check
    }

    return () => window.removeEventListener('hashchange', handleNavigation);
  }, [hasApiKey]);

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
            <Expertise />
            <div id="ai-lab"><AILab /></div>
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

  // Loading Screen
  if (checkingKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
           <p className="text-text-muted text-sm font-bold uppercase tracking-widest">Initializing...</p>
        </div>
      </div>
    );
  }

  // API Key Gateway
  if (!hasApiKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-dark text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 max-w-lg text-center">
          <h1 className="font-serif text-5xl font-bold mb-6">Unlock the Experience</h1>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            This portfolio uses advanced Gemini AI models for image generation, deep thinking, and real-time editing. Please select an API key to continue.
          </p>
          
          <button 
            onClick={handleSelectKey} 
            className="bg-accent hover:bg-accent-dark text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-accent/20 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 mx-auto"
          >
            <i className="fas fa-key"></i>
            Select API Key
          </button>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-slate-500 mb-2">Need a key? Ensure you have a paid project selected.</p>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-accent-light hover:text-white underline text-sm transition-colors">
              View Billing Documentation
            </a>
          </div>
        </div>
      </div>
    );
  }

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
