import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { FADE_UP } from '../animations/variants';
import { Container } from '../components/ui/Container';
import { Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { useProfile } from '../context/ProfileContext';

export const Footer = () => {
  const { profile } = useProfile();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 border-t border-white/10 bg-black/20 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={FADE_UP}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16"
        >
          {/* Brand & Bio */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
              {profile?.basic?.fullName || 'Aman Kumar'}
            </h3>
            <Text variant="muted" className="max-w-xs">
              {profile?.basic?.shortBio || "Building exceptional digital experiences with modern web technologies. Let's create something amazing together."}
            </Text>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#about" className="text-gray-400 hover:text-primary transition-colors w-fit">About</a>
              <a href="#projects" className="text-gray-400 hover:text-primary transition-colors w-fit">Projects</a>
              <a href="#experience" className="text-gray-400 hover:text-primary transition-colors w-fit">Experience</a>
              <a href="#contact" className="text-gray-400 hover:text-primary transition-colors w-fit">Contact</a>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {profile?.socialLinks?.map(link => {
                let Icon = Mail; // Fallback
                const p = link.platform.toLowerCase();
                if (p === 'github') Icon = FaGithub;
                else if (p === 'linkedin') Icon = FaLinkedin;
                else if (p === 'twitter' || p === 'x') Icon = FaTwitter;
                else if (p === 'whatsapp') Icon = FaWhatsapp;

                return (
                  <Button 
                    key={link.platform}
                    as="a" 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300" 
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                );
              })}
              
              {(!profile?.socialLinks || profile.socialLinks.length === 0) && profile?.contact?.email && (
                <Button as="a" href={`mailto:${profile.contact.email}`} variant="ghost" size="icon" className="rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={FADE_UP}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4"
        >
          <Text variant="muted" className="text-sm">
            © {currentYear} {profile?.basic?.fullName || 'Aman Kumar'}. All rights reserved.
          </Text>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-gray-400 hover:text-primary"
          >
            Back to top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </Container>
    </footer>
  );
};
