import React, { useEffect, useRef } from 'react';

const Insights: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const caseStudies = [
    {
      id: 'pega-migration',
      category: 'Digital Migration',
      title: 'SAP S/4HANA to PEGA: A Strategic Shift',
      desc: 'Led the functional design for a high-stakes migration at S.W.I.F.T., delivering 20% productivity improvement and zero-downtime transition.',
      dark: true
    },
    {
      id: 'ntt-standardization',
      category: 'Operational Excellence',
      title: 'Standardizing Opp2Cash Value Streams',
      desc: 'Executed global standardization for NTT Ltd., securing €500k+ in documented license savings and harmonizing 12 regional entities.',
      dark: false
    }
  ];

  const blogPosts = [
    {
      id: 'ai-process-optimization',
      icon: 'fa-microchip',
      category: 'AI & Tools',
      title: 'Leveraging Copilot for Business Analysis',
      desc: 'How AI-augmented documentation is reducing BA overhead by 40% in large-scale ICT projects.',
      color: 'bg-accent-subtle',
      iconColor: 'text-accent/30'
    },
    {
      id: 'change-management-global',
      icon: 'fa-project-diagram',
      category: 'Methodology',
      title: 'The Lean-Agile Hybrid Model',
      desc: 'Why strict adherence to one framework fails in enterprise environments, and how to blend them for ROI.',
      color: 'bg-slate-100',
      iconColor: 'text-slate-300'
    },
    {
      id: 'kpi-power-frameworks',
      icon: 'fa-globe-americas',
      category: 'Leadership',
      title: 'Remote Process Management at Scale',
      desc: 'Best practices for driving cultural change and process adherence in 100% distributed global teams.',
      color: 'bg-blue-50',
      iconColor: 'text-blue-200'
    }
  ];

  return (
    <section id="insights" ref={sectionRef} className="py-24 bg-white reveal">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Knowledge Hub</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary">Case Studies & <span className="italic">Expert Insights</span></h2>
        </div>

        {/* Case Studies */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-xl font-bold">Featured Case Studies</h3>
            <div className="h-[2px] flex-grow bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {caseStudies.map((study, idx) => (
              <div 
                key={idx} 
                className={`group relative overflow-hidden rounded-[40px] p-10 lg:p-14 hover:shadow-2xl transition-all ${study.dark ? 'bg-bg-dark text-white' : 'bg-white border border-slate-100 text-text-primary'}`}
              >
                {study.dark && <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>}
                <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase mb-6 ${study.dark ? 'bg-accent/20 border border-accent/30 text-accent-light' : 'bg-bg-secondary border border-slate-200 text-text-muted'}`}>
                  {study.category}
                </span>
                <h4 className={`font-serif text-3xl font-bold mb-6 leading-tight transition-colors ${study.dark ? 'group-hover:text-accent-light' : 'group-hover:text-accent'}`}>
                  {study.title}
                </h4>
                <p className={`text-base mb-8 leading-relaxed ${study.dark ? 'text-slate-400' : 'text-text-secondary'}`}>
                  {study.desc}
                </p>
                <a href={`#blog/${study.id}`} className={`inline-flex items-center gap-2 font-bold hover:gap-4 transition-all ${study.dark ? 'text-white' : 'text-text-primary'}`}>
                  Read Full Case Study <i className={`fas fa-arrow-right ${study.dark ? 'text-accent-light' : 'text-accent'}`}></i>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-xl font-bold">Recent Insights</h3>
            <div className="h-[2px] flex-grow bg-slate-100"></div>
            <a href="#blog" className="text-accent font-bold text-sm hover:underline">Browse All Posts</a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <a key={idx} href={`#blog/${post.id}`} className="group cursor-pointer block">
                <div className="mb-6 overflow-hidden rounded-[24px]">
                  <div className={`${post.color} w-full h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                    <i className={`fas ${post.icon} text-5xl ${post.iconColor}`}></i>
                  </div>
                </div>
                <span className="text-accent text-[11px] font-bold uppercase tracking-widest mb-3 block">{post.category}</span>
                <h5 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors leading-snug">{post.title}</h5>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{post.desc}</p>
                <span className="text-[12px] font-bold text-text-primary flex items-center gap-2">
                  Read Article <i className="fas fa-chevron-right text-[10px] text-accent"></i>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;