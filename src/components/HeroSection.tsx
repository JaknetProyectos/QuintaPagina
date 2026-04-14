"use client";

import { MapPin, ArrowRight, CalendarCheck, Clock, Cross, CheckCheck, Plane, Globe2, Handshake, Pin } from "lucide-react";
import Image from "next/image";
import persona from "@/public/personacomiendo.png";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section id="asistencia" className="bg-white mt-14 text-gray-900">

      {/* HERO SECTION - FULL BENTO MOSAIC */}
<div className="max-w-7xl mx-auto px-6 py-12">
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
    
    {/* 1. CABECERA (Dominante) */}
    <div className="md:col-span-8 md:row-span-2 bg-gray-50 rounded-[40px] p-8 md:p-12 flex flex-col justify-center border border-gray-100">
      <h1 className="text-4xl md:text-6xl font-black text-[#008080] leading-tight">
        {t("title")}<span className="text-[#D1127C]">.</span>
      </h1>
      <p className="text-gray-600 text-lg mt-6 max-w-2xl">
        {t("subtitle")}
      </p>
      <div className="mt-8">
        <Link href="/experiencias">
          <button className="inline-flex items-center gap-3 bg-[#D1127C] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-[#b00e68] transition-all active:scale-95 group">
            {t("cta")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>

    {/* 2. FEATURE 1 (Largo vertical) */}
    <div className="md:col-span-4 md:row-span-2 bg-[#008080] rounded-[40px] p-8 text-white flex flex-col justify-between group overflow-hidden relative">
      <CalendarCheck className="w-12 h-12 mb-6 opacity-50 group-hover:scale-110 transition-transform" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">{t("features.itineraries.title")}</h3>
        <p className="text-sm text-white/80 leading-relaxed">{t("features.itineraries.desc")}</p>
      </div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
    </div>

    {/* 3. LA IMAGEN (Mosaico pequeño horizontal) */}
    <div className="md:col-span-5 md:row-span-1 relative rounded-[40px] overflow-hidden min-h-[200px] border border-gray-100 shadow-sm">
      <Image
        src={persona}
        alt="Experiencia"
        fill
        className="object-cover transition-transform duration-700 hover:scale-110"
      />
    </div>

    {/* 4. FEATURE 2 (Compacto) */}
    <div className="md:col-span-3 md:row-span-1 bg-white border border-gray-100 rounded-[40px] p-6 hover:shadow-xl transition-all group">
      <div className="w-10 h-10 bg-[#008080]/10 rounded-xl flex items-center justify-center text-[#008080] mb-4">
        <CheckCheck className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-[#008080] mb-1">{t("features.bookings.title")}</h3>
      <p className="text-xs text-gray-500 leading-snug">{t("features.bookings.desc")}</p>
    </div>

    {/* 5. FEATURE 3 (Compacto) */}
    <div className="md:col-span-4 md:row-span-1 bg-[#D1127C]/5 border border-[#D1127C]/10 rounded-[40px] p-6 hover:bg-[#D1127C]/10 transition-all group">
      <div className="w-10 h-10 bg-[#D1127C] rounded-xl flex items-center justify-center text-white mb-4">
        <Plane className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-[#D1127C] mb-1">{t("features.transport.title")}</h3>
      <p className="text-xs text-gray-600 leading-snug">{t("features.transport.desc")}</p>
    </div>

    {/* 6. FEATURE 4 (Ancho bajo la imagen) */}
    <div className="md:col-span-4 md:row-span-1 bg-white border border-gray-100 rounded-[40px] p-6 flex gap-4 items-center hover:border-[#008080]/30 transition-all">
      <div className="shrink-0 w-12 h-12 bg-[#008080]/10 rounded-2xl flex items-center justify-center text-[#008080]">
        <Globe2 className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-bold text-[#008080] text-sm">{t("features.vip.title")}</h3>
        <p className="text-[11px] text-gray-400 uppercase tracking-tighter mb-1 font-semibold">{t("features.vip.title")}</p>
        <p className="text-xs text-gray-500 line-clamp-2">{t("features.vip.desc")}</p>
      </div>
    </div>

    {/* 7. FEATURE 5 (Enfoque en el texto) */}
    <div className="md:col-span-4 md:row-span-1 bg-gray-900 rounded-[40px] p-6 text-white group">
      <div className="flex justify-between items-start mb-4">
        <Handshake className="w-8 h-8 text-[#008080]" />
        <div className="w-2 h-2 rounded-full bg-[#D1127C] animate-ping" />
      </div>
      <h3 className="font-bold mb-2 text-black">{t("features.concierge.title")}</h3>
      <p className="text-xs text-gray-400 leading-relaxed">{t("features.concierge.desc")}</p>
    </div>

    {/* 8. FEATURE 6 (Final de mosaico) */}
    <div className="md:col-span-4 md:row-span-1 bg-white border border-gray-100 rounded-[40px] p-6 flex flex-col justify-center hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-2">
        <Pin className="w-5 h-5 text-[#D1127C]" />
        <h3 className="font-bold text-[#008080]">{t("features.local.title")}</h3>
      </div>
      <p className="text-xs text-gray-500">{t("features.local.desc")}</p>
    </div>

  </div>
</div>

      {/* WHY US */}
      <div id="eligenos" className="bg-[#001a1a] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#008080]/10 blur-[80px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold mb-4 tracking-tight">
              {t("why_us.title")}
            </h2>
            <div className="w-16 h-1 bg-[#D1127C] rounded-full mb-6" />
            <p className="text-gray-400">
              {t("why_us.subtitle")}
            </p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-4 gap-6">

            <div className="border border-white/10 bg-white/5 rounded-[28px] p-6 hover:bg-white/10 hover:border-[#008080]/30 transition-all duration-300 active:scale-95 group">
              <div className="text-[#008080] mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t("why_us.cards.immediate.title")}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {t("why_us.cards.immediate.desc")}
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-[28px] p-6 hover:bg-white/10 hover:border-[#008080]/30 transition-all duration-300 active:scale-95 group">
              <div className="text-[#008080] mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t("why_us.cards.experts.title")}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {t("why_us.cards.experts.desc")}
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-[28px] p-6 hover:bg-white/10 hover:border-[#008080]/30 transition-all duration-300 active:scale-95 group">
              <div className="text-[#008080] mb-4 group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t("why_us.cards.planning.title")}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {t("why_us.cards.planning.desc")}
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 rounded-[28px] p-6 hover:bg-white/10 hover:border-[#008080]/30 transition-all duration-300 active:scale-95 group">
              <div className="text-[#008080] mb-4 group-hover:scale-110 transition-transform">
                <Cross className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t("why_us.cards.care.title")}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {t("why_us.cards.care.desc")}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}