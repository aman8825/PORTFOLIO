import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FADE_UP, STAGGER_CONTAINER } from './animations/variants';
import { getPublicSettings } from './services/api';
import { ProfileProvider } from './context/ProfileContext';

import { Navbar } from './components/layout/Navbar';
import { Container } from './components/ui/Container';
import { Text } from './components/ui/Typography';
import { Button } from './components/ui/Button';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Achievements } from './sections/Achievements';
import { ResumeSection } from './sections/Resume';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Maintenance } from './pages/Maintenance';
import { PortfolioIntroLoader } from './components/layout/PortfolioIntroLoader';
import PortfolioAssistant from './components/PortfolioAssistant/PortfolioAssistant';
import CaseStudy from './pages/CaseStudy';


const MainLayout = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Achievements />
    <ResumeSection />
    
    <div id="demo-sections" className="pb-0">
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
    <Footer />
    <PortfolioAssistant />
  </>
);

function App() {
  const [settings, setSettings] = useState(null);
  const [apiReady, setApiReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getPublicSettings();
        if (res?.data?.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setApiReady(true);
      }
    };
    fetchSettings();
  }, []);

  const showMaintenance = settings?.maintenanceMode;
  const showPrivate = settings?.portfolioPublic === false;
  const showIntro = !introComplete && !showMaintenance && !showPrivate;

  return (
    <ProfileProvider>
      {showIntro && (
        <PortfolioIntroLoader 
          apiReady={apiReady} 
          onComplete={() => setIntroComplete(true)} 
        />
      )}

      {(!showIntro || introComplete) && apiReady && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.8, ease: "easeOut" }}
        >
          {showMaintenance ? (
            <Maintenance 
              title={settings.maintenanceTitle}
              message={settings.maintenanceMessage}
              estimatedReturn={settings.maintenanceEstimatedReturn}
            />
          ) : showPrivate ? (
            <Maintenance 
              title="Portfolio Private"
              message="This portfolio is currently unavailable to public visitors. Please check back later."
              estimatedReturn={null}
            />
          ) : (
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/project/:slug" element={<CaseStudy />} />
            </Routes>
          )}
        </motion.div>
      )}
    </ProfileProvider>
  );
}

export default App;
