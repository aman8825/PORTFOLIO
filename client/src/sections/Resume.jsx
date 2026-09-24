import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { FADE_UP, STAGGER_CONTAINER } from '../animations/variants';
import { useProfile } from '../context/ProfileContext';

export const ResumeSection = () => {
  const { profile } = useProfile();
  const resumeUrl = profile?.resume?.url || '/resume.pdf';

  return (
    <section id="resume" className="py-24 relative overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* CTA and Description */}
            <motion.div variants={FADE_UP} className="space-y-6">
              <SectionHeader 
                title="Resume" 
                description="Review my full professional background, education, and technical expertise." 
              />
              <Text className="text-primary/80 max-w-md">
                Looking for a detailed breakdown of my experience, skills, and projects? You can view my complete professional resume online or download a copy for your records.
              </Text>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  as="a" 
                  href={resumeUrl} 
                  download={profile?.resume?.fileName || "Aman_Kumar_Resume.pdf"}
                  className="group flex items-center gap-2"
                  aria-label="Download Resume"
                >
                  <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  Download PDF
                </Button>
                
                <Button 
                  as="a" 
                  href={resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="group flex items-center gap-2"
                  aria-label="Open Resume in new tab"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Open in Browser
                </Button>
              </div>
            </motion.div>

            {/* Visual Preview Area */}
            <motion.div variants={FADE_UP} className="relative">
              {/* Decorative accent */}
              <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 -z-10" />
              
              <div className="w-full max-w-lg mx-auto overflow-hidden rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-2xl group hover:border-primary/30 transition-all duration-500 hover:shadow-primary/5">
                <img 
                  src="/resume-preview.png" 
                  alt="Resume Preview" 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
