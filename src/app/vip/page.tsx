'use client'

import { useState, useEffect } from 'react'
import { createClient, getProfile } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'

export default function VIPPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isVIP, setIsVIP] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const profile = await getProfile(user.id)
        if (profile && (profile.role === 'vip' || profile.role === 'admin' || profile.role === 'collaborator')) {
          setIsVIP(true)
        }
      }

      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  const vipBenefits = [
    { icon: '🎵', title: 'Early Drops', description: 'Get access to tracks before anyone else' },
    { icon: '🎤', title: 'Exclusive Demos', description: 'Unreleased freestyles and studio sessions' },
    { icon: '🎬', title: 'Behind The Scenes', description: 'Studio footage and production content' },
    { icon: '🗳️', title: 'Vote on Content', description: 'Help decide what gets released next' },
  ]

  const exclusiveContent = [
    { title: 'Chevy 1 - Early Mix', type: 'Audio', locked: !isVIP },
    { title: 'Studio Session #1', type: 'Video', locked: !isVIP },
    { title: 'Timmy\'s Turn Preview', type: 'Audio', locked: !isVIP },
    { title: 'Making of Chevy 1', type: 'Video', locked: !isVIP },
  ]

  if (loading) {
    return (
      <>
        <div className="waterfall-bg" />
        <div className="waterfall-streaks" />
        <div className="glow-particles" />
        <div className="z-content min-h-screen flex items-center justify-center">
          <p className="text-gold text-xl">Loading VIP Access...</p>
        </div>
      </>
    )
  }

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
              <Link href="/releases" className="nav-link">RELEASES</Link>
              <Link href="/vip" className="nav-link active">VIP ACCESS</Link>
              <Link href="/studio" className="nav-link">STUDIO</Link>
            </nav>
          </div>
        </header>

        <main className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="section-title">VIP ACCESS</h1>
              <p className="section-subtitle">Exclusive Content for the Crew</p>
            </div>

            {isVIP ? (
              /* VIP User View */
              <>
                <div className="vip-container mb-8 text-center">
                  <div className="text-3xl mb-4">👑</div>
                  <h2 className="vip-title">Welcome, VIP Member!</h2>
                  <p className="text-secondary">You have full access to all exclusive content.</p>
                </div>

                {/* Exclusive Content Grid */}
                <div className="roadmap-container mb-8">
                  <h3 className="roadmap-title">EXCLUSIVE CONTENT</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {exclusiveContent.map((content, index) => (
                      <div key={index} className="glass-panel p-4 hover:glow-purple transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-gold-light font-semibold">{content.title}</h4>
                          <span className="text-xs px-2 py-1 rounded bg-purple-glow/20 text-purple-bright">
                            {content.type}
                          </span>
                        </div>
                        <button className="btn-swamp text-sm w-full mt-2">
                          Access Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coming Soon */}
                <div className="roadmap-container">
                  <h3 className="roadmap-title">COMING SOON</h3>
                  <div className="text-center py-8">
                    <p className="text-secondary mb-4">More exclusive content dropping soon...</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                      <span className="text-xs px-3 py-1 rounded bg-gold/20 text-gold">New Freestyles</span>
                      <span className="text-xs px-3 py-1 rounded bg-gold/20 text-gold">Studio Sessions</span>
                      <span className="text-xs px-3 py-1 rounded bg-gold/20 text-gold">Merch Previews</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Non-VIP View */
              <>
                {/* Benefits Section */}
                <div className="vip-container mb-8">
                  <h2 className="vip-title mb-2">Join The Crew</h2>
                  <p className="vip-subtitle">EARLY DROPS • EXCLUSIVE DEMOS • BEHIND THE SCENES</p>

                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    {vipBenefits.map((benefit, index) => (
                      <div key={index} className="glass-panel p-4 text-center">
                        <div className="text-3xl mb-2">{benefit.icon}</div>
                        <h3 className="text-gold-light font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-secondary">{benefit.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    {user ? (
                      <div>
                        <p className="text-secondary mb-4">Upgrade your account to VIP to unlock all content.</p>
                        <button className="btn-swamp btn-vip">
                          Upgrade to VIP
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-secondary mb-4">Sign in or create an account to become a VIP member.</p>
                        <Link href="/auth" className="btn-swamp btn-vip">
                          Sign Up Now
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Locked Content Preview */}
                <div className="roadmap-container">
                  <h3 className="roadmap-title">EXCLUSIVE CONTENT</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {exclusiveContent.map((content, index) => (
                      <div key={index} className="glass-panel p-4 opacity-60">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-gold-light font-semibold">{content.title}</h4>
                          <span className="text-xs px-2 py-1 rounded bg-gray-500/20 text-muted">
                            {content.type}
                          </span>
                        </div>
                        <div className="text-center py-4">
                          <span className="text-2xl">🔒</span>
                          <p className="text-sm text-muted mt-2">VIP Only</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4 text-center">
          <Link href="/studio" className="btn-enter-studio">
            ENTER THE STUDIO
          </Link>
        </footer>
      </div>
    </>
  )
}
