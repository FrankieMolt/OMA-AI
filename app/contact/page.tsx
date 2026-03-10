import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the OMA-AI team for support, enterprise inquiries, and partnerships.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Contact Us</h1>
        
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-zinc-300">First Name</label>
                <input id="firstName" type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-zinc-300">Last Name</label>
                <input id="lastName" type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email Address</label>
              <input id="email" type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none" required />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-300">How can we help?</label>
              <textarea id="message" rows={5} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none" required></textarea>
            </div>
            
            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-colors">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="mt-12 text-center text-zinc-400">
          <p>Or email us directly at <a href="mailto:support@oma-ai.com" className="text-primary hover:underline">support@oma-ai.com</a></p>
        </div>
      </div>
    </main>
  );
}
