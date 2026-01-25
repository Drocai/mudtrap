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
            </h1>
            <p className="text-sm tracking-[0.3em] mt-2" style={{ color: 'var(--gold-dark)' }}>
              Country Meets Trap
            </p>
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
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4 text-glow-purple"
            style={{ color: 'var(--text-primary)' }}
          >
            WELCOME TO THE SWAMP
          </h2>
          <p className="text-lg md:text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
            Behind The Scenes of the Music
          </p>

          {/* Current Track Info */}
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-12 mb-8">
            <div className="glass-panel px-6 py-3 rounded">
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>CURRENT TRACK:</span>
              <span className="ml-2 font-semibold" style={{ color: 'var(--gold-light)' }}>LOCK &quot;CHEVY 1&quot;</span>
            </div>
            <div className="glass-panel px-6 py-3 rounded">
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>NEXT UP:</span>
              <span className="ml-2 font-semibold" style={{ color: 'var(--gold-light)' }}>TIMMY&apos;S SOLO</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider my-8" />

      {/* Season Roadmap & VIP Section */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Season Roadmap */}
          <div className="glass-panel p-6 rounded-lg">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6" style={{ color: 'var(--gold)' }}>
              ✦ THE SEASON ROADMAP ✦
            </h3>
            <div className="flex justify-center gap-3 md:gap-4 flex-wrap mb-6">
              <div className="track-card done">
                <div className="text-xs tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>TRACK 1</div>
                <div className="font-bold text-sm" style={{ color: 'var(--gold-light)' }}>CHEVY 1</div>
                <div className="text-xs mt-2 uppercase tracking-wider" style={{ color: 'var(--purple-light)' }}>DONE</div>
              </div>
              <div className="track-card in-progress">
                <div className="text-xs tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>TIMMY&apos;S</div>
                <div className="font-bold text-sm" style={{ color: 'var(--gold-light)' }}>TURN</div>
                <div className="text-xs mt-2 uppercase tracking-wider" style={{ color: 'var(--gold)' }}>IN PROGRESS</div>
              </div>
              <div className="track-card coming-soon">
                <div className="text-xs tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>COLLAB</div>
                <div className="font-bold text-sm" style={{ color: 'var(--gold-light)' }}>TRACK</div>
                <div className="text-xs mt-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>COMING SOON</div>
              </div>
            </div>
            <div className="text-center">
              <Link href="/releases" className="btn-swamp inline-block">VIEW ALL TRACKS</Link>
            </div>
          </div>

          {/* VIP Access */}
          <div className="glass-panel p-6 rounded-lg glow-purple">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4" style={{ color: 'var(--purple-light)' }}>
              VIP ACCESS
            </h3>
            <p className="text-center mb-6 text-sm tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              EARLY DROPS • EXCLUSIVE DEMOS
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                <span className="text-purple-400">✓</span> Behind-the-scenes content
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                <span className="text-purple-400">✓</span> Early access to new tracks
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                <span className="text-purple-400">✓</span> Exclusive freestyles &amp; demos
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                <span className="text-purple-400">✓</span> Vote on upcoming content
              </div>
            </div>
            <div className="text-center">
              <Link href="/vip" className="btn-swamp btn-vip inline-block">JOIN THE CREW</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider my-8" />

      {/* Photo & Lyric Wall */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ color: 'var(--gold)' }}>
            PHOTO &amp; LYRIC WALL
          </h3>
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
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
          </div>

          <p className="text-sm tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
            DADDY FREQUENCY PRODUCTIONS
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2025 MUD IN THE TRAP. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
