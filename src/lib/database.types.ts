// Database types for Supabase tables

export interface Profile {
  id: string
  email: string
  display_name: string
  role: 'admin' | 'collaborator' | 'vip' | 'fan'
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Track {
  id: string
  title: string
  label: string // e.g., "TRACK 1", "TIMMY'S"
  status: 'done' | 'in_progress' | 'coming_soon'
  description?: string
  audio_url?: string
  cover_url?: string
  release_date?: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface StudioUpdate {
  id: string
  user_id: string
  text: string
  author_name: string
  created_at: string
}

export interface Photo {
  id: string
  user_id: string
  url: string
  caption?: string
  order_index: number
  created_at: string
}

export interface VIPContent {
  id: string
  title: string
  description?: string
  content_type: 'audio' | 'video' | 'image' | 'text'
  url?: string
  is_public: boolean
  created_at: string
}

export interface Vote {
  id: string
  user_id: string
  item_type: 'track' | 'photo' | 'content'
  item_id: string
  created_at: string
}

// Database schema creation SQL (run this in Supabase SQL editor)
export const DATABASE_SCHEMA = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT 'Anonymous',
  role TEXT NOT NULL DEFAULT 'fan' CHECK (role IN ('admin', 'collaborator', 'vip', 'fan')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tracks table
CREATE TABLE IF NOT EXISTS tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'coming_soon' CHECK (status IN ('done', 'in_progress', 'coming_soon')),
  description TEXT,
  audio_url TEXT,
  cover_url TEXT,
  release_date DATE,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Studio updates table
CREATE TABLE IF NOT EXISTS studio_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  author_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Photos table
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VIP content table
CREATE TABLE IF NOT EXISTS vip_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('audio', 'video', 'image', 'text')),
  url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('track', 'photo', 'content')),
  item_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

-- Row Level Security Policies

-- Profiles: Users can read all, update own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tracks: Everyone can read, only admins/collaborators can modify
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tracks are viewable by everyone" ON tracks
  FOR SELECT USING (true);

CREATE POLICY "Admins and collaborators can manage tracks" ON tracks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'collaborator')
    )
  );

-- Studio updates: Everyone can read, authenticated users can insert, owners can delete
ALTER TABLE studio_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Updates are viewable by everyone" ON studio_updates
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create updates" ON studio_updates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own updates" ON studio_updates
  FOR DELETE USING (auth.uid() = user_id);

-- Photos: Everyone can read, admins/collaborators can manage
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Photos are viewable by everyone" ON photos
  FOR SELECT USING (true);

CREATE POLICY "Admins and collaborators can manage photos" ON photos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'collaborator')
    )
  );

-- VIP content: Public content visible to all, VIP content to VIP+
ALTER TABLE vip_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public content viewable by everyone" ON vip_content
  FOR SELECT USING (
    is_public = true
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'collaborator', 'vip')
    )
  );

CREATE POLICY "Admins and collaborators can manage VIP content" ON vip_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'collaborator')
    )
  );

-- Votes: Users can manage own votes
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can see all votes" ON votes
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own votes" ON votes
  FOR ALL USING (auth.uid() = user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', SPLIT_PART(NEW.email, '@', 1)),
    'fan'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert initial tracks
INSERT INTO tracks (title, label, status, order_index) VALUES
  ('CHEVY 1', 'TRACK 1', 'done', 1),
  ('TURN', 'TIMMY''S', 'in_progress', 2),
  ('TRACK', 'COLLAB', 'coming_soon', 3)
ON CONFLICT DO NOTHING;

-- Storage bucket for uploads
-- Run this in Supabase dashboard: Storage > New bucket > 'uploads' (public)
`;
