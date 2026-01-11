import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-bg-dark text-white py-2.5 text-[13px] font-medium tracking-wide border-b border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://www.linkedin.com/in/boglarka-paczari-horvath/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-accent-light transition-colors group">
            <i className="fab fa-linkedin text-sm group-hover:scale-110 transition-transform"></i>
            <span>LinkedIn Profile</span>
          </a>
          <a href="mailto:horvath.boglarka@hotmail.com" className="flex items-center gap-2 text-slate-400 hover:text-accent-light transition-colors group">
            <i className="far fa-envelope text-sm group-hover:scale-110 transition-transform"></i>
            <span>horvath.boglarka@hotmail.com</span>
          </a>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline text-slate-500">Available for Global Projects</span>
          <a href="./Bogi_CV.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-accent-light transition-colors">
            <i className="far fa-file-alt"></i>
            <span>Resume (PDF)</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;