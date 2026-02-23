import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - OMA-AI Support",
  description:
    "Get in touch with the OMA-AI team. Support, partnerships, and general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-light tracking-tighter mb-8">
          Contact Us
        </h1>

        <p className="text-xl text-memoria-text-whisper mb-12 max-w-2xl">
          Have questions about OMA-AI? Need support with integration? Want to
          partner with us? We&apos;d love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-light mb-6">Send us a message</h2>

            <form className="space-y-6">
              <div>
                <label className="block text-sm text-memoria-text-meta mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-memoria-bg-surface border border-memoria-border-default rounded-sm px-4 py-3 text-memoria-text-hero focus:border-memoria-border-active focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm text-memoria-text-meta mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-memoria-bg-surface border border-memoria-border-default rounded-sm px-4 py-3 text-memoria-text-hero focus:border-memoria-border-active focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-memoria-text-meta mb-2">
                  Subject
                </label>
                <select className="w-full bg-memoria-bg-surface border border-memoria-border-default rounded-sm px-4 py-3 text-memoria-text-hero focus:border-memoria-border-active focus:outline-none">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>API Integration Help</option>
                  <option>Billing Question</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-memoria-text-meta mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-memoria-bg-surface border border-memoria-border-default rounded-sm px-4 py-3 text-memoria-text-hero focus:border-memoria-border-active focus:outline-none resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-memoria-text-hero text-memoria-bg-ultra-dark py-4 rounded-sm font-medium hover:bg-memoria-text-secondary transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Email</h3>
              <a
                href="mailto:support@oma-ai.com"
                className="text-memoria-text-whisper hover:text-memoria-text-hero"
              >
                support@oma-ai.com
              </a>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Discord</h3>
              <a
                href="https://discord.gg/oma-ai"
                className="text-memoria-text-whisper hover:text-memoria-text-hero"
              >
                Join our community →
              </a>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Twitter</h3>
              <a
                href="https://twitter.com/oma_ai"
                className="text-memoria-text-whisper hover:text-memoria-text-hero"
              >
                @oma_ai
              </a>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">GitHub</h3>
              <a
                href="https://github.com/oma-ai"
                className="text-memoria-text-whisper hover:text-memoria-text-hero"
              >
                github.com/oma-ai
              </a>
            </div>

            <div className="pt-8 border-t border-memoria-border-default">
              <h3 className="text-lg font-medium mb-4">Office Hours</h3>
              <p className="text-memoria-text-whisper">
                Monday - Friday
                <br />
                9:00 AM - 6:00 PM EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
