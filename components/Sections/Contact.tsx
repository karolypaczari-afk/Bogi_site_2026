import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../Motion/AnimatedSection';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const submissionData = {
      access_key: '0909516c-58b1-4bb3-80f4-e6f68f1e68ac',
      name: data.name,
      email: data.email,
      message: data.message,
      subject: `New Contact Message from ${data.name}`,
      cc: 'karolypaczari@gmail.com,hbogica1987@gmail.com,info@bogihorvath.com',
      from_name: 'Bogi Horvath Website',
      replyto: data.email
    };

    try {
      // 1. Send email (Supabase disabled for this push)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (result.success) {
        setFormState('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormState('error');
      }
    } catch (err) {
      console.error(err);
      setFormState('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <div className="bg-bg-dark rounded-[60px] p-8 md:p-16 lg:p-24 overflow-hidden relative shadow-2xl">
            {/* Accent Blobs */}
            <motion.div
              className="absolute -top-20 -right-20 w-80 h-80 bg-accent opacity-20 blur-[100px] rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400 opacity-20 blur-[100px] rounded-full"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <motion.span
                  className="text-accent-light font-extrabold uppercase tracking-[0.3em] text-xs mb-6 block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  Ready to Scale?
                </motion.span>
                <motion.h2
                  className="font-serif text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Let's Transform Your <span className="text-accent-light">Operations</span>
                </motion.h2>
                <motion.p
                  className="text-slate-400 text-lg mb-12 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  I'm currently open to selective consulting engagements and strategic leadership roles. If you're looking for high-impact process optimization, let's start with a conversation.
                </motion.p>

                <div className="space-y-8">
                  {[
                    { icon: 'far fa-envelope', label: 'horvath.boglarka@hotmail.com', href: 'mailto:horvath.boglarka@hotmail.com' },
                    { icon: 'fab fa-linkedin-in', label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/boglarka-paczari-horvath/' },
                    { icon: 'far fa-file-pdf', label: 'Download Resume', href: './Bogi_CV.pdf' }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-6 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <motion.div
                        className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent-light text-xl border border-white/10 group-hover:bg-accent group-hover:text-white transition-all shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <i className={item.icon}></i>
                      </motion.div>
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-white hover:text-accent-light transition-colors underline decoration-accent/30 underline-offset-8">
                        {item.label}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      className="text-center py-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring' }}
                      >
                        <i className="fas fa-check"></i>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h3>
                      <p className="text-text-muted mb-8">Thank you for reaching out. Bogi will get back to you shortly.</p>
                      <button onClick={() => setFormState('idle')} className="text-accent font-bold hover:underline">
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-extrabold text-text-primary mb-2">Send a Message</h3>
                        <p className="text-text-muted text-sm">Start your journey towards operational excellence.</p>
                      </div>

                      <div className="space-y-4">
                        {[
                          { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                          { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@example.com' }
                        ].map((field, idx) => (
                          <motion.div key={field.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}>
                            <label className="block text-[12px] font-bold text-text-muted uppercase tracking-wider mb-2">{field.label}</label>
                            <input required name={field.name} type={field.type} placeholder={field.placeholder} className="w-full px-6 py-4 rounded-2xl bg-bg-secondary border border-slate-100 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all" />
                          </motion.div>
                        ))}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                          <label className="block text-[12px] font-bold text-text-muted uppercase tracking-wider mb-2">Your Message</label>
                          <textarea required name="message" rows={4} placeholder="How can I help your organization?" className="w-full px-6 py-4 rounded-2xl bg-bg-secondary border border-slate-100 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all resize-none"></textarea>
                        </motion.div>
                      </div>

                      {formState === 'error' && (
                        <motion.div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                          <p className="font-bold mb-1">Something went wrong.</p>
                          <p>Please try again or <a href="mailto:horvath.boglarka@hotmail.com" className="underline">email directly</a>.</p>
                        </motion.div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="w-full bg-accent hover:bg-accent-dark text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-accent/20 flex items-center justify-center gap-3"
                        whileHover={{ y: -5, boxShadow: '0 20px 30px -5px rgba(75, 104, 233, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                        <motion.i
                          className="fas fa-paper-plane"
                          animate={formState === 'submitting' ? { x: [0, 5, 0] } : {}}
                          transition={{ repeat: Infinity }}
                        />
                      </motion.button>
                      <p className="text-[11px] text-text-muted mt-6 uppercase tracking-widest font-bold opacity-60 text-center">Responses usually within 24 hours</p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contact;