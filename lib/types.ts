// Common type definitions for the Transport ERP system

export interface User {
  id: string
  email: string
  user_metadata?: {
    first_name?: string
    last_name?: string
    avatar_url?: string
  }
}

export interface Company {
  id: number
  name: string
  code: string
  contact_person?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  tax_id?: string
  license_number?: string
  subscription_plan?: string
  subscription_expires?: string
  is_active?: boolean
  logo_filename?: string
  created_at?: string
  updated_at?: string
}

export interface Client {
  id: number
  name: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  tax_id?: string
  contact_person?: string
  credit_limit?: number
  payment_terms?: string
  is_active?: boolean
  company_id: number
  created_at?: string
  updated_at?: string
}

export interface Vehicle {
  id: number
  registration_number: string
  vehicle_type: string
  make?: string
  model?: string
  year?: number
  capacity?: number
  driver_name?: string
  driver_phone?: string
  driver_license?: string
  insurance_number?: string
  insurance_expiry?: string
  fitness_expiry?: string
  permit_expiry?: string
  is_active?: boolean
  company_id: number
  created_at?: string
  updated_at?: string
}

export interface Transaction {
  id: number
  transaction_number: string
  client_id: number
  vehicle_id?: number
  from_location: string
  to_location: string
  goods_description?: string
  weight?: number
  freight_amount?: number
  advance_amount?: number
  balance_amount?: number
  status?: string
  pickup_date?: string
  delivery_date?: string
  actual_delivery_date?: string
  company_id: number
  created_at?: string
  updated_at?: string
}

export interface Invoice {
  id: number
  invoice_number: string
  client_id: number
  invoice_date: string
  due_date: string
  subtotal: number
  tax_amount: number
  total_amount: number
  status?: string
  notes?: string
  company_id: number
  created_at?: string
  updated_at?: string
}