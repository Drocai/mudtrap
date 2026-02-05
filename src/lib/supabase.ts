import { createBrowserClient } from '@supabase/ssr'
import type { Profile, Track, StudioUpdate, Photo, VIPContent, Vote } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client for build time
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signUp: async () => ({ data: null, error: new Error('Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.') }),
        signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.') }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: new Error('Supabase not configured') }),
        update: () => ({ data: null, error: new Error('Supabase not configured') }),
        delete: () => ({ data: null, error: new Error('Supabase not configured') }),
        order: () => ({ data: [], error: null }),
        eq: () => ({ data: [], error: null }),
        single: () => ({ data: null, error: null }),
      }),
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: new Error('Supabase not configured') }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    } as unknown as ReturnType<typeof createBrowserClient>
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// ============================================
// DATABASE HELPERS
// ============================================

// Profiles
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }
  return data
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)

  if (error) {
    console.error('Error updating profile:', error)
    return false
  }
  return true
}

// Tracks
export async function getTracks(): Promise<Track[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching tracks:', error)
    return []
  }
  return data || []
}

export async function updateTrack(trackId: string, updates: Partial<Track>): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('tracks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', trackId)

  if (error) {
    console.error('Error updating track:', error)
    return false
  }
  return true
}

export async function createTrack(track: Omit<Track, 'id' | 'created_at' | 'updated_at'>): Promise<Track | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tracks')
    .insert(track)
    .select()
    .single()

  if (error) {
    console.error('Error creating track:', error)
    return null
  }
  return data
}

// Studio Updates
export async function getStudioUpdates(): Promise<StudioUpdate[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('studio_updates')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching updates:', error)
    return []
  }
  return data || []
}

export async function createStudioUpdate(update: { user_id: string; text: string; author_name: string }): Promise<StudioUpdate | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('studio_updates')
    .insert(update)
    .select()
    .single()

  if (error) {
    console.error('Error creating update:', error)
    return null
  }
  return data
}

export async function deleteStudioUpdate(updateId: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('studio_updates')
    .delete()
    .eq('id', updateId)

  if (error) {
    console.error('Error deleting update:', error)
    return false
  }
  return true
}

// Photos
export async function getPhotos(): Promise<Photo[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching photos:', error)
    return []
  }
  return data || []
}

export async function uploadPhoto(file: File, userId: string, caption?: string): Promise<Photo | null> {
  const supabase = createClient()

  // Upload file to storage
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(fileName, file)

  if (uploadError) {
    console.error('Error uploading file:', uploadError)
    return null
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('uploads')
    .getPublicUrl(fileName)

  // Create photo record
  const { data, error } = await supabase
    .from('photos')
    .insert({
      user_id: userId,
      url: publicUrl,
      caption,
      order_index: Date.now(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating photo record:', error)
    return null
  }

  return data
}

// VIP Content
export async function getVIPContent(isVIP: boolean = false): Promise<VIPContent[]> {
  const supabase = createClient()

  let query = supabase.from('vip_content').select('*')

  if (!isVIP) {
    query = query.eq('is_public', true)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching VIP content:', error)
    return []
  }
  return data || []
}

// Votes
export async function getVotes(itemType: string, itemId: string): Promise<number> {
  const supabase = createClient()
  const { count, error } = await supabase
    .from('votes')
    .select('*', { count: 'exact', head: true })
    .eq('item_type', itemType)
    .eq('item_id', itemId)

  if (error) {
    console.error('Error fetching votes:', error)
    return 0
  }
  return count || 0
}

export async function toggleVote(userId: string, itemType: string, itemId: string): Promise<boolean> {
  const supabase = createClient()

  // Check if vote exists
  const { data: existing } = await supabase
    .from('votes')
    .select('id')
    .eq('user_id', userId)
    .eq('item_type', itemType)
    .eq('item_id', itemId)
    .single()

  if (existing) {
    // Remove vote
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('id', existing.id)

    return !error
  } else {
    // Add vote
    const { error } = await supabase
      .from('votes')
      .insert({ user_id: userId, item_type: itemType, item_id: itemId })

    return !error
  }
}

// File upload helper
export async function uploadFile(file: File, userId: string, folder: string = 'files'): Promise<string | null> {
  const supabase = createClient()

  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${userId}/${Date.now()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(fileName, file)

  if (uploadError) {
    console.error('Error uploading file:', uploadError)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from('uploads')
    .getPublicUrl(fileName)

  return publicUrl
}
