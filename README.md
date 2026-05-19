# AI Shopper - Akıllı Alışveriş Asistanı

AI Shopper, Google Gemini API ve SerpApi (Google Shopping) kullanarak, kullanıcıların bütçelerine ve tercihlerine en uygun ürünleri  bulan, yapay zeka destekli gelişmiş bir alışveriş asistanıdır.

## 🚀 Proje Hakkında
Bu proje, kullanıcıdan alınan bütçe ve tercih bilgilerini analiz eder, Google Shopping üzerinden güncel fiyatlı ve stoklu ürünleri tarar ve ardından yapay zeka aracılığıyla bu cihazları teknik özelliklerine göre karşılaştırarak kullanıcıya en doğru öneriyi sunar.

## 🛠 Kullanılan Teknolojiler
- **Framework:** Next.js
- **Dil:** TypeScript
- **AI/LLM:** Groq API
- **Arama Motoru:** Google Shopping API (SerpApi)
- **Stil:** Tailwind CSS

## 📋 Kurulum ve Çalıştırma

### 1. Adım: Klonla ve Yükle
Projeyi bilgisayarınıza indirin ve terminalde proje klasörüne girip gerekli paketleri yükleyin:
```bash
git clone [https://github.com/yunuss-ux/AI-Shopper.git](https://github.com/yunuss-ux/AI-Shopper.git)
cd AI-Shopper
npm install

2. Adım: API Ayarları (Çok Önemli!)
Proje ana dizininde .env adında bir dosya oluşturun ve içine kendi API anahtarlarınızı yazın.

## 🔑 API Anahtarlarını Edinme
Uygulamanın tam fonksiyonel çalışabilmesi için aşağıdaki iki API anahtarına ihtiyacınız var:

1. **SerpApi (Google Shopping Arama Motoru):** - [SerpApi'ye gidin](https://serpapi.com/) ve ücretsiz bir hesap oluşturun.
   - Dashboard kısmından `API Key`inizi kopyalayın.
   - *Kullanım amacı:* Google Shopping sonuçlarını taramak ve ürün bilgilerini çekmek için gereklidir.

2. **Groq API (veya Gemini API):**
   - [Groq Console](https://console.groq.com/) üzerinden ücretsiz API anahtarınızı oluşturun.
   - *Kullanım amacı:* Ürünleri yapay zeka ile analiz edip size en mantıklı önerileri sunmak için gereklidir.


3. Adım: Başlatma
Projenin ana dizininde bulunan start.bat dosyasına çift tıklamanız yeterlidir. Bu dosya, arka planda gerekli tüm sunucuları sizin yerinize otomatik olarak başlatacaktır.

Alternatif olarak manuel başlatmak isterseniz terminalde npm run dev komutunu kullanabilirsiniz.