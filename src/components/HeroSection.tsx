"use client";

import { MapPin, ArrowRight, CalendarCheck, Clock, Cross, CheckCheck, Plane, Globe2, Handshake, Pin } from "lucide-react";
import Image from "next/image";
import persona from "@/public/personacomiendo.png";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section id="asistencia" className="bg-white mt-14 text-gray-900">
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">


        {/* LEFT IMAGE */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-[#008080]/10 rounded-[40px] rotate-2 transition-transform group-hover:rotate-0 duration-500" />
          <div className="relative rounded-[32px] overflow-hidden border border-gray-100 shadow-xl transition-transform duration-500 group-hover:scale-[1.01]">
            <Image
              src={persona}
              alt="Experiencia gastronómica"
              className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

                {/* RIGHT CONTENT */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#008080]">
            {t("title")}
          </h1>

          <p className="text-gray-600 text-lg">
            {t("subtitle")}
          </p>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-2 gap-4 mt-6">

            <div className="border border-gray-100 bg-[#008080]/5 rounded-[24px] p-4 flex gap-4 items-start hover:bg-[#008080]/10 transition-all duration-300 active:scale-95 group">
              <div className="flex-shrink-0 text-[#008080] group-hover:scale-110 transition-transform">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#008080]">{t("features.itineraries.title")}</p>
                <p className="text-sm text-gray-500">
                  {t("features.itineraries.desc")}
                </p>
              </div>
            </div>

            <div className="border border-gray-100 bg-[#008080]/5 rounded-[24px] p-4 flex gap-4 items-start hover:bg-[#008080]/10 transition-all duration-300 active:scale-95 group">
              <div className="flex-shrink-0 text-[#008080] group-hover:scale-110 transition-transform">
                <CheckCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#008080]">{t("features.bookings.title")}</p>
                <p className="text-sm text-gray-500">
                  {t("features.bookings.desc")}
                </p>
              </div>
            </div>

            <div className="border border-gray-100 bg-[#008080]/5 rounded-[24px] p-4 flex gap-4 items-start hover:bg-[#008080]/10 transition-all duration-300 active:scale-95 group">
              <div className="flex-shrink-0 text-[#008080] group-hover:scale-110 transition-transform">
                <Plane className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#008080]">{t("features.transport.title")}</p>
                <p className="text-sm text-gray-500">
                  {t("features.transport.desc")}
                </p>
              </div>
            </div>

            <div className="border border-gray-100 bg-[#008080]/5 rounded-[24px] p-4 flex gap-4 items-start hover:bg-[#008080]/10 transition-all duration-300 active:scale-95 group">
              <div className="flex-shrink-0 text-[#008080] group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#008080]">{t("features.vip.title")}</p>
                <p className="text-sm text-gray-500">
                  {t("features.vip.desc")}
                </p>
              </div>
            </div>

            <div className="border border-gray-100 bg-[#008080]/5 rounded-[24px] p-4 flex gap-4 items-start hover:bg-[#008080]/10 transition-all duration-300 active:scale-95 group">
              <div className="flex-shrink-0 text-[#008080] group-hover:scale-110 transition-transform">
                <Handshake className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#008080]">{t("features.concierge.title")}</p>
                <p className="text-sm text-gray-500">
                  {t("features.concierge.desc")}
                </p>
              </div>
            </div>

            <div className="border border-gray-100 bg-[#008080]/5 rounded-[24px] p-4 flex gap-4 items-start hover:bg-[#008080]/10 transition-all duration-300 active:scale-95 group">
              <div className="flex-shrink-0 text-[#008080] group-hover:scale-110 transition-transform">
                <Pin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#008080]">{t("features.local.title")}</p>
                <p className="text-sm text-gray-500">
                  {t("features.local.desc")}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link href={"/experiencias"}>
            <button className="mt-6 inline-flex items-center gap-2 bg-[#D1127C] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-[#D1127C]/20 hover:bg-[#b00e68] transition-all duration-300 active:scale-90 group">
              {t("cta")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
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