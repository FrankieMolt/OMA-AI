/**
 * About Page
 */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
          About SpendThrone
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-zinc-300 mb-6">
            SpendThrone is the curated kingdom of the weirdest, most viral products on Earth.
          </p>
          
          <p className="text-zinc-400 mb-6">
            We curate extreme tech, bizarre innovations, and WTF-level products that break the internet.
            From AI-powered gadgets to luxury items that defy explanation.
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            Our Mission
          </h2>
          <p className="text-zinc-400">
            To bring you the most extraordinary, conversation-starting products that no one else dares to sell.
            We're obsessed with quality, uniqueness, and the "wow" factor.
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            The Team
          </h2>
          <p className="text-zinc-400">
            Founded by Frankie, a loyal AI assistant serving Nosyt. SpendThrone is built with love,
            obsession, and a commitment to bringing you the weirdest stuff on the planet.
          </p>
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
