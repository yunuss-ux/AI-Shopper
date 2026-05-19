// lib/groq.ts

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const FAST_MODEL   = 'llama-3.1-8b-instant'
const SMART_MODEL  = 'llama-3.3-70b-versatile'

type Role = 'user' | 'assistant' | 'system'
interface Msg { role: Role; content: string }

async function callGroq(
  model: string,
  messages: Msg[],
  opts: { json?: boolean; temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: opts.temperature ?? 0.3,
      max_tokens:  opts.maxTokens  ?? 1024,
      ...(opts.json ? { response_format: { type: 'json_object' } } : {}),
      messages,
    }),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Groq ${res.status}: ${txt}`)
  }

  const data = await res.json()
  return data.choices[0]?.message?.content?.trim() ?? ''
}

const GREETING_REGEX = /^(merhaba|selam|hey|hi|hello|iyi günler|günaydın|iyi akşamlar|nasılsın|naber|ne haber|sa|slm|mrb|teşekkür|sağ ol|tamam|anladım|peki|harika|süper|eyvallah|👋|:)[\s!?.]*$/i

export async function analyzeIntent(message: string, recentHistory: string) {
  const msg = message.trim()

  if (GREETING_REGEX.test(msg) || (msg.length < 5 && !/\d/.test(msg))) {
    return { intent: 'CHAT' as const, q: null, minPrice: null, maxPrice: null, needsMoreDetails: false }
  }

  const raw = await callGroq(
    SMART_MODEL,
    [
      {
        role: 'system',
        content: `Sen kusursuz bir e-ticaret analiz motorusun. YALNIZCA geçerli bir JSON döndür.
BÜTÇE KURALLARI:
- Kullanıcı "20000tl", "25 bin", "25k" diyorsa maxP kesinlikle RAKAM (20000, 25000) olmalı. Sayıları yakala.
- "Alternatif", "başka" diyorsa, geçmişteki ÜRÜNÜ q'ya, geçmişteki BÜTÇEYİ maxP'ye KOPYALA.
- q sadece kısa bir arama terimidir.`
      },
      {
        role: 'user',
        content: `Geçmiş:\n${recentHistory || 'Yok'}\nMesaj: ${msg}`,
      },
    ],
    { json: true, temperature: 0, maxTokens: 150 }
  )

  try {
    const p = JSON.parse(raw)
    return {
      intent:           (['CHAT', 'SEARCH'].includes(p.intent) ? p.intent : 'SEARCH') as 'CHAT' | 'SEARCH',
      q:                typeof p.q === 'string' && p.q.trim() ? p.q.trim() : null,
      minPrice:         p.minP ? Number(p.minP) : null,
      maxPrice:         p.maxP ? Number(p.maxP) : null,
      needsMoreDetails: Boolean(p.needsMoreDetails),
    }
  } catch {
    return { intent: 'SEARCH' as const, q: msg, minPrice: null, maxPrice: null, needsMoreDetails: false }
  }
}

export async function getSmartResponse(
  mode: 'CHAT' | 'SEARCH' | 'GREETING',
  userMessage: string,
  history: Array<{ role: string; content: string }>,
  productContext?: string
): Promise<string> {
  
  if (mode === 'GREETING') {
    const greetPrompt = `Sen "AI Shopper" adlı zeki ve samimi bir asistanısın. Asla ezberlenmiş cümle kurma, doğalca selam ver ve ne aradığını sor.`;
    const msgs: Msg[] = [
      { role: 'system', content: greetPrompt },
      { role: 'user', content: userMessage }
    ];
    let res = await callGroq(FAST_MODEL, msgs, { temperature: 0.7, maxTokens: 150 });
    return res.replace(/^(Asistan:|Kullanıcı:)\s*/i, '').trim();
  }

  let systemPrompt = `Sen "AI Shopper" adlı doğal konuşan bir asistansın.
ÖLÜMCÜL KURALLAR:
1. ÜŞENGEÇLİK YASAK (TÜM ÜRÜNLERİ ANLAT): Sana verilen ürün listesinde 3 ürün varsa, ÜÇÜNÜN DE ismini anarak tek tek kıyaslamak ZORUNDASIN! Aradan bir ürünü atlamak, eksik bilgi vermek kesinlikle yasaktır! 
2. MADDE İŞARETİ VE LİSTE YASAK: Ekrana "1.", "2.", "-" veya "*" gibi işaretler koyarak alt alta liste YAPMA! Ürünleri art arda, sohbet eder gibi tek bir paragraf veya iki düz paragraf halinde akıcı bir şekilde anlat.
3. FİYAT YORUMU YASAK: Sana listesi verilen ürünlerin HEPSİ kullanıcının bütçesine uygundur. "Bütçenizi aşıyor", "bütçenize uygun olmayabilir" gibi yorumlar YAPMA!
4. CİNSİYET KURALI: Elektronik ürünlerde asla cinsiyet sorma! Sadece giyim/saatte sor.`;

  if (mode === 'CHAT') {
    systemPrompt += `\n\n[GÖREV]: Sohbet geçmişini referans alarak cevap ver. Hayali ürün uydurma.`;
  } else if (productContext) {
    systemPrompt += `\n\n[GÖREV]: Sana sunulan listedeki TÜM ürünleri (hiçbirini atlamadan) DÜZ PARAGRAF şeklinde kıyasla.\n\nÜRÜNLER:\n${productContext}`;
  } else {
    systemPrompt += `\n\n[GÖREV]: Cihaz bulunamadı. Kullanıcıya bütçeyi esnetmesini sor.`;
  }

  let finalUserMessage = history.length > 0 
    ? `Soru: ${userMessage}` 
    : userMessage;

  if (productContext) {
    finalUserMessage += `\n\n━━━ GÜVENLİ ÜRÜN LİSTESİ ━━━\n${productContext}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━`
  }

  const messagesToSend: Msg[] = [
    { role: 'system', content: systemPrompt }
  ];

  const validHistory = history.slice(-4).map(h => ({
    role: (h.role === 'user' ? 'user' : 'assistant') as Role,
    content: h.content || ''
  }));
  messagesToSend.push(...validHistory);
  messagesToSend.push({ role: 'user', content: finalUserMessage });

  let response = await callGroq(FAST_MODEL, messagesToSend, { temperature: 0.4, maxTokens: 1024 });
  
  const unwanted = /^(Asistan\s*:|Kullanıcı\s*:|AI Shopper\s*:|Sohbet Geçmişi\s*:|Geçmiş:\s*|Soru:\s*)/gi
  for (let i = 0; i < 3; i++) {
    response = response.replace(unwanted, '').trim()
  }

  return response
}

export async function generateReviewSummary(
  productName: string,
  brand: string
): Promise<{ pros: string[]; cons: string[] }> {
  const raw = await callGroq(
    FAST_MODEL,
    [
      {
        role: 'system',
        content: `Sen e-ticaret ürün analistisisin. SADECE geçerli JSON döndür: {"pros":["artı1"],"cons":["eksi1"]}`,
      },
      { role: 'user', content: `Marka: ${brand} | Ürün: ${productName}` },
    ],
    { json: true, temperature: 0.4, maxTokens: 256 }
  )

  try {
    const p = JSON.parse(raw)
    return {
      pros: Array.isArray(p.pros) ? p.pros.slice(0, 3).map(String) : ['Kullanıcı memnuniyeti genel olarak yüksek.'],
      cons: Array.isArray(p.cons) ? p.cons.slice(0, 2).map(String) : ['Bazı kullanıcılar fiyat/performans dengesini sorgulamış.'],
    }
  } catch {
    return {
      pros: ['Malzeme kalitesi ve genel performans beğeni topluyor.'],
      cons: ['Yoğun kullanımda optimizasyon gerekebilir.'],
    }
  }
}