import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { StaggerContainer, StaggerItem, TiltCard } from '../Motion/AnimatedSection';

const Achievements: React.FC = () => {
  const achievements = [
    { icon: 'fa-euro-sign', title: '€700k+ Documented Savings', desc: 'Aggregated savings across license optimization, automation ROI, and process waste elimination.' },
    { icon: 'fa-bolt', title: '20% Productivity Improvement', desc: 'Average throughput increase for order fulfillment teams through lean workflow redesign and SAP S/4HANA to PEGA migration.' },
    { icon: 'fa-users-cog', title: '15+ FTE Capacity Created', desc: 'Automated ticket quality workflows, freeing up high-value specialists for strategic work.' },
    { icon: 'fa-chart-pie', title: '50% Lower Incident Volume', desc: 'Eliminated "hung-line" bottlenecks at BT, significantly reducing operational firefighting.' },
    { icon: 'fa-user-check', title: '21% Higher Tool Adoption', desc: 'Led user-centric change management for PEGA deployments, ensuring digital tool ROI.' },
    { icon: 'fa-globe', title: '5+ Years Remote Leadership', desc: 'Successfully leading distributed teams with 100% remote operations, driving cultural change and process adherence across global organizations.' },
  ];

  return (
    <section id="achievements" className="py-24 bg-bg-dark relative overflow-hidden">
      {/* Background Accent */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection delay={0.1} animation="fadeUp">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-accent-light font-extrabold uppercase tracking-[0.2em] text-xs mb-4">Hard Metrics</span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">Proven Business Impact</h2>
            <p className="text-slate-400 text-lg leading-relaxed">I don't just "improve processes"—I deliver measurable financial and operational results that reflect on the bottom line.</p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {achievements.map((item, idx) => (
            <StaggerItem key={idx} animation="fadeUp">
              <TiltCard
                className="group p-10 bg-white/5 border border-white/10 rounded-[40px] h-full"
                tiltAmount={3}
              >
                <motion.div
                  className="w-16 h-16 bg-accent text-white rounded-[20px] flex items-center justify-center text-2xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-accent/20"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                >
                  <i className={`fas ${item.icon}`}></i>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed">{item.desc}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Achievements;
