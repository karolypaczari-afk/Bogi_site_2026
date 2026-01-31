-- Bogi Site 2026 - Supabase Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/rhrclbsseerdtiaizyiq/sql

-- ============================================
-- TABLE: form_submissions
-- Stores contact form submissions
-- ============================================
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  source TEXT DEFAULT 'contact_form',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (frontend can submit forms)
CREATE POLICY "Allow anon inserts" ON form_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anon to read (for social proof popups)
CREATE POLICY "Allow anon reads" ON form_submissions
  FOR SELECT TO anon
  USING (true);

-- ============================================
-- TABLE: chat_leads
-- Stores AI chatbot conversation leads
-- ============================================
CREATE TABLE IF NOT EXISTS chat_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  linkedin_url TEXT,
  company TEXT,
  role TEXT,
  conversation_summary TEXT,
  lead_score INTEGER DEFAULT 0,
  utm_source TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anon inserts" ON chat_leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- ============================================
-- TABLE: site_images
-- Dynamic image management
-- ============================================
CREATE TABLE IF NOT EXISTS site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  alt_text TEXT,
  category TEXT, -- 'testimonial', 'blog', 'hero'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS with public read
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON site_images
  FOR SELECT TO anon
  USING (true);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 'All tables created successfully!' as message;
