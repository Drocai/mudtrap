'use client'

import Link from 'next/link'

export default function ReleasesPage() {
  const tracks = [
    {
      id: 1,
      title: 'CHEVY 1',
      artist: 'D RoC ft. Timmy',
      status: 'released',
      releaseDate: 'Jan 2025',
      description: 'The first track from the Mud In The Trap project. Country meets trap in full force.'
    },
    {
      id: 2,
      title: "TIMMY'S TURN",
      artist: 'Timmy ft. D RoC',
      status: 'in-progress',
      releaseDate: 'Coming Soon',
      description: "Timmy takes the lead on this one. Currently in production - beat is locked in."
    },
    {
      id: 3,
      title: 'COLLAB TRACK',
      artist: 'D RoC x Timmy',
      status: 'coming-soon',
      releaseDate: 'TBA',
      description: 'A special collaboration coming later this season. Stay tuned.'
    },
  ]

  return (
    <>
      <div className="waterfall-bg" />
      <div className="waterfall-streaks" />
      <div className="glow-particles" />

      <div className="z-content min-h-screen">
        {/* Header */}
        <header className="py-8 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Link href="/" className="logo-main inline-block">
              MUD<span className="in-text">IN</span>TRAP
            </Link>
            <div className="logo-divider" />
            <p className="logo-subtitle">Country Meets Trap</p>

            <nav className="nav-bar mt-6">
              <Link href="/" className="nav-link">HOME</Link>
              <Link href="/releases" className="nav-link active">RELEASES</Link>
              <Link href="/vip" className="nav-link">VIP ACCESS</Link>
              <Link href="/studio" className="nav-link">STUDIO</Link>
            </nav>
          </div>
        </header>

        <main className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="section-title">RELEASES</h1>
              <p className="section-subtitle">Season 1 Roadmap</p>
            </div>

            {/* Tracks List */}
            <div className="space-y-6">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className={`roadmap-container ${
                    track.status === 'released' ? 'glow-purple' : ''
                  }`}
                  style={{ opacity: track.status === 'coming-soon' ? 0.6 : 1 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gold-light">
                        {track.title}
                      </h2>
                      <p className="text-sm text-muted">
                        {track.artist}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded uppercase tracking-wider ${
                        track.status === 'released'
                          ? 'bg-purple-glow/20 text-purple-bright'
                          : track.status === 'in-progress'
                          ? 'bg-gold/20 text-gold'
                          : 'bg-gray-500/20 text-muted'
                      }`}
                    >
                      {track.status === 'released' ? 'Released' : track.status === 'in-progress' ? 'In Progress' : 'Coming Soon'}
                    </span>
                  </div>

                  <p className="text-secondary mb-4">
                    {track.description}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <span className="text-sm text-muted">
                      {track.releaseDate}
                    </span>
                    {track.status === 'released' && (
                      <button className="btn-swamp-star">
                        LISTEN NOW
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Season Info */}
            <div className="mt-12 text-center">
              <p className="text-muted text-sm mb-4">More tracks coming throughout Season 1</p>
              <Link href="/studio" className="btn-enter-studio">
                ENTER THE STUDIO
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4 text-center">
          <p className="text-sm text-muted">
            DADDY FREQUENCY PRODUCTIONS &copy; 2025
          </p>
        </footer>
      </div>
    </>
  )
}
