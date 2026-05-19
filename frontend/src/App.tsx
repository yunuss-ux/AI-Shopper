import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sayfa ve Bileşen İmportları
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { LandingFeatures } from './components/LandingFeatures'; // 1. YENİ BİLEŞENİ İMPORT ETTİK
import AnalysisPage from './pages/AnalysisPage';
import { HowItWorksPage, FeaturesPage, SuggestionsPage, ContactPage } from './pages/InfoPages';

function App() {
  return (
    <Router>
      <div className="bg-[#0C0C0C] min-h-screen selection:bg-[#B600A8] selection:text-white">
        <Routes>
          
          {/* 1. ANA SAYFA */}
          <Route path="/" element={
            <div className="w-full overflow-hidden">
              <HeroSection />
              <MarqueeSection />
              {/* 2. YENİ BÖLÜMÜ BURAYA EKLEDİK */}
              <LandingFeatures /> 
            </div>
          } />
          
          <Route path="/analysis" element={<AnalysisPage />} />
          
          {/* ALT SAYFALAR */}
          <Route path="/nasil-calisir" element={<HowItWorksPage />} />
          <Route path="/ozellikler" element={<FeaturesPage />} />
          <Route path="/oneriler" element={<SuggestionsPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;