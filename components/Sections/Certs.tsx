import React from 'react';

const Certs: React.FC = () => {
  const certs = [
    { name: 'Six Sigma Green Belt', icon: 'fa-chart-line', color: 'from-green-600 to-green-700' },
    { name: 'PRINCE2 Foundation', icon: 'fa-crown', color: 'from-purple-600 to-purple-700' },
    { name: 'Lean Practitioner', icon: 'fa-layer-group', color: 'from-blue-600 to-blue-700' },
    { name: 'Change Management Practitioner', icon: 'fa-exchange-alt', color: 'from-orange-600 to-orange-700' },
    { name: 'Business Architect', icon: 'fa-sitemap', color: 'from-indigo-600 to-indigo-700' },
    { name: 'ITIL Service Operation', icon: 'fa-cogs', color: 'from-red-600 to-red-700' },
    { name: 'ITIL CSI', icon: 'fa-sync-alt', color: 'from-teal-600 to-teal-700' },
    { name: 'ITIL Service Transition', icon: 'fa-arrow-right', color: 'from-pink-600 to-pink-700' },
    { name: 'LeanIT & Business Architecture', icon: 'fa-network-wired', color: 'from-cyan-600 to-cyan-700' },
    { name: 'Enterprise Architecture Foundations', icon: 'fa-building', color: 'from-slate-600 to-slate-700' }
  ];

  return (
    <section id="certifications" className="py-20 bg-bg-secondary border-y border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">Professional Standards</span>
          <h2 className="font-serif text-3xl font-bold text-text-primary">Accreditations & Credentials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certs.map((cert, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-accent/20 transition-all cursor-default group">
              <div className="flex items-center gap-5">
                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${cert.icon} text-xl`}></i>
                </div>
                <div className="text-base font-bold text-text-secondary group-hover:text-accent transition-colors">
                  {cert.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certs;