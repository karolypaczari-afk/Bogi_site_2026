import React from 'react';

const Timeline: React.FC = () => {
  const events = [
    {
      date: '2025 – Present',
      title: 'Functional Lead — E-form Optimization & API Integration',
      company: 'S.W.I.F.T. | Belgium (Remote)',
      desc: 'Leading a team of 3-5 specialists driving high-stakes E-form optimization and global API consolidation for financial message handling. Managing complex stakeholder relationships across global product teams while implementing systematic API rationalization to improve system reliability and reduce technical debt.',
      highlights: ['Team Leadership (3-5 specialists)', 'Global API Consolidation', 'Financial Message Systems'],
      logo: 'SWIFT',
      logoColor: 'from-red-600 to-red-700'
    },
    {
      date: '2024 – 2025',
      title: 'Senior Order Fulfilment BA & Process Optimization Lead',
      company: 'S.W.I.F.T. | Belgium (Remote)',
      desc: 'Delivered 20% productivity improvement through comprehensive process redesign of order fulfillment workflows. Led successful SAP S/4HANA to PEGA migration, implementing workflow automation that streamlined operations across the entire order-to-cash cycle.',
      highlights: ['20% Productivity Gain', 'SAP S/4HANA → PEGA Migration', 'Workflow Automation'],
      logo: 'SWIFT',
      logoColor: 'from-red-600 to-red-700'
    },
    {
      date: '2024 – Present',
      title: 'Founder & Process Optimization Expert',
      company: 'InnovateIT Consulting | Remote',
      desc: 'Strategic consulting for enterprise clients focusing on Six Sigma, Lean & Agile methodologies to unlock operational capacity. Delivering customized transformation roadmaps that combine proven frameworks with modern AI-augmented workflow optimization techniques.',
      highlights: ['Six Sigma & Lean', 'Enterprise Consulting', 'AI-Augmented Processes'],
      logo: 'IT',
      logoColor: 'from-purple-600 to-purple-700'
    },
    {
      date: '2022 – 2024',
      title: 'Principal Business Operations Specialist',
      company: 'NTT Ltd. | Remote',
      desc: 'Led global Opportunity-to-Cash value stream standardization across 12 regional entities. Documented €500k+ in SFDC license savings through strategic license optimization and harmonized business processes across diverse geographical markets. Drove adoption of standardized workflows resulting in 21% higher tool adoption rates.',
      highlights: ['€500k+ License Savings', '12 Regional Entities', '21% Tool Adoption Increase'],
      logo: 'NTT',
      logoColor: 'from-blue-600 to-blue-700'
    },
    {
      date: '2015 – 2022',
      title: 'Business Improvement Specialist → Agile Deployment Lead',
      company: 'British Telecom | Hungary',
      desc: '7 years of progressive career growth from Business Improvement Specialist to Agile Deployment Lead. Delivered $100k+ in automation savings through intelligent ticket quality workflows. Achieved 50% reduction in incident volume by eliminating "hung-line" bottlenecks. Led successful PEGA deployments with user-centric change management approach.',
      highlights: ['$100k+ Automation Savings', '50% Incident Reduction', 'PEGA Deployment Lead'],
      logo: 'BT',
      logoColor: 'from-indigo-600 to-purple-600'
    },
    {
      date: '2010 – 2015',
      title: 'Business Operations & Service Chain Operations Manager',
      company: 'T-Systems | Hungary',
      desc: 'Managed multiple high-performing operations teams delivering IT services for enterprise clients. Achieved 30% reduction in customer escalations through comprehensive service chain redesign. Built and led cross-functional teams while establishing operational excellence frameworks.',
      highlights: ['30% Escalation Reduction', 'Service Chain Redesign', 'Team Management'],
      logo: 'T-S',
      logoColor: 'from-pink-600 to-pink-700'
    },
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
            <div key={idx} className="pl-12 pb-12 relative group">
              <div className="absolute left-[-6.5px] top-2 w-4 h-4 rounded-full bg-accent border-4 border-bg-secondary shadow-sm"></div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-accent/20 transition-all">
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${event.logoColor} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform`}>
                    {event.logo}
                  </div>
                  <div className="flex-grow">
                    <span className="text-accent font-bold text-sm block mb-2">{event.date}</span>
                    <h3 className="text-xl font-bold text-text-primary mb-2 leading-tight">{event.title}</h3>
                    <div className="text-accent-light text-sm font-medium mb-4">{event.company}</div>
                    <p className="text-text-muted text-sm leading-relaxed mb-4">{event.desc}</p>
                    {event.highlights && (
                      <div className="flex flex-wrap gap-2">
                        {event.highlights.map((highlight, hidx) => (
                          <span key={hidx} className="inline-flex items-center gap-1.5 bg-accent/5 border border-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-bold">
                            <i className="fas fa-check-circle text-[10px]"></i>
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;