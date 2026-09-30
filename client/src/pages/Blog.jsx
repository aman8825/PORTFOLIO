import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getArticles } from '../services/api';
import { Container } from '../components/ui/Container';
import { Heading, Text } from '../components/ui/Typography';
import { Card, CardContent } from '../components/ui/Card';
import SEO from '../components/SEO';
import { FADE_UP, STAGGER_CONTAINER } from '../animations/variants';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticles = async () => {
      try {
        const res = await getArticles();
        if (res.data.success) {
          setArticles(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const calculateReadTime = (content) => {
    const text = content.replace(/<[^>]+>/g, '');
    const wpm = 200;
    const minutes = Math.ceil(text.split(/\s+/).length / wpm);
    return `${minutes} min read`;
  };

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const standardArticles = articles.length > 1 ? articles.slice(1) : [];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <SEO 
        title="Blog & Articles | Professional Insights" 
        description="Read my latest articles, tutorials, and development logs." 
      />
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={STAGGER_CONTAINER}
          className="space-y-16"
        >
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-16 relative">
            <motion.div variants={FADE_UP}>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium tracking-wide mb-6">
                Insights & Writing
              </div>
              <Heading level={1} className="mb-6 tracking-tight text-5xl md:text-6xl lg:text-7xl">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Journal</span>
              </Heading>
              <Text className="text-xl text-primary/60 max-w-2xl mx-auto leading-relaxed">
                Thoughts, deep dives, and tutorials about software engineering, system design, and modern web technologies.
              </Text>
            </motion.div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-pulse flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                <div className="h-4 w-48 bg-surface rounded-full"></div>
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-32 bg-surface/30 backdrop-blur-md rounded-3xl border border-border/50">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-10 h-10 bg-primary/20 rounded-md rotate-45" />
              </div>
              <Heading level={3} className="mb-4 text-white">No articles published yet</Heading>
              <Text className="text-primary/60">I'm currently writing some interesting content. Check back soon!</Text>
            </div>
          ) : (
            <div className="space-y-16">
              
              {/* Featured Article */}
              {featuredArticle && (
                <motion.div variants={FADE_UP} className="w-full">
                  <Link to={`/blog/${featuredArticle.slug}`} className="group block outline-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-surface/20 backdrop-blur-sm p-4 lg:p-8 rounded-3xl border border-border/50 transition-all duration-500 hover:bg-surface/40 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5">
                      <div className="w-full aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl relative shadow-lg">
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                        <img 
                          src={featuredArticle.coverImage || '/placeholder-blog.jpg'} 
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                      <div className="flex flex-col justify-center py-4 lg:py-8 lg:pr-8">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-primary text-background rounded-full">
                            Featured
                          </span>
                          {featuredArticle.tags?.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs font-medium uppercase tracking-wider text-primary/70">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-primary transition-colors duration-300">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-primary/70 text-lg mb-8 line-clamp-3 leading-relaxed">
                          {featuredArticle.content.replace(/<[^>]+>/g, '').substring(0, 250)}...
                        </p>
                        <div className="flex items-center gap-6 mt-auto text-sm font-medium text-primary/50">
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                            {new Date(featuredArticle.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                            {calculateReadTime(featuredArticle.content)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Standard Articles Grid */}
              {standardArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {standardArticles.map((article) => (
                    <motion.div key={article._id} variants={FADE_UP}>
                      <Link to={`/blog/${article.slug}`} className="block h-full group outline-none">
                        <Card className="h-full bg-surface/30 backdrop-blur-sm border-border/50 hover:bg-surface/50 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 overflow-hidden flex flex-col rounded-3xl">
                          <div className="w-full h-56 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent z-10"></div>
                            <img 
                              src={article.coverImage || '/placeholder-blog.jpg'} 
                              alt={article.title}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute top-4 left-4 z-20 flex gap-2">
                              {article.tags?.slice(0, 1).map(tag => (
                                <span key={tag} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-background/80 backdrop-blur-md text-white rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <CardContent className="p-8 flex flex-col flex-grow relative z-20 -mt-6 bg-surface/80 backdrop-blur-md rounded-t-3xl border-t border-white/5">
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                              {article.title}
                            </h3>
                            <p className="text-primary/60 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                              {article.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/50 text-xs font-medium text-primary/50">
                              <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              <span>{calculateReadTime(article.content)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default Blog;
