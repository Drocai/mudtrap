'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName || email.split('@')[0]
            }
          }
        })
        if (error) throw error
        setMessage('Check your email for the confirmation link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/studio')
      }
    } catch (error: unknown) {
      const err = error as Error
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="waterfall-bg" />
      <div className="waterfall-streaks" />
      <div className="glow-particles" />

      <div className="z-content min-h-screen flex items-center justify-center px-4 py-12">
        <div className="vip-container max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="logo-main inline-block text-3xl">
              MUD<span className="in-text">IN</span>TRAP
            </Link>
            <div className="logo-divider" />
            <p className="logo-subtitle text-sm">
              {isSignUp ? 'Join The Crew' : 'Enter The Swamp'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm mb-2 text-gold-light">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="How should we call you?"
                  className="input-swamp"
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-2 text-gold-light">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-swamp"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-gold-light">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-swamp"
                required
                minLength={6}
              />
              {isSignUp && (
                <p className="text-xs text-muted mt-1">Minimum 6 characters</p>
              )}
            </div>

            {message && (
              <div className={`p-3 rounded text-center text-sm ${
                message.includes('Check') || message.includes('success')
                  ? 'bg-purple-glow/20 text-purple-bright'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-swamp btn-vip w-full py-3"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setMessage('')
              }}
              className="text-sm text-purple-bright hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gold-dark/30 text-center">
            <Link href="/" className="text-sm text-gold-dark hover:text-gold transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
