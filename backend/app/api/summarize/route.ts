import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { productName, brand } = await req.json();
    
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `Sen bir e-ticaret uzmanısın. Sana verilen ürün adı ve markaya göre, internetteki kullanıcı yorumlarını analiz etmiş gibi simüle ederek 2 adet kısa ve öz ARTI (pro) ve 1 adet kısa ve öz EKSİ (con) özellik üret. 
            DİKKAT: Ürün neyse ona göre özellik yaz. Saate kulaklık pedi yazma! Saat ise ekran, batarya, spor modlarından bahset. Kulaklık ise ses kalitesinden, konforundan bahset. Ayakkabı ise taban rahatlığı, kalıp durumundan bahset.
            Sadece geçerli bir JSON döndür. Format: {"pros": ["arti1", "arti2"], "cons": ["eksi1"]}`
          },
          { role: 'user', content: `Marka: ${brand}, Ürün Adı: ${productName}` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.5
      })
    });

    const groqData = await groqRes.json();
    const parsedData = JSON.parse(groqData.choices[0].message.content || '{}');
    return NextResponse.json(parsedData);

  } catch (error) {
    return NextResponse.json({
      pros: ["Malzeme kalitesi ve genel performansı kullanıcılar tarafından başarılı bulunmuş.", "Fiyat performans dengesi segmentine göre oldukça iyi."],
      cons: ["Yoğun kullanım senaryolarında uzun ömürlülük durumu bir tık daha optimize edilebilirdi."]
    });
  }
}