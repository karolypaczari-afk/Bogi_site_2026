import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    { text: "Relentlessly progressing against all odds on complex projects requiring coordination across departments.", author: "Miquel Herrero", role: "VP Global Standards, NTT Ltd.", initials: "MH" },
    { text: "Crucial during immense organizational change. Dedicated professional with clever techniques for process management and measurable benefits.", author: "Mark Shepherd", role: "Global Director, NTT Ltd.", initials: "MS" },
    { text: "Energetic, positive, excellent BA and PM. Clear professional communication and a natural problem solver who brings clarity to chaos.", author: "Justin Strohmenger", role: "Principal IT Solutions Architect", initials: "JS" },
    { text: "Exceptional leadership, adept problem-solving. Can-do attitude and doesn't shy from challenges. A truly reliable partner for transformation.", author: "Saimah Shakeel", role: "Project/Program Management Specialist", initials: "SS" },
    { text: "Patiently worked with globally dispersed SMEs, brokered stakeholder discussions. Attention to detail and organizational skills are second to none.", author: "Grace Chan", role: "Chief of Staff, NTT Ltd.", initials: "GC" },
    { text: "Real team player, deeply collaborative, precise. The best from the BA sphere I've worked with in over a decade of process improvement.", author: "Peter Ujfalusi", role: "Process Design & Improvement, BT", initials: "PU" },
  ];

  return (
    <section id="references" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-xs">Endorsements</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 mb-6">Colleague Perspectives</h2>
          <p className="text-text-secondary text-lg italic">Feedback from leaders and specialists I've partnered with globally.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-bg-secondary p-8 rounded-[35px] relative border border-slate-50 hover:shadow-xl transition-all group">
              <div className="font-serif text-7xl text-accent-subtle absolute top-4 left-6 leading-none select-none opacity-40">"</div>
              <p className="text-text-secondary italic text-[15px] mb-8 relative z-10 leading-relaxed group-hover:text-text-primary transition-colors">
                {item.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-accent/20">
                  {item.initials}
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-[15px]">{item.author}</h4>
                  <p className="text-text-muted text-[13px]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;