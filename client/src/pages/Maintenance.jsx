import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Wrench, Cpu, Terminal, Sparkles } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Heading, Text } from '../components/ui/Typography';

const FLOATING_ANIMATION = {
  y: ["-10%", "10%"],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  }
};

export const Maintenance = ({ title, message, estimatedReturn }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Floating Ambient Icons */}
      <motion.div animate={FLOATING_ANIMATION} className="absolute top-1/4 left-[20%] text-primary/20 pointer-events-none hidden md:block">
        <Wrench size={48} />
      </motion.div>
      <motion.div animate={{...FLOATING_ANIMATION, transition: { ...FLOATING_ANIMATION.transition, delay: 1, duration: 4 }}} className="absolute bottom-1/4 right-[20%] text-primary/20 pointer-events-none hidden md:block">
        <Cpu size={64} />
      </motion.div>
      <motion.div animate={{...FLOATING_ANIMATION, transition: { ...FLOATING_ANIMATION.transition, delay: 0.5, duration: 3.5 }}} className="absolute top-1/3 right-[25%] text-primary/20 pointer-events-none hidden md:block">
        <Terminal size={40} />
      </motion.div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center max-w-3xl mx-auto"
        >
          {/* Glassmorphic Card Container */}
          <div className="backdrop-blur-xl bg-surface/30 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-3xl p-8 md:p-14 relative overflow-hidden group">
            
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite]" />

            {/* Icon Assembly */}
            <div className="relative mb-10 w-28 h-28 mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="w-full h-full bg-surface/80 border border-primary/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.3)] relative z-10 overflow-hidden backdrop-blur-md">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                >
                  <Settings className="w-14 h-14 text-primary/40" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <Settings className="w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                </motion.div>
                <Sparkles className="absolute top-2 right-2 w-4 h-4 text-primary animate-pulse" />
              </div>
            </div>
            
            {/* Content */}
            <Heading level={1} className="text-4xl md:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white font-bold tracking-tight">
              {title || "System Upgrade"}
            </Heading>
            
            <Text variant="large" className="text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
              {message || "We are engineering a better experience. The portfolio is currently undergoing scheduled maintenance and upgrades."}
            </Text>
            
            {/* Progress/Return indicator */}
            <div className="space-y-4">
              {estimatedReturn && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="px-8 py-4 rounded-2xl bg-black/40 border border-primary/20 inline-flex items-center gap-3 shadow-inner"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                  <Text variant="mono" className="text-sm font-medium tracking-wide">
                    ETA: <span className="text-primary ml-2">{estimatedReturn}</span>
                  </Text>
                </motion.div>
              )}

              {/* Decorative progress bar */}
              <div className="w-full max-w-sm mx-auto h-1.5 bg-black/50 rounded-full overflow-hidden mt-8 border border-white/5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40"
                  animate={{ 
                    x: ["-100%", "100%"] 
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};
