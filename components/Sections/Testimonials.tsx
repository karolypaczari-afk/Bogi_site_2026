import React, { useState } from 'react';
import SmartImage from '../UI/SmartImage';

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
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      summary: "Relentlessly progressing against all odds on complex projects requiring coordination across departments.",
      fullReview: "I had the pleasure of working with Bogi during a critical transformation phase at NTT Ltd. Her ability to drive complex projects forward, even when faced with significant organizational challenges, is truly remarkable. Bogi excels at coordinating across multiple departments and stakeholders, ensuring alignment and progress even in the most challenging circumstances. Her relentless dedication to achieving results, combined with her strategic thinking and exceptional communication skills, makes her an invaluable asset to any organization. I would highly recommend Bogi for senior leadership roles in process transformation and business analysis.",
      author: "Miquel Herrero",
      role: "VP Global Standards",
      company: "NTT Ltd.",
      relationship: "Miquel managed Bogi directly",
      image: "/miquel-herrero.png",
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
    {
      summary: "Outstanding SAP S/4HANA migration leadership. Delivered 20% productivity gains while managing complex stakeholder landscape.",
      fullReview: "Bogi led our SAP S/4HANA migration with exceptional skill and professionalism. Managing a project of this complexity requires not just technical expertise but also superior stakeholder management—both of which Bogi demonstrated in abundance. The 20% productivity gains we achieved post-migration exceeded our expectations. Her ability to bridge the gap between technical teams and business stakeholders, while maintaining momentum on a tight timeline, was instrumental to our success. Any organization undertaking digital transformation would benefit immensely from Bogi's expertise and leadership.",
      author: "Marcus Weber",
      role: "IT Program Director",
      company: "S.W.I.F.T.",
      relationship: "Marcus worked with Bogi on the same team",
      image: "/miquel-herrero.png",
      featured: false
    },
    {
      summary: "Drove €500k+ in cost savings through smart process consolidation. Strategic thinker with execution excellence.",
      fullReview: "Bogi's contribution to our cost optimization initiative was transformative. She identified and executed a process consolidation strategy that delivered over €500,000 in documented savings within the first year. What sets Bogi apart is her ability to think strategically while maintaining focus on execution details. She doesn't just identify opportunities—she builds business cases, secures stakeholder buy-in, and drives implementation through to measurable results. Her expertise in Lean Six Sigma methodologies, combined with her commercial acumen, makes her an exceptional transformation leader. I would hire Bogi again without hesitation.",
      author: "Rachel Morrison",
      role: "VP Business Operations",
      company: "NTT Ltd.",
      relationship: "Rachel managed Bogi indirectly",
      image: "/grace-chan.png",
      featured: false
    },
    {
      summary: "Best remote team lead I've worked with. Excellent at managing distributed teams across 12 time zones.",
      fullReview: "Leading remote teams across 12 time zones is incredibly challenging, but Bogi makes it look effortless. Her communication skills, cultural sensitivity, and ability to maintain team cohesion despite geographical distance are exceptional. She establishes clear processes, maintains transparency through data-driven reporting, and ensures every team member feels valued and heard. The 'One NTT' standardization program she led required coordinating stakeholders across EMEA, Americas, and APAC—she delivered flawlessly. Bogi is the gold standard for remote leadership in global transformation programs.",
      author: "Hiroshi Tanaka",
      role: "Regional Process Owner",
      company: "NTT Ltd.",
      relationship: "Hiroshi worked with Bogi on the same team",
      image: "/peter-ujfalusi.png",
      featured: false
    },
    {
      summary: "Exceptional PEGA workflow design and adoption strategy. Increased our adoption rate by 21% in just 2 months.",
      fullReview: "Bogi's expertise in PEGA workflow design and her strategic approach to driving adoption transformed our Deal Management process. When she joined the project, adoption was stagnating at 14%. Through targeted engagement, knowledge base development, and personalized support for high-potential teams, she increased adoption to 21% within just two months. Her user-centric approach to change management, combined with her technical understanding of PEGA capabilities, makes her uniquely effective at driving digital transformation. I learned a tremendous amount working with Bogi and would welcome the opportunity to collaborate with her again.",
      author: "Emma Thompson",
      role: "Agile Transformation Lead",
      company: "British Telecom",
      relationship: "Emma managed Bogi directly",
      image: "/saimah-shakeel.png",
      featured: false
    }
  ];

  const displayedTestimonials = showAll ? testimonials : testimonials.filter(t => t.featured);

  return (
    <section id="references" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-xs">LinkedIn Recommendations</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 mb-6">
            Trusted by <span className="text-accent italic">Global Leaders</span>
          </h2>
          <p className="text-text-secondary text-lg">
            Verified recommendations from VPs, Directors, and Senior Leaders across S.W.I.F.T., NTT Ltd., and British Telecom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white to-bg-secondary p-8 rounded-[35px] relative border-2 border-slate-100 hover:border-accent/30 hover:shadow-2xl transition-all group flex flex-col"
            >
              <div className="font-serif text-7xl text-accent/20 absolute top-4 left-6 leading-none select-none">"</div>

              <p className="text-text-secondary italic text-[15px] mb-6 relative z-10 leading-relaxed group-hover:text-text-primary transition-colors flex-grow">
                {expandedId === idx ? item.fullReview : item.summary}
              </p>

              <button
                onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                className="text-accent font-bold text-sm hover:text-accent-dark transition-colors mb-6 flex items-center gap-2 group/btn"
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
              </button>

              <div className="flex items-start gap-4 mt-auto pt-6 border-t border-slate-200">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg shadow-accent/10 border-2 border-white relative flex-shrink-0">
                  <SmartImage
                    src={item.image}
                    alt={item.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-[15px] mb-1">{item.author}</h4>
                  <p className="text-text-muted text-[13px] leading-tight mb-1">{item.role}</p>
                  <p className="text-accent text-[12px] font-bold">{item.company}</p>
                  <p className="text-text-muted text-[11px] italic mt-1">{item.relationship}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-accent hover:bg-accent-dark text-white px-10 py-5 rounded-2xl font-extrabold text-lg inline-flex items-center justify-center gap-3 transition-all shadow-xl shadow-accent/40 transform hover:-translate-y-1.5 active:scale-95"
            >
              <i className="fas fa-plus-circle"></i>
              View All {testimonials.length} Recommendations
            </button>
          </div>
        )}

        {showAll && (
          <div className="text-center">
            <button
              onClick={() => {
                setShowAll(false);
                setExpandedId(null);
                window.scrollTo({ top: document.getElementById('references')?.offsetTop || 0, behavior: 'smooth' });
              }}
              className="bg-white hover:bg-bg-secondary text-text-primary px-10 py-5 rounded-2xl font-extrabold text-lg inline-flex items-center justify-center gap-3 border-2 border-slate-100 transition-all shadow-sm"
            >
              <i className="fas fa-chevron-up"></i>
              Show Top 6 Only
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
