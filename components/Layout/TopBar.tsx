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
        <div className="flex items-center gap-4">
          <span className="hidden lg:inline text-green-400 font-bold flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            Available for Senior BA / Transformation Lead / Process Optimization Expert Roles - 100% Remote
          </span>
          <a href="/Bogi_CV.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg font-bold transition-all shadow-md hover:shadow-lg">
            <i className="far fa-file-alt"></i>
            <span>View Resume</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;