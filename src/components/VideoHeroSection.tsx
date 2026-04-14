"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { Menu, X, ShoppingBagIcon } from "lucide-react"; // Para el header integrado


export default function VideoHeroSection() {
  const t = useTranslations("VideoHero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para cambiar la opacidad del Header al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative pt-32 h-screen w-full overflow-hidden bg-black">
      {/* VIDEO ASSET - Fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/Slider.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY DE COLOR - Gradiente M3 para legibilidad */}
      <div className="absolute inset-0  bg-gradient-to-b from-[#001a1a]/60 via-transparent to-[#001a1a]/80" />

      {/* CONTENT - HERO BODY */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          {/* Label superior M3 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-[0.3em] shadow-2xl">
            <Sparkles size={14} className="text-[#D1127C]" />
            {t("concierge_label")}
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter">
            {t("title_part1")}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008080] to-[#D1127C]">
              {t("title_part2")}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/#contacto">
              <button className="group relative bg-[#D1127C] text-white px-10 py-5 rounded-full font-black text-lg shadow-[0_20px_40px_rgba(209,18,124,0.4)] transition-all hover:bg-[#b00e68] active:scale-95 flex items-center gap-3">
                {t("cta")}
                <ArrowRight className="transition-transform group-hover:translate-x-2" />
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}