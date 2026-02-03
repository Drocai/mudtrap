'use client'

import Link from 'next/link'

export default function Home() {
  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'RELEASES', href: '/releases' },
    { name: 'VIP ACCESS', href: '/vip' },
    { name: 'STUDIO', href: '/studio' },
  ]

  return (
    <div className="min-h-screen waterfall-section">
      {/* Waterfall overlay effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          background: `repeating-linear-gradient(
            180deg,
            transparent 0px,
            rgba(168, 85, 247, 0.03) 2px,
            transparent 4px
          )`,
          animation: 'waterfall-flow 3s linear infinite',
        }}
      />

      {/* Header */}
      <header className="relative z-10 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1
              className="text-4xl md:text-6xl font-bold tracking-wider"
              style={{
                color: 'var(--gold)',
                textShadow: '0 0 30px rgba(168, 85, 247, 0.4), 2px 2px 0 var(--gold-dark)',
              }}
            >
              MUD <span style={{ fontSize: '0.6em', verticalAlign: 'middle' }}>IN THE</span> TRAP
  const [activeNav, setActiveNav] = useState('HOME')

  return (
    <div className="main-container">
      <div className="content-wrapper">
        {/* Header */}
        <header className="site-header">
          <div className="text-center">
            <h1 className="logo-title">
              MUD <span>IN</span> TRAP
            </h1>
            <p className="tagline">Country Meets Trap</p>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center gap-2 md:gap-8 flex-wrap">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm tracking-wider transition-all hover:text-purple-400"
                style={{
                  color: item.name === 'HOME' ? 'var(--purple-light)' : 'var(--gold-light)',
                  borderBottom: item.name === 'HOME' ? '2px solid var(--purple-glow)' : '2px solid transparent',
                }}
          <nav className="main-nav">
            {['HOME', 'RELEASES', 'VIP ACCESS', 'STUDIO'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`nav-link ${activeNav === item ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          <h2 className="hero-title">WELCOME TO THE SWAMP</h2>
          <p className="hero-subtitle">Behind The Scenes of the Music</p>

          <div className="track-info-row">
            <div className="track-info-box">
              <span className="label">CURRENT TRACK:</span>
              <span className="value">LOCK &quot;CHEVY 1&quot;</span>
            </div>
            <div className="track-info-box">
              <span className="label">NEXT UP:</span>
              <span className="value">TIMMY&apos;S SOLO</span>
            </div>
          </div>
        </section>

        {/* Studio Preview Section */}
        <section className="studio-preview">
          <h3 className="section-title">THE STUDIO</h3>
          <div className="studio-gallery">
            <div className="studio-image">
              <span className="studio-image-icon">🎵</span>
            </div>
            <div className="studio-image">
              <span className="studio-image-icon">🎹</span>
            </div>
            <div className="studio-image">
              <span className="studio-image-icon">🎤</span>
            </div>
          </div>
          <button className="btn-swamp btn-studio-enter">ENTER THE STUDIO</button>
        </section>

        <div className="section-divider" />

        {/* Main Grid - Roadmap & VIP */}
        <section className="main-grid">
          {/* Season Roadmap */}
          <div className="glass-panel">
            <h3 className="section-title">THE SEASON ROADMAP</h3>
            <div className="track-cards">
              <div className="track-card done">
                <div className="track-label">TRACK 1</div>
                <div className="track-name">CHEVY 1</div>
                <div className="track-status">DONE</div>
              </div>
              <div className="track-card in-progress">
                <div className="track-label">TIMMY&apos;S</div>
                <div className="track-name">TURN</div>
                <div className="track-status">IN PROGRESS</div>
              </div>
              <div className="track-card coming-soon">
                <div className="track-label">COLLAB</div>
                <div className="track-name">TRACK</div>
                <div className="track-status">COMING SOON</div>
              </div>
            </div>
            <div className="text-center">
              <Link href="/releases" className="btn-swamp inline-block">VIEW ALL TRACKS</Link>
            </div>
          </div>

          {/* VIP Access */}
          <div className="glass-panel vip-panel">
            <h3 className="section-title vip-title">VIP ACCESS</h3>
            <p className="vip-subtitle text-center">EARLY DROPS • EXCLUSIVE DEMOS</p>
            <div className="vip-benefits">
              <div className="vip-benefit">
                <span className="check">✓</span> Behind-the-scenes content
              </div>
              <div className="vip-benefit">
                <span className="check">✓</span> Early access to new tracks
              </div>
              <div className="vip-benefit">
                <span className="check">✓</span> Exclusive freestyles &amp; demos
              </div>
              <div className="vip-benefit">
                <span className="check">✓</span> Vote on upcoming content
              </div>
            </div>
            <div className="text-center">
              <Link href="/vip" className="btn-swamp btn-vip inline-block">JOIN THE CREW</Link>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Photo & Lyric Wall */}
        <section className="photo-section">
          <h3 className="section-title">PHOTO &amp; LYRIC WALL</h3>
          <div className="photo-grid">
            <div className="photo-thumb">📷</div>
            <div className="photo-thumb">🎤</div>
            <div className="photo-thumb">📝</div>
            <div className="photo-thumb">🎸</div>
          </div>
          <div className="text-center">
            <Link href="/studio" className="btn-swamp inline-block">ENTER NOW</Link>
          </div>
        </div>
      </section>

      <div className="section-divider my-8" />

      {/* The Studio */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ color: 'var(--gold)' }}>
            THE STUDIO
          </h3>
          <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
            <Link href="/studio" className="btn-swamp inline-block">
              <span className="mr-2">✦</span>ADD UPDATE<span className="ml-2">✦</span>
            </Link>
            <Link href="/studio" className="btn-swamp inline-block">
              <span className="mr-2">✦</span>UPLOAD FILE<span className="ml-2">✦</span>
            </Link>
            <Link href="/studio" className="btn-swamp inline-block">
              <span className="mr-2">✦</span>VOTE NOW<span className="ml-2">✦</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider my-8" />

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://www.instagram.com/_d_roc_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'var(--bg-cave)', border: '2px solid var(--gold-dark)' }}
              title="Instagram"
            >
              <span className="text-xl">📸</span>
            </a>
            <a
              href="https://www.tiktok.com/@big.droc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'var(--bg-cave)', border: '2px solid var(--gold-dark)' }}
              title="TikTok"
            >
              <span className="text-xl">🎵</span>
            </a>
            <a
              href="https://youtube.com/@bigdroc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'var(--bg-cave)', border: '2px solid var(--gold-dark)' }}
              title="YouTube"
            >
              <span className="text-xl">▶️</span>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'var(--bg-cave)', border: '2px solid var(--gold-dark)' }}
              title="Spotify"
            >
              <span className="text-xl">🎧</span>
            </a>
          <button className="btn-swamp">ENTER NOW</button>
        </section>

        <div className="section-divider" />

        {/* Studio Actions Section */}
        <section className="studio-section">
          <div className="studio-buttons">
            <button className="btn-swamp">ADD UPDATE</button>
            <button className="btn-swamp">UPLOAD FILE</button>
            <button className="btn-swamp">VOTE NOW</button>
          </div>
        </section>

          <p className="text-sm tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
            DADDY FREQUENCY PRODUCTIONS
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2025 MUD IN THE TRAP. All rights reserved.
          </p>
        </div>
      </footer>
        <div className="section-divider" />

        {/* Footer */}
        <footer className="site-footer">
          <div className="social-links">
            <a href="https://www.instagram.com/_d_roc_" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">📸</a>
            <a href="https://www.tiktok.com/@big.droc" target="_blank" rel="noopener noreferrer" className="social-link" title="TikTok">🎵</a>
            <a href="https://youtube.com/@bigdroc" target="_blank" rel="noopener noreferrer" className="social-link" title="YouTube">▶️</a>
            <a href="#" className="social-link" title="Spotify">🎧</a>
          </div>
          <p className="footer-text">DADDY FREQUENCY PRODUCTIONS</p>
          <p className="footer-copyright">© 2025 MUD IN TRAP. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
