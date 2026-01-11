import React from 'react';

const Certs: React.FC = () => {
  const certs = [
    'Six Sigma Green Belt', 
    'PRINCE2 Foundation', 
    'Lean Practitioner', 
    'Change Management Practitioner', 
    'Business Architect', 
    'ITIL Service Operation', 
    'ITIL CSI', 
    'ITIL Service Transition', 
    'LeanIT & Business Architecture', 
    'Enterprise Architecture Foundations'
  ];

  return (
    <section id="certifications" className="py-20 bg-bg-secondary border-y border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">Professional Standards</span>
          <h2 className="font-serif text-3xl font-bold text-text-primary">Accreditations & Credentials</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {certs.map((cert, idx) => (
            <div key={idx} className="bg-white px-6 py-4 rounded-2xl text-[13px] font-bold text-text-secondary border border-slate-100 shadow-sm hover:border-accent hover:text-accent hover:shadow-md transition-all cursor-default flex items-center gap-3 group">
              <div className="w-2 h-2 rounded-full bg-accent/20 group-hover:bg-accent transition-colors"></div>
              {cert}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certs;