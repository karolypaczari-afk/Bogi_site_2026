import React from 'react';
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

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Features />
        <Insights />
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