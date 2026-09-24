import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Heading, Text } from '../components/ui/Typography';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { HorizontalCarousel } from '../components/ui/HorizontalCarousel';
import { FADE_UP, STAGGER_CONTAINER } from '../animations/variants';
import { getAchievements } from '../services/api';

const AchievementCard = ({ achievement }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const hasCertificate = !!achievement.certificateImage;

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  const handleMouseEnter = () => {
    if (hasCertificate && !isTouchDevice) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasCertificate && !isTouchDevice) {
      setIsFlipped(false);
    }
  };

  const handleClick = () => {
    if (hasCertificate && isTouchDevice) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleKeyDown = (e) => {
    if (hasCertificate && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div 
      className="h-full relative [perspective:1000px] outline-none rounded-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={hasCertificate ? 0 : undefined}
      role={hasCertificate ? 'button' : undefined}
      aria-label={hasCertificate ? `View certificate for ${achievement.title}` : undefined}
    >
      <div 
        className={`w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)] motion-reduce:[transform:none]' : ''}`}
      >
        {/* Front Face */}
        <div 
          className={`w-full h-full [backface-visibility:hidden] ${isFlipped ? 'motion-reduce:opacity-0 motion-reduce:pointer-events-none' : 'motion-reduce:opacity-100'} transition-opacity duration-700`}
        >
          <Card className="h-full group overflow-hidden border border-border/50 bg-background hover:bg-surface/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
            <CardContent className="p-8 flex flex-col h-full relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
              
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-transform duration-500 shadow-sm">
                  {achievement.icon}
                </div>
                <Text variant="mono" className="text-xs text-primary/40 uppercase tracking-wider bg-surface/50 px-3 py-1 rounded-full border border-border/50">
                  {achievement.date}
                </Text>
              </div>

              <div className="mb-6 flex-grow">
                <Heading level={4} className="mb-2">
                  {achievement.title}
                </Heading>
                <Text className="text-primary/70 mb-4 font-medium">
                  {achievement.issuer}
                </Text>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="glow" className="bg-primary/10 text-primary border-primary/20">
                    {achievement.badge}
                  </Badge>
                  {achievement.score && (
                    <Badge variant="outline" className="font-mono">
                      Score: {achievement.score}
                    </Badge>
                  )}
                </div>
                
                <Text variant="muted" className="text-sm">
                  {achievement.description}
                </Text>
              </div>

              {hasCertificate && (
                 <div className="mt-auto pt-4 flex justify-end">
                   <span className="text-xs font-mono text-primary/50 flex items-center gap-1 group-hover:text-primary transition-colors">
                     View Certificate <span className="opacity-50">→</span>
                   </span>
                 </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Back Face */}
        {hasCertificate && (
          <div 
            className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] motion-reduce:[transform:none] ${isFlipped ? 'motion-reduce:opacity-100' : 'motion-reduce:opacity-0 motion-reduce:pointer-events-none'} transition-opacity duration-700`}
          >
            <Card className="h-full overflow-hidden border border-border/50 bg-background flex flex-col p-2 hover:border-primary/30 transition-colors duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="flex-grow relative rounded-md overflow-hidden bg-surface/10">
                <img 
                  src={achievement.certificateImage} 
                  alt={`${achievement.title} Certificate`} 
                  className="absolute inset-0 w-full h-full object-contain p-2"
                  loading="lazy"
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await getAchievements();
        if (res.data.success) {
          const formatted = res.data.data
            .filter(a => a.enabled !== false)
            .sort((a, b) => a.order - b.order)
            .map((a, i) => ({
              id: a._id || i,
              title: a.title,
              issuer: a.issuer,
              date: a.date,
              badge: a.badge,
              score: a.score,
              icon: i % 2 === 0 ? <Award className="w-6 h-6 text-primary" /> : <Trophy className="w-6 h-6 text-primary" />,
              description: a.description,
              certificateImage: a.certificateImage?.url || a.certificateUrl || ""
            }));
          setAchievements(formatted);
        }
      } catch (err) {
        console.error("Failed to load achievements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading) {
    return <div className="py-24 text-center text-primary/50">Loading achievements...</div>;
  }

  return (
    <section id="achievements" className="py-24 bg-surface/30 relative overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
        >
          <SectionHeader 
            title="Achievements & Certifications" 
            description="Verified recognition demonstrating technical proficiency and competitive excellence." 
          />

          <div className="mt-12">
            <HorizontalCarousel 
              items={achievements}
              keyExtractor={(a) => a.id}
              ariaLabel="Achievements carousel"
              renderItem={(achievement) => (
                <motion.div variants={FADE_UP} className="h-full">
                  <AchievementCard achievement={achievement} />
                </motion.div>
              )}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
