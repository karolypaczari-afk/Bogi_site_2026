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
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-bg-dark via-slate-900 to-bg-dark z-[200] lg:hidden backdrop-blur-sm">
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="font-serif text-2xl font-extrabold text-white">
                Bogi<span className="text-accent">Horvath</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-white hover:bg-accent transition-all"
                aria-label="Close Menu"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-grow flex flex-col items-center justify-center gap-6 px-6 pb-6 overflow-y-auto">
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xl font-bold text-white hover:text-accent transition-all w-full max-w-sm text-center py-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-accent/30"
                  onClick={() => handleLinkClick(link.href)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}

              <div className="w-full max-w-sm space-y-4 mt-6">
                <a
                  href="#contact"
                  className="block bg-gradient-to-r from-accent to-accent-dark text-white w-full py-5 rounded-2xl font-bold text-lg text-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="fas fa-envelope mr-2"></i>
                  Contact Me
                </a>

                <a
                  href="/Bogi_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white text-accent w-full py-5 rounded-2xl font-bold text-lg text-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="far fa-file-alt mr-2"></i>
                  Download CV
                </a>
              </div>

              {/* Mobile Contact Info */}
              <div className="mt-8 flex flex-col items-center gap-4 text-slate-400 text-sm">
                <a
                  href="https://www.linkedin.com/in/boglarka-paczari-horvath/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <i className="fab fa-linkedin"></i>
                  <span>Connect on LinkedIn</span>
                </a>
                <a
                  href="mailto:horvath.boglarka@hotmail.com"
                  className="flex items-center gap-2 hover:text-accent-light transition-colors"
                >
                  <i className="far fa-envelope"></i>
                  <span>horvath.boglarka@hotmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;