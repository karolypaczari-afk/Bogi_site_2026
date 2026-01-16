import React from 'react';

const Certs: React.FC = () => {
  const certCategories = [
    {
      category: 'Process Excellence',
      icon: 'fa-chart-line',
      certs: [
        { name: 'Six Sigma Green Belt', icon: 'fa-medal', color: 'from-green-600 to-green-700', org: 'ASQ' },
        { name: 'Lean Practitioner', icon: 'fa-layer-group', color: 'from-blue-600 to-blue-700', org: 'Lean Institute' },
        { name: 'LeanIT Foundation', icon: 'fa-microchip', color: 'from-cyan-600 to-cyan-700', org: 'LeanIT Association' }
      ]
    },
    {
      category: 'Project & Change Management',
      icon: 'fa-project-diagram',
      certs: [
        { name: 'PRINCE2 Foundation', icon: 'fa-crown', color: 'from-purple-600 to-purple-700', org: 'AXELOS' },
        { name: 'Change Management Practitioner', icon: 'fa-exchange-alt', color: 'from-orange-600 to-orange-700', org: 'APMG' },
        { name: 'Agile Scrum Master', icon: 'fa-sync', color: 'from-emerald-600 to-emerald-700', org: 'Scrum Alliance' }
      ]
    },
    {
      category: 'ITIL Service Management',
      icon: 'fa-cogs',
      certs: [
        { name: 'ITIL Service Operation', icon: 'fa-server', color: 'from-red-600 to-red-700', org: 'AXELOS' },
        { name: 'ITIL Service Transition', icon: 'fa-arrow-right', color: 'from-pink-600 to-pink-700', org: 'AXELOS' },
        { name: 'ITIL Continual Service Improvement', icon: 'fa-sync-alt', color: 'from-teal-600 to-teal-700', org: 'AXELOS' }
      ]
    },
    {
      category: 'Business & Enterprise Architecture',
      icon: 'fa-sitemap',
      certs: [
        { name: 'Business Architect Certified', icon: 'fa-sitemap', color: 'from-indigo-600 to-indigo-700', org: 'BQF' },
        { name: 'LeanIT & Business Architecture', icon: 'fa-network-wired', color: 'from-blue-500 to-blue-600', org: 'LeanIT Association' },
        { name: 'Enterprise Architecture Foundations', icon: 'fa-building', color: 'from-slate-600 to-slate-700', org: 'The Open Group' }
      ]
    }
  ];

  return (
    <section id="certifications" className="py-24 bg-gradient-to-br from-bg-secondary to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">Professional Standards</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4">Accreditations & Credentials</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">Industry-recognized certifications demonstrating expertise in process excellence, IT service management, and enterprise transformation</p>
        </div>

        <div className="max-w-7xl mx-auto space-y-12">
          {certCategories.map((category, catIdx) => (
            <div key={catIdx} className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white shadow-md">
                  <i className={`fas ${category.icon} text-xl`}></i>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">{category.category}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.certs.map((cert, certIdx) => (
                  <div key={certIdx} className="bg-gradient-to-br from-bg-secondary to-white p-5 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-accent/30 transition-all cursor-default group">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                        <i className={`fas ${cert.icon} text-xl`}></i>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-text-primary mb-1 leading-tight group-hover:text-accent transition-colors">{cert.name}</h4>
                        <span className="text-xs text-text-muted font-medium">{cert.org}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certs;