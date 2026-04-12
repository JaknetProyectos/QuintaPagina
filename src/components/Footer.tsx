"use client";

import { Link, usePathname } from "@/i18n/routing";
import visa from "@/public/visa.png";
import mastercard from "@/public/mastercard.png";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { Globe, ShieldCheck, PhoneCall, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <footer className="bg-[#000d0d] text-white border-t border-white/5 relative overflow-hidden">
      {/* Acento de color sutil en el fondo */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#008080]/5 blur-[100px] rounded-full -mb-32 -mr-32" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 items-start gap-12 lg:gap-8">
          
          {/** LOGOS Y SELECTOR DE IDIOMA */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#008080] flex items-center gap-2">
                {t('payments.title')}
              </h4>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[20px] w-fit border border-white/5">
                <Image src={visa} alt="visa" width={50} className="transition-all duration-300" />
                <Image src={mastercard} alt="mastercard" width={50} className="transition-all duration-300" />
              </div>
            </div>

            {/* BOTÓN CAMBIO DE IDIOMA - Estilo Segmented Button M3 */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 flex items-center gap-2">
                <Globe size={12} />
                {t('language.title')}
              </h4>
              <div className="flex p-1 bg-white/5 rounded-full border border-white/10 w-fit">
                <Link
                  href={pathname}
                  locale="es"
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all text-xs font-bold active:scale-95 ${
                    locale === 'es' 
                    ? "bg-[#008080] text-white shadow-lg shadow-[#008080]/20" 
                    : "text-white/40 hover:text-white"
                  }`}
                >
                  <span>ES</span>
                </Link>
                <Link
                  href={pathname}
                  locale="en"
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all text-xs font-bold active:scale-95 ${
                    locale === 'en' 
                    ? "bg-[#008080] text-white shadow-lg shadow-[#008080]/20" 
                    : "text-white/40 hover:text-white"
                  }`}
                >
                  <span>EN</span>
                </Link>
              </div>
            </div>
          </div>

          {/* LEGAL - Estilo List Item M3 */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#D1127C] flex items-center gap-2">
              <ShieldCheck size={16} />
              {t('legal.title')}
            </h4>
            <ul className="space-y-4">
              {[
                { href: "/legal/privacidad", label: t('legal.privacy') },
                { href: "/legal/reembolsos", label: t('legal.refunds') },
                { href: "/legal/terminos", label: t('legal.terms') }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#008080] transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#008080] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACTO */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#008080] flex items-center gap-2">
              <PhoneCall size={16} />
              {t('contact.title')}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col gap-1">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{t('contact.tel')}</span>
                <span className="text-gray-300 font-medium">+52 55 5553 0509</span>
              </li>
              <li className="flex flex-col gap-1 text-wrap break-words">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Email</span>
                <a
                  href="mailto:informacion@odysseymexico.com"
                  className="text-gray-300 hover:text-[#D1127C] transition-colors font-medium"
                >
                  informacion@odysseymexico.com
                </a>
              </li>
            </ul>
          </div>

          {/* DIRECCIÓN */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#008080] flex items-center gap-2">
              <MapPin size={16} />
              {t('address.title')}
            </h4>
            <div className="p-4 rounded-[24px] bg-white/5 border border-white/5 group hover:bg-white/10 transition-all duration-300">
              <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors italic">
                Av. Tamaulipas 150, Piso 18 - Int. 1801, Col. Hipódromo,
                Alc. Cuauhtémoc, C.P. 06100, Ciudad de México.
              </p>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR - MD3 Divider & Metadata */}
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-xs font-bold text-gray-500 tracking-wider">
              © {new Date().getFullYear()} <span className="text-[#008080]">Odyssey</span><span className="text-[#D1127C]">México</span>
            </p>
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">
              {t('bottom.rights')}
            </p>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400">
            {t('bottom.made_in')} <span className="text-base">🇲🇽</span>
          </div>
        </div>
      </div>
    </footer>
  );
}