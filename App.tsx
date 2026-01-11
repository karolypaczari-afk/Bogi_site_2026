import React from 'react';
import TopBar from './components/Layout/TopBar.tsx';
import Header from './components/Layout/Header.tsx';
import Hero from './components/Sections/Hero.tsx';
import Features from './components/Sections/Features.tsx';
import Services from './components/Sections/Services.tsx';
import Achievements from './components/Sections/Achievements.tsx';
import Timeline from './components/Sections/Timeline.tsx';
import Testimonials from './components/Sections/Testimonials.tsx';
import Certs from './components/Sections/Certs.tsx';
import Contact from './components/Sections/Contact.tsx';
import Footer from './components/Layout/Footer.tsx';

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

export default App;