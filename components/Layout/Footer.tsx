import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f1a] py-16 text-slate-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <motion.div
            className="flex justify-center gap-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/boglarka-paczari-horvath/', label: 'LinkedIn' },
              { icon: 'far fa-envelope', href: 'mailto:horvath.boglarka@hotmail.com', label: 'Email' },
              { icon: 'far fa-file-alt', href: './Bogi_CV.pdf', label: 'Download CV' }
            ].map((social, idx) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-accent-light transition-all flex items-center justify-center w-14 h-14 bg-white/5 rounded-2xl border border-white/5 hover:border-accent/30"
                aria-label={social.label}
                whileHover={{ y: -8, scale: 1.1, backgroundColor: 'rgba(75, 104, 233, 0.1)' }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <i className={social.icon}></i>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-base font-medium text-slate-400">&copy; {currentYear} Boglarka Paczari-Horvath.</p>
            <p className="text-sm mt-3 opacity-60 uppercase tracking-[0.3em] font-bold">Process Transformation Expert</p>
            <div className="mt-8 pt-8 border-t border-white/5 w-64 mx-auto">
              <p className="text-[10px] uppercase tracking-widest leading-loose">
                Designed & Built with <i className="fas fa-heart text-accent mx-1"></i> 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;