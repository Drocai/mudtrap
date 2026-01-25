'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    <div className="min-h-screen waterfall-section flex items-center justify-center px-4">
      <div className="glass-panel p-8 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2" style={{ color: 'var(--gold)' }}>
          MUD <span style={{ fontSize: '0.6em' }}>IN THE</span> TRAP
        </h1>
        <p className="text-center mb-8" style={{ color: 'var(--text-secondary)' }}>
          {isSignUp ? 'Join The Crew' : 'Enter The Swamp'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm mb-2" style={{ color: 'var(--gold-light)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded bg-black/50 border-2 focus:outline-none focus:border-purple-500 transition-colors"
              style={{ borderColor: 'var(--gold-dark)', color: 'var(--text-primary)' }}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ color: 'var(--gold-light)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded bg-black/50 border-2 focus:outline-none focus:border-purple-500 transition-colors"
              style={{ borderColor: 'var(--gold-dark)', color: 'var(--text-primary)' }}
              required
              minLength={6}
            />
          </div>

          {message && (
            <p className="text-sm text-center" style={{ color: message.includes('Check') ? 'var(--purple-light)' : '#ef4444' }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-swamp btn-vip w-full py-3"
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm hover:underline"
            style={{ color: 'var(--purple-light)' }}
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm hover:underline" style={{ color: 'var(--gold-dark)' }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
