import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Web3Forms access key (safe to hardcode - public API key)
    const accessKey = '0909516c-58b1-4bb3-80f4-e6f68f1e68ac';

    // Build submission data for Web3Forms
    const submissionData = {
        access_key: accessKey,
        name: data.name,
        email: data.email,
        message: data.message,
        subject: `New Contact Message from ${data.name}`,
        cc: 'karolypaczari@gmail.com,hbogica1987@gmail.com,info@bogihorvath.com',
        from_name: 'Bogi Horvath Website',
        replyto: data.email
    };

    try {
      // Using Web3Forms - Free, reliable, no verification needed
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (result.success) {
        setFormState('success');
        (e.target as HTMLFormElement).reset();
      } else {
        console.error('Web3Forms error:', result);
        setFormState('error');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setFormState('error');
    }
  };

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
              
              <div className="space-y-8">
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
                  <a href="https://www.linkedin.com/in/boglarka-paczari-horvath/" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-white hover:text-accent-light transition-colors underline decoration-accent/30 underline-offset-8">LinkedIn Profile</a>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent-light text-xl border border-white/10 group-hover:bg-accent group-hover:text-white transition-all">
                    <i className="far fa-file-pdf"></i>
                  </div>
                  <a href="./Bogi_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-white hover:text-accent-light transition-colors underline decoration-accent/30 underline-offset-8">Download Resume</a>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl">
              {formState === 'success' ? (
                <div className="text-center py-10 animate-fadeIn">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h3>
                  <p className="text-text-muted mb-8">Thank you for reaching out. Bogi will get back to you shortly.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-accent font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Web3Forms access key - hardcoded for reliability */}
                  <input type="hidden" name="access_key" value="0909516c-58b1-4bb3-80f4-e6f68f1e68ac" />

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-extrabold text-text-primary mb-2">Send a Message</h3>
                    <p className="text-text-muted text-sm">Start your journey towards operational excellence.</p>
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-text-muted uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-bg-secondary border border-slate-100 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-text-muted uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-bg-secondary border border-slate-100 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-text-muted uppercase tracking-wider mb-2">Your Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={4}
                      placeholder="How can I help your organization?"
                      className="w-full px-6 py-4 rounded-2xl bg-bg-secondary border border-slate-100 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  {formState === 'error' && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm">
                      <p className="font-bold mb-1">Something went wrong.</p>
                      <p>Please try again or <a href="mailto:horvath.boglarka@hotmail.com" className="underline decoration-red-300 underline-offset-2">email me directly</a>.</p>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={formState === 'submitting'}
                    className={`w-full bg-accent hover:bg-accent-dark text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-accent/20 flex items-center justify-center gap-3 ${formState === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                    <i className="fas fa-paper-plane"></i>
                  </button>
                  <p className="text-[11px] text-text-muted mt-6 uppercase tracking-widest font-bold opacity-60 text-center">Responses usually within 24 hours</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;