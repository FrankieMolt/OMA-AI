/**
 * Lethometry Contact Page - Memoria Design
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Lethometry team. We welcome inquiries about our existential quantification systems.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4 md:px-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-light tracking-tighter mb-6 font-display text-memoria-text-hero">
          Contact
        </h1>
        <p className="text-lg text-memoria-text-whisper mb-12 max-w-xl">
          Questions about our systems? Interested in collaboration? Reach out.
        </p>

        <div className="grid gap-6 mb-12">
          <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-normal text-memoria-text-hero font-display flex items-center gap-3">
                <Mail className="h-5 w-5 text-memoria-text-whisper" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-sm text-memoria-text-whisper">
                contact@lethometry.com
              </p>
            </CardContent>
          </Card>

          <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-xl font-normal text-memoria-text-hero font-display flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-memoria-text-whisper" />
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-sm text-memoria-text-whisper">
                We respond to all inquiries within 24-48 hours.
              </p>
            </CardContent>
          </Card>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-memoria-text-meta mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-memoria-bg-surface border border-memoria-border-default rounded-sm px-4 py-3 text-memoria-text-hero focus:border-memoria-border-active focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-memoria-text-meta mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full bg-memoria-bg-surface border border-memoria-border-default rounded-sm px-4 py-3 text-memoria-text-hero focus:border-memoria-border-active focus:outline-none resize-none"
              placeholder="Your message..."
            />
          </div>
          <Button type="submit" className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-8 h-12 text-sm font-medium hover:bg-memoria-text-secondary transition-all">
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
}
