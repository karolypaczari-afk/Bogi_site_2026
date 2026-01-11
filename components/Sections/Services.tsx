
import React from 'react';

const Services: React.FC = () => {
  const services = [
    { num: '01', title: 'Process Optimization', desc: 'Unlock savings and drive long-term growth through systematic process improvement.' },
    { num: '02', title: 'Process Ownership', desc: 'Design, document, and implement efficient processes with full ownership.' },
    { num: '03', title: 'Agile Business Analysis', desc: 'Evaluate processes, align stakeholders, and deliver strategic analytics.' },
    { num: '04', title: 'Process Evaluation', desc: 'Comprehensive assessment identifying issues, risks, and benefits.' },
    { num: '05', title: 'Performance Reporting', desc: 'Define KPIs and build measurement systems that drive accountability.' },
    { num: '06', title: 'Requirements Management', desc: 'Bridge business stakeholders and technical teams with clarity.' },
    { num: '07', title: 'Testing & Feedback', desc: 'Facilitate user testing sessions and provide actionable insights.' },
    { num: '08', title: 'Change Management', desc: 'Guide organizational transitions with proven strategies and adoption frameworks.' },
    { num: '09', title: 'Strategic Process Design', desc: 'Enhance efficiency and drive business success through redesign initiatives.' },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-xs">Services</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 mb-6">Tailored Solutions for Your Business</h2>
          <p className="text-text-secondary text-lg">From process evaluation to full transformation programs, I offer flexible engagement models to match your needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="p-8 border border-slate-200 rounded-2xl hover:border-accent hover:shadow-lg hover:shadow-accent/5 transition-all group">
              <span className="font-serif text-5xl font-bold text-accent-subtle group-hover:text-accent/20 transition-colors block mb-4">{service.num}</span>
              <h3 className="text-lg font-bold text-text-primary mb-3">{service.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
