"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingBag, ArrowRight, Sparkles, Map, Compass } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export function EmptyCart() {
    const t = useTranslations('Cart');

    return (
        <div className="bg-[#001212] min-h-screen flex flex-col font-work-sans selection:bg-[#008080] selection:text-white">
            <Header />
            
            <main className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
                
                {/* Acentos de Luz de Fondo (Ambiental) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#008080]/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-3xl w-full text-center space-y-12 animate-in fade-in zoom-in-95 duration-1000 relative z-10">
                    
                    {/* Visual Central: Círculo Etéreo */}
                    <div className="relative inline-block group">
                        <div className="absolute inset-0 bg-[#008080]/20 rounded-full blur-2xl group-hover:bg-[#D1127C]/10 transition-colors duration-700" />
                        <div className="relative w-40 h-40 md:w-56 md:h-56 border border-white/10 rounded-full flex items-center justify-center bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                            {/* Iconos Flotantes de Fondo */}
                            <Compass size={120} className="absolute -bottom-4 -right-4 text-white/[0.02] -rotate-12" />
                            <Map size={100} className="absolute -top-4 -left-4 text-white/[0.02] rotate-12" />
                            
                            {/* Icono Principal */}
                            <ShoppingBag 
                                size={64} 
                                className="text-white/20 transition-all duration-700 group-hover:scale-110 group-hover:text-[#008080] group-hover:rotate-6" 
                                strokeWidth={0.5} 
                            />
                        </div>
                        
                        {/* Sparkle flotante */}
                        <div className="absolute -top-2 -right-2 bg-[#D1127C] p-3 rounded-2xl shadow-lg shadow-[#D1127C]/20 animate-bounce-slow">
                            <Sparkles size={20} className="text-white" />
                        </div>
                    </div>

                    {/* Tipografía: Brutalista & Limpia */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight italic uppercase">
                                {t('empty_title_part1')} <br />
                                <span className="text-[#008080] not-italic">{t('empty_title_part2')}</span>
                            </h2>
                            <div className="w-20 h-1 bg-[#D1127C] mx-auto rounded-full" />
                        </div>
                        
                        <p className="text-lg text-gray-500 font-medium max-w-md mx-auto leading-relaxed tracking-wide">
                            {t('empty_description')}
                        </p>
                    </div>

                    {/* CTA: Botón de Alto Impacto */}
                    <div className="flex flex-col items-center justify-center pt-8">
                        <Link href="/experiencias"
                            className="group relative w-full md:w-72 bg-white text-black py-6 px-10 rounded-full text-sm font-black uppercase tracking-[0.3em] transition-all duration-500 hover:bg-[#008080] hover:text-white hover:shadow-[0_0_40px_rgba(0,128,128,0.3)] flex items-center justify-center gap-4 overflow-hidden active:scale-95">
                            
                            {/* Efecto de brillo interno */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            
                            <span className="relative z-10">{t("explore_destinations")}</span>
                            <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>

                </div>

                {/* Elementos Decorativos de UI (Líneas de Escaneo) */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </main>

            <Footer />
        </div>
    );
}