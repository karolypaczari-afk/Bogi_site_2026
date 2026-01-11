
import React from 'react';

const Hero: React.FC = () => {
  const stats = [
    { value: '€700k+', label: 'Cost Savings', subLabel: 'Delivered' },
    { value: '14+', label: 'Years of', subLabel: 'Expertise' },
    { value: '10+', label: 'Professional', subLabel: 'Certs' },
    { value: '100%', label: 'Remote', subLabel: 'Operations' },
  ];

  const clients = ['S.W.I.F.T.', 'NTT Ltd.', 'British Telecom', 'T-Systems'];

  return (
    <section className="relative pt-8 pb-24 lg:pt-16 lg:pb-32 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="hero-blob w-[500px] h-[500px] bg-accent -top-20 -left-20 animate-pulse-slow"></div>
      <div className="hero-blob w-[400px] h-[400px] bg-blue-300 top-1/2 -right-20"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent-subtle border border-accent/10 text-accent px-5 py-2.5 rounded-full text-sm font-bold mb-10 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Currently: Functional Lead at S.W.I.F.T.
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] font-bold leading-[1] text-text-primary mb-8 tracking-tight">
              Unlock Your Team's <br />
              <span className="text-accent italic">Full Potential</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Strategic Process Transformation Lead delivering <span className="text-text-primary font-bold border-b-2 border-accent/20">€700k+ in documented cost savings</span>. I merge tactical execution with high-level strategy to scale complex operations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-16">
              <a href="#contact" className="bg-accent hover:bg-accent-dark text-white px-10 py-5 rounded-2xl font-extrabold text-lg inline-flex items-center justify-center gap-3 transition-all shadow-2xl shadow-accent/40 transform hover:-translate-y-1.5 active:scale-95">
                <i className="far fa-calendar-alt"></i>
                Book a Free Consultation
              </a>
              <a href="https://bogihorvath.com/wp-content/uploads/2025/12/Bogi_CV_EN_2025_12_19.pdf" target="_blank" className="bg-white hover:bg-bg-secondary text-text-primary px-10 py-5 rounded-2xl font-extrabold text-lg inline-flex items-center justify-center gap-3 border-2 border-slate-100 transition-all shadow-sm hover:shadow-md">
                <i className="far fa-file-alt"></i>
                View My Resume
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col gap-4 items-center lg:items-start opacity-70">
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-text-muted">Proven Experience At</span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-6">
                {clients.map(client => (
                  <span key={client} className="text-lg md:text-xl font-serif font-bold text-text-muted hover:text-accent transition-colors">{client}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto max-w-[440px] group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-accent/20 rounded-[50px] -z-10 transform translate-x-6 translate-y-6 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500"></div>
              
              <div className="relative rounded-[45px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.15)] ring-8 ring-white">
                <img 
                  src="https://bogihorvath.com/wp-content/uploads/2024/08/image-27.png" 
                  alt="Boglarka Paczari-Horvath" 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating Achievement Card */}
              <div className="absolute -bottom-10 -left-10 md:-left-20 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 animate-float hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-text-primary">15+</div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider">FTE Savings Reached</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stats Section - High Contrast */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[32px] shadow-[0_12px_48px_rgba(75,104,233,0.06)] flex flex-col items-center justify-center text-center border border-slate-50 hover:shadow-xl hover:shadow-accent/5 transition-all group">
              <span className="block font-serif text-4xl md:text-5xl font-bold text-accent mb-3 group-hover:scale-110 transition-transform duration-300">{stat.value}</span>
              <div className="text-sm md:text-base text-text-secondary font-semibold leading-snug">
                {stat.label} <span className="text-text-muted block font-normal">{stat.subLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
