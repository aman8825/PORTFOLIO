import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Heading, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { FADE_UP, STAGGER_CONTAINER } from '../animations/variants';
import { useProfile } from '../context/ProfileContext';

export const Contact = () => {
  const { profile } = useProfile();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _honeypot: '' // Spam resistance
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', _honeypot: '' });
      } else {
        setStatus('error');
        if (data.errors) {
          setValidationErrors(data.errors);
          setErrorMessage('Please fix the validation errors above.');
        } else {
          setErrorMessage(data.message || 'Something went wrong. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('Unable to connect to the server. Please ensure you have an active internet connection or try again later.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-surface/30 relative overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER_CONTAINER}
        >
          <SectionHeader 
            title="Let's Connect" 
            description="Have a project in mind or want to discuss opportunities? I'd love to hear from you." 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-start">
            
            <motion.div variants={FADE_UP} className="space-y-6 lg:pr-8">
              <Heading level={3} className="mb-2">
                Ready to build something <span className="text-primary/50">extraordinary?</span>
              </Heading>
              <Text variant="large" className="text-primary/70">
                Whether you need a robust full-stack web application, a scalable backend API, or a responsive frontend interface, I'm here to help turn your vision into reality.
              </Text>
              <Text>
                Fill out the form, and I'll get back to you within 24-48 hours. Please provide as much detail as possible so I can better understand your requirements before we talk.
              </Text>
              
              <div className="pt-8 border-t border-border/50 space-y-4">
                {profile?.contact?.email && (
                  <div>
                    <Text variant="mono" className="text-xs uppercase tracking-widest text-primary/40 mb-1">Email</Text>
                    <a href={`mailto:${profile.contact.email}`} className="font-medium text-lg text-primary/90 hover:text-primary transition-colors">
                      {profile.contact.email}
                    </a>
                  </div>
                )}
                {profile?.contact?.phone && (
                  <div>
                    <Text variant="mono" className="text-xs uppercase tracking-widest text-primary/40 mb-1">Phone</Text>
                    <a href={`tel:${profile.contact.phone}`} className="font-medium text-lg text-primary/90 hover:text-primary transition-colors">
                      {profile.contact.phone}
                    </a>
                  </div>
                )}
                {profile?.contact?.whatsapp && (
                  <div>
                    <Text variant="mono" className="text-xs uppercase tracking-widest text-primary/40 mb-1">WhatsApp</Text>
                    <a href={`https://wa.me/${profile.contact.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="font-medium text-lg text-primary/90 hover:text-primary transition-colors">
                      {profile.contact.whatsapp}
                    </a>
                  </div>
                )}
                
                {!profile?.contact?.email && !profile?.contact?.phone && !profile?.contact?.whatsapp && (
                  <div>
                    <Text variant="mono" className="text-xs uppercase tracking-widest text-primary/40 mb-1">Direct Contact</Text>
                    <Text className="font-medium text-lg text-primary/90">hello@amankumar.dev</Text>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={FADE_UP}>
              <Card className="bg-background/80 backdrop-blur-md border border-border/50 shadow-xl">
                <CardContent className="p-8">
                  {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <Heading level={3}>Message Sent!</Heading>
                      <Text className="text-primary/70">
                        Thank you for reaching out. I've received your message and will get back to you shortly.
                      </Text>
                      <Button 
                        variant="outline" 
                        className="mt-6" 
                        onClick={() => setStatus('idle')}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Honeypot field - hidden from real users */}
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="_honeypot">Leave this empty if you are human</label>
                        <input type="text" id="_honeypot" name="_honeypot" tabIndex="-1" value={formData._honeypot} onChange={handleChange} />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-primary/80">Name <span className="text-red-500/70">*</span></label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-surface border rounded-sm focus:outline-none focus:border-primary/50 transition-colors ${validationErrors.name ? 'border-red-500/50' : 'border-border/50'}`}
                          placeholder="John Doe"
                          disabled={status === 'loading'}
                        />
                        {validationErrors.name && <Text variant="muted" className="text-red-400 text-xs mt-1">{validationErrors.name}</Text>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-primary/80">Email <span className="text-red-500/70">*</span></label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-surface border rounded-sm focus:outline-none focus:border-primary/50 transition-colors ${validationErrors.email ? 'border-red-500/50' : 'border-border/50'}`}
                          placeholder="john@example.com"
                          disabled={status === 'loading'}
                        />
                        {validationErrors.email && <Text variant="muted" className="text-red-400 text-xs mt-1">{validationErrors.email}</Text>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-primary/80">Subject <span className="text-red-500/70">*</span></label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-surface border rounded-sm focus:outline-none focus:border-primary/50 transition-colors ${validationErrors.subject ? 'border-red-500/50' : 'border-border/50'}`}
                          placeholder="Project Inquiry"
                          disabled={status === 'loading'}
                        />
                        {validationErrors.subject && <Text variant="muted" className="text-red-400 text-xs mt-1">{validationErrors.subject}</Text>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-primary/80">Message <span className="text-red-500/70">*</span></label>
                        <textarea
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-surface border rounded-sm focus:outline-none focus:border-primary/50 transition-colors resize-none ${validationErrors.message ? 'border-red-500/50' : 'border-border/50'}`}
                          placeholder="Tell me about your project..."
                          disabled={status === 'loading'}
                        />
                        {validationErrors.message && <Text variant="muted" className="text-red-400 text-xs mt-1">{validationErrors.message}</Text>}
                      </div>

                      {status === 'error' && (
                        <div className="p-4 rounded-sm bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <Text variant="muted" className="text-red-400 text-sm">{errorMessage}</Text>
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        className="w-full group" 
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Send Message
                            <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </Button>

                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
};
