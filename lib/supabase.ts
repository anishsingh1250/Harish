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

// Mock authentication system for development
export const mockAuth = {
  getUser: () => {
    if (typeof window === 'undefined') return { data: { user: null } }
    const user = localStorage.getItem('mock_user')
    return {
      data: {
        user: user ? JSON.parse(user) : null
      }
    }
  },

  signIn: async (email: string, password: string) => {
    // Demo credentials validation
    if ((email === 'superadmin@transport-erp.com' || email === 'superadmin') && password === 'superadmin123') {
      const mockUser = {
        id: '1',
        email: 'superadmin@transport-erp.com',
        user_metadata: {
          first_name: 'Super',
          last_name: 'Admin',
          role: 'super_admin'
        }
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_user', JSON.stringify(mockUser))
      }
      return { data: { user: mockUser }, error: null }
    }
    return { data: { user: null }, error: 'Invalid credentials' }
  },

  signOut: async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock_user')
    }
    return { error: null }
  }
}