import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="animate-fadeIn w-full">
      {/* About Header */}
      <section className="relative pt-16 pb-24 bg-bg-secondary overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">The Person Behind the Process</span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-primary mb-8">
              Hi, I'm <span className="text-accent">Bogi</span>.
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed font-medium">
              A Business Improvement Specialist with over 14 years of experience turning complex operational challenges into streamlined, efficient realities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Biography Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative sticky top-24">
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-[8px] border-white">
                <img 
                  src="./profile.png" 
                  alt="Boglarka Paczari-Horvath" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="font-serif text-2xl font-bold">14+</p>
                <p className="text-xs font-bold uppercase tracking-wider opacity-90">Years Experience</p>
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 space-y-8 text-lg text-text-secondary leading-relaxed">
              <h2 className="font-serif text-3xl font-bold text-text-primary mb-6">My Journey</h2>
              
              <p>
                My professional path has always been driven by a simple question: <strong>"Is there a better way to do this?"</strong>
              </p>

              <p>
                I started my career at <strong className="text-text-primary">T-Systems</strong>, where I learned the fundamentals of IT service management and operations. Managing service chains taught me that a process is only as good as the people who execute it.
              </p>

              <p>
                I then spent seven formative years at <strong className="text-text-primary">British Telecom (BT)</strong>. This was where I honed my skills in <strong>Lean Six Sigma</strong> and <strong>Agile</strong> methodologies. I transitioned from a Business Improvement Specialist to an Agile Deployment Lead, delivering over $100k in automation savings and reducing incident volumes by 50%. It was a masterclass in change management at scale.
              </p>

              <p>
                At <strong className="text-text-primary">NTT Ltd.</strong>, I took on a global challenge. As a Principal Business Operations Specialist, I was responsible for harmonizing the Opportunity-to-Cash (Opp2Cash) value stream across 12 distinct regional entities. This experience solidified my belief that standardization—when done correctly—is the key to unlocking global scalability.
              </p>

              <div className="bg-bg-secondary p-8 rounded-3xl border border-slate-100 my-8">
                <h3 className="font-bold text-text-primary mb-3 text-xl">Current Focus</h3>
                <p className="text-base">
                  Today, as a <strong>Functional Lead at S.W.I.F.T.</strong>, I operate at the intersection of business strategy and technical architecture. My focus is on E-form optimization and API integration, helping one of the world's most critical financial networks operate with greater speed and reliability.
                </p>
              </div>

              <h2 className="font-serif text-3xl font-bold text-text-primary pt-4 mb-6">My Philosophy</h2>
              <p>
                I don't believe in change for the sake of change. I believe in <strong>evidence-based transformation</strong>. Whether it's consolidating APIs or redesigning a human workflow, every decision must be backed by data and aligned with the strategic goals of the organization.
              </p>
              
              <p>
                My approach is deeply collaborative. I pride myself on bridging the gap between technical teams and business stakeholders, ensuring that solutions are not just theoretically sound, but practically executable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Competencies */}
      <section className="py-24 bg-bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-light font-bold uppercase tracking-widest text-xs">Core Competencies</span>
            <h2 className="font-serif text-4xl font-bold mt-4">How I Deliver Value</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Strategic Analysis', icon: 'fa-chess', desc: 'Translating high-level business goals into actionable process roadmaps.' },
              { title: 'Process Architecture', icon: 'fa-drafting-compass', desc: 'Designing end-to-end value streams using Lean and ITIL best practices.' },
              { title: 'Change Management', icon: 'fa-users', desc: 'Guiding teams through cultural shifts with empathy and clear communication.' },
              { title: 'Data-Driven Ops', icon: 'fa-chart-bar', desc: 'Establishing KPI frameworks that measure what actually matters.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white text-xl mb-6 shadow-lg shadow-accent/20">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section for About Page */}
      <section className="py-24 bg-accent text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">Ready to Optimize Your Operations?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Whether you need a full process audit or a strategic partner for a digital migration, I am here to help.
          </p>
          <a href="#contact" className="bg-white text-accent px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all inline-flex items-center gap-2 shadow-xl">
            Let's Collaborate <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;