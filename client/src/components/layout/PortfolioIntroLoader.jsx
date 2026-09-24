import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const Particles = ({ count = 25 }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const [particles] = useState(() => 
    Array.from({ length: count }).map(() => ({
      size: Math.random() * 2 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * -20,
    }))
  );

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-primary rounded-full opacity-30"
          style={{ width: p.size, height: p.size, left: p.left, top: p.top }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.1, 0.6, 0.1]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export function PortfolioIntroLoader({ apiReady, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [shouldExit, setShouldExit] = useState(false);
  const [statusText, setStatusText] = useState('INITIALIZING EXPERIENCE');
  const [mousePos, setMousePos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  useEffect(() => {
    if (isTouchDevice || shouldReduceMotion) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice, shouldReduceMotion]);

  useEffect(() => {
    let minTimer;
    let maxTimer;

    const startExitSequence = () => {
      setProgress(100);
      setStatusText('READY');
      setTimeout(() => {
        setShouldExit(true);
      }, shouldReduceMotion ? 50 : 200); 
    };

    minTimer = setTimeout(() => {
      if (apiReady) {
        startExitSequence();
      }
    }, shouldReduceMotion ? 400 : 1650);

    maxTimer = setTimeout(() => {
      startExitSequence();
    }, shouldReduceMotion ? 800 : 3000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [apiReady, shouldReduceMotion]);

  useEffect(() => {
    if (shouldExit) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        const increment = apiReady ? 15 : Math.random() * 5 + 2;
        const newProgress = Math.min(prev + increment, 95);
        
        if (newProgress > 70) {
          setStatusText('LOADING PROFILE');
        } else if (newProgress > 30) {
          setStatusText('LOADING PROJECTS');
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [apiReady, shouldExit]);

  const containerExit = shouldReduceMotion 
    ? { opacity: 0 } 
    : { opacity: 0, y: -30, scale: 1.02, filter: "blur(10px)" };
  
  const containerTransition = shouldReduceMotion 
    ? { duration: 0.3 }
    : { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

  const childTransition = (delay, duration) => shouldReduceMotion 
    ? { duration: 0 }
    : { delay, duration, ease: "easeOut" };

  const sweepVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: [0, 0.8, 0],
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.35 }
    }
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!shouldExit && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={containerExit}
          transition={containerTransition}
        >
          {/* Animated Grid / Technical Background */}
          {!shouldReduceMotion && (
            <motion.div 
              className="absolute inset-0 pointer-events-none opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: 0.15, duration: 1 }}
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
          )}

          {/* Mouse Follow Ambient Glow */}
          {!isTouchDevice && !shouldReduceMotion && (
            <motion.div
              className="absolute pointer-events-none rounded-full blur-[120px] bg-primary/10 w-[600px] h-[600px]"
              animate={{
                x: mousePos.x - 300,
                y: mousePos.y - 300,
              }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
            />
          )}

          <Particles count={25} />

          {/* Central Composition */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-xl px-8 md:px-12">
            
            {/* Light Sweep */}
            {!shouldReduceMotion && (
              <motion.div 
                className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-y-1/2 opacity-0 blur-[1px]"
                variants={sweepVariants}
                initial="hidden"
                animate="visible"
              />
            )}

            {/* Top decorative elements */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={childTransition(1.45, 0.6)}
              className="absolute -top-16 left-6 text-[9px] tracking-widest text-primary-muted font-mono"
            >
              01 / PORTFOLIO
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={childTransition(1.45, 0.6)}
              className="absolute -top-16 right-6 text-[9px] tracking-widest text-primary-muted font-mono"
            >
              BUILD 2026
            </motion.div>

            {/* Name Reveal */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15, filter: "blur(8px)" }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={childTransition(0.5, 0.8)}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-primary mt-8 mb-3 font-display relative z-10"
            >
              AMAN
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0em" }}
              animate={{ opacity: 1, letterSpacing: "0.25em" }}
              transition={childTransition(0.8, 1)}
              className="text-[10px] md:text-xs text-primary-muted uppercase mb-20 font-medium relative z-10"
            >
              Full-Stack Developer
            </motion.div>

            {/* System Status & Progress Area */}
            <div className="w-full flex flex-col items-center gap-3 mt-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={childTransition(1.05, 0.6)}
                className="flex justify-between w-full text-[9px] text-primary-muted tracking-widest font-mono uppercase px-1"
              >
                <span>{statusText}</span>
                <span>{Math.floor(progress)}%</span>
              </motion.div>
              
              {/* Premium Progress Bar */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={childTransition(1.20, 0.6)}
                className="w-full h-[1px] bg-border relative overflow-hidden"
              >
                <motion.div 
                  className="absolute top-0 left-0 bottom-0 bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={shouldReduceMotion ? { duration: 0 } : { ease: "linear", duration: 0.1 }}
                />
                {/* Highlight dot on the edge of the progress bar */}
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute top-1/2 w-1.5 h-1.5 bg-primary rounded-full blur-[2px] -translate-y-1/2 -ml-1"
                    initial={{ left: "0%" }}
                    animate={{ left: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                )}
              </motion.div>
            </div>
            
            {/* Bottom decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={childTransition(1.45, 0.6)}
              className="absolute -bottom-16 text-[9px] tracking-widest text-primary-muted font-mono"
            >
              SYSTEM READY
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
