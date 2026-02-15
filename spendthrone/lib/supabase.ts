import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oooijcrqpuqymgzlidrw.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vb2lqY3JxcHVxeW1nemxpZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDY0MjcsImV4cCI6MjA4NTgyMjQyN30.EhnfDdDPRjlOK7OzJCpAF7aGG4fDtf9bE39QmxBhytw'

export const isSupabaseEnabled = !!(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseEnabled 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

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

export async function getProducts(category?: string) {
  let query = supabase!
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
  const { data, error } = await supabase!
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data as Product
}
