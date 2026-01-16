import React, { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Add a subject line for the email and CC both gmail addresses
    const submissionData = {
      ...data,
      _subject: `New Consultation Request from ${data.name}`,
      _template: 'table',
      _cc: 'karolypaczari@gmail.com,hbogica1987@gmail.com',
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden animate-reveal active">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-text-secondary hover:bg-slate-200 transition-colors z-10"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="p-8 md:p-10">
          {formState === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                <i className="fas fa-check"></i>
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary mb-2">Request Received!</h3>
              <p className="text-text-secondary mb-8">I have received your consultation request and will confirm the time via email shortly.</p>
              <button onClick={onClose} className="bg-accent text-white px-8 py-3 rounded-xl font-bold">Close</button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">Free Consultation</span>
                <h3 className="font-serif text-3xl font-bold text-text-primary">Let's Schedule a Chat</h3>
                <p className="text-text-secondary mt-2 text-sm">Fill out the details below to request a 30-minute introductory call.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="_captcha" value="false" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">Name</label>
                    <input required name="name" type="text" className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-sm" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">Email</label>
                    <input required name="email" type="email" className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-sm" placeholder="email@company.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">Topic</label>
                  <select name="topic" className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-sm">
                    <option value="Process Optimization">Process Optimization</option>
                    <option value="Digital Migration">Digital Migration (SAP/PEGA)</option>
                    <option value="Team Training">Team Training / Leadership</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">Preferred Date & Time</label>
                  <input required name="datetime" type="datetime-local" className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-sm text-text-secondary" />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5">Brief Context</label>
                  <textarea required name="message" rows={3} className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all text-sm resize-none" placeholder="What specific challenge are you facing?"></textarea>
                </div>

                {formState === 'error' && (
                   <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg">Submission failed. Please <a href="mailto:horvath.boglarka@hotmail.com" className="underline">email directly</a>.</p>
                )}

                <button 
                  type="submit" 
                  disabled={formState === 'submitting'}
                  className="w-full bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:-translate-y-1 shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-4"
                >
                  {formState === 'submitting' ? 'Scheduling...' : 'Confirm Request'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;