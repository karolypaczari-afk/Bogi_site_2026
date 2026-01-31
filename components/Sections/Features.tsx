import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem, TiltCard } from '../Motion/AnimatedSection';

const Features: React.FC = () => {
  const approachCards = [
    { icon: 'fa-chart-line', title: 'Lean Efficiency', desc: 'Identify structural waste and eliminate bottlenecks to increase team velocity by 15-20% consistently.' },
    { icon: 'fa-cogs', title: 'Digital Transformation', desc: 'Modernize tech stacks (S/4HANA, PEGA) with seamless API integrations and process automation.' },
    { icon: 'fa-users', title: 'Change Management', desc: 'Guiding global teams through complex cultural and technical transformations with strategic empathy.' },
    {
      icon: 'fa-robot',
      title: 'Workflow Optimization',
      desc: 'Leveraging AI tools to optimize workflows and documentation processes.',
      aiTools: true
    },
    { icon: 'fa-layer-group', title: 'Standardization', desc: 'Creating robust, scalable SOPs that remove operational ambiguity and enable rapid organizational scaling.' },
    { icon: 'fa-tachometer-alt', title: 'Data Intelligence', desc: 'Transforming raw operational metrics into actionable KPI dashboards for real-time decision-making.' },
  ];

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
    <section id="how" className="py-24 bg-bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* The Approach - Dominant */}
        <AnimatedSection delay={0.1} animation="fadeUp">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              className="text-accent font-extrabold uppercase tracking-[0.2em] text-xs mb-4 block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              The Approach
            </motion.span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Bridging Strategy and <span className="italic text-accent">Execution</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              I apply Lean Six Sigma, Agile, and ITIL frameworks to build resilient operations that scale effortlessly across global ICT sectors.
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16" staggerDelay={0.1}>
          {approachCards.map((card, idx) => (
            <StaggerItem key={idx} animation="fadeUp">
              <TiltCard
                className="group bg-white p-10 rounded-[35px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-50 h-full"
                tiltAmount={3}
              >
                <motion.div
                  className="w-16 h-16 bg-accent-subtle text-accent rounded-2xl flex items-center justify-center mb-6 text-2xl"
                  whileHover={{
                    backgroundColor: 'rgb(75, 104, 233)',
                    color: 'rgb(255, 255, 255)',
                    scale: 1.1,
                    rotate: 5
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <i className={`fas ${card.icon}`}></i>
                </motion.div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">{card.title}</h3>
                <p className="text-text-secondary text-base leading-relaxed mb-4">{card.desc}</p>

                {card.aiTools && (
                  <motion.div
                    className="flex gap-3 mt-6 pt-6 border-t border-slate-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    {[
                      {
                        gradient: 'from-green-500 to-emerald-600', title: 'ChatGPT', content: (
                          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A5.985 5.985 0 0 0 12 0C10.314 0 8.75.715 7.66 1.977a5.985 5.985 0 0 0-3.752 2.042 5.985 5.985 0 0 0-1.932 4.41 6.046 6.046 0 0 0 .516 4.91 6.046 6.046 0 0 0 .516 4.91 6.046 6.046 0 0 0 6.51 2.9A5.985 5.985 0 0 0 12 24c1.686 0 3.25-.715 4.34-1.977a5.985 5.985 0 0 0 3.752-2.042 5.985 5.985 0 0 0 1.932-4.41 6.046 6.046 0 0 0-.516-4.91z" />
                          </svg>
                        )
                      },
                      { gradient: 'from-blue-500 to-blue-600', title: 'Microsoft Copilot', content: <i className="fab fa-microsoft text-white text-lg"></i> },
                      { gradient: 'from-orange-400 to-orange-500', title: 'Claude', content: <span className="text-white font-bold text-sm">C</span> },
                      { gradient: 'from-purple-500 to-pink-500', title: 'Gemini', content: <span className="text-white font-bold text-sm">G</span> }
                    ].map((tool, i) => (
                      <motion.div
                        key={i}
                        className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${tool.gradient} rounded-lg shadow-md cursor-default`}
                        title={tool.title}
                        whileHover={{ scale: 1.15, y: -3 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        {tool.content}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* My Expertise - Secondary */}
        <div className="mt-24">
          <AnimatedSection delay={0.2} animation="fadeUp">
            <div className="text-center mb-12">
              <span className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block">My Expertise</span>
              <h3 className="font-serif text-3xl font-bold text-text-primary">Core Areas of Focus</h3>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {expertiseItems.map((item, idx) => (
              <StaggerItem key={idx} animation="scaleIn">
                <motion.div
                  className="p-8 rounded-2xl bg-white border border-slate-100 h-full"
                  whileHover={{
                    borderColor: 'rgba(75, 104, 233, 0.2)',
                    boxShadow: '0 20px 25px -5px rgba(75, 104, 233, 0.05)',
                    y: -6
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="w-14 h-14 bg-accent-subtle text-accent rounded-xl flex items-center justify-center text-xl mb-6 shadow-sm border border-slate-100"
                    whileHover={{
                      backgroundColor: 'rgb(75, 104, 233)',
                      color: 'rgb(255, 255, 255)',
                      scale: 1.1
                    }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <i className={`fas ${item.icon}`}></i>
                  </motion.div>
                  <h4 className="text-lg font-bold text-text-primary mb-3">{item.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Features;
