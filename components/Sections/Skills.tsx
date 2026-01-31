import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../Motion/AnimatedSection';

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
        <AnimatedSection delay={0.1} animation="fadeUp">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Technical Expertise</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              Enterprise-Grade <span className="text-accent italic">Technology Stack</span>
            </h2>
            <p className="text-text-secondary text-lg">
              Hands-on expertise across leading enterprise platforms, process optimization tools, and AI-powered productivity suite.
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {skillCategories.map((category, idx) => (
            <StaggerItem key={idx} animation="scaleIn">
              <motion.div
                className="bg-gradient-to-br from-white to-bg-secondary p-8 rounded-[40px] border-2 border-slate-100 h-full"
                whileHover={{
                  borderColor: 'rgba(75, 104, 233, 0.3)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  y: -6
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-br ${category.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <i className={`fas ${category.icon} text-xl`}></i>
                  </motion.div>
                  <h3 className="font-bold text-text-primary text-lg leading-tight">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skillIdx}
                      className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-default ${skill.highlight
                          ? 'bg-gradient-to-r from-accent/10 to-accent/5 text-accent border-accent/30'
                          : 'bg-white text-text-secondary border-slate-200'
                        }`}
                      whileHover={skill.highlight ? {
                        borderColor: 'rgb(75, 104, 233)',
                        boxShadow: '0 10px 15px -3px rgba(75, 104, 233, 0.1)',
                        scale: 1.05
                      } : {
                        borderColor: 'rgb(75, 104, 233)',
                        color: 'rgb(75, 104, 233)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        scale: 1.05
                      }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {skill.highlight && <i className="fas fa-star text-[8px] mr-1.5"></i>}
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Additional Value Props for Recruiters */}
        <AnimatedSection delay={0.3} animation="fadeUp">
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: 'fa-globe',
                color: 'green',
                title: 'Global Remote Expert',
                desc: '5+ years leading distributed teams with 100% remote operations'
              },
              {
                icon: 'fa-language',
                color: 'blue',
                title: 'Multilingual',
                desc: 'English (Full Professional) | German (Intermediate) | Hungarian (Native)'
              },
              {
                icon: 'fa-industry',
                color: 'purple',
                title: 'Industry Focus',
                desc: 'Telecom, FinTech, ICT, Enterprise SaaS'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className={`bg-gradient-to-br from-${item.color}-50 to-white p-6 rounded-3xl border-2 border-${item.color}-200 text-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.i
                  className={`fas ${item.icon} text-3xl text-${item.color}-600 mb-3 inline-block`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                ></motion.i>
                <h4 className="font-bold text-text-primary mb-2">{item.title}</h4>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;
