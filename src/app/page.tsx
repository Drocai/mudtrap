'use client'

import { useState } from 'react'

export default function Home() {
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

          <nav className="main-nav">
            {['HOME', 'RELEASES', 'VIP ACCESS', 'STUDIO'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`nav-link ${activeNav === item ? 'active' : ''}`}
              >
                {item}
              </button>
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

        <div className="section-divider" />

        {/* Main Grid - Roadmap & VIP */}
        <section className="main-grid">
          {/* Season Roadmap */}
          <div className="glass-panel">
            <h3 className="section-title">✦ THE SEASON ROADMAP ✦</h3>
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
              <button className="btn-swamp">VIEW ALL TRACKS</button>
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
              <button className="btn-swamp btn-vip">JOIN THE CREW</button>
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
          <button className="btn-swamp">ENTER NOW</button>
        </section>

        <div className="section-divider" />

        {/* Studio Section */}
        <section className="studio-section">
          <h3 className="section-title">THE STUDIO</h3>
          <div className="studio-buttons">
            <button className="btn-swamp">✦ ADD UPDATE ✦</button>
            <button className="btn-swamp">✦ UPLOAD FILE ✦</button>
            <button className="btn-swamp">✦ VOTE NOW ✦</button>
          </div>
        </section>

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
