"use client";

import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Home, LifeBuoy, Star, Mail, Map } from "lucide-react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('Header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();

  // Detectar scroll para cambiar estado de transparencia
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/#", label: t('nav.home'), icon: <Home className="w-4 h-4" /> },
    { href: "/#asistencia", label: t('nav.assistance'), icon: <LifeBuoy className="w-4 h-4" /> },
    { href: "/#eligenos", label: t('nav.why_us'), icon: <Star className="w-4 h-4" /> },
    { href: "/#contacto", label: t('nav.contact'), icon: <Mail className="w-4 h-4" /> },
    { href: "/experiencias", label: t('nav.book_now'), icon: <Map className="w-4 h-4" /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
        ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 py-2" 
        : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative overflow-hidden transition-all duration-300 ${!isScrolled ? "brightness-0 invert" : ""}`}>
              <Image
                src="/wondermx.png"
                alt="WonderMx Logo"
                width={120}
                height={60}
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-black/5 p-1 rounded-full backdrop-blur-md border border-white/10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200 font-bold text-sm tracking-wide active:scale-95 ${
                  isScrolled 
                  ? "text-gray-700 hover:bg-[#008080]/10 hover:text-[#008080]" 
                  : "text-white hover:bg-white/20"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className={`relative p-3 rounded-2xl transition-all duration-300 group active:scale-90 ${
                isScrolled ? "bg-gray-100 text-gray-700" : "bg-white/10 text-white backdrop-blur-md"
              }`}
            >
              <ShoppingBag className="w-6 h-6 transition-transform group-hover:rotate-12" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D1127C] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cart.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              className={`md:hidden p-3 rounded-2xl transition-colors active:scale-95 ${
                isScrolled ? "bg-gray-100 text-[#008080]" : "bg-white/10 text-white backdrop-blur-md"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-[500px] opacity-100 bg-white" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-8 flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-4 px-6 py-4 text-gray-800 hover:bg-[#008080]/5 hover:text-[#008080] rounded-[24px] font-black transition-all"
            >
              <span className="text-[#008080]">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}