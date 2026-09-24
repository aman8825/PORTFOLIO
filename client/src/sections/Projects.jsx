import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProjectCard } from '../components/ui/ProjectCard';
import { HorizontalCarousel } from '../components/ui/HorizontalCarousel';
import { FADE_UP, STAGGER_CONTAINER } from '../animations/variants';
import { getProjects } from '../services/api';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        if (res.data.success) {
          // Map MongoDB image object back to imageUrl string for the existing ProjectCard
          // Also map shortDescription to description, and liveDemoUrl to liveUrl
          const mappedProjects = res.data.data.map(p => ({
            ...p,
            imageUrl: p.thumbnailImage?.url || p.imageUrl || "/projects/placeholder.png",
            description: p.shortDescription || p.description,
            liveUrl: p.liveDemoUrl || p.liveUrl
          }));
          setProjects(mappedProjects);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="py-24 text-center text-primary/50">Loading projects...</div>;
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
        >
          <SectionHeader 
            title="Selected Projects" 
            description="Production-grade applications built to solve complex operational challenges." 
          />

          <div className="mt-12">
            <HorizontalCarousel 
              items={projects}
              keyExtractor={(p) => p.slug}
              ariaLabel="Projects carousel"
              renderItem={(project) => (
                <motion.div variants={FADE_UP} className="h-full">
                  <ProjectCard project={project} />
                </motion.div>
              )}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
