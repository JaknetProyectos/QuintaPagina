"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function CotizacionSection() {
  const t = useTranslations("CotizacionSection");

  return (
    <section id="conocenos" className="bg-[#001212] text-white border-t border-white/5 relative overflow-hidden">
      {/* Elementos decorativos de fondo estilo M3 */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#008080]/10 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D1127C]/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE - MD3 Elevated Container */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#008080] to-[#D1127C] rounded-[36px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={"https://www.scti.co.nz/travel-advice/mc-4ae19cb4-2340-482b-9937-16c9-cdn-endpoint.azureedge.net/-/media/project/scti/nz/images/travel-advice/benefits-of-travelling/travel-makes-you-richer-couple-hiking-900x675.jpg?rev=03b2da0b5b064d22b8cfa1a5da412ed4&hash=6925B136BD01EC634AD7CA8479EAD058"}
                alt={t("image_alt")}
                width={800}
                height={600}
                className="object-cover w-full h-[400px] lg:h-[500px] transition-transform duration-700 group-hover:scale-110"
                loading="eager"
              />
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#001212]/80 via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Badge flotante M3 */}
            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#008080]" />
              <span className="text-xs font-bold tracking-widest uppercase">Premium Plan</span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                {t("title")}
              </h2>
              <div className="w-24 h-1.5 bg-[#008080] rounded-full" />
            </div>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              {t("description")}
            </p>

            <div className="pt-4">
              <Link href={"/pagarcotizacion"}>
                <button className="group relative overflow-hidden inline-flex items-center gap-3 bg-[#D1127C] text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-[#D1127C]/20 transition-all duration-300 hover:bg-[#b00e68] active:scale-95">
                  <span className="relative z-10 flex items-center gap-2">
                    {t("button")}
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                  {/* Efecto Ripple/Glow interno */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}