"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

export default function ArmaAventuraSection() {
  // Usamos el nombre del componente como namespace único
  const t = useTranslations("ArmaAventuraSection");

  return (
    <section className="relative bg-white text-gray-900 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#008080]/5 to-[#D1127C]/5 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">

          {/* BLOQUE 1: CABECERA (Ocupa 8 de 12 columnas) */}
          <div className="md:col-span-8 bg-white/40 backdrop-blur-md border border-gray-100 p-8 md:p-12 rounded-[40px] shadow-sm flex flex-col justify-center">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tight text-[#008080]">
                {t("title")}
              </h2>
              <div className="w-20 h-2 bg-[#D1127C] rounded-full" />
              <p className="text-base md:text-xl leading-relaxed text-gray-600 max-w-2xl pt-4">
                {t("description")}
              </p>
            </div>
          </div>

          {/* BLOQUE 2: IMAGEN (Ahora es un mosaico pequeño y horizontal) */}
          <div className="md:col-span-4 h-64 md:h-auto relative rounded-[40px] overflow-hidden group shadow-xl border border-white">
            <Image
              src="https://adhddirect.co.uk/wp-content/uploads/2024/05/adhd-direct-travellers-guide-traveling-with-adhd.jpg"
              alt={t("image_alt")}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#008080]/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* BLOQUE 3: LIST TITLE (Ocupa un espacio pequeño pero resaltado) */}
          <div className="md:col-span-3 bg-[#008080] rounded-[40px] p-8 flex items-center justify-center text-center">
            <h3 className="text-xl font-bold text-white leading-tight">
              {t("list_title")}
            </h3>
          </div>

          {/* BLOQUE 4: ITEMS EN MOSAICO (Grid interno) */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Item Itineraries */}
            <div className="bg-white border border-gray-100 p-6 rounded-[32px] hover:shadow-lg transition-all group flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#008080]/10 flex items-center justify-center text-[#008080] group-hover:bg-[#008080] group-hover:text-white transition-all">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-[#008080] block text-lg mb-1">{t("items.itineraries.label")}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{t("items.itineraries.text")}</p>
              </div>
            </div>

            {/* Item Restaurants */}
            <div className="bg-white border border-gray-100 p-6 rounded-[32px] hover:shadow-lg transition-all group flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#008080]/10 flex items-center justify-center text-[#008080] group-hover:bg-[#008080] group-hover:text-white transition-all">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-[#008080] block text-lg mb-1">{t("items.restaurants.label")}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{t("items.restaurants.text")}</p>
              </div>
            </div>

            {/* Item Transport */}
            <div className="bg-[#D1127C]/5 border border-[#D1127C]/10 p-6 rounded-[32px] hover:bg-[#D1127C]/10 transition-all group flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D1127C] flex items-center justify-center text-white">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-[#D1127C] block text-lg mb-1">{t("items.transport.label")}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{t("items.transport.text")}</p>
              </div>
            </div>

            {/* Item Tours */}
            <div className="bg-white border border-gray-100 p-6 rounded-[32px] hover:shadow-lg transition-all group flex flex-col gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#008080]/10 flex items-center justify-center text-[#008080] group-hover:bg-[#008080] group-hover:text-white transition-all">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-[#008080] block text-lg mb-1">{t("items.tours.label")}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{t("items.tours.text")}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}