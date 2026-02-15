/**
 * Blog Page
 */

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
          Weird Blog
        </h1>
        
        <p className="text-xl text-zinc-300 mb-8">
          Discover the wildest products and stories.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "10 Gadgets That Will Blow Your Mind",
              date: "January 15, 2026",
              excerpt: "From AI-powered toasters to levitating lamps, these products defy explanation."
            },
            {
              title: "The Art of Weird: Extreme Tech Roundup",
              date: "January 10, 2026",
              excerpt: "Our editors selected the 15 most bizarre innovations of the month."
            },
            {
              title: "Luxury Items That Are Absolutely Unnecessary",
              date: "January 5, 2026",
              excerpt: "Diamond-encrusted smartphones, gold-plated toast - when too much is never enough."
            },
            {
              title: "How We Find the Weirdest Stuff",
              date: "December 28, 2025",
              excerpt: "Behind the scenes at SpendThrone's product discovery lab."
            },
            {
              title: "Viral Products of 2025: A Retrospective",
              date: "December 20, 2025",
              excerpt: "The products that broke the internet and made us laugh the most."
            }
          ].map((post, index) => (
            <article key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all">
              <div className="p-6">
                <div className="text-xs text-zinc-500 mb-2">
                  {post.date}
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-zinc-400">
                  {post.excerpt}
                </p>
                <button aria-label="Read article" className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors">
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
