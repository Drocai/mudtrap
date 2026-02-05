'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient, getProfile, getStudioUpdates, createStudioUpdate, uploadFile } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'

interface Update {
  id: string
  text: string
  author_name: string
  created_at: string
  user_id?: string
}

interface Profile {
  display_name: string
  role: string
}

export default function StudioPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [updates, setUpdates] = useState<Update[]>([])
  const [newUpdate, setNewUpdate] = useState('')
  const [activeTab, setActiveTab] = useState<'updates' | 'upload' | 'tracks' | 'manage'>('updates')
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // Mock data for when Supabase isn't connected
  const mockUpdates: Update[] = [
    { id: '1', text: "Working on the hook for Timmy's Turn - sounding fire!", author_name: "D RoC", created_at: "2025-01-24T10:00:00Z" },
    { id: '2', text: "Beat is locked in. Ready for verses.", author_name: "Timmy", created_at: "2025-01-23T15:00:00Z" },
    { id: '3', text: "Chevy 1 final mix approved!", author_name: "D RoC", created_at: "2025-01-20T12:00:00Z" },
  ]

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Try to get profile from database
        const userProfile = await getProfile(user.id)
        if (userProfile) {
          setProfile({
            display_name: userProfile.display_name,
            role: userProfile.role
          })
        } else {
          // Fallback profile
          setProfile({
            display_name: user.email?.split('@')[0] || 'User',
            role: 'fan'
          })
        }

        // Try to get updates from database
        const dbUpdates = await getStudioUpdates()
        if (dbUpdates.length > 0) {
          setUpdates(dbUpdates)
        } else {
          setUpdates(mockUpdates)
        }
      } else {
        setUpdates(mockUpdates)
      }

      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const addUpdate = async () => {
    if (!newUpdate.trim() || !user) return

    const authorName = profile?.display_name || user.email?.split('@')[0] || 'Anonymous'

    // Try to save to database
    const savedUpdate = await createStudioUpdate({
      user_id: user.id,
      text: newUpdate,
      author_name: authorName
    })

    if (savedUpdate) {
      setUpdates([savedUpdate, ...updates])
    } else {
      // Fallback to local state
      const localUpdate: Update = {
        id: Date.now().toString(),
        text: newUpdate,
        author_name: authorName,
        created_at: new Date().toISOString(),
        user_id: user.id
      }
      setUpdates([localUpdate, ...updates])
    }

    setNewUpdate('')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    setUploading(true)
    setUploadSuccess('')

    const url = await uploadFile(file, user.id, 'studio-files')

    if (url) {
      setUploadSuccess(`File uploaded successfully!`)
      // Also create an update about the upload
      const authorName = profile?.display_name || user.email?.split('@')[0] || 'Anonymous'
      await createStudioUpdate({
        user_id: user.id,
        text: `Uploaded: ${file.name}`,
        author_name: authorName
      })
      // Refresh updates
      const dbUpdates = await getStudioUpdates()
      if (dbUpdates.length > 0) {
        setUpdates(dbUpdates)
      }
    } else {
      setUploadSuccess('Upload failed. Please check Supabase configuration.')
    }

    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const isAdmin = profile?.role === 'admin' || profile?.role === 'collaborator'

  if (loading) {
    return (
      <>
        <div className="waterfall-bg" />
        <div className="waterfall-streaks" />
        <div className="glow-particles" />
        <div className="z-content min-h-screen flex items-center justify-center">
          <p className="text-gold text-xl">Loading The Studio...</p>
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
        <header className="studio-header relative z-20">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link href="/" className="logo-main text-2xl">
              MUD<span className="in-text">IN</span>TRAP
            </Link>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="text-right">
                    <p className="text-gold font-semibold">{profile?.display_name}</p>
                    <p className="text-xs text-purple-bright uppercase tracking-wider">
                      {profile?.role === 'admin' ? 'Admin' : profile?.role === 'collaborator' ? 'Collaborator' : 'Member'}
                    </p>
                  </div>
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

        <main className="py-8 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Page Title */}
            <div className="text-center mb-8">
              <h1 className="section-title">THE STUDIO</h1>
              <p className="section-subtitle">Collaboration Hub</p>
            </div>

            {user ? (
              <>
                {/* Tab Navigation */}
                <div className="flex justify-center gap-2 mb-8 flex-wrap">
                  <button
                    onClick={() => setActiveTab('updates')}
                    className={`btn-swamp-star ${activeTab === 'updates' ? 'border-purple-glow glow-purple' : ''}`}
                  >
                    UPDATES
                  </button>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className={`btn-swamp-star ${activeTab === 'upload' ? 'border-purple-glow glow-purple' : ''}`}
                  >
                    UPLOAD
                  </button>
                  <button
                    onClick={() => setActiveTab('tracks')}
                    className={`btn-swamp-star ${activeTab === 'tracks' ? 'border-purple-glow glow-purple' : ''}`}
                  >
                    TRACKS
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => setActiveTab('manage')}
                      className={`btn-swamp-star ${activeTab === 'manage' ? 'border-purple-glow glow-purple' : ''}`}
                    >
                      MANAGE
                    </button>
                  )}
                </div>

                {/* Updates Tab */}
                {activeTab === 'updates' && (
                  <div className="space-y-6">
                    {/* Post Update */}
                    <div className="vip-container">
                      <h2 className="vip-title text-lg mb-4">Post an Update</h2>
                      <textarea
                        value={newUpdate}
                        onChange={(e) => setNewUpdate(e.target.value)}
                        placeholder="Share progress, ideas, or feedback with the crew..."
                        className="input-swamp min-h-[100px] mb-4"
                      />
                      <button onClick={addUpdate} className="btn-swamp btn-vip w-full sm:w-auto">
                        Post Update
                      </button>
                    </div>

                    {/* Updates Feed */}
                    <div className="roadmap-container">
                      <h2 className="roadmap-title">STUDIO UPDATES</h2>
                      <div className="space-y-3">
                        {updates.map((update) => (
                          <div key={update.id} className="update-card">
                            <div className="flex justify-between items-start mb-2">
                              <span className="update-author">{update.author_name}</span>
                              <span className="update-date">{formatDate(update.created_at)}</span>
                            </div>
                            <p className="update-text">{update.text}</p>
                          </div>
                        ))}
                        {updates.length === 0 && (
                          <p className="text-center text-muted py-8">No updates yet. Be the first to post!</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Tab */}
                {activeTab === 'upload' && (
                  <div className="vip-container">
                    <h2 className="vip-title text-lg mb-4">Upload Files</h2>
                    <p className="text-secondary text-center mb-6">
                      Upload audio files, images, or documents to share with the crew.
                    </p>

                    <div className="border-2 border-dashed border-gold-dark rounded-lg p-8 text-center mb-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="audio/*,image/*,.pdf,.doc,.docx"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="text-4xl mb-4">
                          {uploading ? '...' : '📁'}
                        </div>
                        <p className="text-gold-light mb-2">
                          {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-sm text-muted">
                          Audio, Images, PDFs, Documents
                        </p>
                      </label>
                    </div>

                    {uploadSuccess && (
                      <p className={`text-center ${uploadSuccess.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                        {uploadSuccess}
                      </p>
                    )}
                  </div>
                )}

                {/* Tracks Tab */}
                {activeTab === 'tracks' && (
                  <div className="roadmap-container">
                    <h2 className="roadmap-title">CURRENT TRACKS</h2>
                    <div className="space-y-4">
                      <div className="glass-panel p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="text-gold-light font-bold">CHEVY 1</h3>
                          <p className="text-sm text-muted">Track 1 - Released</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded bg-purple-glow/20 text-purple-bright uppercase tracking-wider">
                          Done
                        </span>
                      </div>

                      <div className="glass-panel p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ borderColor: 'var(--gold)', boxShadow: '0 0 20px rgba(212, 168, 67, 0.2)' }}>
                        <div>
                          <h3 className="text-gold-light font-bold">TIMMY&apos;S TURN</h3>
                          <p className="text-sm text-muted">Timmy&apos;s Solo Track</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded bg-gold/20 text-gold uppercase tracking-wider">
                          In Progress
                        </span>
                      </div>

                      <div className="glass-panel p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-60">
                        <div>
                          <h3 className="text-gold-light font-bold">COLLAB TRACK</h3>
                          <p className="text-sm text-muted">D RoC x Timmy Collaboration</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded bg-gray-500/20 text-muted uppercase tracking-wider">
                          Coming Soon
                        </span>
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="mt-6 text-center">
                        <button className="btn-swamp">
                          + Add New Track
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Manage Tab (Admin Only) */}
                {activeTab === 'manage' && isAdmin && (
                  <div className="space-y-6">
                    <div className="vip-container">
                      <h2 className="vip-title text-lg mb-4">Admin Panel</h2>
                      <p className="text-secondary text-center mb-6">
                        Manage tracks, VIP content, and site settings.
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <button className="btn-swamp py-4">
                          Manage Tracks
                        </button>
                        <button className="btn-swamp py-4">
                          Manage VIP Content
                        </button>
                        <button className="btn-swamp py-4">
                          Manage Photos
                        </button>
                        <button className="btn-swamp py-4">
                          View Analytics
                        </button>
                      </div>
                    </div>

                    <div className="roadmap-container">
                      <h3 className="roadmap-title">QUICK ACTIONS</h3>
                      <div className="space-y-3">
                        <div className="glass-panel p-4">
                          <h4 className="text-gold-light mb-2">Update Current Track</h4>
                          <select className="input-swamp mb-2">
                            <option>CHEVY 1</option>
                            <option>TIMMY&apos;S TURN</option>
                            <option>COLLAB TRACK</option>
                          </select>
                          <button className="btn-swamp text-sm">Update</button>
                        </div>

                        <div className="glass-panel p-4">
                          <h4 className="text-gold-light mb-2">Update Next Track</h4>
                          <select className="input-swamp mb-2">
                            <option>TIMMY&apos;S SOLO</option>
                            <option>COLLAB TRACK</option>
                            <option>New Track</option>
                          </select>
                          <button className="btn-swamp text-sm">Update</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Not Signed In */
              <div className="vip-container text-center max-w-md mx-auto">
                <h2 className="vip-title mb-4">Welcome to The Studio</h2>
                <p className="text-secondary mb-6">
                  Sign in to access the collaboration hub where you can post updates,
                  upload files, and work on tracks with the crew.
                </p>
                <Link href="/auth" className="btn-swamp btn-vip">
                  Sign In to Enter
                </Link>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4 text-center">
          <Link href="/" className="btn-enter-studio">
            BACK TO HOME
          </Link>
        </footer>
      </div>
    </>
  )
}
