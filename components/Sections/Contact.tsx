
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="bg-bg-dark rounded-[60px] p-8 md:p-16 lg:p-24 overflow-hidden relative shadow-2xl">
          {/* Accent Blobs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent opacity-20 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400 opacity-20 blur-[100px] rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
              <span className="text-accent-light font-extrabold uppercase tracking-[0.3em] text-xs mb-6 block">Ready to Scale?</span>
              <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1]">Let's Transform Your <span className="text-accent-light">Operations</span></h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                I'm currently open to selective consulting engagements and strategic leadership roles. If you're looking for high-impact process optimization, let's start with a conversation.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent-light text-xl border border-white/10 group-hover:bg-accent group-hover:text-white transition-all">
                    <i className="far fa-envelope"></i>
                  </div>
                  <a href="mailto:horvath.boglarka@hotmail.com" className="text-xl font-semibold text-white hover:text-accent-light transition-colors underline decoration-accent/30 underline-offset-8">horvath.boglarka@hotmail.com</a>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent-light text-xl border border-white/10 group-hover:bg-accent group-hover:text-white transition-all">
                    <i className="fab fa-linkedin-in"></i>
                  </div>
                  <a href="https://www.linkedin.com/in/boglarka-paczari-horvath/" target="_blank" className="text-xl font-semibold text-white hover:text-accent-light transition-colors underline decoration-accent/30 underline-offset-8">LinkedIn Profile</a>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl">
              <div className="text-center">
                <div className="w-20 h-20 bg-accent-subtle text-accent rounded-3xl flex items-center justify-center text-3xl mx-auto mb-8">
                  <i className="far fa-calendar-check"></i>
                </div>
                <h3 className="text-2xl font-extrabold text-text-primary mb-4">Book a Discovery Call</h3>
                <p className="text-text-muted mb-8 font-medium">
                  A free 20-minute discussion to evaluate your process bottlenecks and identify immediate ROI opportunities.
                </p>
                <a 
                  href="mailto:horvath.boglarka@hotmail.com?subject=Process%20Optimization%20Inquiry" 
                  className="w-full inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-dark text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-accent/20"
                >
                  Schedule Your Free Call
                  <i className="fas fa-arrow-right"></i>
                </a>
                <p className="text-[11px] text-text-muted mt-6 uppercase tracking-widest font-bold opacity-60">Usually responds within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
