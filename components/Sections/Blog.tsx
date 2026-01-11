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
    title: 'Navigating the SAP S/4HANA to PEGA Transition',
    category: 'Case Study',
    date: 'February 15, 2025',
    excerpt: 'How to maintain business continuity while migrating complex financial workflows to a modernization-ready architecture.',
    icon: 'fa-project-diagram',
    color: 'bg-accent-subtle',
    content: [
      "In the world of ICT, few projects are as daunting as a legacy ERP migration. When S.W.I.F.T. embarked on the transition from SAP S/4HANA to PEGA, the stakes were high.",
      "The goal was not just to move data, but to re-imagine the entire order fulfillment lifecycle. As the Functional Lead, I focused on several key pillars to ensure success:",
      "1. Value Stream Mapping: We didn't just replicate old processes in the new tool. We stripped them down to their core intent and rebuilt them for speed.",
      "2. API Consolidation: Reducing the number of endpoints by 50% was critical for stability and future maintenance.",
      "3. User Adoption: By involving stakeholders early in the prototyping phase, we saw a 21% increase in initial adoption rates compared to previous rollouts.",
      "The result? A 20% productivity improvement and a more resilient foundation for future scaling."
    ]
  },
  {
    id: 'lean-remote',
    title: 'Mastering Lean Leadership in a Virtual World',
    category: 'Leadership',
    date: 'January 10, 2025',
    excerpt: 'Identifying structural waste is hard enough in an office. Here is how to do it when your team is distributed across three continents.',
    icon: 'fa-laptop-house',
    color: 'bg-blue-50',
    content: [
      "Leading remote teams is no longer a 'nice to have' skill—it's the industry standard. But applying Lean principles virtually requires a different lens.",
      "In my 100% remote roles at NTT and S.W.I.F.T., I discovered that virtual waste is often invisible. It lives in fragmented Slack threads and unnecessary status meetings.",
      "I recommend the 'Digital Gemba Walk'. Instead of physically walking the floor, we use process mining tools and synchronized Miro sessions to map out where time is being lost.",
      "Consistency and transparency are your best friends. By setting clear KPIs and visual management boards, we achieved a 15-20% gain in team velocity without increasing burnout."
    ]
  },
  {
    id: 'ai-in-ba',
    title: 'The AI-Augmented Business Analyst',
    category: 'Technology',
    date: 'December 20, 2024',
    excerpt: 'How LLMs and Microsoft Copilot are redefining what it means to document and analyze business requirements.',
    icon: 'fa-robot',
    color: 'bg-slate-100',
    content: [
      "AI is not coming for your job, but the person using AI might be. In the last year, I've integrated LLMs into my daily BA workflow with staggering results.",
      "From generating initial drafts of User Stories to summarizing hours of stakeholder meetings into actionable requirements, the overhead of documentation has dropped by nearly 40%.",
      "However, the 'human in the loop' is more important than ever. AI can generate text, but it cannot understand the political nuances of a cross-departmental conflict.",
      "At InnovateIT Consulting, we help teams build 'Prompt Libraries' for Six Sigma analysis, ensuring that AI serves as a catalyst for excellence, not a substitute for critical thinking."
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
            <i className="fas fa-arrow-left"></i> Back to Insights
          </a>
          
          <div className="mb-12">
            <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">{selectedPost.category} — {selectedPost.date}</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-text-primary mb-8 tracking-tight leading-tight">
              {selectedPost.title}
            </h1>
          </div>

          <div className={`${selectedPost.color} w-full h-[400px] rounded-[50px] flex items-center justify-center mb-16 shadow-inner`}>
             <i className={`fas ${selectedPost.icon} text-[120px] text-accent/20`}></i>
          </div>

          <div className="prose prose-lg max-w-none space-y-8 text-text-secondary text-lg leading-relaxed">
            {selectedPost.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-full overflow-hidden bg-accent-subtle">
                  <img src="https://bogihorvath.com/wp-content/uploads/2024/08/image-27.png" alt="Bogi" className="w-full h-full object-cover" />
               </div>
               <div>
                 <div className="font-bold text-text-primary">Bogi Horvath</div>
                 <div className="text-sm text-text-muted">Process Transformation Lead</div>
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
    <section id="blog" className="py-24 bg-bg-secondary reveal">
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
                <div className="flex justify-between items-center mb-4">
                  <span className="text-accent text-[11px] font-bold uppercase tracking-widest">{post.category}</span>
                  <span className="text-text-muted text-[11px]">{post.date}</span>
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