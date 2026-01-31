import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const submissionData = {
      ...data,
      _subject: `New Consultation Request from ${data.name}`,
      _template: 'table',
      _cc: 'karolypaczari@gmail.com,hbogica1987@gmail.com,info@bogihorvath.com',
      _replyto: data.email
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/horvath.boglarka@hotmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setFormState('success');
      } else {
        setFormState('error');
      }
    } catch (err) {
      console.error(err);
      setFormState('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden z-[210]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 w-11 h-11 bg-slate-100 rounded-2xl flex items-center justify-center text-text-secondary hover:bg-slate-200 transition-colors z-10"
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fas fa-times text-lg"></i>
            </motion.button>

            <div className="p-10">
              {formState === 'success' ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <i className="fas fa-check"></i>
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-text-primary mb-2">Request Received!</h3>
                  <p className="text-text-secondary mb-8">I have received your consultation request and will confirm the time via email shortly.</p>
                  <motion.button
                    onClick={onClose}
                    className="bg-accent text-white px-10 py-4 rounded-xl font-bold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-10">
                    <motion.span
                      className="text-accent font-bold uppercase tracking-widest text-xs mb-3 block"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      Free Consultation
                    </motion.span>
                    <motion.h3
                      className="font-serif text-3xl font-bold text-text-primary mb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Let's Schedule a Chat
                    </motion.h3>
                    <motion.p
                      className="text-text-secondary text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Fill out the details below to request a 30-minute introductory call.
                    </motion.p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Name</label>
                        <input required name="name" type="text" className="w-full px-5 py-4 rounded-2xl bg-bg-secondary border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all text-sm" placeholder="Your Name" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Email</label>
                        <input required name="email" type="email" className="w-full px-5 py-4 rounded-2xl bg-bg-secondary border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all text-sm" placeholder="email@company.com" />
                      </motion.div>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                      <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Topic</label>
                      <select name="topic" className="w-full px-5 py-4 rounded-2xl bg-bg-secondary border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all text-sm">
                        <option value="Process Optimization">Process Optimization</option>
                        <option value="Digital Migration">Digital Migration (SAP/PEGA)</option>
                        <option value="Team Training">Team Training / Leadership</option>
                        <option value="Other">Other Inquiry</option>
                      </select>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                      <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Preferred Date & Time</label>
                      <input required name="datetime" type="datetime-local" className="w-full px-5 py-4 rounded-2xl bg-bg-secondary border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all text-sm text-text-secondary" />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                      <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Brief Context</label>
                      <textarea required name="message" rows={3} className="w-full px-5 py-4 rounded-2xl bg-bg-secondary border border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all text-sm resize-none" placeholder="What specific challenge are you facing?"></textarea>
                    </motion.div>

                    {formState === 'error' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-bold text-center bg-red-50 py-3 rounded-xl">Submission failed. Please <a href="mailto:horvath.boglarka@hotmail.com" className="underline">email directly</a>.</motion.p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full bg-accent hover:bg-accent-dark text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-accent/20 flex items-center justify-center gap-2 mt-4"
                      whileHover={{ y: -5, boxShadow: '0 20px 35px -10px rgba(75, 104, 233, 0.4)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {formState === 'submitting' ? 'Scheduling...' : 'Confirm Request'}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;