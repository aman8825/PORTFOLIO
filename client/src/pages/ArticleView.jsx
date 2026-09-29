import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';
import { getArticleBySlug } from '../services/api';
import { Container } from '../components/ui/Container';
import { Heading } from '../components/ui/Typography';
import SEO from '../components/SEO';
import { FADE_UP } from '../animations/variants';

const ArticleView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      try {
        const res = await getArticleBySlug(slug);
        if (res.data.success) {
          setArticle(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load article:', err);
        setError('Article not found or unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 flex justify-center">
        <div className="animate-pulse h-8 w-32 bg-slate-800 rounded"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background pt-32 flex flex-col items-center justify-center">
        <Heading level={2} className="mb-4">Article Not Found</Heading>
        <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO 
        title={article.title} 
        description={article.content.replace(/<[^>]+>/g, '').substring(0, 160)}
        image={article.coverImage}
        type="article"
      />
      
      {/* Dynamic Header */}
      <div className="relative pt-32 pb-16 border-b border-border/50 bg-surface/30">
        <Container className="relative z-10">
          <motion.div initial="hidden" animate="visible" variants={FADE_UP} className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate('/blog')}
              className="group flex items-center text-sm text-slate-400 hover:text-primary transition-colors mb-8 focus:outline-none"
            >
              <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Articles
            </button>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags?.map(tag => (
                <span key={tag} className="text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {tag}
                </span>
              ))}
            </div>

            <Heading level={1} className="mb-6 leading-tight lg:text-5xl">
              {article.title}
            </Heading>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{article.views} views</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>

      <Container className="mt-12">
        <motion.div initial="hidden" animate="visible" variants={FADE_UP} className="max-w-4xl mx-auto">
          {article.coverImage && (
            <div className="w-full max-h-[500px] overflow-hidden rounded-2xl mb-12 shadow-2xl">
              <img 
                src={article.coverImage} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>
      </Container>
    </div>
  );
};

export default ArticleView;
