import React from 'react';

const Features: React.FC = () => {
  const cards = [
    { icon: 'fa-chart-line', title: 'Lean Efficiency', desc: 'Identify structural waste and eliminate bottlenecks to increase team velocity by 15-20% consistently.' },
    { icon: 'fa-cogs', title: 'Digital Architecture', desc: 'Modernize tech stacks (S/4HANA, PEGA) with seamless API integrations and process automation.' },
    { icon: 'fa-users', title: 'Change Leadership', desc: 'Guiding global teams through complex cultural and technical transformations with strategic empathy.' },
    { icon: 'fa-robot', title: 'AI Implementation', desc: 'Optimizing workflows with Microsoft Copilot integration and custom LLM prompts for documentation.' },
    { icon: 'fa-layer-group', title: 'Standardization', desc: 'Creating robust, scalable SOPs that remove operational ambiguity and enable rapid organizational scaling.' },
    { icon: 'fa-tachometer-alt', title: 'Data Intelligence', desc: 'Transforming raw operational metrics into actionable KPI dashboards for real-time decision-making.' },
  ];

  return (
    <section id="how" className="py-24 bg-bg-secondary relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent font-extrabold uppercase tracking-[0.2em] text-xs mb-4 block">The Approach</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6">Bridging Strategy and <span className="italic">Excellence</span></h2>
          <p className="text-text-secondary text-lg leading-relaxed">I apply Lean Six Sigma, Agile, and ITIL frameworks to build resilient operations that scale effortlessly across global ICT sectors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {cards.map((card, idx) => (
            <div key={idx} className="group bg-white p-10 rounded-[35px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-2 transition-all duration-300 border border-slate-50">
              <div className="w-16 h-16 bg-accent-subtle text-accent rounded-2xl flex items-center justify-center mb-8 text-2xl group-hover:bg-accent group-hover:text-white transition-colors">
                <i className={`fas ${card.icon}`}></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">{card.title}</h3>
              <p className="text-text-secondary text-base leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;