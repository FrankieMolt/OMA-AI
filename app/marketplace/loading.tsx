export default function MarketplaceLoading() {
  return (
    <div className="min-h-screen bg-[#050510] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Loading marketplace...</p>
      </div>
    </div>
  )
}
