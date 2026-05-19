// src/pages/InfoPages.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Cpu, Search, Zap, Star, MessageSquare, Mail, Sparkles } from 'lucide-react';

// ── ORTAK ÜST BİLEŞEN (HEADER) ──
const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-[#0C0C0C]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#B600A8]/20 flex items-center justify-center border border-[#B600A8]/30">
          <Sparkles size={20} className="text-[#B600A8]" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white tracking-wide">{title}</h1>
          <p className="text-[11px] text-white/40 uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white text-white/60 transition-all font-semibold text-sm group"
      >
        Ana Sayfa
        <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </header>
  );
};

// ── 1. NASIL ÇALIŞIR SAYFASI ──
export const HowItWorksPage = () => (
  <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] selection:bg-[#B600A8] selection:text-white pb-20">
    <PageHeader title="Nasıl Çalışır?" subtitle="Yapay Zeka Mimarisi" />
    <main className="max-w-5xl mx-auto p-8 mt-10 space-y-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#B600A8] mb-4">Sihir Değil, Teknoloji</h2>
        <p className="text-white/40 max-w-2xl mx-auto">Sıradan anahtar kelime aramalarını unutun. Sistemimiz niyetinizi anlar ve size en uygun olanı bulur.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <Search size={32}/>, title: "1. Niyet Analizi", desc: "Siz aramanızı yaptığınızda, Groq LLaMA 3.3 modeli cümlenizin arkasındaki gerçek ihtiyacı anlar ve anahtar kelimelere çevirir." },
          { icon: <Cpu size={32}/>, title: "2. Vektörel Eşleştirme", desc: "Aramanız Jina AI ile matematiksel vektörlere (384 boyut) dönüştürülür ve veritabanındaki ürünlerle saniyeler içinde eşleştirilir." },
          { icon: <MessageSquare size={32}/>, title: "3. Akıllı Özetleme", desc: "Bulunan ürünlerin binlerce müşteri yorumu analiz edilir ve size saniyeler içinde artı/eksi listesi olarak sunulur." }
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-[#B600A8]/50 transition-colors">
            <div className="text-[#B600A8] mb-6">{item.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </main>
  </div>
);

// ── 2. ÖZELLİKLER SAYFASI ──
export const FeaturesPage = () => (
  <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] pb-20">
    <PageHeader title="Özellikler" subtitle="Sistemin Gücü" />
    <main className="max-w-5xl mx-auto p-8 mt-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-[#B600A8]/20 to-transparent border border-[#B600A8]/30 p-10 rounded-[3rem]">
          <Zap size={40} className="text-[#B600A8] mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Işık Hızında Groq</h2>
          <p className="text-white/60 leading-relaxed">Geleneksel yapay zekalardan 10 kat daha hızlı olan Groq LPU motoru sayesinde, saniyede 800 token üreterek alışveriş deneyiminizi bekleme süresi olmadan yaşarsınız.</p>
        </div>
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Star className="text-amber-400"/> Duygu Analizi (Sentiment)</h3>
            <p className="text-white/50 text-sm">Ürün yorumları "Pozitif, Negatif, Karmaşık" olarak etiketlenir, tuzak ürünlerden korunursunuz.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Sparkles className="text-[#B600A8]"/> Kesintisiz Sohbet</h3>
            <p className="text-white/50 text-sm">Önerilen bir ürün hakkında ek sorular sorabilir, asistanınızla tam ekran arayüzde dilediğiniz gibi tartışabilirsiniz.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
);

// ── 3. ÖNERİLER SAYFASI ──
export const SuggestionsPage = () => {
  const navigate = useNavigate();
  const suggestions = [
    "Yazılım mühendisliği öğrencisi için 1500$ altı laptop",
    "Çok seyahat eden babam için gürültü engelleyici kulaklık",
    "Video kurgu yapmak için uygun fiyatlı Apple ürünleri",
    "Fotoğrafçı arkadaşıma alabileceğim 200$ civarı hediye",
    "Sadece oyun oynamak için toplama bilgisayar parçaları",
    "Yüzme ve fitness takibi yapabilen akıllı saat"
  ];

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] pb-20">
      <PageHeader title="Öneriler" subtitle="Neler Sorabilirsiniz?" />
      <main className="max-w-4xl mx-auto p-8 mt-10">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">İlham Alın</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {suggestions.map((s, i) => (
            <button 
              key={i} 
              onClick={() => navigate('/analysis', { state: { query: s } })}
              className="text-left bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 hover:border-[#B600A8]/50 hover:text-white transition-all group"
            >
              <div className="flex justify-between items-center">
                <span>"{s}"</span>
                <Search size={16} className="text-[#B600A8] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

// ── 4. İLETİŞİM SAYFASI ──
export const ContactPage = () => (
  <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA]">
    <PageHeader title="İletişim" subtitle="Bize Ulaşın" />
    <main className="max-w-2xl mx-auto p-8 mt-10">
      <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2rem] text-center">
        <Mail size={48} className="text-[#B600A8] mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Geliştirici Ekip</h2>
        <p className="text-white/50 mb-8">AI Shopper projesi hakkında geri bildirim vermek, hata bildirmek veya iş birliği yapmak için bize ulaşabilirsiniz.</p>
        <a href="mailto:hello@aishopper.com" className="inline-flex items-center gap-2 bg-[#B600A8] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#d400c4] transition-colors">
          Bize E-Posta Gönder
        </a>
      </div>
    </main>
  </div>
);