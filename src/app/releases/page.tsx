'use client'

export default function ReleasesPage() {
  const tracks = [
    {
      id: 1,
      title: 'CHEVY 1',
      artist: 'D RoC ft. Timmy',
      status: 'released',
      releaseDate: 'Jan 2025',
      description: 'The first track from the Mud In The Trap project.'
    },
    {
      id: 2,
      title: "TIMMY'S TURN",
      artist: 'Timmy ft. D RoC',
      status: 'in-progress',
      releaseDate: 'Coming Soon',
      description: "Timmy takes the lead on this one. Currently in production."
    },
    {
      id: 3,
      title: 'COLLAB TRACK',
      artist: 'TBA',
      status: 'coming-soon',
      releaseDate: 'TBA',
      description: 'A special collaboration coming later this season.'
    },
  ]

  return (
    <div className="min-h-screen waterfall-section">
      {/* Header */}
      <header className="relative z-10 py-6 px-4 border-b" style={{ borderColor: 'var(--gold-dark)' }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>
            MUD <span style={{ fontSize: '0.6em' }}>IN THE</span> TRAP
          </a>
          <nav className="flex gap-4">
            <a href="/" className="text-sm hover:text-purple-400 transition-colors" style={{ color: 'var(--gold-light)' }}>Home</a>
            <a href="/studio" className="text-sm hover:text-purple-400 transition-colors" style={{ color: 'var(--gold-light)' }}>Studio</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2" style={{ color: 'var(--gold)' }}>
            RELEASES
          </h1>
          <p className="text-center mb-8" style={{ color: 'var(--text-secondary)' }}>
            Season 1 Roadmap
          </p>

          <div className="space-y-6">
            {tracks.map((track) => (
              <div
                key={track.id}
                className={`glass-panel p-6 rounded-lg ${track.status === 'released' ? 'glow-purple' : ''}`}
                style={{ opacity: track.status === 'coming-soon' ? 0.6 : 1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--gold-light)' }}>
                      {track.title}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {track.artist}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-xs uppercase tracking-wider ${
                      track.status === 'released'
                        ? 'bg-purple-500/20 text-purple-300'
                        : track.status === 'in-progress'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {track.status === 'released' ? 'Released' : track.status === 'in-progress' ? 'In Progress' : 'Coming Soon'}
                  </span>
                </div>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {track.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {track.releaseDate}
                  </span>
                  {track.status === 'released' && (
                    <button className="btn-swamp text-sm py-2 px-4">
                      ▶ Listen Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
