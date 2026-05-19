import { NextRequest, NextResponse } from 'next/server'
import { embedBatch } from '@/lib/embeddings'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const singleId: string | null = body.productId ?? null

    let query = supabaseAdmin
      .from('products')
      .select('id, name, description, tags, category, brand')

    if (singleId) {
      query = query.eq('id', singleId)
    }

    const { data: products, error } = await query
    if (error || !products || products.length === 0) {
      return NextResponse.json({ error: 'Ürünler getirilemedi veya boş.' }, { status: 500 })
    }

    // Embed metinlerini hazırla (Metin kalitesi için noktalarla ayırdık)
    const texts = products.map(p =>
      `${p.name}. ${p.brand}. ${p.category}. ${p.description}. ${p.tags?.join(', ') || ''}`
    )

    // Batch embed işlemi
    const embeddings = await embedBatch(texts)

    // Supabase'e upsert et
    const rows = products.map((p, i) => ({
      product_id: p.id,
      embedding: embeddings[i],
      embedding_source: 'name+brand+category+description+tags',
    }))

    const { error: uErr } = await supabaseAdmin
      .from('product_embeddings')
      .upsert(rows, { onConflict: 'product_id' })

    if (uErr) {
      return NextResponse.json({ error: `Kayıt hatası: ${uErr.message}` }, { status: 500 })
    }

    return NextResponse.json({
      total: products.length,
      successful: products.length,
      message: `${products.length} ürün başarıyla embed edildi.`,
    })
  } catch (err: any) {
    console.error('[/api/embed]', err)
    return NextResponse.json({ error: 'Embedding işlemi başarısız: ' + err.message }, { status: 500 })
  }
}