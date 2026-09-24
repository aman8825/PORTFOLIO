import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Heading, Text } from './Typography';
import { Badge } from './Badge';
import { Button } from './Button';

export const ProjectCard = ({ project }) => {
  const { title, category, description, technologies, features, githubUrl, liveUrl, slug } = project;

  return (
    <Card className="group overflow-hidden border border-border/50 bg-background/50 hover:bg-surface/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 flex flex-col h-full">
      {/* Visual Preview Area */}
      <div className="relative h-64 w-full bg-surface border-b border-border/50 overflow-hidden flex items-center justify-center">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={title} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
            <motion.div 
              className="relative z-10 p-6 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-700 ease-out flex flex-col items-center justify-center text-center max-w-[80%]"
            >
              <Text variant="mono" className="text-primary/60 mb-2 uppercase text-xs">{category}</Text>
              <Heading level={4} className="mt-1">
                {title}
              </Heading>
            </motion.div>
          </>
        )}
      </div>

      <CardContent className="p-8 flex flex-col flex-grow">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map(tech => (
              <Badge key={tech} variant="outline" className="group-hover:border-primary/40 transition-colors">
                {tech}
              </Badge>
            ))}
          </div>
          <Text className="text-primary/80 mb-6">{description}</Text>
        </div>

        {/* Key Features */}
        <div className="mb-8 flex-grow">
          <Heading level={6} className="text-xs uppercase tracking-widest text-primary/40 mb-3 font-mono">
            Key Functionality
          </Heading>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary/50 mt-1 flex-shrink-0">•</span>
                <Text variant="muted" className="text-sm">{feature}</Text>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mt-auto pt-6 border-t border-border/30">
          {liveUrl && (
            <Button as="a" href={liveUrl} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-2">
              Live Demo
              <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            </Button>
          )}
          {githubUrl && (
            <Button as="a" href={githubUrl} target="_blank" rel="noopener noreferrer" variant="secondary" className="group/btn flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:scale-110 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              Source
            </Button>
          )}
          
          {project.caseStudy?.enabled && (
            <Button as={Link} to={`/project/${slug}`} variant="ghost" className="ml-auto group/case flex items-center gap-2 text-primary/70 hover:text-primary">
              Case Study
              <ArrowRight className="w-4 h-4 group-hover/case:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
