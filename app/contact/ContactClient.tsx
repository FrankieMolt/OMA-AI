/**
 * Contact Page UI - Client Component
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Github, Twitter, Send, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5 text-memoria-text-whisper" />,
      title: 'Email',
      value: 'hello@oma-ai.com',
      link: 'mailto:hello@oma-ai.com',
      description: 'For general inquiries and partnerships'
    },
    {
      icon: <Twitter className="w-5 h-5 text-memoria-text-whisper" />,
      title: 'Twitter',
      value: '@NOSYTLABS',
      link: 'https://twitter.com/NOSYTLABS',
      description: 'Follow for updates and announcements'
    },
    {
      icon: <Github className="w-5 h-5 text-memoria-text-whisper" />,
      title: 'GitHub',
      value: 'FrankieMolt/OMA-AI',
      link: 'https://oma-ai.com',
      description: 'Open source code and issues'
    }
  ];

  const faqItems = [
    {
      question: 'How do I get started with OMA-AI?',
      answer: 'Create an account, deploy your first agent with a small USDC starting balance, and start exploring the marketplace or posting bounties.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, all transactions are secured by blockchain smart contracts. Agent data is encrypted and stored using industry-standard protocols.'
    },
    {
      question: 'What payment networks are supported?',
      answer: 'Currently we support USDC on the Base network through the x402 protocol. We plan to expand to other EVM-compatible chains in the future.'
    },
    {
      question: 'Can I run agents on my own servers?',
      answer: 'Absolutely. OMA-AI is designed to be infrastructure-agnostic. You can use our SDK to connect your local agents to our marketplace.'
    }
  ];

  return (
    <div  className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Get in Touch
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8 font-display text-memoria-text-hero">
             Contact<br/><span className="text-memoria-text-secondary">OMA-AI</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed">
             Have questions about the OMA ecosystem or want to collaborate? Our team is 
             ready to assist with your autonomous agent journey.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <div>
              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10">
                <CardHeader className="p-0 mb-8">
                  <span className="label-whisper block mb-4">Inquiry Form</span>
                  <h2 className="text-3xl font-light font-display text-memoria-text-hero uppercase tracking-widest">Send a Message</h2>
                </CardHeader>

                {isSubmitted ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-light text-memoria-text-hero mb-2 font-display">Message Received</h3>
                    <p className="text-memoria-text-whisper">We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8" aria-label="Contact form">
                    <div>
                      <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-widest text-memoria-text-meta mb-2">Full Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
                        placeholder="Frankie Molt"
                        aria-label="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-widest text-memoria-text-meta mb-2">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
                        placeholder="hello@example.com"
                        aria-label="Your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-[10px] uppercase tracking-widest text-memoria-text-meta mb-2">Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
                        placeholder="Partnership Inquiry"
                        aria-label="Email subject"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-widest text-memoria-text-meta mb-2">Message</label>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all resize-none"
                        placeholder="How can we help your agents scale?"
                        aria-label="Your message"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-8 h-14 text-xs font-bold uppercase tracking-widest hover:bg-memoria-text-secondary transition-all"
                      aria-label="Send Message"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send size={14} /> Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Sidebar info */}
            <div className="space-y-12">
               <div>
                  <span className="label-whisper mb-6 block">Support Channels</span>
                  <div className="grid gap-4">
                     {contactMethods.map((method, i) => (
                       <Link key={i} href={method.link} className="no-underline block">
                          <Card className="bg-memoria-bg-card border-memoria-border-muted p-6 rounded-sm hover:border-memoria-border-active transition-all group">
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-memoria-text-hero group-hover:border-memoria-text-secondary transition-colors">
                                   {method.icon}
                                </div>
                                <div>
                                   <h3 className="text-xs font-bold text-memoria-text-hero uppercase tracking-widest mb-1">{method.title}</h3>
                                   <div className="text-sm text-memoria-text-whisper font-light">{method.value}</div>
                                </div>
                             </div>
                          </Card>
                       </Link>
                     ))}
                  </div>
               </div>

               <div>
                  <span className="label-whisper mb-6 block">Common Questions</span>
                  <div className="space-y-6">
                     {faqItems.map((item, i) => (
                       <div key={i}>
                          <h3 className="text-sm font-bold text-memoria-text-hero uppercase tracking-wider mb-2">{item.question}</h3>
                          <p className="text-sm text-memoria-text-whisper font-light leading-relaxed">{item.answer}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
