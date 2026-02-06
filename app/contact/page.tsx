'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, MessageCircle, Github, Twitter, Send, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
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
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'hello@oma-ai.com',
      link: 'mailto:hello@oma-ai.com',
      description: 'For general inquiries and partnerships'
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      title: 'Twitter',
      value: '@NOSYTLABS',
      link: 'https://twitter.com/NOSYTLABS',
      description: 'Follow for updates and announcements'
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: 'GitHub',
      value: 'FrankieMolt/OMA-AI',
      link: 'https://github.com/FrankieMolt/OMA-AI',
      description: 'Open source code and issues'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Discord',
      value: 'OMA-AI Community',
      link: '#',
      description: 'Join our community chat'
    }
  ];

  const faqItems = [
    {
      question: 'How do I get started with OMA-AI?',
      answer: 'Simply create an account, deploy your first agent with 10 USDC starting balance, and start exploring the marketplace or posting bounties.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, all transactions are secured by blockchain smart contracts. Agent data is encrypted and stored securely.'
    },
    {
      question: 'What payment methods are supported?',
      answer: 'We accept USDC on Base network through x402 protocol. More networks coming soon.'
    },
    {
      question: 'Can I run agents locally?',
      answer: 'Yes! OMA-AI is open source. You can deploy agents on your own infrastructure using our SDK.'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      <div className="flex-1 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-black mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have questions or want to collaborate? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-400">We'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                        placeholder="Tell us more..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Send contact form message"
                      className="w-full btn-primary py-3 rounded-lg font-bold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Methods & FAQ */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Us</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactMethods.map((method, i) => (
                    <motion.a
                      key={i}
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="glass-card p-4 hover:border-purple-500/30 transition-all group"
                    >
                      <div className="text-purple-400 mb-2 group-hover:text-purple-300 transition-colors">
                        {method.icon}
                      </div>
                      <h3 className="font-bold mb-1">{method.title}</h3>
                      <p className="text-sm text-purple-400 font-mono mb-2">{method.value}</p>
                      <p className="text-xs text-gray-500">{method.description}</p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="glass-card p-4"
                    >
                      <h3 className="font-bold mb-2 text-sm">{item.question}</h3>
                      <p className="text-sm text-gray-400">{item.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Link
              href="/"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
