import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { FADE_UP, STAGGER_CONTAINER } from '../animations/variants';
import { getSkills } from '../services/api';

export const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await getSkills();
        if (res.data.success) {
          const skills = res.data.data.filter(s => s.enabled !== false);
          
          // Group by category
          const grouped = {};
          skills.forEach(skill => {
            const cat = skill.category === 'Tools' ? 'Tools & Utilities' : skill.category;
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push({ name: skill.name, order: skill.order || 0 });
          });
          
          const formattedCategories = Object.keys(grouped).map(cat => ({
            title: cat,
            skills: grouped[cat].sort((a, b) => a.order - b.order).map(s => s.name)
          }));
          
          setSkillCategories(formattedCategories);
        }
      } catch (err) {
        console.error("Failed to load skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return <div className="py-24 text-center text-primary/50">Loading skills...</div>;
  }

  return (
    <section id="skills" className="py-24 bg-surface/30">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
        >
          <SectionHeader 
            title="Technical Arsenal" 
            description="A comprehensive toolkit focused on the MERN ecosystem to deliver end-to-end solutions." 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {skillCategories.map((category) => (
              <motion.div key={category.title} variants={FADE_UP}>
                <Card className="h-full">
                  <CardHeader className="mb-6">
                    <CardTitle>{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(skill => (
                        <Badge key={skill} variant="outline" className="text-sm py-1 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
