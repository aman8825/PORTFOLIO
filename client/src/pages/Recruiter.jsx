import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../sections/Footer';
import { Hero } from '../sections/Hero';
import { Skills } from '../sections/Skills';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Achievements } from '../sections/Achievements';
import { ResumeSection } from '../sections/Resume';
import { Contact } from '../sections/Contact';
import SEO from '../components/SEO';
import { Container } from '../components/ui/Container';
import { motion } from 'framer-motion';
import { STAGGER_CONTAINER } from '../animations/variants';
import { Navigate } from 'react-router-dom';

const RecruiterLayout = ({ settings }) => {
  if (!settings?.recruiterViewEnabled) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SEO title="Recruiter Summary - Portfolio" description="A concise overview of my professional experience, skills, and projects." />
      <Navbar />
      <div className="pt-24 pb-8 bg-black/40 border-b border-white/10">
        <Container>
          <h1 className="text-3xl font-bold text-white mb-2">Recruiter Overview</h1>
          <p className="text-gray-400">A concise summary of my professional profile.</p>
        </Container>
      </div>
      
      <Hero />
      
      {settings.recruiterShowSkills !== false && <Skills />}
      {settings.recruiterShowExperience !== false && <Experience />}
      {settings.recruiterShowProjects !== false && <Projects />}
      {settings.recruiterShowAchievements !== false && <Achievements />}
      {settings.recruiterShowResume !== false && <ResumeSection />}
      
      {settings.recruiterShowContact !== false && (
        <div className="pb-0">
          <Container>
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={STAGGER_CONTAINER}
              className="space-y-16 mt-20"
            >
              <Contact />
            </motion.div>
          </Container>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default RecruiterLayout;
