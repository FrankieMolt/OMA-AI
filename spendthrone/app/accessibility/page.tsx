/**
 * Accessibility Statement Page
 */
import Link from 'next/link';

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
          Accessibility Statement
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-zinc-300 mb-6">
            SpendThrone is committed to ensuring digital accessibility for people with disabilities.
          </p>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Commitment</h2>
            <p className="text-zinc-400 mb-4">
              We are continually improving the user experience for everyone and applying the 
              relevant accessibility standards to ensure we provide equal access to all users.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Accessibility Features</h2>
            <ul className="space-y-3 text-zinc-400">
              <li>• Semantic HTML structure for screen readers</li>
              <li>• Keyboard navigation support</li>
              <li>• High contrast color scheme</li>
              <li>• Alt text for all images</li>
              <li>• ARIA labels where appropriate</li>
              <li>• Skip to main content link</li>
            </ul>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Feedback</h2>
            <p className="text-zinc-400">
              We welcome your feedback on the accessibility of SpendThrone. If you encounter 
              any accessibility barriers or have suggestions for improvement, please contact us at{' '}
              <a href="mailto:hello@spendthrone.com" className="text-purple-400 hover:text-purple-300">
                hello@spendthrone.com
              </a>.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Back to Kingdom
          </Link>
        </div>
      </div>
    </div>
  );
}
