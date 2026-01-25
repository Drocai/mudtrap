'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function VIPPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  if (loading) {
    return (
      <div className="min-h-screen waterfall-section flex items-center justify-center">
        <p style={{ color: 'var(--gold)' }}>Loading...</p>
      </div>
    )
  }

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
          <h1 className="text-4xl font-bold text-center mb-2" style={{ color: 'var(--purple-light)' }}>
            VIP ACCESS
          </h1>
          <p className="text-center mb-8" style={{ color: 'var(--text-secondary)' }}>
            Exclusive Content for The Crew
          </p>

          {user ? (
            <>
              {/* VIP Content */}
              <div className="glass-panel p-6 rounded-lg mb-8 glow-purple">
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gold)' }}>
                  Welcome to VIP, {user.email?.split('@')[0]}!
                </h2>
                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                  You now have access to exclusive content, early drops, and behind-the-scenes material.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded border" style={{ borderColor: 'var(--purple-dark)', background: 'rgba(0,0,0,0.3)' }}>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--gold-light)' }}>Early Drops</h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Get tracks before anyone else</p>
                    <button className="btn-swamp text-sm py-2 px-4 w-full">Access</button>
                  </div>
                  <div className="p-4 rounded border" style={{ borderColor: 'var(--purple-dark)', background: 'rgba(0,0,0,0.3)' }}>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--gold-light)' }}>Exclusive Demos</h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Unreleased freestyles & demos</p>
                    <button className="btn-swamp text-sm py-2 px-4 w-full">Access</button>
                  </div>
                  <div className="p-4 rounded border" style={{ borderColor: 'var(--purple-dark)', background: 'rgba(0,0,0,0.3)' }}>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--gold-light)' }}>Behind the Scenes</h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Studio sessions & more</p>
                    <button className="btn-swamp text-sm py-2 px-4 w-full">Access</button>
                  </div>
                  <div className="p-4 rounded border" style={{ borderColor: 'var(--purple-dark)', background: 'rgba(0,0,0,0.3)' }}>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--gold-light)' }}>Vote on Content</h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Help decide what drops next</p>
                    <button className="btn-swamp text-sm py-2 px-4 w-full">Vote Now</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="glass-panel p-8 rounded-lg text-center glow-purple">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--purple-light)' }}>
                JOIN THE CREW
              </h2>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Get exclusive access to early drops, demos, behind-the-scenes content, and more.
              </p>
              <ul className="text-left max-w-sm mx-auto mb-6 space-y-2">
                <li className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--purple-light)' }}>✓</span> Behind-the-scenes content
                </li>
                <li className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--purple-light)' }}>✓</span> Early access to new tracks
                </li>
                <li className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--purple-light)' }}>✓</span> Exclusive freestyles & demos
                </li>
                <li className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--purple-light)' }}>✓</span> Vote on upcoming content
                </li>
              </ul>
              <a href="/auth" className="btn-swamp btn-vip inline-block">
                Sign Up for VIP Access
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
