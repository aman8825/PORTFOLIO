import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Text } from '../components/ui/Typography';
import { Card, CardContent } from '../components/ui/Card';
import { FADE_UP, STAGGER_CONTAINER } from '../animations/variants';
import { GraduationCap, Code, Server, Terminal } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';

export const About = () => {
  const { profile } = useProfile();
  
  return (
    <section id="about" className="py-24 relative">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
        >
          <SectionHeader 
            title="About Me" 
            description="Turning complex problems into seamless digital experiences through full-stack engineering." 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
            {/* Story / Text */}
            <motion.div variants={FADE_UP} className="lg:col-span-7 space-y-6 whitespace-pre-wrap">
              <Text variant="large">
                {profile?.basic?.longBio || "I am a Full-Stack MERN Developer who takes ownership of the entire product lifecycle—from conceptualizing architecture to deploying production-ready applications."}
              </Text>
            </motion.div>

            {/* Quick Facts / Visuals */}
            <motion.div variants={FADE_UP} className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5 flex flex-col justify-center items-center text-center">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4 text-primary">
                    <Code size={20} />
                  </div>
                  <Text variant="mono" className="text-xs uppercase tracking-wider font-semibold mb-1">Frontend</Text>
                  <Text variant="muted" className="text-xs">Interactive UI/UX</Text>
                </CardContent>
              </Card>

              <Card className="p-5 flex flex-col justify-center items-center text-center">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4 text-primary">
                    <Server size={20} />
                  </div>
                  <Text variant="mono" className="text-xs uppercase tracking-wider font-semibold mb-1">Backend</Text>
                  <Text variant="muted" className="text-xs">Scalable APIs</Text>
                </CardContent>
              </Card>

              <Card className="p-5 flex flex-col justify-center items-center text-center">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4 text-primary">
                    <Terminal size={20} />
                  </div>
                  <Text variant="mono" className="text-xs uppercase tracking-wider font-semibold mb-1">Deployment</Text>
                  <Text variant="muted" className="text-xs">Production Ready</Text>
                </CardContent>
              </Card>

              <Card className="p-5 flex flex-col justify-center items-center text-center">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4 text-primary">
                    <GraduationCap size={20} />
                  </div>
                  <Text variant="mono" className="text-xs uppercase tracking-wider font-semibold mb-1">Education</Text>
                  <Text variant="muted" className="text-xs">B.Tech CSE (RGPV)</Text>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
