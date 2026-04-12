"use client";

import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import { useExperiences } from "@/hooks/useExperiences";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import Loading from "@/components/Loading";
import { formatPriceWithDecimals } from "@/lib/price";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, MapPin, Compass } from "lucide-react";

export default function ExperiencesPage() {
    const t = useTranslations("ExperiencesPage");
    const params = useParams();
    const [page, setPage] = useState(1);

    const {
        data,
        loading,
        error,
        currentPage,
        totalPages,
        hasNextPage,
        hasPrevPage,
    } = useExperiences({
        page,
        pageSize: 9,
    });

    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <div className="p-10 text-center text-red-500 font-medium">
                {t("error")}: {error.message}
            </div>
        );
    }

    return (
        <>
            {/* El Header ahora encontrará un fondo oscuro para verse bien desde el inicio */}
            <Header />
            
            <section className="min-h-screen bg-[#001212] pt-32 pb-20">
                <div className="container mx-auto px-6">
                    
                    {/* Encabezado de página con contraste para Header Transparente */}
                    <div className="relative mb-16 text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#008080]/10 border border-[#008080]/20 text-[#008080] text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                            <Compass size={14} />
                            {t("main_title")}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                            {t("main_title")}
                        </h1>
                        <p className="text-gray-500 max-w-xl mx-auto text-lg font-medium">
                            {t("subtitle")}
                        </p>
                    </div>

                    {/* Grid de Experiencias */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((exp) => (
                            <Link
                                key={exp.id}
                                href={`/experiencias/${exp.id}`}
                                className="group flex flex-col bg-[#001a1a] border border-white/5 rounded-[40px] overflow-hidden transition-all duration-500 hover:border-[#008080]/30 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
                            >
                                {/* Imagen con Overlay sutil */}
                                <div className="relative h-80 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${exp.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#001a1a] via-transparent to-transparent opacity-60" />
                                    
                                </div>

                                {/* Contenido */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#008080] transition-colors leading-tight">
                                        {exp.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-8">
                                        {exp.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Desde</p>
                                            <p className="text-white font-black text-xl">
                                                <span className="text-[#008080] mr-1">$</span>
                                                MXN {formatPriceWithDecimals(exp.price)}
                                            </p>
                                        </div>
                                        
                                        <div className="h-12 w-12 rounded-full bg-[#008080] flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#D1127C] group-hover:rotate-45">
                                            <ChevronRight size={24} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty state */}
                    {data.length === 0 && (
                        <div className="text-center py-32">
                            <p className="text-gray-500 font-medium text-lg italic">
                                {t("no_results")}
                            </p>
                        </div>
                    )}

                    {/* Paginación Tonal */}
                    <div className="flex justify-center items-center gap-4 mt-24">
                        <button
                            disabled={!hasPrevPage}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setPage((prev) => Math.max(prev - 1, 1))
                            }}
                            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-[#008080] disabled:opacity-20 transition-all active:scale-90"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
                                {currentPage} <span className="mx-2 text-[#008080]">/</span> {totalPages}
                            </span>
                        </div>

                        <button
                            disabled={!hasNextPage}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setPage((prev) => prev + 1)
                            }}
                            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-[#008080] disabled:opacity-20 transition-all active:scale-90"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}