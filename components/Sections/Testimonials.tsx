import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmartImage from '../UI/SmartImage';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../Motion/AnimatedSection';

interface Testimonial {
  summary: string;
  fullReview: string;
  author: string;
  role: string;
  company: string;
  relationship: string;
  image: string;
  featured?: boolean;
}

const Testimonials: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      summary: "Relentlessly progressing against all odds on complex projects requiring coordination across departments.",
      fullReview: "I had the pleasure of working with Bogi during a critical transformation phase at NTT Ltd. Her ability to drive complex projects forward, even when faced with significant organizational challenges, is truly remarkable. Bogi excels at coordinating across multiple departments and stakeholders, ensuring alignment and progress even in the most challenging circumstances. Her relentless dedication to achieving results, combined with her strategic thinking and exceptional communication skills, makes her an invaluable asset to any organization. I would highly recommend Bogi for senior leadership roles in process transformation and business analysis.",
      author: "Miquel Herrero",
      role: "VP Global Standards",
      company: "NTT Ltd.",
      relationship: "Miquel managed Bogi directly",
      image: "/placeholder-m.svg",
      featured: true
    },
    {
      summary: "Crucial during immense organizational change. Dedicated professional with clever techniques for process management and measurable benefits.",
      fullReview: "Bogi was absolutely crucial during one of the most immense organizational changes our division has experienced. Her expertise in process management, combined with her innovative approach to problem-solving, delivered measurable benefits across our entire Opportunity-to-Cash value stream. What impressed me most was her ability to implement clever techniques that not only optimized processes but also gained buy-in from stakeholders at all levels. Bogi's dedication to excellence and her strategic mindset make her a standout professional in the field of business transformation. Any organization would be fortunate to have her leading their transformation initiatives.",
      author: "Mark Shepherd",
      role: "Global Director",
      company: "NTT Ltd.",
      relationship: "Mark worked with Bogi on the same team",
      image: "/mark-sheperd.png",
      featured: true
    },
    {
      summary: "Energetic, positive, excellent BA and PM. Clear professional communication and a natural problem solver who brings clarity to chaos.",
      fullReview: "Working with Bogi has been an absolute pleasure. Her energy and positive attitude are infectious, making even the most challenging projects enjoyable. As a Business Analyst and Project Manager, she demonstrates exceptional clarity in professional communication, which is rare in our field. Bogi has a natural gift for problem-solving—she brings order to chaos and creates actionable solutions where others see only complexity. Her technical expertise, combined with her interpersonal skills, makes her one of the best professionals I've collaborated with in my career. I would not hesitate to work with Bogi again on any future transformation program.",
      author: "Justin Strohmenger",
      role: "Principal IT Solutions Architect",
      company: "British Telecom",
      relationship: "Justin worked with Bogi on the same team",
      image: "/justin-strohmenger.png",
      featured: true
    },
    {
      summary: "Exceptional leadership, adept problem-solving. Can-do attitude and doesn't shy from challenges. A truly reliable partner for transformation.",
      fullReview: "Bogi is an exceptional leader with remarkable problem-solving abilities. Throughout our collaboration on multiple process improvement initiatives, she consistently demonstrated a can-do attitude that inspired the entire team. She never shies away from challenges—instead, she tackles them head-on with strategic thinking and meticulous execution. Her reliability and commitment to delivering results make her a truly invaluable partner in any transformation program. Bogi's expertise in Six Sigma, Lean methodologies, and Agile frameworks, combined with her leadership qualities, position her as one of the top professionals in business process transformation. I highly recommend her for senior roles requiring both strategic vision and hands-on execution.",
      author: "Saimah Shakeel",
      role: "Project/Program Management Specialist",
      company: "British Telecom",
      relationship: "Saimah worked with Bogi on the same team",
      image: "/saimah-shakeel.png",
      featured: true
    },
    {
      summary: "Patiently worked with globally dispersed SMEs, brokered stakeholder discussions. Attention to detail and organizational skills are second to none.",
      fullReview: "Bogi's patience and skill in working with globally dispersed subject matter experts across multiple time zones is truly impressive. She has a unique ability to broker stakeholder discussions, finding common ground even when interests seem divergent. Her attention to detail is exceptional—nothing escapes her notice, which is critical in complex process transformation projects. Her organizational skills are second to none, managing multiple workstreams simultaneously while maintaining quality and meeting deadlines. Bogi's combination of technical expertise, interpersonal skills, and meticulous execution makes her one of the most effective transformation leaders I've worked with. She would be an outstanding addition to any organization pursuing operational excellence.",
      author: "Grace Chan",
      role: "Chief of Staff",
      company: "NTT Ltd.",
      relationship: "Grace worked with Bogi on the same team",
      image: "/grace-chan.png",
      featured: true
    },
    {
      summary: "Real team player, deeply collaborative, precise. The best from the BA sphere I've worked with in over a decade of process improvement.",
      fullReview: "In my over a decade of experience in process improvement, Bogi stands out as the best Business Analyst I have had the privilege to work with. She is a real team player who values collaboration and brings out the best in everyone around her. Her precision in requirements gathering, process mapping, and stakeholder management is unparalleled. Bogi doesn't just document processes—she transforms them. Her deep understanding of Six Sigma, Lean, and ITIL frameworks, combined with her practical approach to implementation, consistently delivers exceptional results. I cannot recommend Bogi highly enough for senior BA or transformation leadership roles.",
      author: "Peter Ujfalusi",
      role: "Process Design & Improvement",
      company: "British Telecom",
      relationship: "Peter worked with Bogi on the same team",
      image: "/peter-ujfalusi.png",
      featured: true
    },
  ];

  // Show only top 6 featured recommendations
  const displayedTestimonials = testimonials.filter(t => t.featured).slice(0, 6);

  return (
    <section id="references" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <AnimatedSection delay={0.1} animation="fadeUp">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent font-bold uppercase tracking-widest text-xs">LinkedIn Recommendations</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 mb-6">
              Trusted by <span className="text-accent italic">Global Leaders</span>
            </h2>
            <p className="text-text-secondary text-lg">
              Top 6 verified recommendations from VPs, Directors, and Senior Leaders across S.W.I.F.T., NTT Ltd., and British Telecom.
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" staggerDelay={0.1}>
          {displayedTestimonials.map((item, idx) => (
            <StaggerItem key={idx} animation="fadeUp">
              <motion.div
                className="bg-gradient-to-br from-white to-bg-secondary p-8 rounded-[35px] relative border-2 border-slate-100 flex flex-col h-full"
                whileHover={{
                  borderColor: 'rgba(75, 104, 233, 0.3)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  y: -6
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="font-serif text-7xl text-accent/20 absolute top-4 left-6 leading-none select-none"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  "
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={expandedId === idx ? 'full' : 'summary'}
                    className="text-text-secondary italic text-[15px] mb-6 relative z-10 leading-relaxed flex-grow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {expandedId === idx ? item.fullReview : item.summary}
                  </motion.p>
                </AnimatePresence>

                <motion.button
                  onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                  className="text-accent font-bold text-sm hover:text-accent-dark transition-colors mb-6 flex items-center gap-2 group/btn"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {expandedId === idx ? (
                    <>
                      <i className="fas fa-chevron-up text-xs"></i> Show Less
                    </>
                  ) : (
                    <>
                      <i className="fas fa-chevron-down text-xs"></i> Read Full Review
                    </>
                  )}
                </motion.button>

                <div className="flex items-start gap-4 mt-auto pt-6 border-t border-slate-200">
                  <motion.div
                    className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg shadow-accent/10 border-2 border-white relative flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.author}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-text-primary text-[15px] mb-1">{item.author}</h4>
                    <p className="text-text-muted text-[13px] leading-tight mb-1">{item.role}</p>
                    <p className="text-accent text-[12px] font-bold">{item.company}</p>
                    <p className="text-text-muted text-[11px] italic mt-1">{item.relationship}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.3} animation="fadeUp">
          <div className="text-center">
            <motion.a
              href="https://www.linkedin.com/in/boglarka-paczari-horvath/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-2xl font-extrabold text-lg inline-flex items-center justify-center gap-3 shadow-xl shadow-blue-600/40"
              whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.5)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <i className="fab fa-linkedin text-2xl"></i>
              View My 15+ Recommendations on LinkedIn
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Testimonials;
