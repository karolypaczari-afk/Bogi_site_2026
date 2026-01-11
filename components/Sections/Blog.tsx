import React from 'react';
import SmartImage from '../UI/SmartImage';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string; // Quick summary at the beginning
  content: string[]; // Lines of text; use '#' for headers, '•' for list items
  icon: string;
  color: string;
}

const POSTS: BlogPost[] = [
  {
    id: 'pega-migration',
    title: 'SAP S/4HANA to PEGA: A Strategic Migration',
    category: 'Case Study',
    date: 'February 15, 2025',
    summary: 'A deep dive into the migration of critical financial workflows from a legacy SAP environment to a modern PEGA architecture. Key outcomes included a 20% increase in productivity and a 50% reduction in API complexity.',
    icon: 'fa-server',
    color: 'bg-indigo-50',
    content: [
      "# The Challenge: Legacy Complexity",
      "S.W.I.F.T. is the backbone of global financial messaging. However, the internal order fulfillment architecture was relying on disjointed SAP modules and manual E-forms. This created significant data silos, slowed down transaction velocity, and increased the risk of human error.",
      "The goal was not just to move data, but to re-imagine the entire order fulfillment lifecycle. The mandate was clear: Modernize without disrupting the global financial network.",
      "# The Solution: Architecture & Process Redesign",
      "As Functional Lead, I architected the business process transition from SAP S/4HANA to a unified PEGA workflow. This wasn't just a technical 'lift and shift'; it was a complete reimaging of the Opp2Cash value stream.",
      "We focused on three core pillars:",
      "• Value Stream Mapping: We identified 14 redundant approval steps that could be automated via PEGA's decisioning engine.",
      "• API Consolidation: We reduced the number of custom API endpoints by 50%, simplifying the maintenance burden and improving system uptime.",
      "• Stakeholder Alignment: Facilitated weekly workshops between the Brussels HQ and remote technical teams to ensure the functional design met real-world needs.",
      "# The Outcome: Zero Defects",
      "The project went live with zero critical defects—a rarity in migrations of this scale. Post-migration metrics showed a 20% increase in order processing speed and a significant reduction in manual data entry errors. The new system now supports dynamic scaling, allowing S.W.I.F.T. to handle peak transaction volumes with ease."
    ]
  },
  {
    id: 'ntt-standardization',
    title: 'Standardizing Opp2Cash at NTT Ltd.',
    category: 'Case Study',
    date: 'January 10, 2025',
    summary: 'How we harmonized 12 disparate regional entities into a single "One NTT" global standard, saving over €500k in annual licensing costs and enabling real-time global reporting.',
    icon: 'fa-globe',
    color: 'bg-emerald-50',
    content: [
      "# The Context: A Merger of Giants",
      "Following a major merger, NTT Ltd. was operating with 12 distinct regional variations of the Opportunity-to-Cash (Opp2Cash) process. Each region had its own tools, its own approval thresholds, and its own way of defining 'revenue'. This fragmentation made global reporting impossible and inflated software licensing costs.",
      "# The Strategy: The Golden Path",
      "My role was to drive the 'One NTT' standard. This required a delicate balance of diplomatic stakeholder management and ruthless process elimination.",
      "We executed a three-phase strategy:",
      "• Global Audit: We conducted a comprehensive audit of all regional tools, identifying over €500k in redundant software licenses that could be retired immediately.",
      "• The 'Golden Path': We defined a single, standard process flow for 80% of standard deals, allowing customization only for complex edge cases.",
      "• Change Champions: We appointed local process owners in each region to champion the new standard and handle local training, ensuring cultural buy-in.",
      "# Results: Unified Visibility",
      "The standardization project delivered the documented €500k savings in the first year alone. More importantly, it enabled the executive team to see real-time, comparable sales data across all regions for the first time. The 'One NTT' process is now the backbone of the company's global sales operations."
    ]
  },
  {
    id: 'ai-process-optimization',
    title: 'The Future of Process Optimization: AI-Driven Insights',
    category: 'Technology',
    date: 'March 1, 2025',
    summary: 'Artificial Intelligence is moving beyond buzzwords. This article explores how AI-driven process mining and LLMs like Microsoft Copilot are revolutionizing the Six Sigma toolkit.',
    icon: 'fa-robot',
    color: 'bg-accent-subtle',
    content: [
      "# Beyond the Hype",
      "Process optimization has entered a new era. The traditional methods of manual mapping and time studies are being augmented by AI-driven process mining and predictive analytics. It is no longer about just finding where the bottleneck is; it is about predicting where the bottleneck will be next week.",
      "# AI in Six Sigma",
      "At InnovateIT, we've seen that integrating AI into the Six Sigma toolkit doesn't just speed up data analysis; it uncovers patterns of structural waste that were previously invisible to the human eye. For example, AI can analyze email timestamps and slack activity (anonymized) to identify communication latency between departments.",
      "# The Copilot Advantage",
      "The key to successful AI implementation in business analysis isn't just about the technology—it's about the prompt engineering and the context. A tool like Microsoft Copilot can draft documentation in seconds, but it requires a human expert to ensure it aligns with strategic goals.",
      "• Documentation: Automated drafting of User Stories reduced BA overhead by 40%.",
      "• Analysis: Rapid synthesis of stakeholder interview notes into coherent requirements.",
      "• Validation: Automated checking of requirements against regulatory compliance rules.",
      "# The Human Element",
      "Despite the power of AI, the human element remains supreme. AI cannot negotiate with a stakeholder who is afraid of losing their job to a new process. That requires empathy, strategy, and leadership."
    ]
  },
  {
    id: 'change-management-global',
    title: 'Navigating Change Management in Global Teams',
    category: 'Leadership',
    date: 'February 12, 2025',
    summary: 'Leading transformation across 12 time zones requires more than just a Gantt chart. It requires "Strategic Empathy" and a framework for cultural alignment.',
    icon: 'fa-globe-americas',
    color: 'bg-blue-50',
    content: [
      "# The Global Challenge",
      "Leading change in a localized environment is challenging; doing it across 12 different time zones and cultural backgrounds is a monumental feat. What works in London might fail in Tokyo or Sao Paulo due to implicit cultural norms.",
      "# Strategic Empathy",
      "During my time at NTT Ltd., harmonizing 12 regional entities into a single standardized value stream required more than just technical skill—it required 'Strategic Empathy'. This means understanding the local pressures and incentives that drive behavior.",
      "# The Framework",
      "We found that 'Extreme Ownership' at a local level, coupled with a transparent global KPI framework, was the winning combination.",
      "• Transparency: We created a public dashboard showing adoption rates by region. No shaming, just data.",
      "• Local Ownership: We didn't fly in 'fixers'. We empowered local leaders to own the transition.",
      "• Feedback Loops: We established a 24-hour turnaround on feedback for the new process, building trust that central HQ was listening.",
      "You cannot mandate change from the top down in a global ICT environment; you must foster it through collaboration."
    ]
  },
  {
    id: 'kpi-power-frameworks',
    title: 'From Data to Decisions: The Power of KPI Frameworks',
    category: 'Data Strategy',
    date: 'January 25, 2025',
    summary: 'Stop tracking "Vanity Metrics". Learn how to build a Lean KPI framework that focuses on Critical to Quality (CTQ) measures that drive actual business value.',
    icon: 'fa-chart-pie',
    color: 'bg-slate-100',
    content: [
      "# The Metric Fatigue",
      "Many organizations suffer from 'Metric Fatigue'. They track hundreds of data points—website hits, ticket volumes, email counts—but fail to make meaningful decisions based on them. Data without context is just noise.",
      "# Critical to Quality (CTQ)",
      "A truly effective KPI framework is lean. It focuses on the 'Critical to Quality' (CTQ) metrics that directly impact the customer experience and the bottom line. If a metric doesn't lead to a potential action, it shouldn't be on the executive dashboard.",
      "# The S.W.I.F.T. Approach",
      "At S.W.I.F.T., our focus on API consolidation and order processing velocity required a specialized dashboard that translated technical stability into business value.",
      "• Instead of 'Uptime', we measured 'Successful Transaction Rate'.",
      "• Instead of 'Ticket Volume', we measured 'First Time Resolution'.",
      "• Instead of 'Hours Worked', we measured 'Value Delivered'.",
      "I believe every dashboard should answer one simple question: 'So what?'. If you look at a chart and don't know what to do next, the chart is broken."
    ]
  }
];

const Blog: React.FC<{ postId?: string | null }> = ({ postId }) => {
  const selectedPost = POSTS.find(p => p.id === postId);

  if (postId && selectedPost) {
    return (
      <section className="py-24 bg-white animate-fadeIn min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          <a href="#blog" className="inline-flex items-center gap-2 text-accent font-bold mb-10 hover:gap-3 transition-all">
            <i className="fas fa-arrow-left"></i> Back to All Articles
          </a>
          
          <div className="mb-12">
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">{selectedPost.category} — {selectedPost.date}</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 tracking-tight leading-tight">
              {selectedPost.title}
            </h1>
          </div>

          <div className={`${selectedPost.color} w-full h-[300px] md:h-[400px] rounded-[50px] flex items-center justify-center mb-12 shadow-inner border border-black/5`}>
             <i className={`fas ${selectedPost.icon} text-[100px] md:text-[150px] text-accent/20`}></i>
          </div>

          {/* Quick Summary Box */}
          <div className="bg-bg-secondary p-8 rounded-3xl border-l-4 border-accent mb-12">
            <h3 className="text-accent font-bold uppercase tracking-widest text-xs mb-3">Quick Summary</h3>
            <p className="text-lg font-medium text-text-primary italic leading-relaxed">
              {selectedPost.summary}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none space-y-6 text-text-secondary text-lg leading-relaxed">
            {selectedPost.content.map((line, i) => {
              if (line.startsWith('# ')) {
                return <h2 key={i} className="font-serif text-3xl font-bold text-text-primary mt-12 mb-6">{line.replace('# ', '')}</h2>;
              }
              if (line.startsWith('• ')) {
                return (
                  <div key={i} className="flex gap-4 items-start pl-4">
                    <span className="text-accent mt-1.5 text-xs"><i className="fas fa-circle"></i></span>
                    <p className="m-0">{line.replace('• ', '')}</p>
                  </div>
                );
              }
              return <p key={i}>{line}</p>;
            })}
          </div>

          {/* Author Bio Footer */}
          <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-full overflow-hidden bg-accent-subtle shadow-md ring-2 ring-white">
                  <SmartImage 
                    src="./image.png" 
                    alt="Bogi" 
                    fallbackPrompt="Professional corporate headshot of a confident woman with reddish-blonde hair, wearing a blue blazer, high quality"
                    className="w-full h-full object-cover" 
                  />
               </div>
               <div>
                 <div className="font-bold text-text-primary text-lg">Bogi Horvath</div>
                 <div className="text-sm text-text-muted">Strategic Transformation Expert</div>
               </div>
             </div>
             <a href="#contact" className="bg-accent text-white px-8 py-4 rounded-2xl font-bold hover:bg-accent-dark transition-all shadow-lg shadow-accent/20">
               Discuss This Article
             </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 bg-bg-secondary min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">Insights & Expertise</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-6">Thoughts from the <span className="italic">Field</span></h2>
          <p className="text-text-secondary text-lg">Detailed deep-dives into process optimization, digital migration, and strategic leadership.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {POSTS.map((post) => (
            <div key={post.id} className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-50 flex flex-col h-full">
              <div className={`${post.color} h-64 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <i className={`fas ${post.icon} text-7xl text-accent/30`}></i>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-6 text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-accent bg-accent-subtle px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-text-muted">{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4 leading-snug group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                  {post.summary}
                </p>
                <a 
                  href={`#blog/${post.id}`} 
                  className="inline-flex items-center gap-2 font-bold text-text-primary hover:text-accent transition-colors mt-auto"
                >
                  Read Full Article <i className="fas fa-chevron-right text-xs"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;