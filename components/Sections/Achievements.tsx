
import React from 'react';

const Achievements: React.FC = () => {
  const achievements = [
    { icon: 'fa-euro-sign', title: '€700k+ Documented Savings', desc: 'Aggregated savings across license optimization, automation ROI, and process waste elimination.' },
    { icon: 'fa-bolt', title: '20% Productivity Improvement', desc: 'Average throughput increase for order fulfillment teams through lean workflow redesign and SAP S/4HANA to PEGA migration.' },
    { icon: 'fa-users-cog', title: '15+ FTE Capacity Created', desc: 'Automated ticket quality workflows, freeing up high-value specialists for strategic work.' },
    { icon: 'fa-chart-pie', title: '50% Lower Incident Volume', desc: 'Eliminated "hung-line" bottlenecks at BT, significantly reducing operational firefighting.' },
    { icon: 'fa-user-check', title: '21% Higher Tool Adoption', desc: 'Led user-centric change management for PEGA deployments, ensuring digital tool ROI.' },
    { icon: 'fa-globe', title: '5+ Years Remote Leadership', desc: 'Successfully leading global teams across 12 time zones with 100% remote operations, driving cultural change and process adherence.' },
  ];

  return (
    <section id="achievements" className="py-24 bg-bg-dark relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-accent-light font-extrabold uppercase tracking-[0.2em] text-xs mb-4">Hard Metrics</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">Proven Business Impact</h2>
          <p className="text-slate-400 text-lg leading-relaxed">I don't just "improve processes"—I deliver measurable financial and operational results that reflect on the bottom line.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, idx) => (
            <div key={idx} className="group p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/[0.08] hover:border-accent/40 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-accent text-white rounded-[20px] flex items-center justify-center text-2xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-accent/20">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
