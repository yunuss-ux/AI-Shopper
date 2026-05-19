import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Search } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showStickyAsk, setShowStickyAsk] = useState(false)

  // Sayfa kaydırıldıkça butonun görünürlüğünü kontrol eden dinleyici
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowStickyAsk(true)
      } else {
        setShowStickyAsk(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Arama yapıldığında kullanıcıyı chat (analysis) sayfasına yönlendirir
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!query.trim()) return
    
    // Yönlendirme ve kelimeyi taşıma
    navigate('/analysis', { state: { query } })
  }

  return (
    <div className="min-h-[150vh] bg-[#0C0C0C] text-white font-sans selection:bg-[#B600A8] selection:text-white relative">
      
      {/* Üst Menü */}
      <header className="px-6 md:px-8 py-6 flex justify-between items-center border-b border-white/5">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B600A8]/20 flex items-center justify-center border border-[#B600A8]/30">
              <Sparkles size={20} className="text-[#B600A8]" />
            </div>
            <span className="font-bold tracking-wide text-lg">AI Shopper</span>
         </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-24 md:pt-32 flex flex-col items-center text-center">
        
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[4.5rem] sm:text-[6rem] md:text-[9rem] leading-[0.85] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-600 tracking-tighter uppercase"
        >
          AKILLI<br/>ALIŞVERİŞ<br/>ASİSTANIN
        </motion.h1>

        {/* ORTADAKİ ARAMA ÇUBUĞU */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 md:mt-16 w-full max-w-2xl"
        >
          <form
            onSubmit={handleSearch}
            className="relative flex items-center bg-[#151515] border border-white/10 rounded-full p-2 shadow-2xl focus-within:border-[#B600A8]/50 transition-all duration-300"
          >
            <div className="pl-6 pr-3 text-white/40 hidden sm:block">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Merhaba nasıl yardımcı olabilirim?"
              className="flex-1 bg-transparent outline-none border-none text-base md:text-lg text-gray-200 placeholder:text-white/30 py-3 md:py-4 px-4 sm:px-0"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-50 flex-shrink-0"
            >
              <Sparkles size={20} className="text-black" />
            </button>
          </form>
        </motion.div>

        {/* SCROLL TESTİ İÇİN ALAN */}
        <motion.div 
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-32 text-white/20 text-sm flex flex-col items-center gap-2"
        >
          <p className="tracking-widest uppercase">Kaydırma Efektini Test Et</p>
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/20 to-transparent"></div>
          <div className="h-[500px]"></div>
        </motion.div>
      </main>

      {/* ── KAYAN (STICKY) ASİSTANA SOR BUTONU ── */}
      <AnimatePresence>
        {showStickyAsk && (
          <motion.button
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            onClick={() => navigate('/analysis')}
            className="
              fixed bottom-8 right-6 md:bottom-10 md:right-10 z-50
              flex items-center gap-2 px-6 py-4 md:px-8 md:py-4 rounded-full
              font-bold text-xs md:text-sm text-white tracking-wider
              border border-[#B600A8]/50
              bg-gradient-to-r from-[#81017D]/95 via-[#B600A8]/95 to-[#FF45DE]/95 
              backdrop-blur-xl shadow-[0_10px_40px_rgba(182,0,168,0.5)]
              hover:scale-105 transition-transform duration-300
            "
          >
            <Sparkles size={18} className="text-white hidden sm:block" />
            ASİSTANA SOR
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}