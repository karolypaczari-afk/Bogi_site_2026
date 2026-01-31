# Supabase Setup Guide for Bogi Site 2026

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - **Name**: `bogi-site-2026`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., `eu-central-1` for Europe)
4. Click **Create new project** and wait ~2 minutes

## Step 2: Get Your API Keys

After project creation:
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJI...` (safe for frontend)

## Step 3: Create Database Tables

Go to **SQL Editor** and run:

```sql
-- Form Submissions Table
CREATE TABLE form_submissions (
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

-- Allow inserts from anon users (frontend)
CREATE POLICY "Allow anon inserts" ON form_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Chat Leads Table (for AI Chatbot)
CREATE TABLE chat_leads (
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

-- Allow inserts from anon users
CREATE POLICY "Allow anon inserts" ON chat_leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Site Images Table (for dynamic image management)
CREATE TABLE site_images (
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
```

## Step 4: Create Storage Bucket

1. Go to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Name: `site-images`
4. Check **Public bucket** (allows CDN access)
5. Click **Create bucket**

## Step 5: Add Environment Variables

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 6: Verify Setup

After completing steps above, the site will be ready to:
- Store form submissions in `form_submissions` table
- Store AI chatbot leads in `chat_leads` table
- Serve images from Supabase Storage CDN
