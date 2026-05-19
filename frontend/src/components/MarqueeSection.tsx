import React, { useEffect, useRef, useState } from 'react';

// Fotoğraflara uygun başlıklar ve alt yazılar eklendi
// Fotoğraflara uygun başlıklar ve alt yazılar eklendi
const PRODUCTS = [
  { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format", title: "Premium Kulaklıklar", subtitle: "Stüdyo Kalitesi" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format", title: "Akıllı Saatler", subtitle: "Sağlık Takibi" },
  { src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format", title: "Profesyonel Lensler", subtitle: "Kusursuz Netlik" },
  { src: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format", title: "Oyun Konsolları", subtitle: "Yeni Nesil Eğlence" },
  { src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format", title: "Dizüstü Bilgisayarlar", subtitle: "Taşınabilir Güç" },
  { src: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format", title: "Mekanik Klavyeler", subtitle: "Hissiyatlı Yazım" },
  { src: "https://images.unsplash.com/photo-1615663245857-ac9310d5b107?q=80&w=600&auto=format", title: "Gaming Mouse", subtitle: "Keskin Rekabet" },
  { src: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=600&auto=format", title: "Sanal Gerçeklik", subtitle: "Yeni Dünyalar" },
  { src: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format", title: "Bluetooth Hoparlörler", subtitle: "Yüksek Ses" },
  { src: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=600&auto=format", title: "Drone Sistemleri", subtitle: "Göklerden Bakış" },
  { src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format", title: "Akıllı Telefonlar", subtitle: "Yeni Nesil İletişim" },
  { src: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format", title: "Tablet Bilgisayarlar", subtitle: "Yaratıcılık Merkezi" },
  

  { 
    src: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600", 
    title: "Gaming Sistemler", 
    subtitle: "RGB & Yüksek Performans" 
  },
  { src: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format", title: "Profesyonel Monitörler", subtitle: "Gerçek Renkler" },
  { src: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=600&auto=format", title: "Kablosuz Kulaklıklar", subtitle: "Özgür Dinleme" },
  { src: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=600&auto=format", title: "Fotoğraf Makineleri", subtitle: "Anı Yakala" },
  { src: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format", title: "Stüdyo Mikrofonları", subtitle: "Kusursuz Kayıt" },
  { src: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=600&auto=format", title: "Oyun Kontrolcüleri", subtitle: "Sınırsız Eğlence" },
  { src: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=600&auto=format", title: "Akıllı Ev Asistanları", subtitle: "Bağlantılı Yaşam" },
  { src: "https://images.unsplash.com/photo-1531525645387-7f14be1bfc3d?q=80&w=600&auto=format", title: "Retro Konsollar", subtitle: "Klasik Eğlence" },
  { src: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format", title: "Giyilebilir Teknoloji", subtitle: "Zamanın Ötesinde" }
];

const row1 = PRODUCTS.slice(0, 11);
const row2 = PRODUCTS.slice(11, 21);

// Yeni Özel Kart Bileşeni
const ProductCard = ({ product }: { product: typeof PRODUCTS[0] }) => (
  <div className="relative group overflow-hidden rounded-2xl w-[420px] h-[270px] shrink-0 border-2 border-transparent hover:border-[#D7E2EA]/30 transition-all duration-500 cursor-pointer hover:shadow-[0_0_30px_rgba(215,226,234,0.15)]">
    {/* Arkaplan Resmi */}
    <img 
      src={product.src} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      loading="lazy" 
      alt={product.title} 
    />
    
    {/* Yazıların okunmasını sağlayan alttan yukarı kararan Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
    
    {/* Metin İçeriği */}
    <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
      {/* Üzerine gelince beliren alt başlık */}
      <p className="text-[#BBCCD7] text-xs sm:text-sm font-medium tracking-widest uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        {product.subtitle}
      </p>
      {/* Ana Başlık */}
      <h3 className="text-[#D7E2EA] font-semibold text-xl sm:text-2xl tracking-wide group-hover:text-white transition-colors duration-300">
        {product.title}
      </h3>
    </div>
  </div>
);

export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const calc = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calc);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      {/* Row 1 - Moves Right */}
      <div 
        className="flex gap-4 mb-4 w-max will-change-transform"
        style={{ transform: `translate3d(${offset - 200}px, 0, 0)` }}
      >
        {[...row1, ...row1, ...row1].map((product, i) => (
          <ProductCard key={`r1-${i}`} product={product} />
        ))}
      </div>
      
      {/* Row 2 - Moves Left */}
      <div 
        className="flex gap-4 w-max will-change-transform"
        style={{ transform: `translate3d(${-(offset - 200)}px, 0, 0)` }}
      >
        {[...row2, ...row2, ...row2].map((product, i) => (
          <ProductCard key={`r2-${i}`} product={product} />
        ))}
      </div>
    </section>
  );
};