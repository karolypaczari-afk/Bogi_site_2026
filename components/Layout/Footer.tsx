import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f1a] py-12 text-slate-500">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center gap-8 mb-8">
          <a href="https://www.linkedin.com/in/boglarka-paczari-horvath/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-accent-light transition-all transform hover:-translate-y-1" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:horvath.boglarka@hotmail.com" className="text-2xl hover:text-accent-light transition-all transform hover:-translate-y-1" aria-label="Email">
            <i className="far fa-envelope"></i>
          </a>
          <a href="./Bogi_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-accent-light transition-all transform hover:-translate-y-1" aria-label="Download CV">
            <i className="far fa-file-alt"></i>
          </a>
        </div>
        <p className="text-sm">&copy; {currentYear} Boglarka Paczari-Horvath. All rights reserved.</p>
        <p className="text-xs mt-2 opacity-50 uppercase tracking-[0.2em]">Process Transformation Expert</p>
      </div>
    </footer>
  );
};

export default Footer;