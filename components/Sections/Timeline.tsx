import React from 'react';

const Timeline: React.FC = () => {
  const events = [
    { date: '2025 – Present', title: 'Functional Lead — E-form Optimization & API Integration', company: 'S.W.I.F.T. | Belgium (Remote)', desc: 'Leading a team of 3-5 specialists driving high-stakes E-form optimization and global API consolidation for financial message handling.' },
    { date: '2024 – 2025', title: 'Senior Order Fulfilment BA & Process Optimization Lead', company: 'S.W.I.F.T. | Belgium (Remote)', desc: 'Optimized complex order processing workflows. Delivered 20% productivity improvement via SAP S/4HANA to PEGA migration and workflow automation.' },
    { date: '2024 – Present', title: 'Founder & Process Optimization Expert', company: 'InnovateIT Consulting | Remote', desc: 'Strategic consulting for enterprise clients focusing on Six Sigma, Lean & Agile methodologies to unlock operational capacity.' },
    { date: '2022 – 2024', title: 'Principal Business Operations Specialist', company: 'NTT Ltd. | Remote', desc: 'Led the global Opp2Cash value stream standardization. Harmonized 12 regional entities and documented €500k+ in license savings.' },
    { date: '2015 – 2022', title: 'Business Improvement Specialist → Agile Deployment Lead', company: 'British Telecom | Hungary', desc: '7 years of progressive growth. Delivered $100k+ in automation savings and achieved a 50% reduction in incident volume.' },
    { date: '2010 – 2015', title: 'Business Operations & Service Chain Operations Manager', company: 'T-Systems | Hungary', desc: 'Managed multiple high-performing operations teams. Achieved a 30% reduction in customer escalations through service chain redesign.' },
  ];

  return (
    <section id="experience" className="py-24 bg-bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-xs">Career Journey</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 mb-6">14+ Years of Strategic Impact</h2>
          <p className="text-text-secondary text-lg">A track record of driving efficiency and digital transformation across global ICT organizations.</p>
        </div>

        <div className="max-w-4xl mx-auto relative timeline-line">
          {events.map((event, idx) => (
            <div key={idx} className="pl-12 pb-12 relative">
              <div className="absolute left-[-6.5px] top-2 w-4 h-4 rounded-full bg-accent border-4 border-bg-secondary shadow-sm"></div>
              <span className="text-accent font-bold text-sm block mb-1">{event.date}</span>
              <h3 className="text-xl font-bold text-text-primary mb-1">{event.title}</h3>
              <div className="text-accent-light text-sm font-medium mb-3">{event.company}</div>
              <p className="text-text-muted text-sm leading-relaxed max-w-2xl">{event.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;