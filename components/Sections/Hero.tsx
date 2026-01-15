import React from 'react';
import SmartImage from '../UI/SmartImage';

interface HeroProps {
  onOpenBooking?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const stats = [
    { value: '€700k+', label: 'Total Documented', subLabel: 'Cost Savings', icon: 'fa-chart-line' },
    { value: '50%', label: 'API Reduction', subLabel: 'at S.W.I.F.T.', icon: 'fa-code-branch' },
    { value: '15+ FTE', label: 'Equivalent Savings', subLabel: 'via Automation', icon: 'fa-robot' },
    { value: '5+ Years', label: '100% Remote', subLabel: 'Global Teams', icon: 'fa-globe' },
  ];

  const clients = ['S.W.I.F.T.', 'NTT Ltd.', 'British Telecom', 'T-Systems'];

  return (
    <section className="relative pt-8 pb-24 lg:pt-16 lg:pb-32 bg-white overflow-hidden">
      <div className="hero-blob w-[500px] h-[500px] bg-accent -top-20 -left-20 animate-pulse-slow"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
            {/* Availability Banner */}
            <div className="inline-flex flex-col gap-3 mb-8">
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-500/30 text-green-700 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for Contract/Interim Roles Globally
              </div>
              <div className="inline-flex items-center gap-2 bg-accent-subtle border border-accent/10 text-accent px-5 py-2.5 rounded-full text-sm font-bold shadow-sm">
                <i className="fas fa-briefcase text-xs"></i>
                Currently: Functional Lead at S.W.I.F.T.
              </div>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] font-bold leading-[1] text-text-primary mb-8 tracking-tight">
              Unlock Your Team's <br />
              <span className="text-accent italic">Full Potential</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Certified ITIL, 6Sigma & Lean expert delivering <span className="text-text-primary font-bold border-b-2 border-accent/20">€700k+ in documented cost savings</span>. 14+ years transforming Telecom, FinTech & ICT operations with 5+ years leading 100% remote global teams.
            </p>

            {/* Key Highlights for Recruiters */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start">
              <span className="bg-gradient-to-r from-accent to-accent-dark text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <i className="fas fa-check-circle mr-2"></i>SAP S/4HANA
              </span>
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <i className="fas fa-check-circle mr-2"></i>PEGA
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <i className="fas fa-check-circle mr-2"></i>ServiceNow
              </span>
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                <i className="fas fa-robot mr-2"></i>AI-Augmented
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-16">
              <button 
                onClick={onOpenBooking}
                className="bg-accent hover:bg-accent-dark text-white px-10 py-5 rounded-2xl font-extrabold text-lg inline-flex items-center justify-center gap-3 transition-all shadow-xl shadow-accent/40 transform hover:-translate-y-1.5 active:scale-95"
              >
                <i className="far fa-calendar-alt"></i>
                Book a Free Consultation
              </button>
              <a href="/Bogi_CV.pdf" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-bg-secondary text-text-primary px-10 py-5 rounded-2xl font-extrabold text-lg inline-flex items-center justify-center gap-3 border-2 border-slate-100 transition-all shadow-sm">
                <i className="far fa-file-alt"></i>
                View My Resume
              </a>
            </div>

            <div className="flex flex-col gap-4 items-center lg:items-start opacity-70">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-text-muted">Proven Experience At</span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-6">
                {clients.map(client => (
                  <span key={client} className="text-lg md:text-xl font-serif font-bold text-text-muted hover:text-accent transition-colors">{client}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto max-w-[440px] group">
              <div className="absolute -inset-4 border-2 border-accent/20 rounded-[50px] -z-10 transform translate-x-6 translate-y-6"></div>
              
              <div className="relative rounded-[45px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.15)] ring-8 ring-white">
                <SmartImage
                  src="/bogi.png"
                  alt="Boglarka Paczari-Horvath" 
                  fallbackPrompt="Professional corporate headshot of a confident woman with reddish-blonde hair, wearing a blue blazer and light blue shirt, green plant in soft focus background, high quality, 4k, photorealistic"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105 min-h-[500px]"
                />
              </div>

              <div className="absolute -bottom-10 -left-10 md:-left-20 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 animate-float hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-text-primary">€700k+</div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Documented Cost Savings</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white to-bg-secondary p-8 rounded-[32px] shadow-md flex flex-col items-center justify-center text-center border-2 border-slate-100 hover:border-accent/30 hover:shadow-2xl transition-all group">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className={`fas ${stat.icon} text-xl`}></i>
              </div>
              <span className="block font-serif text-3xl md:text-4xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">{stat.value}</span>
              <div className="text-xs md:text-sm text-text-secondary font-bold leading-tight">
                {stat.label}
              </div>
              <div className="text-xs text-text-muted font-normal mt-1">{stat.subLabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;