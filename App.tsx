
// Fix: Added React import to resolve UMD global error in line 1
import React from 'react';
import TopBar from './components/Layout/TopBar';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import Features from './components/Sections/Features';
import Services from './components/Sections/Services';
import Achievements from './components/Sections/Achievements';
import Timeline from './components/Sections/Timeline';
import Testimonials from './components/Sections/Testimonials';
import Certs from './components/Sections/Certs';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';

/**
 * Main App component that integrates the specialized sections.
 * Optimized to use modular components and fix scope issues.
 */
const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Achievements />
        <Timeline />
        <Testimonials />
        <Certs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

// Fix: Export default App to resolve "Module has no default export" error in index.tsx
// Fix: Removed the redundant ReactDOM.createRoot call at the bottom of the file to fix UMD global and missing property errors
export default App;
