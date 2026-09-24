import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../data/navigation';
import { cn } from '../../utils/cn';

export const MobileMenu = ({ isOpen, onClose, activeSection }) => {
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    onClose();
    
    // Add small delay to let menu close animation start
    setTimeout(() => {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-20 left-4 right-4 bg-surface border border-border rounded-sm shadow-2xl p-6 z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={cn(
                      "text-lg font-medium py-2 transition-colors",
                      isActive ? "text-primary" : "text-primary/60 hover:text-primary"
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              
              <div className="pt-4 border-t border-border mt-2">
                <a 
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-primary text-background font-medium rounded-sm py-3 transition-colors hover:bg-primary/90"
                >
                  View Resume
                </a>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
