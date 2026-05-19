import { supabaseAdmin } from './supabase-admin'

export interface ProductMatch {
  id: string
  name: string
  slug: string
  description: string
  category: string
  brand: string
  price: number
  image_url: string
  tags: string[]
  avg_rating: number
  review_count: number
  similarity: number
}

export async function searchByEmbedding(
  embedding: number[],
  threshold = 0.35,
  count = 3
): Promise<ProductMatch[]> {
  const { data, error } = await supabaseAdmin.rpc('match_products_by_embedding', {
    query_embedding: embedding,
    match_threshold: threshold,
    match_count: count,
  })

  if (error) {
    console.error('Vector search başarısız, fallback kullanılıyor:', error.message)
    const { data: fallback } = await supabaseAdmin
      .from('products')
      .select('id, name, slug, description, category, brand, price, image_url, tags, avg_rating, review_count')
      .order('avg_rating', { ascending: false })
      .limit(count)

    return (fallback ?? []).map(p => ({ ...p, similarity: 0.70 }))
  }

  return data ?? []
}