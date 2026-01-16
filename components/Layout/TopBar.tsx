import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-bg-dark to-slate-900 text-white py-3 text-sm font-medium border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-3 lg:gap-4">
          {/* Contact Info - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex flex-wrap justify-center lg:justify-start gap-5">
            <a
              href="https://www.linkedin.com/in/boglarka-paczari-horvath/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-all group"
            >
              <i className="fab fa-linkedin text-base group-hover:scale-110 transition-transform"></i>
              <span className="text-xs lg:text-sm">LinkedIn</span>
            </a>
            <a
              href="mailto:horvath.boglarka@hotmail.com"
              className="flex items-center gap-2 text-slate-300 hover:text-accent-light transition-all group"
            >
              <i className="far fa-envelope text-base group-hover:scale-110 transition-transform"></i>
              <span className="text-xs lg:text-sm hidden lg:inline">horvath.boglarka@hotmail.com</span>
              <span className="text-xs lg:text-sm lg:hidden">Email Me</span>
            </a>
          </div>

          {/* Availability Status & CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto justify-center lg:justify-end">
            <div className="hidden xl:flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-green-300 font-bold text-xs">Available for Senior BA / Transformation Lead Roles</span>
            </div>

            <a
              href="/Bogi_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <i className="far fa-file-alt text-base"></i>
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;