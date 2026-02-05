'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Background layers */}
      <div className="waterfall-bg" />
      <div className="waterfall-streaks" />
      <div className="glow-particles" />

      <div className="z-content min-h-screen">
        {/* Header with Logo */}
        <header className="py-8 px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo */}
            <h1 className="logo-main">
              MUD<span className="in-text">IN</span>TRAP
            </h1>
            <div className="logo-divider" />
            <p className="logo-subtitle">Country Meets Trap</p>

            {/* Navigation */}
            <nav className="nav-bar mt-6">
              <Link href="/" className="nav-link active">HOME</Link>
              <Link href="/releases" className="nav-link">RELEASES</Link>
              <Link href="/vip" className="nav-link">VIP ACCESS</Link>
              <Link href="/studio" className="nav-link">STUDIO</Link>
            </nav>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">WELCOME TO THE SWAMP</h2>
            <p className="section-subtitle">Behind The Scenes of the Music</p>

            {/* Current Track / Next Up */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <div className="info-box">
                <span className="info-box-label">CURRENT TRACK:</span>
                <span className="info-box-value">LOCK &quot;CHEVY 1&quot;</span>
              </div>
              <div className="info-box">
                <span className="info-box-label">NEXT UP:</span>
                <span className="info-box-value">TIMMY&apos;S SOLO</span>
              </div>
            </div>
          </div>
        </section>

        {/* Season Roadmap & VIP Section */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Season Roadmap */}
            <div className="roadmap-container">
              <h3 className="roadmap-title">THE SEASON ROADMAP</h3>
              <div className="track-cards">
                <div className="track-card done">
                  <div className="track-card-label">TRACK 1</div>
                  <div className="track-card-title">CHEVY 1</div>
                  <div className="track-card-status">DONE</div>
                </div>
                <div className="track-card in-progress">
                  <div className="track-card-label">TIMMY&apos;S</div>
                  <div className="track-card-title">TURN</div>
                  <div className="track-card-status">IN PROGRESS</div>
                </div>
                <div className="track-card coming-soon">
                  <div className="track-card-label">COLLAB</div>
                  <div className="track-card-title">TRACK</div>
                  <div className="track-card-status">COMING SOON</div>
                </div>
              </div>
              <div className="text-center mt-4">
                <Link href="/releases" className="btn-swamp">VIEW ALL TRACKS</Link>
              </div>
            </div>

            {/* VIP Access */}
            <div className="vip-container">
              <h3 className="vip-title">VIP ACCESS</h3>
              <p className="vip-subtitle">EARLY DROPS • EXCLUSIVE DEMOS</p>
              <div className="text-center">
                <Link href="/vip" className="btn-swamp btn-vip">JOIN THE CREW</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Wall Section */}
        <section className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="photo-wall">
              {/* Polaroid photos - these will be replaced with real uploads */}
              <div className="polaroid">
                <div className="polaroid-img">
                  <span style={{ fontSize: '2rem' }}>🎸</span>
                </div>
                <p className="polaroid-caption">Studio Session</p>
              </div>
              <div className="polaroid">
                <div className="polaroid-img">
                  <span style={{ fontSize: '2rem' }}>🎤</span>
                </div>
                <p className="polaroid-caption">Recording Day</p>
              </div>
              <div className="polaroid">
                <div className="polaroid-img">
                  <span style={{ fontSize: '2rem' }}>🎹</span>
                </div>
                <p className="polaroid-caption">Making Beats</p>
              </div>
              <div className="polaroid">
                <div className="polaroid-img">
                  <span style={{ fontSize: '2rem' }}>🎧</span>
                </div>
                <p className="polaroid-caption">Mixing Session</p>
              </div>

              {/* Note card */}
              <div className="note-card">
                <p className="note-card-title">Next Hooks List</p>
                <p className="note-card-list">
                  1. Big Delivery hooks<br />
                  2. Building soft hooks<br />
                  3. Collab intro ideas
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons Section */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap">
              <Link href="/studio" className="btn-swamp-star">ADD UPDATE</Link>
              <Link href="/studio" className="btn-swamp-star">UPLOAD FILE</Link>
              <Link href="/studio" className="btn-swamp-star">VOTE NOW</Link>
            </div>
          </div>
        </section>

        {/* Enter Studio CTA */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/studio" className="btn-enter-studio">
              ENTER THE STUDIO
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Social Icons */}
            <div className="social-icons mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/_d_roc_"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@bigdroc"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0a0908"/>
                </svg>
              </a>
            </div>

            <p className="text-sm tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
              DADDY FREQUENCY PRODUCTIONS
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              &copy; 2025 MUD IN THE TRAP. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
