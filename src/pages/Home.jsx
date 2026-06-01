import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">

      {/* Logo */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-700/50 rounded-full px-4 py-1.5 text-purple-300 text-sm mb-6">
          ✦ AI Project Architect
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          Chyurum <span className="text-purple-400">Studio</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
          Tell us your idea. We'll craft a complete blueprint — features, pages, tech stack, and cost estimate.
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate('/start')}
        className="mt-8 bg-purple-600 hover:bg-purple-500 text-white font-medium px-8 py-3.5 rounded-xl text-base transition-all duration-200 hover:scale-105"
      >
        Start your project →
      </button>

      {/* Footer */}
      <p className="mt-12 text-gray-600 text-sm">
        Powered by Chyurum AI · Built by Chyurum Studio
      </p>
    </div>
  )
}