import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmartImage from '../UI/SmartImage';
import ReadingProgress from '../UI/ReadingProgress';
import AnimatedSection, { StaggerContainer, StaggerItem } from '../Motion/AnimatedSection';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: string[];
  coverImage: string;
}

const POSTS: BlogPost[] = [
  {
    id: '500k-savings',
    title: '💡3 steps to save $500K+ for Your Company',
    category: 'Process Improvement',
    date: 'October 3, 2024',
    summary: 'Proven strategies for organizational cost reduction without compromising performance or customer satisfaction. Learn how to achieve up to 30% savings through value stream optimization, platform consolidation, and strategic automation.',
    coverImage: '/blog-500k-savings.jpg',
    content: [
      "The article presents proven strategies for organizational cost reduction without compromising performance or customer satisfaction. Drawing from experience leading large-scale transformation initiatives, I outline approaches that address efficiency, loss prevention, and sustainable growth positioning.",
      "# Step 1: Dive Deep into Your Value Stream 🔍",
      "Potential Savings: Up to 30% of operational costs",
      "Understanding current business operations is foundational to identifying inefficiencies and hidden expenses. Key inefficiency indicators include:",
      "• Slow Bid Process: Extended timeframes for generating offers cause deal delays",
      "• Delivery Delays: Extended delivery timelines frustrate clients and expose organizations to penalties and customer loss",
      "• Misaligned Front and Back Offices: Disconnects between opportunity-to-order and order-to-cash processes create bottlenecks",
      "I recommend using Value Stream Mapping to evaluate these processes and eliminate bottlenecks for immediate operational and cash flow improvements.",
      "# Step 2: Evaluate Your Business Platforms 🖥️",
      "Potential Savings: 10-20% on software and maintenance costs",
      "Organizations, particularly those with merger/acquisition histories, often maintain redundant legacy systems. I've worked with companies maintaining over 20 platforms, including four critical systems generating substantial maintenance costs.",
      "Platform consolidation methodology includes:",
      "• Impact Analysis: Evaluate process dependencies and identify redundancy",
      "• Business Criticality Review: Measure transaction volume, user activity, and financial contribution",
      "• IT Partnership: Collaborate on legacy system replacement within integrated platforms",
      "# Step 3: Automate for Efficiency and Growth 🤖",
      "Potential Savings: 15-40% on operational costs plus increased revenue",
      "Automation addresses manual task elimination, error reduction, and service acceleration. Implementation steps involve:",
      "• Identify Manual Processes: Locate repetitive, non-value-adding tasks consuming employee time",
      "• Test Business Impact: Conduct stakeholder interviews to ensure automation doesn't inadvertently disrupt operations",
      "• Expert Involvement: Engage data analysts and DevOps specialists for feasibility validation and realistic timelines",
      "Additional Benefits: Automation improves employee morale, reduces tedious work, and enhances customer satisfaction through accelerated service delivery.",
      "The three-step framework addresses value stream optimization, platform consolidation, and process automation to unlock $500,000+ in organizational savings while maintaining performance standards and customer satisfaction."
    ]
  },
  {
    id: 'adoption-success',
    title: 'Case Study: Driving Adoption Success – How We Increased Workflow Adoption by 21%',
    category: 'Case Study',
    date: 'June 5, 2024',
    summary: 'As a Business Analyst, I led adoption and deployment efforts for an automated workflow development initiative. Despite being voluntary, we increased adoption from 14% to 21% within two months through proactive engagement and personalized support.',
    coverImage: '/blog-adoption-success.jpg',
    content: [
      "# Background",
      "As a Business Analyst, I led adoption and deployment efforts for an automated workflow development initiative. The project aimed to transition the Opportunity to Implementation value stream from manual Excel-based processes to a PEGA-powered system. Key users included bid managers and solution designers. Despite strategic importance, adoption remained voluntary with no mandatory cutover date.",
      "# The Challenge",
      "Post-MVP launch adoption rates stood at only 14%. Without enforcement mechanisms or firm deadlines, the team faced a significant hurdle—driving voluntary adoption required demonstrating clear value through seamless user experience and comprehensive requirement fulfillment.",
      "# Solution Approach",
      "The strategy involved four key components:",
      "• Comprehensive Adoption Plan and Communication: Weekly steering committee sessions updated stakeholders on progress, presented data-driven reports, and incorporated user feedback to secure executive support.",
      "• Proactive Monitoring and Engagement: The team monitored Salesforce opportunity queues to identify qualified deals, then directly engaged bid managers to guide PEGA workflow adoption.",
      "• Knowledge Base Development: Collaboration with SharePoint teams created user guides, automated change request forms, and service escalation processes reducing friction.",
      "• Focused High-Potential Teams: Special attention to the security bid team—a smaller, high-volume group struggling with spreadsheet transparency—included dedicated feedback sessions and personalized backlog prioritization.",
      "# Results",
      "Within two months, adoption increased to 21%. The security bid team's enthusiastic participation created positive momentum, with their insights improving workflow functionality and encouraging broader organizational adoption.",
      "# Key Takeaway",
      "Success emerged through tailored approaches combining clear communication, proactive engagement, and personalized support that addressed specific user needs while fostering collaborative feedback cultures."
    ]
  },
  {
    id: 'process-tools',
    title: 'My favourite tools to initiate a Complex Process Improvement Project',
    category: 'Process Improvement',
    date: 'September 17, 2024',
    summary: 'Initiating complex process improvement efforts becomes achievable with the right blend of methodologies and strategic steps. This article presents a proven framework for launching and executing impactful initiatives.',
    coverImage: '/blog-process-tools.png',
    content: [
      "Initiating complex process improvement efforts becomes achievable with the right blend of methodologies and strategic steps. I present a proven framework for launching and executing impactful initiatives.",
      "# Building a Solid Foundation 🏗️",
      "Project Charter: Set the Tone for Success",
      "The project charter is foundational, establishing clarity from inception. Essential components include:",
      "• Problem Statement: Identifies the core issue requiring change",
      "• Business Justification: Demonstrates organizational value",
      "• Key Stakeholders: Maps influential parties and affected groups",
      "• Expected Benefits: Quantifies outcomes through hard metrics (cost reduction, efficiency gains) and soft metrics (workforce morale)",
      "• Timelines: Establishes realistic milestone targets",
      "• Objectives: Defines measurable, strategy-aligned goals",
      "• Scope and Deliverables: Clarifies project boundaries",
      "Comprehensive charters eliminate ambiguity and foster stakeholder alignment.",
      "# Measurement and Precision 🔍📏",
      "Data Gathering: The Heartbeat of Process Improvement",
      "Accurate baseline data collection enables identification of inefficiencies and progress monitoring. I recommend visualization tools including Excel, Minitab, flowcharts, and infographics.",
      "Key implementation strategies:",
      "• Define lead metrics and KPIs (limiting focus to 1-2 metrics)",
      "• Develop comprehensive project plans with assigned owners and timelines",
      "Data-driven approaches reduce risk and improve success probability.",
      "# Process Mapping and Insights 🗺️",
      "Collaboration with subject matter experts (SMEs) proves essential for understanding current (As-Is) and desired (Should-Be) processes. Recording sessions enables later review for precision.",
      "Recommended Tools:",
      "• SIPOC diagrams: Capture critical process points, identifying triggers and outcomes",
      "• Value Stream Mapping: Visualizes processes, quantifies inefficiencies, highlights waste",
      "• Swimlane Diagrams: Deconstructs complex workflows, clarifies accountability",
      "I suggest using SIPOC to integrate business platforms for unified input/output visibility.",
      "# Conclusion",
      "I advocate combining DMAIC (Define, Measure, Analyze, Improve, Control) methodology with traditional project management disciplines, achieving the best of both worlds—flexibility and thoroughness. This hybrid approach ensures rigorous structure while accommodating organizational uniqueness."
    ]
  },
  {
    id: 'money-leaks',
    title: 'Detecting and Preventing Money Leaks in Your Processes',
    category: 'Process Improvement',
    date: 'August 1, 2024',
    summary: 'Start with a housekeeping exercise to identify inefficiencies, then implement targeted solutions. This showcases how 6Sigma methodology addressed operational inefficiencies in an Opp2Invoice business process.',
    coverImage: '/blog-money-leaks.jpg',
    content: [
      "Start with a housekeeping exercise to identify inefficiencies, then implement targeted solutions. This showcases how 6Sigma methodology addressed operational inefficiencies in an Opp2Invoice business process.",
      "# Methodology Employed",
      "• User interviews with structured questioning",
      "• Data collection to substantiate problems",
      "• Project charter documentation",
      "# Three Major Projects Implemented",
      "## 1. Platform Decommissioning",
      "Eliminated unused software licenses, achieving $20K+ annual savings through standardization.",
      "## 2. Pricing Communication Enhancement",
      "Tackled delayed involvement in pricing decisions and outdated vendor rates that caused significant extra costs ($200-300K for a specific client). Solutions included introducing a triage step and extending price warranty from 30 to 60 days.",
      "## 3. Cost Data Management",
      "Corrected inaccurate CMDB entries that created potential money leaks (over $10K) through incorrect cancellation fee calculations.",
      "# Conclusion",
      "Structured 6 Sigma methodologies and focusing on detailed analysis and proactive solutions enabled identification and mitigation of financial losses, resulting in improved operational efficiency and profitability."
    ]
  },
  {
    id: 'automation-efficiency',
    title: 'Case Study: Enhancing Process Efficiency through Automation in an IT Multinational Company 🚀',
    category: 'Case Study',
    date: 'June 5, 2024',
    summary: 'Serving as a Management Information (MI) Lead at a major IT multinational, I led a transformation initiative focused on improving business processes. The core mission involved analyzing data to identify automation opportunities.',
    coverImage: '/blog-automation-efficiency.png',
    content: [
      "# Introduction",
      "Serving as a Management Information (MI) Lead at a major IT multinational, I led a transformation initiative focused on improving business processes. The core mission involved analyzing data to identify automation opportunities, particularly targeting a bottleneck affecting operations teams.",
      "# Identifying the Problem 🔍",
      "Initial Observations:",
      "A 10-person team responsible for ticket quality reviews faced significant constraints. The manual process permitted evaluation of only 10-30 tickets per week, limiting data reliability. Weekly reports weren't effectively utilized during performance discussions, creating a disconnect between analysis and action.",
      "Deep-Dive Analysis:",
      "Investigation revealed multiple weaknesses:",
      "• Manual processes restricted sample sizes and accuracy",
      "• The team tracked 10 different quality metrics, creating unnecessary complexity",
      "• No feedback loop existed to drive improvements based on findings",
      "# Developing the Solution 💡",
      "Building the Business Case:",
      "Collaboration with assigned data analysts revealed that 8 out of the 10 metrics could be automated. The team employed Deming Cycle and lean management principles to guide implementation.",
      "Key Implementation Steps:",
      "• Validated metrics reliability",
      "• Automated manual tasks to expand sample sizes",
      "• Generated comprehensive reports integrated into operational performance discussions",
      "• Freed up resources equivalent to 10 FTEs",
      "# Results and Impact 🌟",
      "• Enhanced data accuracy through larger sample sizes",
      "• Increased operational efficiency",
      "• Established effective feedback mechanisms for performance improvements",
      "# Lessons Learned 📚",
      "• Data-driven decision-making should precede action",
      "• Use structured observation methods (DILO/WILO) when data gaps exist",
      "• Engage stakeholders to ensure alignment and feasibility",
      "• Apply continuous improvement frameworks like Deming Cycle",
      "# Conclusion",
      "The successful automation initiative demonstrated how strategic process improvements, grounded in collaborative problem-solving and data analysis, drive organizational efficiency and support business objectives."
    ]
  }
];

const Blog: React.FC<{ postId?: string | null }> = ({ postId }) => {
  const selectedPost = POSTS.find(p => p.id === postId);

  if (postId && selectedPost) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPost.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <ReadingProgress />
          <section className="py-24 bg-white min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
              <motion.a
                href="#blog"
                className="inline-flex items-center gap-2 text-accent font-bold mb-10 hover:gap-3 transition-all"
                whileHover={{ gap: '1rem' }}
              >
                <i className="fas fa-arrow-left"></i> Back to All Articles
              </motion.a>

              <div className="mb-12">
                <motion.span
                  className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedPost.category} — {selectedPost.date}
                </motion.span>
                <motion.h1
                  className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 tracking-tight leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedPost.title}
                </motion.h1>
              </div>

              {/* Cover Image */}
              <motion.div
                className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <SmartImage
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Quick Summary Box */}
              <motion.div
                className="bg-gradient-to-r from-accent-subtle to-blue-50 p-8 md:p-10 rounded-3xl border-l-4 border-accent mb-12 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">Executive Summary</h3>
                <p className="text-lg md:text-xl font-medium text-text-primary leading-relaxed">
                  {selectedPost.summary}
                </p>
              </motion.div>

              {/* Article Content */}
              <div className="prose prose-lg lg:prose-xl max-w-none space-y-6 text-text-secondary leading-loose">
                {selectedPost.content.map((line, i) => {
                  if (line.startsWith('# ')) {
                    return (
                      <AnimatedSection key={i} animation="fadeUp">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mt-16 mb-8 first:mt-0">
                          {line.replace('# ', '')}
                        </h2>
                      </AnimatedSection>
                    );
                  }
                  if (line.startsWith('## ')) {
                    return (
                      <AnimatedSection key={i} animation="fadeUp">
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-text-primary mt-12 mb-6">
                          {line.replace('## ', '')}
                        </h3>
                      </AnimatedSection>
                    );
                  }
                  if (line.startsWith('• ')) {
                    return (
                      <AnimatedSection key={i} animation="fadeUp" className="flex gap-4 items-start pl-4 my-4">
                        <motion.span
                          className="text-accent mt-2 text-sm flex-shrink-0"
                          whileInView={{ scale: [1, 1.5, 1] }}
                        >
                          <i className="fas fa-circle"></i>
                        </motion.span>
                        <p className="m-0 text-lg">{line.replace('• ', '')}</p>
                      </AnimatedSection>
                    );
                  }
                  return (
                    <AnimatedSection key={i} animation="fadeUp">
                      <p className="text-lg md:text-xl leading-relaxed">{line}</p>
                    </AnimatedSection>
                  );
                })}
              </div>

              {/* Author Bio Footer */}
              <AnimatedSection animation="scaleIn" className="mt-20 pt-12 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 bg-gradient-to-r from-bg-secondary to-white p-10 rounded-3xl">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-20 h-20 rounded-full overflow-hidden bg-accent-subtle shadow-lg ring-4 ring-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <SmartImage
                      src="/image.png"
                      alt="Bogi"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <div className="font-bold text-text-primary text-xl">Bogi Horvath</div>
                    <div className="text-sm text-text-muted font-medium">Strategic Transformation Expert</div>
                  </div>
                </div>
                <motion.a
                  href="#contact"
                  className="bg-accent text-white px-10 py-5 rounded-2xl font-extrabold shadow-lg shadow-accent/30"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discuss This Article
                </motion.a>
              </AnimatedSection>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <section id="blog" className="py-24 bg-bg-secondary min-h-screen overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Insights & Case Studies</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Thoughts from the <span className="italic text-accent">Field</span>
            </h2>
            <p className="text-text-secondary text-lg md:text-xl">Real-world case studies and insights into process optimization, digital transformation, and strategic leadership.</p>
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" staggerDelay={0.1}>
          {POSTS.map((post) => (
            <StaggerItem key={post.id} animation="fadeUp">
              <motion.div
                className="group bg-white rounded-[40px] overflow-hidden shadow-md border border-slate-100 flex flex-col h-full"
                whileHover={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  y: -12
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="h-64 overflow-hidden relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full"
                  >
                    <SmartImage
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-6 text-[11px] font-bold uppercase tracking-widest">
                    <motion.span
                      className="text-accent bg-accent-subtle px-3 py-1.5 rounded-full"
                      whileHover={{ backgroundColor: 'rgb(75, 104, 233)', color: 'white' }}
                    >
                      {post.category}
                    </motion.span>
                    <span className="text-text-muted">{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4 leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 flex-grow line-clamp-4">
                    {post.summary}
                  </p>
                  <motion.a
                    href={`#blog/${post.id}`}
                    className="inline-flex items-center gap-2 font-extrabold text-text-primary hover:text-accent transition-colors mt-auto group/link"
                    whileHover={{ x: 5 }}
                  >
                    Read Full Article <i className="fas fa-chevron-right text-xs transition-transform"></i>
                  </motion.a>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Blog;
