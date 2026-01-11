import React from 'react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string[];
  icon: string;
  color: string;
}

const POSTS: BlogPost[] = [
  {
    id: 'pega-migration',
    title: 'SAP S/4HANA to PEGA: A Strategic Migration',
    category: 'Case Study',
    date: 'February 15, 2025',
    excerpt: 'Detailed breakdown of a zero-downtime migration at S.W.I.F.T., resulting in 20% productivity gains.',
    icon: 'fa-server',
    color: 'bg-indigo-50',
    content: [
      "The Challenge: S.W.I.F.T. faced a critical need to modernize its order fulfillment architecture. The legacy reliance on disjointed SAP modules and manual E-forms was creating data silos and slowing down transaction velocity.",
      "The Solution: As Functional Lead, I architected the business process transition from SAP S/4HANA to a unified PEGA workflow. This wasn't just a technical 'lift and shift'; it was a complete reimaging of the Opp2Cash value stream.",
      "Key Actions:",
      "• Value Stream Mapping: We identified 14 redundant approval steps that could be automated via PEGA's decisioning engine.",
      "• API Consolidation: Reduced the number of custom API endpoints by 50%, simplifying the maintenance burden and improving system uptime.",
      "• Stakeholder Alignment: Facilitated weekly workshops between the Brussels HQ and remote technical teams to ensure the functional design met real-world needs.",
      "The Outcome: The project went live with zero critical defects. Post-migration metrics showed a 20% increase in order processing speed and a significant reduction in manual data entry errors."
    ]
  },
  {
    id: 'ntt-standardization',
    title: 'Standardizing Opp2Cash at NTT Ltd.',
    category: 'Case Study',
    date: 'January 10, 2025',
    excerpt: 'Harmonizing 12 regional entities into one global standard, saving €500k+ in annual licensing costs.',
    icon: 'fa-globe',
    color: 'bg-emerald-50',
    content: [
      "The Context: Following a major merger, NTT Ltd. was operating with 12 distinct regional variations of the Opportunity-to-Cash (Opp2Cash) process. This fragmentation made global reporting impossible and inflated software licensing costs.",
      "The Strategy: My role was to drive the 'One NTT' standard. This required a delicate balance of diplomatic stakeholder management and ruthless process elimination.",
      "Execution:",
      "• Global Audit: We conducted a comprehensive audit of all regional tools, identifying over €500k in redundant software licenses.",
      "• The 'Golden Path': We defined a single, standard process flow for 80% of standard deals, allowing customization only for complex edge cases.",
      "• Change Champions: We appointed local process owners in each region to champion the new standard and handle local training.",
      "Results: The standardization project delivered the documented €500k savings in the first year alone. More importantly, it enabled the executive team to see real-time, comparable sales data across all regions for the first time."
    ]
  },
  {
    id: 'ai-process-optimization',
    title: 'The Future of Process Optimization: AI-Driven Insights',
    category: 'Technology',
    date: 'March 1, 2025',
    excerpt: 'How Artificial Intelligence is revolutionizing the way we identify bottlenecks and optimize organizational workflows.',
    icon: 'fa-robot',
    color: 'bg-accent-subtle',
    content: [
      "Process optimization has entered a new era. The traditional methods of manual mapping and time studies are being augmented by AI-driven process mining and predictive analytics.",
      "At InnovateIT, we've seen that integrating AI into the Six Sigma toolkit doesn't just speed up data analysis; it uncovers patterns of structural waste that were previously invisible to the human eye.",
      "The key to successful AI implementation in business analysis isn't just about the technology—it's about the prompt engineering and the context. A tool like Microsoft Copilot can draft documentation in seconds, but it requires a human expert to ensure it aligns with strategic goals.",
      "In this article, we explore how to build a resilient AI-augmented workflow that balances automation with human empathy."
    ]
  },
  {
    id: 'change-management-global',
    title: 'Navigating Change Management in Global Teams',
    category: 'Leadership',
    date: 'February 12, 2025',
    excerpt: 'Cultural nuances and time zones shouldn’t stop transformation. Learn the frameworks for leading global shifts.',
    icon: 'fa-globe-americas',
    color: 'bg-blue-50',
    content: [
      "Leading change in a localized environment is challenging; doing it across 12 different time zones and cultural backgrounds is a monumental feat.",
      "During my time at NTT Ltd., harmonizing 12 regional entities into a single standardized value stream required more than just technical skill—it required 'Strategic Empathy'.",
      "We found that 'Extreme Ownership' at a local level, coupled with a transparent global KPI framework, was the winning combination. You cannot mandate change from the top down in a global ICT environment; you must foster it through collaboration.",
      "This post details the 'Change Catalyst' framework I used to secure stakeholder alignment across multiple continents."
    ]
  },
  {
    id: 'kpi-power-frameworks',
    title: 'From Data to Decisions: The Power of KPI Frameworks',
    category: 'Data Strategy',
    date: 'January 25, 2025',
    excerpt: 'Metrics are useless without a framework. Discover how to build dashboards that drive real action.',
    icon: 'fa-chart-pie',
    color: 'bg-slate-100',
    content: [
      "Many organizations suffer from 'Metric Fatigue'. They track hundreds of data points but fail to make meaningful decisions based on them.",
      "A truly effective KPI framework is lean. It focuses on the 'Critical to Quality' (CTQ) metrics that directly impact the customer experience and the bottom line.",
      "At S.W.I.F.T., our focus on API consolidation and order processing velocity required a specialized dashboard that translated technical stability into business value.",
      "I believe every dashboard should answer one simple question: 'So what?'. If a metric doesn't lead to an action, it shouldn't be there."
    ]
  }
];

const Blog: React.FC<{ postId?: string | null }> = ({ postId }) => {
  const selectedPost = POSTS.find(p => p.id === postId);

  if (postId && selectedPost) {
    return (
      <section className="py-24 bg-white animate-fadeIn">
        <div className="container mx-auto px-6 max-w-4xl">
          <a href="#blog" className="inline-flex items-center gap-2 text-accent font-bold mb-10 hover:gap-3 transition-all">
            <i className="fas fa-arrow-left"></i> Back to All Articles
          </a>
          
          <div className="mb-12">
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">{selectedPost.category} — {selectedPost.date}</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-text-primary mb-8 tracking-tight leading-tight">
              {selectedPost.title}
            </h1>
          </div>

          <div className={`${selectedPost.color} w-full h-[300px] md:h-[450px] rounded-[50px] flex items-center justify-center mb-16 shadow-inner`}>
             <i className={`fas ${selectedPost.icon} text-[100px] md:text-[150px] text-accent/20`}></i>
          </div>

          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary text-lg leading-relaxed">
            {selectedPost.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-full overflow-hidden bg-accent-subtle shadow-md">
                  <img src="https://bogihorvath.com/wp-content/uploads/2024/08/image-27.png" alt="Bogi" className="w-full h-full object-cover" />
               </div>
               <div>
                 <div className="font-bold text-text-primary">Bogi Horvath</div>
                 <div className="text-sm text-text-muted">Strategic Transformation Expert</div>
               </div>
             </div>
             <a href="#contact" className="bg-accent text-white px-8 py-4 rounded-2xl font-bold hover:bg-accent-dark transition-all shadow-lg shadow-accent/20">
               Discuss This Topic
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
              <div className={`${post.color} h-56 flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                <i className={`fas ${post.icon} text-6xl text-accent/30`}></i>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-4 text-[11px] font-bold uppercase tracking-widest">
                  <span className="text-accent">{post.category}</span>
                  <span className="text-text-muted">{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4 leading-snug group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>
                <a 
                  href={`#blog/${post.id}`} 
                  className="inline-flex items-center gap-2 font-bold text-text-primary hover:text-accent transition-colors"
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