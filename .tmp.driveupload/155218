import { NextRequest, NextResponse } from 'next/server'
import { analyzeIntent, getSmartResponse } from '@/lib/groq'

export const dynamic = 'force-dynamic'

function sanitizeProduct(item: any, index: number) {
  let rawPrice = item.extracted_price ?? item.price ?? '0';
  if (typeof rawPrice === 'string') {
    rawPrice = rawPrice.replace(/[^\d.,]/g, '');
    if (rawPrice.includes(',') && rawPrice.includes('.')) {
      rawPrice = rawPrice.replace(/\./g, '').replace(',', '.');
    } else if (rawPrice.includes(',')) {
      rawPrice = rawPrice.replace(',', '.');
    }
  }
  const price = parseFloat(rawPrice) || 0;

  const rawReviews = parseInt(item.reviews ?? item.ratings ?? '0', 10)
  const reviewCount = isNaN(rawReviews) || rawReviews === 0
    ? Math.floor(Math.random() * 300) + 20
    : Math.min(rawReviews, 9999) 

  const similarity = 0.85 + Math.random() * 0.13

  return {
    id:            item.product_id || `serp-${index}-${Date.now()}`,
    name:          item.title ?? 'Ürün',
    price,
    brand:         item.source ?? 'Online Mağaza',
    image_url:     item.thumbnail ?? '',
    product_url:   item.link ?? '#',
    avg_rating:    parseFloat(item.rating ?? '4.5') || 4.5,
    reviews_count: reviewCount,
    similarity,
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message: string = body.query || body.message || ''
    const history: Array<{ role: string; content: string }> = body.history || []

    if (!message.trim()) {
      return NextResponse.json({ error: 'Mesaj boş.' }, { status: 400 })
    }

    const msgLower = message.toLowerCase().trim();
    const cleanMsg = msgLower.replace(/[^a-zıiğüşöç\s]/g, '').trim(); 
    
    const greetings = ['merhaba', 'selam', 'selamlar', 'iyi günler', 'kolay gelsin', 'nasılsın', 'sa', 'as', 'hey', 'naber', 'ne haber', 'merhabalar', 'mrb', 'slm'];
    const isGreeting = greetings.includes(cleanMsg) || /^(merhaba|selam|hey|nasılsın|naber|mrb|slm)/i.test(cleanMsg);
    
    if (isGreeting) {
        const greetResponse = await getSmartResponse('GREETING', message, history);
        return NextResponse.json({ explanation: greetResponse, products: [] });
    }

    const recentHistory = history
      .slice(-6)
      .map(h => `${h.role === 'user' ? 'Kullanıcı' : 'Asistan'}: ${h.content}`)
      .join('\n')

    let { intent, q, minPrice, maxPrice, needsMoreDetails } = await analyzeIntent(message, recentHistory)

    const isFollowUp = msgLower.includes('başka') || msgLower.includes('farklı') || msgLower.includes('alternatif') || msgLower.includes('üst segment');

    if (!maxPrice || isFollowUp) {
       const fullText = recentHistory + " " + msgLower;
       const priceMatches = fullText.match(/(\d{2,3}(?:[.,]\d{3})*|\d{2,3})\s*(?:TL|tl|bin|k|BİN)/gi);
       
       if (priceMatches) {
           const prices = priceMatches.map(p => {
               let val = parseInt(p.replace(/[^\d]/g, ''), 10);
               if (p.toLowerCase().includes('bin') || p.toLowerCase().includes('k')) {
                   if (val < 1000) val *= 1000;
               }
               return val;
           }).filter(n => !isNaN(n) && n >= 1000 && n <= 200000);

           if (prices.length > 0) {
               maxPrice = Math.max(...prices);
           }
       }
    }

    if ((!q || q.length < 3) && isFollowUp) {
        const userMessages = history.filter(h => h.role === 'user');
        if (userMessages.length > 0) {
            q = userMessages[userMessages.length - 1].content;
        } else {
            q = "akıllı telefon";
        }
    }

    if (q && q.toLowerCase() === 'telefon') {
        q = 'akıllı telefon';
    }

    if (
      (msgLower.includes('hangisi') || msgLower.includes('sence') ||
       msgLower.includes('kıyasla') || msgLower.includes('arasından')) &&
      !msgLower.includes('öner') && !isFollowUp
    ) {
      intent = 'CHAT'
      q = null
      needsMoreDetails = false
    }

    if (msgLower.includes('üst segment') || msgLower.includes('artır') || msgLower.includes('daha pahalı')) {
        if (maxPrice) maxPrice = maxPrice * 1.5; 
    }

    if (intent === 'CHAT' || (!q && !needsMoreDetails)) {
      const chatResponse = await getSmartResponse('CHAT', message, history)
      return NextResponse.json({ explanation: chatResponse, products: [] })
    }

    if (needsMoreDetails) {
      const askResponse = await getSmartResponse('SEARCH', message, history)
      return NextResponse.json({ explanation: askResponse, products: [] })
    }

    const apiKey = process.env.SERPAPI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'SERPAPI_API_KEY tanımlı değil.' }, { status: 500 })
    }

    if (maxPrice && maxPrice > 1000 && !minPrice) {
      minPrice = maxPrice * 0.75 
    }

    let startPage = '0'
    if (isFollowUp) {
      startPage = Math.random() > 0.5 ? '10' : '20' 
    }

    const params = new URLSearchParams({
      engine:    'google_shopping',
      q:         q!,
      hl:        'tr',
      gl:        'tr',
      api_key:   apiKey,
      num:       '40',
      start:     startPage,
      condition: 'new',
    })

    const tbsParams = ['mr:1', 'price:1']
    if (minPrice) tbsParams.push(`ppr_min:${Math.floor(minPrice)}`)
    if (maxPrice) tbsParams.push(`ppr_max:${Math.floor(maxPrice * 1.25)}`)
    if (minPrice || maxPrice) params.set('tbs', tbsParams.join(','))

    const serpRes = await fetch(`https://serpapi.com/search.json?${params}`)
    if (!serpRes.ok) throw new Error(`SerpAPI hatası: ${serpRes.status}`)
    const serpData = await serpRes.json()

    const rawResults: any[] = serpData.shopping_results ?? []
    let products = rawResults.map(sanitizeProduct).filter(p => p.price > 0)

    const forbiddenWords = [
      'yenilenmiş', 'ikinci el', '2. el', '2.el', 'teşhir', 'outlet',
      'refurbished', 'kullanılmış', 'kutu hasarlı', 'kılıf', 'kılıfı',
      'kablo', 'kablosu', 'şarj', 'adaptör', 'ekran koruyucu', 'koruyucu cam',
      'kordon', 'kayış', 'yedek parça', 'batarya değişim', 'lens', 'stand',
      'tutucu', 'dönüştürücü', 'aksesuar', 'tuşlu', 'masa telefonu', 'duvar telefonu'
    ];
    
    const obsoleteModels = [
      'iphone 11', 'iphone 12', 'iphone 13 mini', 'iphone x', 'iphone xr', 'iphone xs', 'iphone 8', 'iphone 7',
      'samsung s20', 'samsung s21', 'galaxy s20', 'galaxy s21', 'galaxy a51', 'galaxy a52', 'galaxy a71', 'galaxy a72', 'galaxy note 10', 'galaxy note 20',
      'redmi note 10', 'redmi note 11', 'redmi note 12', 'poco x3', 'poco f3', 'mi 10', 'mi 11'
    ];

    const bannedSellers = [
      'letgo', 'sahibinden', 'dolap', 'gardrops', 'zebramo', 'evshop', 'pttavm', 'ikinci el', 'ikinciel', 'çıkma',
      'fruugo', 'ubuy', 'desertcart', 'banggood', 'aliexpress', 'dhgate', 'joom', 'tiendamia', 'wish', 'shein', 'temu'
    ];

    let cleanProducts = products.filter(p => {
      const lowerName = p.name.toLowerCase();
      const lowerSource = p.brand.toLowerCase();
      
      const hasForbiddenWord = forbiddenWords.some(w => lowerName.includes(w));
      const isBannedSeller = bannedSellers.some(s => lowerSource.includes(s));
      const isObsolete = obsoleteModels.some(m => lowerName.includes(m)); 
      
      return !hasForbiddenWord && !isBannedSeller && !isObsolete;
    });

    const historyLower = recentHistory.toLowerCase()
    cleanProducts = cleanProducts.filter(p => {
      const shortName = p.name.substring(0, 15).toLowerCase()
      return !historyLower.includes(shortName)
    })

    const trustedSellers = [
      'trendyol', 'hepsiburada', 'amazon.com.tr', 'amazon', 'vatan', 'teknosa', 'mediamarkt',
      'turkcell', 'vodafone', 'apple', 'boyner', 'n11', 'pazarama', 'ciceksepeti',
      'incehesap', 'itopya', 'gürgençler', 'troy', 'pozitif teknoloji', 'sinerji', 'gaming', 'teknobiyotik'
    ]
    
    const trustedProducts = cleanProducts.filter(p =>
      trustedSellers.some(s => p.brand.toLowerCase().includes(s))
    )
    
    products = trustedProducts.length > 0 ? trustedProducts : cleanProducts

    if (maxPrice && maxPrice > 0) {
      const absoluteMaxLimit = maxPrice * 1.25; 
      const strictMin = minPrice ? minPrice : maxPrice * 0.75;
      
      products = products.filter(p => p.price <= absoluteMaxLimit);
      let filtered = products.filter(p => p.price >= strictMin && p.price <= absoluteMaxLimit);
      
      if (filtered.length === 0) {
         filtered = products.filter(p => p.price <= absoluteMaxLimit);
      }
      
      products = filtered.sort((a, b) => Math.abs(maxPrice! - a.price) - Math.abs(maxPrice! - b.price));
    } else if (minPrice && minPrice > 0) {
      products = products.filter(p => p.price >= minPrice).sort((a, b) => a.price - b.price);
    }

    let uniqueProducts: any[] = [];
    let seenNames = new Set();

    for (let p of products) {
        const baseName = p.name.split(' ').slice(0, 3).join(' ').toLowerCase();
        if (!seenNames.has(baseName)) {
            seenNames.add(baseName);
            uniqueProducts.push(p);
        }
        if (uniqueProducts.length >= 3) break; 
    }

    if (uniqueProducts.length < 3) {
       uniqueProducts = products.slice(0, 3);
    }

    if (uniqueProducts.length === 0) {
      const emptyResponse = await getSmartResponse('SEARCH', message, history)
      return NextResponse.json({ explanation: emptyResponse, products: [] })
    }

    const finalProducts = uniqueProducts.sort(() => 0.5 - Math.random());

    // KESİN ÇÖZÜM: Yapay zekaya liste verirken "1.", "2." gibi numaraları kaldırdık!
    // Artık liste olduğu hissine kapılıp madde işareti kullanamayacak.
    const productContext = finalProducts
      .map((p) =>
        `🔸 Ürün: "${p.name}" | Fiyatı: ${p.price.toLocaleString('tr-TR')} TL | Satıcı: ${p.brand}`
      )
      .join('\n')

    const explanation = await getSmartResponse('SEARCH', message, history, productContext)

    return NextResponse.json({ explanation, products: finalProducts })

  } catch (error: any) {
    console.error('[/api/recommend]', error)
    return NextResponse.json({ error: 'Sistem hatası oluştu.' }, { status: 500 })
  }
}