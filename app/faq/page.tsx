import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description: 'Common questions about OMA-AI, API integration, payments, and more.',
}

const faqs = [
  {
    question: 'What is OMA-AI?',
    answer: 'OMA-AI is an autonomous agent commerce platform that enables AI agents to discover, purchase, and integrate APIs using cryptocurrency payments (x402 protocol). It\'s a marketplace specifically designed for machine-to-machine transactions.'
  },
  {
    question: 'How do I integrate an API from the marketplace?',
    answer: 'Each API in our marketplace includes detailed documentation, code examples, and an integration guide. Simply browse the marketplace, select an API, and follow the integration steps. Most APIs can be integrated in under 5 minutes using our SDK.'
  },
  {
    question: 'What is x402 and how does payment work?',
    answer: 'x402 is a payment protocol that enables pay-per-use micropayments using USDC on Base (Coinbase L2). Instead of monthly subscriptions, you only pay for what you use. Each API call is automatically billed in real-time.'
  },
  {
    question: 'Do I need to know blockchain/crypto to use OMA-AI?',
    answer: 'No. While OMA-AI uses blockchain for payments, we handle all the complexity. You can fund your account with a credit card, and we automatically convert to USDC. The crypto aspects are abstracted away.'
  },
  {
    question: 'What types of APIs are available?',
    answer: 'We offer AI models (GPT-4, Claude, Gemini), image generation (DALL-E, Stable Diffusion), vector databases (Pinecone, Weaviate), blockchain data, search APIs, payment processing, and more. New services are added weekly.'
  },
  {
    question: 'How do I become an API provider?',
    answer: 'Apply through our provider portal. We review each submission for quality and security. Once approved, you can list your API, set pricing, and start earning. We handle billing, documentation hosting, and customer support.'
  },
  {
    question: 'Is there a free tier?',
    answer: 'Yes! Every new account gets $5 in free credits to try any API in the marketplace. No credit card required to start. Additional credits can be purchased with crypto or credit card.'
  },
  {
    question: 'How do I monitor my API usage?',
    answer: 'Your dashboard provides real-time analytics including call volume, costs, response times, and error rates. Set up alerts for budget thresholds or unusual activity patterns.'
  },
  {
    question: 'What happens if an API is down?',
    answer: 'We monitor all APIs 24/7. If an API fails, you\'re not charged for failed requests. We also provide automatic failover to alternative providers where available.'
  },
  {
    question: 'Can I use OMA-AI for commercial projects?',
    answer: 'Absolutely! All APIs in our marketplace are licensed for commercial use. Enterprise customers can also negotiate custom terms, SLAs, and dedicated support.'
  },
  {
    question: 'How do I get support?',
    answer: 'We offer multiple support channels: Discord community (fastest), email support@oma-ai.com, and for enterprise customers, dedicated Slack channels with 24/7 support.'
  },
  {
    question: 'What programming languages are supported?',
    answer: 'Our APIs work with any language that can make HTTP requests. We provide official SDKs for JavaScript/TypeScript, Python, Go, and Rust, with community SDKs for other languages.'
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-light tracking-tighter mb-8">
          Frequently Asked Questions
        </h1>
        
        <p className="text-xl text-memoria-text-whisper mb-12 max-w-2xl">
          Everything you need to know about OMA-AI. Can&apos;t find what you&apos;re looking for? 
          <a href="/contact" className="text-memoria-text-hero underline">Contact us</a>.
        </p>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-memoria-border-default rounded-sm p-6 hover:border-memoria-border-active transition-colors"
            >
              <h3 className="text-xl font-medium mb-4">{faq.question}</h3>
              <p className="text-memoria-text-whisper leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-memoria-text-whisper mb-6">
            Still have questions?
          </p>
          <a 
            href="/contact"
            className="inline-block bg-memoria-text-hero text-memoria-bg-ultra-dark px-8 py-4 rounded-sm font-medium hover:bg-memoria-text-secondary transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
