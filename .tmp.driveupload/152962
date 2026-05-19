import React from 'react';
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { Brain, Zap, ShieldCheck, Search, Sparkles, ArrowRight } from 'lucide-react';


export const LandingFeatures = () => {
  const navigate = useNavigate();

  // Örnek sorgulara tıklandığında doğrudan AI sayfasını başlatır
  const handleQuickSearch = (query: string) => {
    navigate('/analysis', { state: { query } });
  };

  const prompts = [
    "Yazılım mühendisliği için 32GB RAM'li bilgisayarlar",
    "Spor yaparken kulaktan düşmeyen kablosuz kulaklık",
    "Fiyat performans odaklı akıllı saatler",
    "Gürültü engelleyici (ANC) özellikli kulak üstü modeller"
  ];

  return (
    <div className="w-full bg-[#0C0C0C] text-[#D7E2EA] flex flex-col items-center">
      
      {/* ── 1. ÖZELLİKLER BÖLÜMÜ (Neden AI Shopper?) ── */}
      <section className="w-full max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Alışverişin <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#B600A8]">Yeni Kodu</span>
          </h2>
          <p className="text-[#D7E2EA]/50 max-w-2xl mx-auto text-sm md:text-base">
            Saatlerce ürün incelemesi okumaya ve sahte yorumlarla boğuşmaya son. Yapay zeka senin için her şeyi saniyeler içinde analiz eder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kart 1 */}
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.05] hover:border-[#B600A8]/40 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-[#B600A8]/20 flex items-center justify-center mb-6 border border-[#B600A8]/30 group-hover:scale-110 transition-transform">
              <Brain className="text-[#B600A8]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Niyetini Anlar</h3>
            <p className="text-[#D7E2EA]/40 text-sm leading-relaxed">
              "Babama hediye alacağım" dediğinde senin için en uygun kategorileri kendi bulur. Anahtar kelime ezberlemene gerek kalmaz.
            </p>
          </div>

          {/* Kart 2 */}
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.05] hover:border-[#B600A8]/40 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-[#B600A8]/20 flex items-center justify-center mb-6 border border-[#B600A8]/30 group-hover:scale-110 transition-transform">
              <Zap className="text-[#B600A8]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Işık Hızında</h3>
            <p className="text-[#D7E2EA]/40 text-sm leading-relaxed">
              Groq LLaMA 3.3 entegrasyonu sayesinde arama sonuçların ve ürün özetlerin sadece saniyeler içinde ekranına dökülür.
            </p>
          </div>

          {/* Kart 3 */}
          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl hover:bg-white/[0.05] hover:border-[#B600A8]/40 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-[#B600A8]/20 flex items-center justify-center mb-6 border border-[#B600A8]/30 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-[#B600A8]" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Objektif Özetler</h3>
            <p className="text-[#D7E2EA]/40 text-sm leading-relaxed">
              Binlerce gerçek kullanıcı yorumunu tarar. Ürünlerin sadece artılarını değil, eksilerini de filtrelenmemiş şekilde sana sunar.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. HIZLI ARAMA (İlham Alın) BÖLÜMÜ ── */}
      <section className="w-full bg-gradient-to-b from-[#0C0C0C] to-[#151515] border-t border-white/5 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Sparkles className="text-[#B600A8] mx-auto mb-4" size={32} />
          <h2 className="text-3xl font-bold text-white mb-8">Nereden Başlayacağını Bilmiyor Musun?</h2>
          
          <div className="flex flex-col gap-4">
            {prompts.map((prompt, index) => (
              <button 
                key={index}
                onClick={() => handleQuickSearch(prompt)}
                className="w-full bg-white/5 border border-white/10 hover:border-[#B600A8]/50 hover:bg-white/10 p-5 rounded-2xl flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex items-center gap-4 text-left">
                  <Search size={18} className="text-[#B600A8] opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[#D7E2EA]/70 group-hover:text-white transition-colors text-sm md:text-base">
                    "{prompt}"
                  </span>
                </div>
                <ArrowRight size={18} className="text-white/30 group-hover:text-[#B600A8] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ŞIK FOOTER (Alt Bilgi) ── */}
      <footer className="w-full border-t border-white/10 bg-[#0C0C0C] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#B600A8]" />
            <span className="text-white font-black tracking-widest uppercase">AI Shopper</span>
          </div>
          <div className="flex gap-6 text-[12px] font-semibold text-[#D7E2EA]/40 uppercase tracking-widest">
            <a href="#" className="hover:text-[#B600A8] transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-[#B600A8] transition-colors">Şartlar</a>
            <a href="#" className="hover:text-[#B600A8] transition-colors">İletişim</a>
          </div>
          <p className="text-[#D7E2EA]/30 text-xs">
            © {new Date().getFullYear()} AI Shopper. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>

    </div>
  );
};