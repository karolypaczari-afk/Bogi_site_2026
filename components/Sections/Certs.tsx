
import React from 'react';

const Certs: React.FC = () => {
  const certs = [
    'Six Sigma Green Belt', 'PRINCE2 Foundation', 'Lean Practitioner', 
    'Change Management Practitioner', 'Business Architect', 'ITIL Service Operation', 
    'ITIL CSI', 'ITIL Service Transition', 'LeanIT & Business Architecture', 'Enterprise Architecture Foundations'
  ];

  return (
    <section id="certifications" className="py-16 bg-bg-secondary border-y border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-accent font-bold uppercase tracking-widest text-xs">Credentials</span>
          <h2 className="font-serif text-2xl font-bold text-text-primary mt-2">Professional Certifications</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {certs.map((cert, idx) => (
            <span key={idx} className="bg-white px-5 py-2.5 rounded-full text-sm font-medium text-text-secondary border border-slate-200 hover:border-accent hover:text-accent hover:shadow-sm transition-all cursor-default">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certs;
