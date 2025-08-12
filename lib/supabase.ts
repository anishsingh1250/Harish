import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// For demo mode, use valid defaults when environment variables are misconfigured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('http') 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL 
  : 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.startsWith('eyJ') 
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
  : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvY2FsaG9zdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc3ODQ5MjAwLCJleHAiOjE5OTMyMDkyMDB9.QY8NdRPHlRPHblSWAzKb1N5VfNXsfrI9DQPvjGhpgWA'

// Mock authentication for development
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Use custom auth for demo mode
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Server-side client for admin operations
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvY2FsaG9zdCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2Nzc4NDkyMDAsImV4cCI6MTk5MzIwOTIwMH0.LuwhrPlHjmhc0_UhxZMqRqB1CWYuQjjqjlQQrYWl-JA',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Mock authentication service for development
export const mockAuth = {
  signIn: async (email: string, password: string) => {
    // Demo credentials
    if (email === 'superadmin@transport-erp.com' && password === 'superadmin123') {
      const mockUser = {
        id: '1',
        email: 'superadmin@transport-erp.com',
        user_metadata: { 
          name: 'Super Admin',
          role: 'super_admin' 
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        aud: 'authenticated',
        role: 'authenticated'
      }
      
      // Store in localStorage for demo
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo-user', JSON.stringify(mockUser))
      }
      
      return { data: { user: mockUser }, error: null }
    }
    
    return { data: null, error: new Error('Invalid credentials') }
  },
  
  signOut: async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demo-user')
    }
    return { error: null }
  },
  
  getUser: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('demo-user')
      if (stored) {
        return { data: { user: JSON.parse(stored) }, error: null }
      }
    }
    return { data: { user: null }, error: null }
  }
}