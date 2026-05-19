'use client'
import { useState, useRef, useEffect, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, SendHorizontal, Loader2, Sparkles,
  Star, CheckCircle, XCircle, ShoppingCart, Zap,
  Bot, User, MessageSquarePlus, MessageSquare,
  PanelLeft, Trash2, ChevronUp, MessageCircle
} from 'lucide-react'

// ── Tipler ───────────────────────────────────────────────────
interface Product {
  id:            string
  name:          string
  price:         number
  brand:         string 
  image_url:     string
  product_url:   string 
  avg_rating:    number
  reviews_count: number
  similarity:    number
}

interface ReviewSummary {
  pros: string[]
  cons: string[]
}

interface Message {
  id:         string | number
  role:       'user' | 'assistant'
  text?:      string
  products?:  Product[]
  isLoading?: boolean
}

interface ChatSession {
  id:        string
  title:     string
  updatedAt: number
  messages:  Message[]
}

// ── Güvenli localStorage yardımcıları ────────────────────────
function loadSessions(): ChatSession[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('ai_shopper_sessions')
    return raw ? (JSON.parse(raw) as ChatSession[]) : []
  } catch {
    return []
  }
}

function saveSessions(sessions: ChatSession[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('ai_shopper_sessions', JSON.stringify(sessions))
  } catch {
  }
}

// ── Estetik Sayı Formatlayıcı ───────────────────────────────
function formatReviewCount(n: number): string {
  const safe = Math.max(0, n)
  if (safe >= 1000) {
    return '1.000+'
  }
  return safe.toLocaleString('tr-TR')
}

// ── Ürün Kartı ────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const [showModal, setShowModal]   = useState(false)
  const [summary, setSummary]       = useState<ReviewSummary | null>(null)
  const [loadingSummary, setLoadingSummary] = useState(false)

  async function fetchReviewAnalysis() {
    setShowModal(true)
    if (summary) return

    setLoadingSummary(true)
    try {
      const res = await fetch('/api/summarize', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ productName: product.name, brand: product.brand }),
      })
      const data: ReviewSummary = await res.json()
      setSummary(data)
    } catch {
      setSummary({
        pros: ['Malzeme kalitesi ve genel performansı kullanıcıları memnun etmiş.', 'Segmentine göre fiyat performans oranı yüksek.'],
        cons: ['Yoğun kullanımda bazı optimizasyonlar istenebilir.'],
      })
    } finally {
      setLoadingSummary(false)
    }
  }

  const matchPct    = Math.round(Math.min(Math.max(product.similarity ?? 0, 0), 1) * 100)
  const safeRating  = isNaN(product.avg_rating) ? 4.5 : Math.min(Math.max(product.avg_rating, 0), 5)
  const safeReviews = formatReviewCount(product.reviews_count)

  const priceLabel = product.price > 0
    ? `${product.price.toLocaleString('tr-TR')} TL`
    : 'Fiyat Belirtilmemiş'

  const buyLink = (product.product_url && product.product_url !== '#')
    ? product.product_url
    : `https://www.google.com/search?q=${encodeURIComponent(product.name + ' ' + product.brand)}`

  return (
    <>
      <div className="
        bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden
        hover:border-[#B600A8]/50 transition-all duration-300
        flex flex-col h-full shadow-lg relative
      ">
        <div className="relative h-48 overflow-hidden bg-white/5 flex-shrink-0">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={e => {
              ;(e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
            }}
          />
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
            <Zap size={12} className="text-[#B600A8]" />
            <span className="text-white text-xs font-bold">%{matchPct} Uyum</span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1 gap-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Ortalama Piyasa Fiyatı</span>
              <span className="font-bold text-lg text-white leading-tight">{priceLabel}</span>
            </div>
            <span className="text-[10px] bg-[#B600A8]/10 text-[#B600A8] px-2 py-0.5 rounded-md font-semibold border border-[#B600A8]/20 flex-shrink-0 ml-2 mt-1 truncate max-w-[80px]" title={product.brand}>
              {product.brand}
            </span>
          </div>

          <h3 className="text-base font-bold text-gray-100 leading-snug line-clamp-2 mt-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 text-amber-400 text-sm font-medium">
            <Star size={14} className="fill-amber-400 flex-shrink-0" />
            <span>{safeRating.toFixed(1)}</span>
            <span className="text-white/30 text-xs">({safeReviews} Yorum)</span>
          </div>

          <div className="flex-1" />

          <button
            onClick={fetchReviewAnalysis}
            className="
              w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10
              text-white/80 hover:text-white border border-white/10
              transition-all font-medium text-xs
              flex items-center justify-center gap-2
            "
          >
            <Sparkles size={14} className="text-[#B600A8]" />
            AI Yorum Analizini Göster
          </button>

          <a
            href={buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full flex items-center justify-center gap-2
              py-3 rounded-xl bg-[#B600A8] hover:bg-[#d400c4]
              text-white font-semibold transition-all
              shadow-[0_0_15px_rgba(182,0,168,0.2)] text-sm
              no-underline
            "
          >
            <ShoppingCart size={16} />
            Satın Al
          </a>
        </div>
      </div>

      {/* ── Analiz Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{   scale: 0.95, opacity: 0 }}
              className="
                bg-[#151515] border border-white/10
                w-full max-w-lg rounded-3xl p-6
                shadow-2xl relative z-10 text-left
                max-h-[90vh] overflow-y-auto
              "
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <span className="text-xs font-bold text-[#B600A8] uppercase tracking-widest">
                AI Shopper Analiz
              </span>
              <h4 className="text-xl font-bold text-white mt-1 mb-4 leading-tight pr-8">
                {product.name}
              </h4>

              <div className="border-t border-white/5 pt-4">
                <h5 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#B600A8]" />
                  Gerçek Kullanıcı Yorum Analizi
                </h5>

                {loadingSummary ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3 text-white/40">
                    <Loader2 size={32} className="animate-spin text-[#B600A8]" />
                    <span className="text-sm">Yorumlar inceleniyor…</span>
                  </div>
                ) : summary ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-green-400 uppercase tracking-wider">
                        👍 Öne Çıkan Artıları
                      </p>
                      {summary.pros.map((pro, i) => (
                        <div key={i} className="bg-green-500/5 border border-green-500/10 p-3 rounded-xl flex items-start gap-3">
                          <CheckCircle size={16} className="text-green-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-300">{pro}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-red-400 uppercase tracking-wider">
                        👎 Müşteri Şikayetleri
                      </p>
                      {summary.cons.map((con, i) => (
                        <div key={i} className="bg-red-500/5 border border-red-500/10 p-3 rounded-xl flex items-start gap-3">
                          <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-300">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Ana Sayfa Bileşeni ────────────────────────────────────────
export default function AnalysisPage() {
  const navigate   = useNavigate()
  const location   = useLocation()

  const [sessions,          setSessions]          = useState<ChatSession[]>([])
  const [currentSessionId,  setCurrentSessionId]  = useState<string>('')
  const [input,             setInput]             = useState('')
  const [isLoading,         setIsLoading]         = useState(false)
  const [isSidebarOpen,     setIsSidebarOpen]     = useState(true)
  
  const [showStickyButton,  setShowStickyButton]  = useState(false)
  const [isAskMenuOpen,     setIsAskMenuOpen]     = useState(false)

  const mainScrollRef   = useRef<HTMLElement>(null)
  const bottomRef       = useRef<HTMLDivElement>(null)
  const inputRef        = useRef<HTMLInputElement>(null)
  const hasInitialized  = useRef(false)

  // ── DEĞİŞİKLİK: Son assistant mesajının ID'sini takip ediyoruz ──
  // Yanıt gelince en alta değil, o mesajın BAŞINA scroll yapacağız.
  const lastAssistantMsgId = useRef<string | number | null>(null)

  const quickQuestions = [
    "Bu önerdiğin ürünleri kıyaslar mısın? Sence hangisi daha mantıklı?",
    "Karar veremedim, aralarından en iyi fiyat/performans ürünü hangisi?",
    "Bütçemi biraz daha artırırsam daha üst segment neler önerebilirsin?",
    "Malzeme kalitesi ve uzun ömürlülük açısından hangisini seçmeliyim?",
    "Bu modellere alternatif olarak önerebileceğin farklı markalar var mı?"
  ]

  useEffect(() => {
    const saved = loadSessions()
    setSessions(saved)
    if (saved.length > 0 && !location.state?.query) {
      const activeId = localStorage.getItem('ai_shopper_active_id')
      if (activeId && saved.some(s => s.id === activeId)) {
        setCurrentSessionId(activeId)
      } else {
        setCurrentSessionId(saved[0].id)
      }
    }
  }, [])

  useEffect(() => {
    if (currentSessionId) {
      localStorage.setItem('ai_shopper_active_id', currentSessionId)
    }
  }, [currentSessionId])

  useEffect(() => {
    const initialQuery: string = location.state?.query ?? ''
    if (initialQuery && !hasInitialized.current) {
      hasInitialized.current = true
      startNewChat(initialQuery)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, navigate])

  useEffect(() => {
    if (sessions.length > 0) saveSessions(sessions)
  }, [sessions])

  // ── DEĞİŞİKLİK: Scroll mantığı ──────────────────────────────
  // Önce: her sessions/currentSessionId değişiminde bottomRef'e scroll.
  // Şimdi: lastAssistantMsgId varsa o mesajın DOM elementinin BAŞINA scroll,
  //        yoksa (ilk yükleme / oturum değişimi) yine bottomRef'e scroll.
  useEffect(() => {
    const id = lastAssistantMsgId.current
    if (id) {
      // 150ms bekle — React DOM'u güncellesin, animasyon başlasın
      const timer = setTimeout(() => {
        const el = document.getElementById(`msg-${id}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        // Kullandıktan sonra sıfırla — bir sonraki render'da tekrar tetiklenmesin
        lastAssistantMsgId.current = null
      }, 150)
      return () => clearTimeout(timer)
    } else {
      // Oturum değişimi veya ilk yükleme → en alta git (mevcut davranış)
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [sessions, currentSessionId])

  useEffect(() => {
    const scrollArea = mainScrollRef.current
    if (!scrollArea) return

    const handleScroll = () => {
      setShowStickyButton(scrollArea.scrollTop > 150)
      if (scrollArea.scrollTop <= 150) {
        setIsAskMenuOpen(false)
      }
    }

    scrollArea.addEventListener('scroll', handleScroll)
    return () => scrollArea.removeEventListener('scroll', handleScroll)
  }, [])

  const currentMessages = sessions.find(s => s.id === currentSessionId)?.messages ?? []

  function startNewChat(initialMessage?: string) {
    const newId = Math.random().toString(36).slice(2, 9)
    const newSession: ChatSession = {
      id:        newId,
      title:     initialMessage ? initialMessage.slice(0, 35) + '…' : 'Yeni Sohbet',
      updatedAt: Date.now(),
      messages:  [],
    }
    setSessions(prev => [newSession, ...prev])
    setCurrentSessionId(newId)
    if (initialMessage) {
      setTimeout(() => handleSearch(initialMessage, newId), 120)
    }
  }

  function deleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation()
    const next = sessions.filter(s => s.id !== id)
    setSessions(next)
    if (next.length === 0) {
      localStorage.removeItem('ai_shopper_sessions')
      localStorage.removeItem('ai_shopper_active_id')
      setCurrentSessionId('')
    } else if (currentSessionId === id) {
      setCurrentSessionId(next[0].id)
    }
  }

  async function handleSearch(queryText: string, targetSessionId = currentSessionId) {
    const q = queryText.trim()
    if (!q || isLoading) return

    let activeId = targetSessionId
    if (!activeId || !sessions.find(s => s.id === activeId)) {
      activeId = Math.random().toString(36).slice(2, 9)
      const newSession: ChatSession = {
        id:        activeId,
        title:     q.slice(0, 35),
        updatedAt: Date.now(),
        messages:  [],
      }
      setSessions(prev => [newSession, ...prev])
      setCurrentSessionId(activeId)
    }

    const loadingId = `loading-${Date.now()}`

    const sessionNow   = sessions.find(s => s.id === activeId)
    const chatHistory  = (sessionNow?.messages ?? [])
      .filter(m => !m.isLoading && m.text)
      .slice(-6)
      .map(m => ({ role: m.role, content: m.text! }))

    // ── DEĞİŞİKLİK: loadingId'yi kaydet — yanıt gelince bu elemana scroll yapılacak
    lastAssistantMsgId.current = loadingId

    setSessions(prev => prev.map(s =>
      s.id !== activeId ? s : {
        ...s,
        title:     s.messages.length === 0 ? q.slice(0, 35) : s.title,
        updatedAt: Date.now(),
        messages:  [
          ...s.messages,
          { id: `user-${Date.now()}`, role: 'user',      text: q },
          { id: loadingId,            role: 'assistant', isLoading: true },
        ],
      }
    ))

    setIsLoading(true)

    try {
      const res  = await fetch('/api/recommend', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ query: q, history: chatHistory }),
      })
      const data = await res.json()

      const textResponse = data.explanation || data.message || (data.error ? `⚠️ Hata: ${data.error}` : 'İşte senin için bulduklarım:')
      const productList  = Array.isArray(data.products) ? data.products : []

      // ── DEĞİŞİKLİK: Yanıt gelince ref'i tekrar set et — useEffect tetiklensin
      lastAssistantMsgId.current = loadingId

      setSessions(prev => prev.map(s =>
        s.id !== activeId ? s : {
          ...s,
          messages: s.messages.map(m =>
            m.id !== loadingId ? m : {
              ...m,
              text:      textResponse,
              products:  productList,
              isLoading: false,
            }
          ),
        }
      ))
    } catch (err: any) {
      lastAssistantMsgId.current = loadingId

      setSessions(prev => prev.map(s =>
        s.id !== activeId ? s : {
          ...s,
          messages: s.messages.map(m =>
            m.id !== loadingId ? m : {
              ...m,
              text:      `⚠️ Bağlantı hatası oluştu. Lütfen kısa bir süre sonra tekrar sormayı dener misin?`,
              isLoading: false,
            }
          ),
        }
      ))
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault()
    const q = input.trim()
    if (!q) return
    setInput('')
    handleSearch(q)
  }

  function handleQuickQuestion(question: string) {
    setIsAskMenuOpen(false)
    handleSearch(question)
  }

  const sortedSessions = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt)

  return (
    <div className="
      h-screen bg-[#0C0C0C] flex relative
      text-[#D7E2EA] font-sans overflow-hidden
      selection:bg-[#B600A8] selection:text-white
    ">

      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ width: 0,   opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{   width: 0,   opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="h-full bg-[#151515] border-r border-white/5 flex flex-col z-20 overflow-hidden"
            style={{ flexShrink: 0, minWidth: 0 }}
          >
            <div className="p-4 border-b border-white/5 flex-shrink-0">
              <button
                onClick={() => startNewChat()}
                className="
                  w-full flex items-center justify-center gap-2
                  bg-[#B600A8]/20 hover:bg-[#B600A8]/40
                  text-[#B600A8] py-3 rounded-xl transition-colors
                  font-semibold border border-[#B600A8]/30 text-sm
                "
              >
                <MessageSquarePlus size={18} />
                Yeni Sohbet
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3 px-2">
                Geçmiş Sohbetler
              </p>
              {sortedSessions.map(session => (
                <div
                  key={session.id}
                  onClick={() => setCurrentSessionId(session.id)}
                  className={`
                    w-full text-left p-3 rounded-xl flex items-center justify-between
                    cursor-pointer transition-all group
                    ${currentSessionId === session.id
                      ? 'bg-white/10 border border-white/10'
                      : 'hover:bg-white/5 border border-transparent'}
                  `}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <MessageSquare
                      size={15}
                      className={currentSessionId === session.id ? 'text-[#B600A8]' : 'text-white/40'}
                    />
                    <span className="text-sm truncate opacity-80 leading-tight">{session.title}</span>
                  </div>
                  <button
                    onClick={e => deleteSession(session.id, e)}
                    className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
                    aria-label="Sohbeti sil"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-full min-w-0 bg-[#0C0C0C] overflow-hidden relative">

        <header className="
          bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-white/5
          px-4 md:px-6 py-4
          flex justify-between items-center z-10 flex-shrink-0
        ">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(v => !v)}
              className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition-colors"
              aria-label="Sidebar aç/kapat"
            >
              <PanelLeft size={20} />
            </button>
            <div className="w-9 h-9 rounded-xl bg-[#B600A8]/20 flex items-center justify-center border border-[#B600A8]/30">
              <Sparkles size={18} className="text-[#B600A8]" />
            </div>
            <h1 className="font-bold text-base md:text-lg tracking-wide">AI Shopper</h1>
          </div>

          <button
            onClick={() => navigate('/')}
            className="
              flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2
              rounded-xl bg-white/5 border border-white/10
              hover:bg-white/10 text-white/60 text-xs md:text-sm
              group transition-all
            "
          >
            Ana Sayfa
            <X size={15} className="group-hover:rotate-90 transition-transform" />
          </button>
        </header>

        <main ref={mainScrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-16 py-6 space-y-6">
          {currentMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center pt-20">
              <div className="opacity-20">
                <Bot size={56} className="mx-auto mb-5 text-[#B600A8]" />
                <h2 className="text-2xl font-bold mb-2">Sohbeti Başlat</h2>
                <p className="text-base max-w-xs mx-auto">
                  Aramak istediğin ürünü yaz. Geçmiş sohbetler sol menüde kaydedilir.
                </p>
              </div>
            </div>
          ) : (
            currentMessages.map(msg => (
              <motion.div
                key={msg.id}
                // ── DEĞİŞİKLİK: her mesaj bloğuna id eklendi ──
                // Scroll, bu id üzerinden yapılıyor.
                id={`msg-${msg.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col gap-3"
              >
                <div className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse self-end max-w-[85%]' : 'max-w-[90%]'}`}>
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    flex-shrink-0 mt-1 border
                    ${msg.role === 'user'
                      ? 'bg-[#D7E2EA]/10 border-white/10'
                      : 'bg-[#B600A8]/20 border-[#B600A8]/30'}
                  `}>
                    {msg.role === 'user'
                      ? <User size={15} className="text-white/60" />
                      : <Bot  size={15} className="text-[#B600A8]" />
                    }
                  </div>

                  <div className={`
                    p-4 rounded-2xl text-sm md:text-base leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-[#B600A8] text-white rounded-tr-sm shadow-lg'
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'}
                  `}>
                    {msg.isLoading ? (
                      <div className="flex items-center gap-2.5 text-white/50">
                        <Loader2 size={15} className="animate-spin" />
                        <span>Analiz ediliyor…</span>
                      </div>
                    ) : (
                      <p className="whitespace-pre-line">{msg.text}</p>
                    )}
                  </div>
                </div>

                {msg.products && msg.products.length > 0 && (
                  <div className="md:pl-11">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {msg.products.map(p => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
          <div ref={bottomRef} />
        </main>

        <AnimatePresence>
          {showStickyButton && (
            <motion.div
              key="stickyAskContainer"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="absolute bottom-24 right-6 z-50 flex flex-col items-end gap-3"
            >
              <AnimatePresence>
                {isAskMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="
                      bg-[#151515]/95 backdrop-blur-xl border border-[#B600A8]/30
                      rounded-2xl shadow-2xl p-2 mb-2 w-[280px] md:w-[320px]
                      flex flex-col gap-1 overflow-hidden
                    "
                  >
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
                        Hızlı Sorular
                      </span>
                    </div>
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickQuestion(q)}
                        className="
                          w-full text-left flex items-center gap-3 px-3 py-2.5
                          rounded-xl hover:bg-white/10 transition-colors
                          text-sm text-gray-200 hover:text-white group
                        "
                      >
                        <MessageCircle size={14} className="text-[#B600A8]/70 group-hover:text-[#B600A8] flex-shrink-0" />
                        <span className="leading-tight">{q}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setIsAskMenuOpen(!isAskMenuOpen)}
                className="
                  flex items-center gap-2 px-6 py-3 rounded-full
                  font-bold text-sm text-white tracking-wider
                  border border-[#B600A8]/50
                  bg-gradient-to-r from-[#81017D]/90 via-[#B600A8]/90 to-[#FF45DE]/90 
                  backdrop-blur-xl shadow-[0_10px_30px_rgba(182,0,168,0.3)]
                  hover:scale-105 transition-all duration-300
                "
                aria-label="Kayan asistana sor"
              >
                <Sparkles size={16} className="text-white" />
                ASİSTANA SOR
                <ChevronUp 
                  size={16} 
                  className={`transition-transform duration-300 ${isAskMenuOpen ? 'rotate-180' : ''}`} 
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {isAskMenuOpen && (
          <div 
            className="absolute inset-0 z-40"
            onClick={() => setIsAskMenuOpen(false)}
          />
        )}

        <div className="flex-shrink-0 px-4 md:px-6 pb-5 pt-3 bg-[#111111] border-t border-white/5 z-10 relative">
          <form
            onSubmit={handleSubmit}
            className="
              max-w-4xl mx-auto
              flex items-center bg-[#151515] border border-white/15
              rounded-2xl p-1.5 md:p-2 shadow-2xl
              focus-within:border-[#B600A8]/50 transition-colors
            "
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSubmit() }}
              placeholder="Sohbete devam et veya yeni ürün sor…"
              disabled={isLoading}
              className="
                flex-1 bg-transparent border-none outline-none
                text-[#D7E2EA] text-sm md:text-base
                px-3 md:px-4 py-3
                placeholder:text-white/30
              "
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="
                w-10 h-10 md:w-12 md:h-12 rounded-xl
                bg-[#B600A8] hover:bg-[#d400c4]
                text-white flex items-center justify-center
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-colors mr-1 flex-shrink-0
              "
              aria-label="Gönder"
            >
              {isLoading
                ? <Loader2 size={18} className="animate-spin" />
                : <SendHorizontal size={18} />
              }
            </button>
          </form>
          <p className="text-center text-[10px] text-white/15 mt-2 uppercase tracking-widest">
            AI Shopper · Groq LLaMA · SerpAPI
          </p>
        </div>
      </div>
    </div>
  )
}