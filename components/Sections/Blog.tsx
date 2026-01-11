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