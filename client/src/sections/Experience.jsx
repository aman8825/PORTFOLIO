import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Code2, Rocket, Wrench, ArrowRight } from 'lucide-react';

import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Heading, Text } from '../components/ui/Typography';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { FADE_UP, STAGGER_CONTAINER } from '../animations/variants';
import { getExperiences } from '../services/api';

const WORKFLOW_STEPS = [
  {
    id: "01",
    title: "Requirements",
    icon: <ClipboardList className="w-6 h-6 text-primary" />,
    description: "Collaborated directly with the clinic to understand their operational needs, focusing on appointment scheduling and patient communication."
  },
  {
    id: "02",
    title: "Development",
    icon: <Code2 className="w-6 h-6 text-primary" />,
    description: "Engineered a highly responsive React interface. Integrated Firebase for real-time appointment enquiries, patient feedback collection, and promotional content administration."
  },
  {
    id: "03",
    title: "Deployment",
    icon: <Rocket className="w-6 h-6 text-primary" />,
    description: "Configured the custom domain, optimized the application for SEO, and deployed the production build to a robust hosting environment."
  },
  {
    id: "04",
    title: "Maintenance",
    icon: <Wrench className="w-6 h-6 text-primary" />,
    description: "Provided comprehensive post-launch support, monitoring application stability, and maintaining the content management systems."
  }
];

export const Experience = () => {
  const [experienceData, setExperienceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await getExperiences();
        if (res.data.success && res.data.data.length > 0) {
          const enabledExps = res.data.data.filter(e => e.enabled !== false).sort((a, b) => a.order - b.order);
          if (enabledExps.length > 0) {
            setExperienceData(enabledExps[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load experience:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  if (loading) {
    return <div className="py-24 text-center text-primary/50">Loading experience...</div>;
  }

  if (!experienceData) return null;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -z-10 pointer-events-none" />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
        >
          <SectionHeader 
            title="Professional Experience" 
            description="A case study demonstrating end-to-end project ownership and execution." 
          />

          <motion.div variants={FADE_UP} className="mt-12">
            <Card className="bg-surface/50 border-border/50">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
                  <div>
                    <Badge variant="glow" className="mb-4">Case Study</Badge>
                    <Heading level={3} className="mb-2">
                      {experienceData.role}
                    </Heading>
                    <Text variant="large" className="text-primary/70">
                      {experienceData.company} • {experienceData.startDate}
                    </Text>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:max-w-[300px] justify-start md:justify-end">
                    {(experienceData.technologies || []).map(tech => (
                      <Badge key={tech} variant="outline" className="bg-background/50">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 mb-16">
                  <Text variant="large">
                    {experienceData.description}
                  </Text>
                </div>

                {/* Workflow Visualization */}
                <div className="relative">
                  {/* Connection Line (Desktop) */}
                  <div className="hidden lg:block absolute top-8 left-12 right-12 h-[1px] bg-border z-0" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    {WORKFLOW_STEPS.map((step, index) => (
                      <motion.div 
                        key={step.id}
                        variants={FADE_UP}
                        className="relative flex flex-col group"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-sm bg-background border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-sm">
                            {step.icon}
                          </div>
                          {index < WORKFLOW_STEPS.length - 1 && (
                            <ArrowRight className="hidden md:block lg:hidden w-5 h-5 text-border" />
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Heading level={6} className="text-sm font-mono text-primary/40 uppercase tracking-widest">
                            Phase {step.id}
                          </Heading>
                          <Heading level={4} className="text-xl">
                            {step.title}
                          </Heading>
                          <Text variant="muted" className="text-sm">
                            {step.description}
                          </Text>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
};
