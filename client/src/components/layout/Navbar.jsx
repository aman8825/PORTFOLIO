import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useActiveSection } from '../../hooks/useActiveSection';
import { NAV_LINKS } from '../../data/navigation';
import { cn } from '../../utils/cn';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { useProfile } from '../../context/ProfileContext';

export const Navbar = () => {
  const { profile } = useProfile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrollPosition();
  
  // Track active section. Strip '#' from hrefs for the hook
  const sectionIds = NAV_LINKS.map(link => link.href);
  const activeSection = useActiveSection(sectionIds);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "py-4 bg-background/80 backdrop-blur-md border-b border-border shadow-sm" 
            : "py-6 bg-transparent border-b border-transparent"
        )}
      >
        <Container className="flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <a 
            href="#top" 
            onClick={(e) => handleScrollTo(e, '#top')}
            className="text-xl font-display font-bold tracking-tight text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm"
            aria-label={`${profile?.basic?.fullName || 'Portfolio'} Home`}
          >
            {profile?.basic?.fullName || 'Aman Kumar'}<span className="text-primary/50">.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors relative rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                    isActive ? "text-primary" : "text-primary/60 hover:text-primary"
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Resume CTA (Desktop) */}
          {profile?.resume?.url && (
            <div className="hidden md:block">
              <Button as="a" href={profile.resume.url} target="_blank" rel="noopener noreferrer" size="sm">
                Resume
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-sm transition-colors"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </Container>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        activeSection={activeSection}
      />
    </>
  );
};
