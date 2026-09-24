import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Server, Database, Code2, Globe } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Heading, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FADE_UP, STAGGER_CONTAINER, FADE_IN } from '../animations/variants';
import { useProfile } from '../context/ProfileContext';

export const Hero = () => {
  const { profile } = useProfile();
  
  const handleScrollTo = (href) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="top" 
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
        {/* Soft radial glow to anchor the layout */}
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-70" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-50" />
      </div>

      <Container className="relative z-10 flex-grow flex flex-col justify-center">
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Main Content Area - Left/Center */}
          <div className="lg:col-span-8 flex flex-col items-start space-y-8">
            <motion.div variants={FADE_UP}>
              <Badge variant="glow" className="mb-2 uppercase tracking-widest text-xs px-3 py-1">
                {profile?.basic?.headline || 'Full-Stack Developer'}
              </Badge>
            </motion.div>

            <motion.div variants={FADE_UP} className="space-y-6">
              <Heading level={1} className="text-hero-heading tracking-tighter max-w-[12ch]">
                {profile?.basic?.fullName || 'Your Name'}<span className="text-primary/50">.</span>
              </Heading>
              
              <Text variant="large" className="text-large-heading font-display font-medium max-w-2xl text-primary/80 mt-6 leading-[1.2]">
                {profile?.basic?.shortBio || 'I build production-ready web applications from idea to deployment.'}
              </Text>
            </motion.div>

            <motion.div variants={FADE_UP} className="flex flex-wrap gap-4 items-center">
              <Button 
                size="lg" 
                onClick={() => handleScrollTo('#projects')}
                className="group px-8"
              >
                View Projects
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => handleScrollTo('#contact')}
                className="px-8"
              >
                Contact Me
              </Button>

              <div className="flex items-center space-x-2 ml-4">
                {profile?.socialLinks?.map(link => {
                  if (link.platform.toLowerCase() === 'github') {
                    return (
                      <Button 
                        key={link.platform}
                        as="a" 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        variant="ghost" 
                        size="icon" 
                        aria-label="GitHub Profile"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      </Button>
                    );
                  }
                  if (link.platform.toLowerCase() === 'linkedin') {
                    return (
                      <Button 
                        key={link.platform}
                        as="a" 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        variant="ghost" 
                        size="icon"
                        aria-label="LinkedIn Profile"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                      </Button>
                    );
                  }
                  return null;
                })}
              </div>
            </motion.div>
          </div>

          {/* Right/Side area - Technical capability indicators */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-center space-y-6">
            <motion.div variants={FADE_IN} className="w-full max-w-xs space-y-6 pl-8 border-l border-border/50">
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-surface border border-border rounded-sm">
                  <Code2 className="w-5 h-5 text-primary/80" />
                </div>
                <div>
                  <Heading level={6} className="text-sm uppercase tracking-wider mb-1">Frontend</Heading>
                  <Text variant="muted" className="text-xs">React, Next.js, UI/UX</Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-surface border border-border rounded-sm">
                  <Server className="w-5 h-5 text-primary/80" />
                </div>
                <div>
                  <Heading level={6} className="text-sm uppercase tracking-wider mb-1">Backend & API</Heading>
                  <Text variant="muted" className="text-xs">Node.js, Express, REST</Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-surface border border-border rounded-sm">
                  <Database className="w-5 h-5 text-primary/80" />
                </div>
                <div>
                  <Heading level={6} className="text-sm uppercase tracking-wider mb-1">Database</Heading>
                  <Text variant="muted" className="text-xs">MongoDB, Mongoose</Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-surface border border-border rounded-sm">
                  <Globe className="w-5 h-5 text-primary/80" />
                </div>
                <div>
                  <Heading level={6} className="text-sm uppercase tracking-wider mb-1">Deployment</Heading>
                  <Text variant="muted" className="text-xs">CI/CD, Scalable Architecture</Text>
                </div>
              </div>
              
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden"
      >
        <Text variant="muted" className="text-[10px] uppercase tracking-widest">Scroll to explore</Text>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
};
