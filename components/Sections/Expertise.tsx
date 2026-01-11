import React from 'react';

const Expertise: React.FC = () => {
  const expertiseItems = [
    {
      icon: 'fa-chess-board',
      title: 'Strategic Process Design',
      desc: 'Translating high-level business goals into executable, scalable process architectures (BPMN, VSM).'
    },
    {
      icon: 'fa-network-wired',
      title: 'Digital Ecosystems',
      desc: 'Harmonizing complex IT landscapes (SAP, PEGA, API Layers) to reduce technical debt and improve velocity.'
    },
    {
      icon: 'fa-sync-alt',
      title: 'Continuous Improvement',
      desc: 'Deploying Lean Six Sigma and Agile frameworks to identify structural waste and optimize performance.'
    },
    {
      icon: 'fa-users-cog',
      title: 'Change Enablement',
      desc: 'Leading cross-functional teams through cultural and operational shifts with clear communication and empathy.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">My Expertise</span>
            <h2 className="font-serif text-3xl font-bold text-text-primary">Core Areas of Focus</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseItems.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-bg-secondary border border-slate-100 hover:border-accent/20 hover:bg-white hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white text-accent rounded-xl flex items-center justify-center text-xl mb-6 shadow-sm border border-slate-100 group-hover:bg-accent group-hover:text-white transition-colors">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;