# AI Shopper - Akıllı Alışveriş Asistanı

AI Shopper, SerpApi (Google Shopping) kullanarak, kullanıcıların bütçelerine ve tercihlerine en uygun ürünleri bulan, yapay zeka destekli gelişmiş bir alışveriş asistanıdır.

## 🚀 Proje Hakkında
Bu proje, kullanıcıdan alınan bütçe ve tercih bilgilerini analiz eder, Google Shopping üzerinden güncel fiyatlı ve stoklu ürünleri tarar ve ardından yapay zeka (Groq API) aracılığıyla bu cihazları teknik özelliklerine göre karşılaştırarak kullanıcıya en doğru öneriyi sunar.

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
Proje ana dizininde .env adında bir dosya oluşturun ve içine kendi API anahtarlarınızı yazın:

GROQ_API_KEY=senin_groq_api_keyin
SERPAPI_API_KEY=senin_serpapi_anahtarın

🔑 API Anahtarlarını Edinme
Uygulamanın tam fonksiyonel çalışabilmesi için aşağıdaki iki API anahtarına ihtiyacınız var:

SerpApi (Google Shopping Arama Motoru): SerpApi'ye gidin ve ücretsiz bir hesap oluşturun.

Dashboard kısmından API Keyinizi kopyalayın.

Kullanım amacı: Google Shopping sonuçlarını taramak ve ürün bilgilerini çekmek için gereklidir.

Groq API:

Groq Console üzerinden ücretsiz API anahtarınızı oluşturun.

Kullanım amacı: Ürünleri yapay zeka ile analiz edip size en mantıklı önerileri sunmak için gereklidir.

3. Adım: Başlatma
Projenin ana dizininde bulunan start.bat dosyasına çift tıklamanız yeterlidir. Bu dosya, arka planda gerekli tüm sunucuları sizin yerinize otomatik olarak başlatacaktır.

Alternatif olarak manuel başlatmak isterseniz terminalde npm run dev komutunu kullanabilirsiniz.
