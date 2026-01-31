import React from 'react';
import { motion } from 'framer-motion';
import SmartImage from '../UI/SmartImage';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../Motion/AnimatedSection';

const Hero: React.FC = () => {
  const stats = [
    { value: '€700k+', label: 'Total Documented', subLabel: 'Cost Savings', icon: 'fa-chart-line' },
    { value: '20%', label: 'Productivity', subLabel: 'Improvement', icon: 'fa-rocket' },
    { value: '15+ FTE', label: 'Equivalent Savings', subLabel: 'via Automation', icon: 'fa-robot' },
    { value: '5+ Years', label: '100% Remote', subLabel: 'Global Teams', icon: 'fa-globe' },
  ];

  const clients = ['S.W.I.F.T.', 'NTT Ltd.', 'British Telecom', 'T-Systems'];

  const skillBadges = [
    { text: 'SAP S/4HANA', gradient: 'from-accent to-accent-dark', icon: 'fa-check-circle' },
    { text: 'PEGA', gradient: 'from-blue-500 to-blue-600', icon: 'fa-check-circle' },
    { text: 'AI-Augmented', gradient: 'from-green-500 to-green-600', icon: 'fa-robot' },
  ];

  return (
    <section className="relative pt-8 pb-24 lg:pt-16 lg:pb-32 bg-white overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="hero-blob w-[500px] h-[500px] bg-accent -top-20 -left-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="hero-blob w-[400px] h-[400px] bg-blue-400 top-1/2 -right-20"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
            {/* Availability Banner */}
            <AnimatedSection delay={0.1} animation="fadeUp">
              <div className="inline-flex mb-10">
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 text-green-700 px-6 py-3 rounded-full text-sm font-extrabold shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  Available for Senior Business Analyst / Transformation Lead / Process Optimization Expert Roles - 100% Remote
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Main heading with staggered text reveal */}
            <AnimatedSection delay={0.2} animation="fadeUp">
              <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] font-bold leading-[1] text-text-primary mb-8 tracking-tight">
                Unlock Your Team's <br />
                <motion.span
                  className="text-accent italic inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  Full Potential
                </motion.span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3} animation="fadeUp">
              <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Certified ITIL, 6Sigma & Lean expert delivering <span className="text-text-primary font-bold border-b-2 border-accent/20">€700k+ in documented cost savings</span>. 14+ years transforming Telecom, FinTech & ICT operations with 5+ years leading 100% remote global teams.
              </p>
            </AnimatedSection>

            {/* Key Highlights with stagger */}
            <StaggerContainer className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start" staggerDelay={0.1}>
              {skillBadges.map((badge, idx) => (
                <StaggerItem key={idx} animation="scaleIn">
                  <motion.span
                    className={`bg-gradient-to-r ${badge.gradient} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg cursor-default`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <i className={`fas ${badge.icon} mr-2`}></i>{badge.text}
                  </motion.span>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* CTA Buttons */}
            <AnimatedSection delay={0.5} animation="fadeUp">
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-16">
                <motion.a
                  href="/Bogi_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent-dark text-white px-10 py-5 rounded-2xl font-extrabold text-xl inline-flex items-center justify-center gap-3 transition-colors shadow-xl shadow-accent/40"
                  whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(75, 104, 233, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <i className="far fa-file-alt text-2xl"></i>
                  View My Resume
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/boglarka-paczari-horvath/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-bg-secondary text-text-primary px-10 py-5 rounded-2xl font-extrabold text-lg inline-flex items-center justify-center gap-3 border-2 border-slate-100 transition-colors shadow-sm"
                  whileHover={{ y: -4, borderColor: 'rgba(75, 104, 233, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <i className="fab fa-linkedin"></i>
                  Connect with me on LinkedIn
                </motion.a>
              </div>
            </AnimatedSection>

            {/* Client logos */}
            <AnimatedSection delay={0.6} animation="fadeIn">
              <div className="flex flex-col gap-4 items-center lg:items-start opacity-70">
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-text-muted">Proven Experience At</span>
                <div className="flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-6">
                  {clients.map((client, idx) => (
                    <motion.span
                      key={client}
                      className="text-lg md:text-xl font-serif font-bold text-text-muted hover:text-accent transition-colors cursor-default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1, duration: 0.4 }}
                    >
                      {client}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Profile Image Section */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <AnimatedSection delay={0.2} animation="scaleIn">
              <div className="relative mx-auto max-w-[440px] group">
                {/* Decorative border */}
                <motion.div
                  className="absolute -inset-4 border-2 border-accent/20 rounded-[50px] -z-10"
                  initial={{ x: 24, y: 24 }}
                  animate={{ x: 24, y: 24 }}
                  whileHover={{ x: 16, y: 16 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                />

                <motion.div
                  className="relative rounded-[45px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.15)] ring-8 ring-white"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <SmartImage
                    src="/bogi.png"
                    alt="Boglarka Paczari-Horvath"
                    fallbackPrompt="Professional corporate headshot of a confident woman with reddish-blonde hair, wearing a blue blazer and light blue shirt, green plant in soft focus background, high quality, 4k, photorealistic"
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105 min-h-[500px]"
                  />
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-10 -left-10 md:-left-20 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 hidden md:block"
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="flex items-center gap-4"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-text-primary">€700k+</div>
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Documented Cost Savings</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Stats Grid */}
        <StaggerContainer className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.15}>
          {stats.map((stat, idx) => (
            <StaggerItem key={idx} animation="fadeUp">
              <motion.div
                className="bg-gradient-to-br from-white to-bg-secondary p-8 rounded-[32px] shadow-md flex flex-col items-center justify-center text-center border-2 border-slate-100 hover:border-accent/30 transition-colors group"
                whileHover={{
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <i className={`fas ${stat.icon} text-xl`}></i>
                </motion.div>
                <span className="block font-serif text-3xl md:text-4xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">{stat.value}</span>
                <div className="text-xs md:text-sm text-text-secondary font-bold leading-tight">
                  {stat.label}
                </div>
                <div className="text-xs text-text-muted font-normal mt-1">{stat.subLabel}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Hero;