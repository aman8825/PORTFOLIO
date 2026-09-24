import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { askAssistant } from '../../services/api';

const SUGGESTED_QUESTIONS = [
  "What projects has Aman built?",
  "What is Aman's tech stack?",
  "Does Aman have backend experience?",
  "Is Aman available for opportunities?"
];

const PortfolioAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Aman's AI Assistant. Ask me anything about his work, skills, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const question = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setIsLoading(true);

    try {
      const res = await askAssistant({ question });
      if (res.data?.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble answering right now. Please try again." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the server. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedClick = (question) => {
    setInput(question);
    // Use setTimeout to ensure state update before submit if we wanted to auto-submit, 
    // but giving them a chance to read/edit is also fine. Let's auto-submit for better UX.
    setTimeout(() => {
      document.getElementById('assistant-submit-btn')?.click();
    }, 100);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-[0_8px_30px_rgb(79,70,229,0.3)] border border-white/10 flex items-center justify-center group hover:shadow-[0_8px_30px_rgb(79,70,229,0.5)] transition-all duration-300"
        aria-label="Ask Aman Assistant"
      >
        <MessageSquare size={24} className="group-hover:scale-110 transition-transform duration-300" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] md:w-[400px] h-[600px] max-h-[calc(100vh-6rem)] bg-surface border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-700/50 bg-surface/50 backdrop-blur-xl flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 relative">
                  <Bot size={20} />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">Ask Aman</h3>
                  <p className="text-xs text-slate-400">AI Portfolio Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-blue-600/10 flex-shrink-0 flex items-center justify-center text-blue-500 mt-1">
                      <Bot size={16} />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      msg.role === 'user' 
                        ? 'bg-slate-200 text-slate-900 rounded-tr-sm' 
                        : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700/50'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600/10 flex-shrink-0 flex items-center justify-center text-blue-500 mt-1">
                    <Bot size={16} />
                  </div>
                  <div className="bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-700/50 p-4">
                    <div className="flex gap-1.5">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2 h-2 rounded-full bg-blue-600/60" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-blue-600/60" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 rounded-full bg-blue-600/60" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {!isLoading && (
              <div className="px-4 pb-2">
                <p className="text-xs text-slate-500 mb-2 font-medium px-1">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestedClick(q)}
                      className="text-xs bg-slate-800 hover:bg-blue-600/20 hover:text-blue-500 text-slate-300 border border-slate-700/50 hover:border-blue-600/50 px-3 py-1.5 rounded-full transition-all text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-surface border-t border-slate-700/50 relative z-10">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Aman's experience..."
                  className="w-full bg-slate-900 border border-slate-700/50 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-600/50 focus:ring-1 focus:ring-blue-600/50 transition-all"
                />
                <button
                  id="assistant-submit-btn"
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioAssistant;
