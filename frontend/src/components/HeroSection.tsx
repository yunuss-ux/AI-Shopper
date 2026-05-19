"use client";

import React, { useState, useEffect } from 'react'; // <-- useEffect eklendi
import { useNavigate, Link } from 'react-router-dom';

import { FadeIn } from './ui/FadeIn';
import { Magnet } from './ui/Magnet';
import { ContactButton } from './ui/ContactButton';
import { Sparkles, Loader2 } from 'lucide-react'; 

export const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // ── YENİ: Sayfa yüklendiğinde/yenilendiğinde en üste atma kodu ──
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // ─────────────────────────────────────────────────────────────────
  
  const handleSearch = () => {
    if (!query.trim()) return;
    
    setLoading(true); 
    
    navigate('/analysis', { state: { query: query } });
  };

  return (
    <section className="h-screen flex flex-col overflow-x-clip relative bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] z-30 relative">
        <Link to="/nasil-calisir" className="hover:opacity-70 hover:text-[#B600A8] transition-colors duration-200">Nasıl Çalışır?</Link>
        <Link to="/ozellikler" className="hover:opacity-70 hover:text-[#B600A8] transition-colors duration-200">Özellikler</Link>
        <Link to="/oneriler" className="hover:opacity-70 hover:text-[#B600A8] transition-colors duration-200">Öneriler</Link>
        <Link to="/iletisim" className="hover:opacity-70 hover:text-[#B600A8] transition-colors duration-200">İletişim</Link>
      </FadeIn>

      <div className="flex-1 flex flex-col justify-center items-center z-0 w-full relative pb-16 sm:pb-20">
        
        {/* Başlık Bölümü */}
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="font-kanit font-black uppercase tracking-tight leading-[0.85] w-full flex flex-col items-center text-[16vw] sm:text-[15vw] md:text-[13vw] lg:text-[12.5vw]">
            <span className="block cursor-default transition-all duration-500 ease-out bg-gradient-to-b from-[#646973] to-[#BBCCD7] bg-clip-text text-transparent hover:text-white hover:bg-none hover:[text-shadow:0_0_15px_rgba(215,226,234,0.4)]">
              AKILLI
            </span>
            <span className="block cursor-default transition-all duration-500 ease-out bg-gradient-to-b from-[#646973] to-[#BBCCD7] bg-clip-text text-transparent hover:text-white hover:bg-none hover:[text-shadow:0_0_15px_rgba(215,226,234,0.4)]">
              ALIŞVERİŞ
            </span>
            <span className="block cursor-default transition-all duration-500 ease-out bg-gradient-to-b from-[#646973] to-[#BBCCD7] bg-clip-text text-transparent hover:text-white hover:bg-none hover:[text-shadow:0_0_15px_rgba(215,226,234,0.4)]">
              ASİSTANIN
            </span>
          </h1>
        </FadeIn>

        {/* AI Chat Input Bölümü */}
        <FadeIn delay={0.6} y={30} className="w-[90%] max-w-[700px] z-10 mt-8 sm:mt-12 md:mt-16">
          <Magnet padding={100} strength={10}>
            <div className="w-full bg-[#1A1A1A]/85 backdrop-blur-xl border-2 border-[#D7E2EA]/20 rounded-full p-2 pl-6 flex items-center shadow-[0_0_40px_rgba(182,0,168,0.2)] transition-all focus-within:border-[#D7E2EA]/60">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={loading ? "Yönlendiriliyor..." : "Merhaba nasıl yardımcı olabilirim?"} 
                className="bg-transparent border-none outline-none text-[#D7E2EA] w-full font-light text-sm sm:text-base md:text-lg placeholder:text-[#D7E2EA]/40 placeholder:normal-case" 
                disabled={loading}
              />
              <button 
                onClick={handleSearch}
                disabled={loading}
                className="bg-[#D7E2EA] text-[#0C0C0C] p-3 sm:p-4 rounded-full flex items-center justify-center shrink-0 hover:scale-110 transition-transform active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
              </button>
            </div>
          </Magnet>
        </FadeIn>

      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 absolute bottom-0 w-full z-20 pointer-events-none">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[220px] sm:max-w-[280px] md:max-w-[340px] text-[clamp(0.75rem,1.4vw,1.5rem)] backdrop-blur-sm bg-[#0C0C0C]/30 p-2 rounded-xl pointer-events-auto">
            İhtiyaçlarını anlayan, binlerce yorumu analiz edip sana en uygun ürünü bulan yapay zeka.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="pointer-events-auto">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};