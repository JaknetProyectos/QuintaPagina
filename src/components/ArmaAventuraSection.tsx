"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

export default function ArmaAventuraSection() {
  // Usamos el nombre del componente como namespace único
  const t = useTranslations("ArmaAventuraSection");

  return (
    <section className="relative bg-white text-gray-900 overflow-hidden">
      {/* BACKGROUND - Ajustado para Material 3 con un gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#008080]/5 to-[#D1127C]/5 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* IMAGE - Estilo M3 con bordes extra redondeados y sombra suave */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#D1127C]/10 rounded-[40px] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative rounded-[32px] overflow-hidden border border-gray-100 shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
              <Image
                src="https://ournexttrip.com.mx/wp-content/uploads/2026/02/couple-doing-selfie-street-scaled.jpg"
                alt={t("image_alt")}
                width={500}
                height={900}
                className="object-cover w-full h-[400px] lg:h-[700px] transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[32px]" />
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#008080]">
                {t("title")}
              </h2>
              <div className="w-20 h-1.5 bg-[#D1127C] rounded-full" />
            </div>

            <div className="space-y-8">
              <p className="text-base md:text-lg leading-relaxed text-gray-600 max-w-2xl">
                {t("description")}
              </p>

              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-8 bg-[#008080] rounded-full inline-block" />
                {t("list_title")}
              </h3>

              <ul className="grid gap-6">
                <li className="flex gap-4 p-4 rounded-2xl transition-colors hover:bg-[#008080]/5 group">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#008080] flex items-center justify-center text-white transition-transform group-hover:scale-110">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    <span className="font-bold text-[#008080] block mb-0.5">{t("items.itineraries.label")}</span>
                    {t("items.itineraries.text")}
                  </p>
                </li>

                <li className="flex gap-4 p-4 rounded-2xl transition-colors hover:bg-[#008080]/5 group">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#008080] flex items-center justify-center text-white transition-transform group-hover:scale-110">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    <span className="font-bold text-[#008080] block mb-0.5">{t("items.restaurants.label")}</span>
                    {t("items.restaurants.text")}
                  </p>
                </li>

                <li className="flex gap-4 p-4 rounded-2xl transition-colors hover:bg-[#008080]/5 group">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#008080] flex items-center justify-center text-white transition-transform group-hover:scale-110">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    <span className="font-bold text-[#008080] block mb-0.5">{t("items.transport.label")}</span>
                    {t("items.transport.text")}
                  </p>
                </li>

                <li className="flex gap-4 p-4 rounded-2xl transition-colors hover:bg-[#008080]/5 group">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#008080] flex items-center justify-center text-white transition-transform group-hover:scale-110">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    <span className="font-bold text-[#008080] block mb-0.5">{t("items.tours.label")}</span>
                    {t("items.tours.text")}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}