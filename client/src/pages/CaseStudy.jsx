import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { getProjectBySlug } from '../services/api';
import { Container } from '../components/ui/Container';
import { Heading, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CaseStudy() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProjectBySlug(slug);
        if (res.data.success) {
          setProject(res.data.data);
        } else {
          setProject(null);
        }
      } catch (err) {
        console.error("Failed to load project:", err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Text className="text-primary/50 animate-pulse">Loading case study...</Text>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Heading level={2} className="mb-4">Project Not Found</Heading>
        <Text className="text-primary/50 mb-8">The case study you are looking for does not exist or is unpublished.</Text>
        <Button as={Link} to="/">Back to Projects</Button>
      </div>
    );
  }

  const { caseStudy = {}, documents = [], technologies = [] } = project;
  const imageUrl = project.thumbnailImage?.url || project.thumbnailImage || "/projects/placeholder.png";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <Container>
          <div className="flex items-center h-20">
            <Link to="/" className="flex items-center gap-2 text-primary/70 hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Projects</span>
            </Link>
            
            <div className="ml-auto hidden sm:flex items-center gap-4 text-sm text-primary/40 font-mono">
              <Link to="/" className="hover:text-primary/60 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/#projects" className="hover:text-primary/60 transition-colors">Projects</Link>
              <span>/</span>
              <span className="text-primary/70">{project.title}</span>
            </div>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <motion.div initial="hidden" animate="visible" variants={FADE_UP} className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className="border-primary/20 bg-primary/5">{project.category}</Badge>
              {caseStudy.role && <Badge variant="outline" className="border-primary/20">{caseStudy.role}</Badge>}
              {caseStudy.duration && <Badge variant="outline" className="border-primary/20">{caseStudy.duration}</Badge>}
            </div>
            
            <Heading level={1} className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {project.title}
            </Heading>
            
            <Text className="text-xl md:text-2xl text-primary/70 mb-10 leading-relaxed max-w-3xl">
              {caseStudy.summary || project.shortDescription}
            </Text>

            <div className="flex flex-wrap gap-4">
              {project.liveDemoUrl && (
                <Button as="a" href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Live Demo <ExternalLink className="w-4 h-4" />
                </Button>
              )}
              {project.githubUrl && (
                <Button as="a" href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="secondary" className="flex items-center gap-2">
                  <FaGithub className="w-4 h-4" /> View Source
                </Button>
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Main Image */}
      <Container>
        <motion.div initial="hidden" animate="visible" variants={FADE_UP} className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-border/50 relative bg-surface">
          <img src={imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>
      </Container>

      {/* Content Grid */}
      <Container>
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-24">
          
          {/* Main Column */}
          <div className="space-y-16 md:space-y-24">
            
            {/* Overview & Problem */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={FADE_UP}>
              <Heading level={2} className="mb-6 text-2xl md:text-3xl">Overview</Heading>
              <Text className="text-primary/70 text-lg leading-relaxed mb-12 whitespace-pre-line">
                {caseStudy.overview || project.detailedDescription}
              </Text>

              {caseStudy.problem && (
                <>
                  <Heading level={3} className="mb-4 text-xl md:text-2xl mt-12">The Problem</Heading>
                  <Text className="text-primary/70 text-lg leading-relaxed whitespace-pre-line">
                    {caseStudy.problem}
                  </Text>
                </>
              )}
            </motion.div>

            {/* Solution & Architecture */}
            {(caseStudy.solution || caseStudy.architecture) && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={FADE_UP} className="bg-surface/30 border border-border/50 rounded-2xl p-8 md:p-12">
                {caseStudy.solution && (
                  <div className="mb-12">
                    <Heading level={3} className="mb-6 text-xl md:text-2xl text-white">The Solution</Heading>
                    <Text className="text-primary/70 text-lg leading-relaxed whitespace-pre-line">
                      {caseStudy.solution}
                    </Text>
                  </div>
                )}
                
                {caseStudy.architecture && (
                  <div>
                    <Heading level={3} className="mb-6 text-xl md:text-2xl text-white">Architecture</Heading>
                    <Text className="text-primary/70 text-lg leading-relaxed whitespace-pre-line">
                      {caseStudy.architecture}
                    </Text>
                  </div>
                )}
              </motion.div>
            )}

            {/* Implementation Details */}
            {caseStudy.implementation && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={FADE_UP}>
                <Heading level={2} className="mb-6 text-2xl md:text-3xl">Implementation</Heading>
                <Text className="text-primary/70 text-lg leading-relaxed whitespace-pre-line">
                  {caseStudy.implementation}
                </Text>
              </motion.div>
            )}

            {/* Challenges */}
            {caseStudy.challenges?.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={FADE_UP}>
                <Heading level={2} className="mb-8 text-2xl md:text-3xl">Challenges & Learnings</Heading>
                <div className="space-y-8">
                  {caseStudy.challenges.map((challenge, idx) => (
                    <div key={idx} className="border-l-2 border-primary/30 pl-6">
                      <Heading level={4} className="mb-3 text-lg">{challenge.title}</Heading>
                      <Text className="text-primary/60 mb-4 whitespace-pre-line">{challenge.description}</Text>
                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                        <span className="text-xs uppercase tracking-wider text-primary/50 font-mono block mb-2">Solution</span>
                        <Text className="text-primary/80 text-sm whitespace-pre-line">{challenge.solution}</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Outcome */}
            {caseStudy.outcome && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={FADE_UP}>
                <Heading level={2} className="mb-6 text-2xl md:text-3xl">Outcome & Results</Heading>
                <Text className="text-primary/70 text-lg leading-relaxed whitespace-pre-line">
                  {caseStudy.outcome}
                </Text>
              </motion.div>
            )}

          </div>

          {/* Sidebar / Meta Column */}
          <div className="space-y-12">
            
            {/* Tech Stack */}
            {technologies.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP}>
                <Heading level={4} className="mb-6 text-sm uppercase tracking-widest text-primary/50 font-mono">
                  Tech Stack
                </Heading>
                <div className="flex flex-wrap gap-2">
                  {technologies.map(tech => (
                    <Badge key={tech} variant="secondary" className="bg-surface border-border/50 text-primary/80 py-1.5 px-3">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Key Features List */}
            {(caseStudy.features?.length > 0 || project.features?.length > 0) && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP}>
                <Heading level={4} className="mb-6 text-sm uppercase tracking-widest text-primary/50 font-mono">
                  Key Features
                </Heading>
                <ul className="space-y-4">
                  {(caseStudy.features?.length > 0 ? caseStudy.features : project.features.map(f => ({title: f}))).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary/50 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-primary/90 font-medium">{feature.title}</strong>
                        {feature.description && <span className="text-sm text-primary/50 mt-1 block">{feature.description}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Documents */}
            {documents.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP}>
                <Heading level={4} className="mb-6 text-sm uppercase tracking-widest text-primary/50 font-mono">
                  Project Resources
                </Heading>
                <div className="space-y-3">
                  {documents.map((doc, idx) => (
                    <a 
                      key={idx}
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex flex-col p-4 bg-surface/50 hover:bg-surface border border-border/50 rounded-xl transition-all hover:border-primary/30"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 text-primary">
                          <FileText className="w-4 h-4" />
                          <span className="font-medium text-sm">{doc.title}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-primary/30 group-hover:text-primary/70 transition-colors" />
                      </div>
                      <span className="text-xs text-primary/40 font-mono uppercase tracking-wider">{doc.type}</span>
                      {doc.description && <p className="text-sm text-primary/60 mt-3">{doc.description}</p>}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </Container>
      
      {/* Bottom Navigation */}
      <Container>
        <div className="mt-24 md:mt-32 pt-12 border-t border-border/30 flex justify-center">
           <Button as={Link} to="/" variant="outline" className="group flex items-center gap-2 px-8 py-6 rounded-full hover:bg-primary/5 border-primary/20">
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
             Back to Portfolio
           </Button>
        </div>
      </Container>
    </div>
  );
}
