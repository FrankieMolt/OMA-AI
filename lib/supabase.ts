export { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseEnabled = !!(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseEnabled 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

// Error handler
export function handleSupabaseError(error: any): never {
  console.error('Supabase error:', error)
  throw new Error(error?.message || 'Database error')
}

// Types
export interface Service {
  id: string
  name: string
  description: string
  category: string
  provider: string
  endpoint_url: string
  price_per_call: number
  price_type: string
  rating: number
  total_calls: number
  tags: string[]
  featured: boolean
  icon_url: string | null
  documentation_url: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  reward_usd: number
  reward_currency: string
  status: string
  created_by: string | null
  assigned_to: string | null
  deadline: string | null
  tags: string[]
  requirements: string | null
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string | null
  category: string
  price: number
  original_price: number | null
  currency: string
  image_url: string | null
  gallery_urls: string[] | null
  rating: number
  review_count: number
  in_stock: boolean
  stock_count: number
  tags: string[]
  features: string[]
  specifications: Record<string, any> | null
  affiliate_url: string | null
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  created_at: string
}

export interface Experiment {
  id: string
  title: string
  slug: string
  description: string
  category: string
  content: string
  questions: any[] | null
  results: any[] | null
  created_at: string
  updated_at: string
}

// Helper functions
export async function getServices(limit = 50, category?: string) {
  let query = supabase
    .from('services')
    .select('*')
    .eq('status', 'active')
    .order('featured', { ascending: false })
    .limit(limit)
  
  if (category && category !== 'all') {
    query = query.eq('category', category)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data as Service[]
}

export async function getTasks(status = 'open') {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Task[]
}

export async function getProducts(category?: string) {
  let query = supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('rating', { ascending: false })
  
  if (category && category !== 'all') {
    query = query.eq('category', category)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data as Product
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data as Category[]
}

export async function getExperiments() {
  const { data, error } = await supabase
    .from('experiments')
    .select('*')
    .order('title')
  
  if (error) throw error
  return data as Experiment[]
}

export async function getExperimentBySlug(slug: string) {
  const { data, error } = await supabase
    .from('experiments')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data as Experiment
}
