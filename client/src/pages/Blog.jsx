import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getArticles } from '../services/api';
import { Container } from '../components/ui/Container';
import { Heading, Text } from '../components/ui/Typography';
import { Card, CardBody } from '../components/ui/Card';
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

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <SEO 
        title="Blog & Articles" 
        description="Read my latest articles, tutorials, and development logs." 
      />
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={STAGGER_CONTAINER}
          className="space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div variants={FADE_UP}>
              <Heading level={1} className="mb-6">
                Blog & <span className="text-primary">Articles</span>
              </Heading>
              <Text className="text-lg text-slate-400">
                Thoughts, tutorials, and insights about software development, design, and technology.
              </Text>
            </motion.div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-32 bg-slate-800 rounded mb-4"></div>
                <div className="h-4 w-64 bg-slate-800 rounded"></div>
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-2xl border border-border">
              <Heading level={3} className="mb-4">No articles published yet.</Heading>
              <Text>Check back later for new content!</Text>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <motion.div key={article._id} variants={FADE_UP}>
                  <Link to={`/blog/${article.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl">
                    <Card className="h-full group hover:border-primary/50 transition-colors duration-300">
                      {article.coverImage && (
                        <div className="w-full h-48 overflow-hidden rounded-t-2xl">
                          <img 
                            src={article.coverImage} 
                            alt={article.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <CardBody className="p-6 flex flex-col h-full">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags?.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">
                          {/* Strip HTML tags for preview if content has HTML */}
                          {article.content.replace(/<[^>]+>/g, '').substring(0, 150)}...
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 text-xs text-slate-500">
                          <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>{article.views} views</span>
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default Blog;
