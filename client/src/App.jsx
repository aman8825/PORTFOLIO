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
import Blog from './pages/Blog';
import ArticleView from './pages/ArticleView';
import SEO from './components/SEO';

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : '59 130 246';
};

const MainLayout = ({ settings }) => (
  <>
    <SEO seoSettings={settings} />
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

import RecruiterLayout from './pages/Recruiter';

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
          const fetchedSettings = res.data.data;
          setSettings(fetchedSettings);
          
          // Apply custom theming dynamically
          if (fetchedSettings.themePrimaryColor) {
            document.documentElement.style.setProperty('--color-primary', fetchedSettings.themePrimaryColor);
            document.documentElement.style.setProperty('--color-primary-rgb', hexToRgb(fetchedSettings.themePrimaryColor));
          }
          if (fetchedSettings.themeSecondaryColor) {
            document.documentElement.style.setProperty('--color-secondary', fetchedSettings.themeSecondaryColor);
          }
          if (fetchedSettings.themeFontFamily) {
            document.documentElement.style.setProperty('--font-sans', `"${fetchedSettings.themeFontFamily}", sans-serif`);
            
            const font = fetchedSettings.themeFontFamily;
            if (font && !['Inter', 'Space Grotesk'].includes(font)) {
              const link = document.createElement('link');
              link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@400;500;600;700&display=swap`;
              link.rel = 'stylesheet';
              document.head.appendChild(link);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setApiReady(true);
      }
    };
    fetchSettings();

    // Track page view
    import('./services/api').then(({ trackAnalyticsEvent }) => {
      trackAnalyticsEvent({ eventType: 'page_view' }).catch(console.error);
    });
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
              <Route path="/" element={<MainLayout settings={settings} />} />
              <Route path="/recruiter" element={<RecruiterLayout settings={settings} />} />
              <Route path="/project/:slug" element={<CaseStudy />} />
              <Route path="/blog" element={
                <>
                  <SEO seoSettings={settings} />
                  <Navbar />
                  <Blog />
                  <Footer />
                </>
              } />
              <Route path="/blog/:slug" element={
                <>
                  <SEO seoSettings={settings} />
                  <Navbar />
                  <ArticleView />
                  <Footer />
                </>
              } />
            </Routes>
          )}
        </motion.div>
      )}
    </ProfileProvider>
  );
}

export default App;
