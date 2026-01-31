import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <header
      className={`sticky top-0 z-[100] transition-all duration-500 ${isScrolled
          ? 'py-4 bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-100'
          : 'py-6 bg-white'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#"
          className="font-serif text-2xl font-extrabold tracking-tight text-text-primary group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          Bogi<span className="text-accent group-hover:text-accent-dark transition-colors">Horvath</span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-[14px] font-semibold text-text-secondary hover:text-accent transition-all relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
            >
              {link.label}
              <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="bg-accent hover:bg-accent-dark text-white px-7 py-3 rounded-xl font-bold shadow-lg shadow-accent/20"
            whileHover={{ y: -3, boxShadow: '0 15px 30px -10px rgba(75, 104, 233, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * navLinks.length, duration: 0.5 }}
          >
            Let's Talk
          </motion.a>
        </nav>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-accent-subtle text-accent shadow-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          whileTap={{ scale: 0.9 }}
        >
          <motion.i
            className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
          />
        </motion.button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-bg-dark via-slate-900 to-bg-dark z-[200] lg:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col h-full overflow-hidden">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center p-8 border-b border-white/10">
                <div className="font-serif text-2xl font-extrabold text-white">
                  Bogi<span className="text-accent">Horvath</span>
                </div>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 text-white"
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  aria-label="Close Menu"
                >
                  <i className="fas fa-times text-xl"></i>
                </motion.button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-grow flex flex-col items-center justify-center p-8 overflow-y-auto">
                <div className="w-full max-w-sm flex flex-col gap-3">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className="text-2xl font-bold text-white hover:text-accent transition-all text-center py-5 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/30"
                      onClick={() => handleLinkClick(link.href)}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <div className="w-full max-w-sm space-y-4 mt-10">
                  <motion.a
                    href="#contact"
                    className="block bg-gradient-to-r from-accent to-accent-dark text-white w-full py-5 rounded-2xl font-bold text-xl text-center shadow-2xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Contact Me
                  </motion.a>

                  <motion.a
                    href="/Bogi_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white text-accent w-full py-5 rounded-2xl font-bold text-xl text-center shadow-xl"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <i className="far fa-file-alt mr-2"></i>
                    Download CV
                  </motion.a>
                </div>

                {/* Mobile Contact Info */}
                <motion.div
                  className="mt-12 flex flex-col items-center gap-4 text-slate-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <a href="https://linkedin.com" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <i className="fab fa-linkedin"></i> Connect on LinkedIn
                  </a>
                  <a href="mailto:horvath.boglarka@hotmail.com" className="hover:text-accent transition-colors flex items-center gap-2">
                    <i className="far fa-envelope"></i> horvath.boglarka@hotmail.com
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;