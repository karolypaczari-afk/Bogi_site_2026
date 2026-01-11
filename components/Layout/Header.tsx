import React, { useState, useEffect } from 'react';
import { View } from '../../App';

interface HeaderProps {
  currentView: View;
}

const Header: React.FC<HeaderProps> = ({ currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About Me', href: '#about' },
    { label: 'How I Help', href: '#how' },
    { label: 'Services', href: '#services' },
    { label: 'Results', href: '#achievements' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blog', href: '#blog' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#') && href.length > 1 && currentView !== 'home') {
      window.location.href = '/' + href;
    }
  };

  return (
    <header className={`sticky top-0 z-[100] transition-all duration-300 ${isScrolled ? 'py-3 glass shadow-lg' : 'py-6 bg-white'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-serif text-2xl font-extrabold tracking-tight text-text-primary group">
          Bogi<span className="text-accent group-hover:text-accent-dark transition-colors">Horvath</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-[14px] font-semibold text-text-secondary hover:text-accent transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/30 active:scale-95"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-accent-subtle text-accent"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-bg-dark/95 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-center p-6">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white text-3xl">&times;</button>
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-2xl font-bold text-white hover:text-accent transition-colors"
              onClick={() => handleLinkClick(link.href)}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-accent text-white w-full max-w-xs py-5 rounded-2xl font-bold text-xl mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;