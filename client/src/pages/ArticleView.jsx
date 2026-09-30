import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';
import { getArticleBySlug } from '../services/api';
import { Container } from '../components/ui/Container';
import { Heading } from '../components/ui/Typography';
import SEO from '../components/SEO';
import { FADE_UP } from '../animations/variants';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

  const calculateReadTime = (content) => {
    const text = content.replace(/<[^>]+>/g, '');
    const wpm = 200;
    const minutes = Math.ceil(text.split(/\s+/).length / wpm);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[20%] w-[50%] h-[30%] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <SEO 
        title={article.title} 
        description={article.content.replace(/<[^>]+>/g, '').substring(0, 160)}
        image={article.coverImage}
        type="article"
      />
      
      {/* Dynamic Header */}
      <div className="relative pt-40 pb-20 border-b border-border/50 bg-surface/30 backdrop-blur-sm">
        <Container className="relative z-10">
          <motion.div initial="hidden" animate="visible" variants={FADE_UP} className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate('/blog')}
              className="group flex items-center text-sm font-medium text-primary/60 hover:text-primary transition-colors mb-10 focus:outline-none"
            >
              <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-2 transition-transform duration-300" />
              Back to Journal
            </button>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {article.tags?.map(tag => (
                <span key={tag} className="text-xs font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>

            <Heading level={1} className="mb-8 leading-tight lg:text-6xl tracking-tight text-white">
              {article.title}
            </Heading>

            <div className="flex items-center gap-8 text-sm font-medium text-primary/60 border-t border-border/50 pt-8 mt-4">
              <div className="flex items-center gap-2.5">
                <Calendar size={18} className="text-primary/80" />
                <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                <span>{calculateReadTime(article.content)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Eye size={18} className="text-primary/80" />
                <span>{article.views} views</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>

      <Container className="mt-16">
        <motion.div initial="hidden" animate="visible" variants={FADE_UP} className="max-w-4xl mx-auto">
          {article.coverImage && (
            <div className="w-full aspect-[21/9] overflow-hidden rounded-3xl mb-16 shadow-2xl shadow-black/50 border border-border/50">
              <img 
                src={article.coverImage} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl prose-p:leading-relaxed prose-p:text-slate-300 prose-strong:text-white prose-code:text-primary/80 prose-li:text-slate-300">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-xl my-6 !bg-[#0d1117] border border-slate-800"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-slate-800 text-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  )
                },
                table({children}) {
                  return <div className="overflow-x-auto my-8"><table className="min-w-full text-sm text-left">{children}</table></div>
                },
                th({children}) {
                  return <th className="px-4 py-3 bg-slate-800/50 text-white font-semibold border-b border-slate-700">{children}</th>
                },
                td({children}) {
                  return <td className="px-4 py-3 border-b border-slate-800 text-slate-300">{children}</td>
                },
                img({src, alt}) {
                  return <img src={src} alt={alt} className="w-full rounded-2xl shadow-xl my-8 border border-slate-800" loading="lazy" />
                },
                a({href, children}) {
                  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{children}</a>
                }
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default ArticleView;
