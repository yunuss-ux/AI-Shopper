import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { embedText } from '@/lib/embeddings'; // s harfi eklendi: embeddings.ts'den çekiyoruz
import { extractSearchIntent, getChatResponse } from '@/lib/groq'; // groq.ts içindeki fonksiyonları kullanıyoruz

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Kullanıcı 'message' veya 'query' gönderebilir
    const message = body.message || body.query; 

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: "Lütfen geçerli bir mesaj gönderin." }, { status: 400 });
    }

    // 1. ADIM: Groq ile arama niyetini genişlet (Niyet Okuma)
    // Claude'un groq.ts dosyasındaki fonksiyonu çağırıyoruz
    const enhancedQuery = await extractSearchIntent(message);

    // 2. ADIM: Kullanıcının sorusunu YEREL VEKTÖR'e (Xenova - 384 boyut) dönüştür
    // embeddings.ts içindeki fonksiyonu çağırıyoruz
    const queryVector = await embedText(enhancedQuery);

    // 3. ADIM: Supabase SQL fonksiyonu ile benzer ürünleri bul
    const { data: matchedProducts, error: searchError } = await supabaseAdmin.rpc('match_products_by_embedding', {
      query_embedding: queryVector,
      match_threshold: 0.15, // Hassasiyeti biraz artırdık (0.10 - 0.20 arası idealdir)
      match_count: 3
    });

    if (searchError) throw new Error("Vektör arama hatası: " + searchError.message);

    // 4. ADIM: Bulunan ürünleri GROQ (Llama 3.3) ile yorumlat
    // Ürün isimlerini ve markalarını Groq'a bağlam kurması için gönderiyoruz
    const productContext = matchedProducts?.length 
      ? matchedProducts.map((p: any) => `${p.brand} ${p.name} ($${p.price})`).join(', ')
      : "Uygun ürün bulunamadı";

    // groq.ts dosyasındaki getChatResponse fonksiyonunu kullanıyoruz
    const explanation = await getChatResponse(message, productContext);

    // 5. ADIM: Sonuçları döndür
    return NextResponse.json({ 
      explanation, 
      products: matchedProducts || [],
      enhancedQuery 
    });

  } catch (error: any) {
    console.error("AI Server Error:", error.message);
    return NextResponse.json({ 
      error: "Asistan şu an cevap veremiyor.", 
      details: error.message 
    }, { status: 500 });
  }
}

// CORS Ayarları (Opsiyonel ama hata önleyicidir)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}