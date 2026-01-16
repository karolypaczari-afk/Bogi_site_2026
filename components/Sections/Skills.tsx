import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'ERP & Workflow Platforms',
      icon: 'fa-server',
      color: 'from-blue-500 to-blue-600',
      skills: [
        { name: 'SAP S/4HANA', highlight: true },
        { name: 'PEGA', highlight: true },
        { name: 'ServiceNow' },
        { name: 'Salesforce' }
      ]
    },
    {
      title: 'Process & Design Tools',
      icon: 'fa-project-diagram',
      color: 'from-purple-500 to-purple-600',
      skills: [
        { name: 'ARIS' },
        { name: 'Visio' },
        { name: 'Miro' },
        { name: 'Mural' },
        { name: 'Confluence' },
        { name: 'Lucidchart' }
      ]
    },
    {
      title: 'Project & Agile Management',
      icon: 'fa-tasks',
      color: 'from-green-500 to-green-600',
      skills: [
        { name: 'Jira' },
        { name: 'Confluence' },
        { name: 'MS Project' },
        { name: 'Azure DevOps' }
      ]
    },
    {
      title: 'Analytics & Business Intelligence',
      icon: 'fa-chart-bar',
      color: 'from-orange-500 to-orange-600',
      skills: [
        { name: 'Power BI' },
        { name: 'Qlik' },
        { name: 'Excel (Advanced)' },
        { name: 'Minitab' },
        { name: 'Tableau' }
      ]
    },
    {
      title: 'AI & Productivity',
      icon: 'fa-robot',
      color: 'from-accent to-accent-dark',
      skills: [
        { name: 'Microsoft Copilot', highlight: true },
        { name: 'ChatGPT', highlight: true },
        { name: 'Claude', highlight: true },
        { name: 'Microsoft 365' },
        { name: 'Gemini' }
      ]
    },
    {
      title: 'Methodologies & Frameworks',
      icon: 'fa-book',
      color: 'from-red-500 to-red-600',
      skills: [
        { name: 'Six Sigma', highlight: true },
        { name: 'Lean', highlight: true },
        { name: 'Agile' },
        { name: 'ITIL' },
        { name: 'PRINCE2' },
        { name: 'DMAIC' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Technical Expertise</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Enterprise-Grade <span className="text-accent italic">Technology Stack</span>
          </h2>
          <p className="text-text-secondary text-lg">
            Hands-on expertise across leading enterprise platforms, process optimization tools, and AI-powered productivity suite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white to-bg-secondary p-8 rounded-[40px] border-2 border-slate-100 hover:border-accent/30 hover:shadow-2xl transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${category.icon} text-xl`}></i>
                </div>
                <h3 className="font-bold text-text-primary text-lg leading-tight group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                      skill.highlight
                        ? 'bg-gradient-to-r from-accent/10 to-accent/5 text-accent border-accent/30 hover:border-accent hover:shadow-lg'
                        : 'bg-white text-text-secondary border-slate-200 hover:border-accent hover:text-accent hover:shadow-md'
                    }`}
                  >
                    {skill.highlight && <i className="fas fa-star text-[8px] mr-1.5"></i>}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Value Props for Recruiters */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-3xl border-2 border-green-200 text-center">
            <i className="fas fa-globe text-3xl text-green-600 mb-3"></i>
            <h4 className="font-bold text-text-primary mb-2">Global Remote Expert</h4>
            <p className="text-sm text-text-secondary">5+ years leading distributed teams with 100% remote operations</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl border-2 border-blue-200 text-center">
            <i className="fas fa-language text-3xl text-blue-600 mb-3"></i>
            <h4 className="font-bold text-text-primary mb-2">Multilingual</h4>
            <p className="text-sm text-text-secondary">English (Full Professional) | German (Intermediate) | Hungarian (Native)</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-3xl border-2 border-purple-200 text-center">
            <i className="fas fa-industry text-3xl text-purple-600 mb-3"></i>
            <h4 className="font-bold text-text-primary mb-2">Industry Focus</h4>
            <p className="text-sm text-text-secondary">Telecom, FinTech, ICT, Enterprise SaaS</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
