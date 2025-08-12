import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Environment variables with fallbacks for demo mode
const supabaseUrl = https://phhtfjconrhlgrylqwgj.supabase.co
const supabaseAnonKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoaHRmamNvbnJobGdyeWxxd2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MzQ2MDYsImV4cCI6MjA3MDQxMDYwNn0.7PUvPkj0FYYvH3bhJzE_EhkHT53PzEFRTagTMSF2sQY
 
// Create the supabase client
export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Export default client for convenience
export default supabaseClient

// Server-side admin client
const supabaseServiceKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoaHRmamNvbnJobGdyeWxxd2dqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDgzNDYwNiwiZXhwIjoyMDcwNDEwNjA2fQ.qjjjCMaDdRPI8qUkSGsW9Te0QniC0w9S2iT--uOn4yA


export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)