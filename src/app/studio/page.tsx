'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'

export default function StudioPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [updates, setUpdates] = useState<Array<{id: number, text: string, author: string, date: string}>>([
    { id: 1, text: "Working on the hook for Timmy's Turn - sounding fire!", author: "D RoC", date: "Jan 24, 2025" },
    { id: 2, text: "Beat is locked in. Ready for verses.", author: "Timmy", date: "Jan 23, 2025" },
    { id: 3, text: "Chevy 1 final mix approved!", author: "D RoC", date: "Jan 20, 2025" },
  ])
  const [newUpdate, setNewUpdate] = useState('')
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const addUpdate = () => {
    if (newUpdate.trim()) {
      setUpdates(prevUpdates => [
        { id: Date.now(), text: newUpdate, author: user?.email?.split('@')[0] || 'Anonymous', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
        ...prevUpdates
      ])
      setNewUpdate('')
    }
  }

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
          <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>
            MUD <span style={{ fontSize: '0.6em' }}>IN THE</span> TRAP
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {user.email}
                </span>
                <button onClick={handleSignOut} className="btn-swamp text-sm py-2 px-4">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth" className="btn-swamp btn-vip text-sm py-2 px-4">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2" style={{ color: 'var(--gold)' }}>
            THE STUDIO
          </h1>
          <p className="text-center mb-8" style={{ color: 'var(--text-secondary)' }}>
            Collaboration Hub
          </p>

          {user ? (
            <>
              {/* Add Update Section */}
              <div className="glass-panel p-6 rounded-lg mb-8 glow-purple">
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--purple-light)' }}>
                  Post an Update
                </h2>
                <textarea
                  value={newUpdate}
                  onChange={(e) => setNewUpdate(e.target.value)}
                  placeholder="Share progress, ideas, or feedback..."
                  className="w-full px-4 py-3 rounded bg-black/50 border-2 focus:outline-none focus:border-purple-500 transition-colors mb-4 min-h-[100px]"
                  style={{ borderColor: 'var(--gold-dark)', color: 'var(--text-primary)' }}
                />
                <button onClick={addUpdate} className="btn-swamp btn-vip">
                  ✦ ADD UPDATE ✦
                </button>
              </div>

              {/* Updates Feed */}
              <div className="glass-panel p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gold)' }}>
                  Studio Updates
                </h2>
                <div className="space-y-4">
                  {updates.map((update) => (
                    <div key={update.id} className="p-4 rounded border" style={{ borderColor: 'var(--purple-dark)', background: 'rgba(0,0,0,0.3)' }}>
                      <p style={{ color: 'var(--text-primary)' }}>{update.text}</p>
                      <div className="flex justify-between mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span style={{ color: 'var(--gold-light)' }}>{update.author}</span>
                        <span>{update.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-4">
                <button className="btn-swamp py-4 w-full">
                  ✦ UPLOAD FILE ✦
                </button>
                <button className="btn-swamp py-4 w-full">
                  ✦ VOTE NOW ✦
                </button>
                <button className="btn-swamp py-4 w-full">
                  ✦ VIEW TRACKS ✦
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Sign in to access the collaboration hub
              </p>
              <Link href="/auth" className="btn-swamp btn-vip">
                Sign In to Enter
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
