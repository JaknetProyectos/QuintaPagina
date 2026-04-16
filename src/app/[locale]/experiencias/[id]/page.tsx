"use client";

import { useParams } from "next/navigation";
import { useExperience } from "@/hooks/useExperience";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Check, CheckCircle, ChevronLeft, ChevronRight, ShoppingCart, Users, X, Info, ShieldCheck, MapPin } from "lucide-react";

import { useCart } from "@/context/CartContext";
import Loading from "@/components/Loading";
import { Link } from "@/i18n/routing";
import { formatPriceWithDecimals } from "@/lib/price";
import { useLocale, useTranslations } from "next-intl";
import { crearSlug } from "@/lib/utils";

export default function ExperienceDetailPage() {
    const t = useTranslations("ExperienceDetailPage");
    const params = useParams();
    const id = params.id as string;
    const { addToCart } = useCart();
    const { data, loading, error } = useExperience(id);
    const locale = useLocale();

    const [selectedImage, setSelectedImage] = useState(0);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [selection, setSelection] = useState({
        fecha: "",
        personas: 1,
    });
    const [addedToCart, setAddedToCart] = useState(false);

    if (loading) {
        return <Loading />
    }

    if (error || !data) {
        return (
            <div className="p-10 text-center text-red-500 font-bold bg-[#001212] min-h-screen">
                {t("error_loading")}
            </div>
        );
    }

    // --- LÓGICA DE TRADUCCIÓN PARA COLUMNAS NUEVAS ---
    const isEs = locale === "es";

    const title = isEs ? data.title : (data.title_english || data.title);
    const description = isEs ? data.description : (data.description_english || data.description);
    
    // Arrays: Intentamos usar la versión en inglés, si no existe usamos la original (español)
    const caracteristicas = isEs ? (data.caracteristicas_servicio ?? []) : (data.caracteristicas_servicio_english ?? data.caracteristicas_servicio ?? []);
    const incluido = isEs ? (data.incluido ?? []) : (data.incluido_english ?? data.incluido ?? []);
    const no_incluido = isEs ? (data.no_incluido ?? []) : (data.no_incluido_english ?? data.no_incluido ?? []);
    const accesibilidad = isEs ? (data.accesibilidad ?? []) : (data.accesibilidad_english ?? data.accesibilidad ?? []);

    // Itinerario: Manejamos si viene como String o como Array (uniéndolo con saltos de línea)
    const itinerarioData = isEs ? data.itinerario : (data.itinerario_english || data.itinerario);
    const itinerario = Array.isArray(itinerarioData) ? itinerarioData.join('\n') : (itinerarioData || "");

    const images = data.images?.length ? data.images : [data.image];

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setSelectedImage((prev) => prev === 0 ? images.length - 1 : prev - 1);

    const handleAddToCart = () => {
        if (!selection.fecha) {
            alert(t("alerts.select_date"));
            return;
        }

        addToCart({
            experienceId: crearSlug(title),
            title: title,
            destinationName: data.destinationName ?? "",
            price: Number(data.price),
            personas: selection.personas,
            fecha: selection.fecha,
        });

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    return (
        <div className="overflow-x-hidden">
            <Header />

            <div className="min-h-screen bg-[#001212] pt-24 md:pt-28 pb-12 md:pb-20">
                <div className="max-w-7xl mx-auto px-4 md:px-6">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                        {/* 🖼 GALERÍA */}
                        <div className="space-y-4 md:space-y-6 w-full overflow-hidden">
                            <div className="relative group rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src={images[selectedImage]}
                                    onClick={() => setGalleryOpen(true)}
                                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/40 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-white/10 flex items-center gap-2">
                                    <MapPin size={14} className="text-[#008080]" />
                                    <span className="text-[9px] md:text-xs font-black text-white uppercase tracking-widest">{data.destinationName}</span>
                                </div>
                                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-black/60 backdrop-blur-xl text-white text-[9px] font-black px-3 py-1.5 rounded-full border border-white/10">
                                    {selectedImage + 1} / {images.length}
                                </div>
                            </div>

                            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 no-scrollbar">
                                {images.map((img: any, i: number) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setSelectedImage(i)}
                                        className={`relative flex-shrink-0 h-16 w-24 md:h-24 md:w-32 rounded-xl md:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${selectedImage === i ? "border-[#008080] scale-95" : "border-transparent opacity-40 hover:opacity-100"}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 🧾 INFO + COMPRA */}
                        <div className="space-y-6 md:space-y-8">
                            <div className="space-y-3 md:space-y-4">
                                <Link href={`/categoria/${data.destinationSlug}`} className="inline-block">
                                    <span className="text-[#D1127C] text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
                                        {data.destinationName}
                                    </span>
                                </Link>

                                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
                                    {title}
                                </h1>

                                <p className="text-gray-400 leading-relaxed text-base md:text-lg font-medium">
                                    {description}
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[30px] md:rounded-[40px] p-6 md:p-8 shadow-2xl lg:sticky lg:top-28">

                                <div className="flex flex-wrap items-baseline gap-2 mb-6 md:mb-8">
                                    <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                        MXN ${formatPriceWithDecimals(data.price)}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                                            {t("booking.per_person")}
                                        </span>
                                        <span className="text-[9px] font-bold text-[#008080] uppercase tracking-widest">
                                            {t("booking.tax_included")}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-5 md:space-y-6 pt-6 border-t border-white/5">
                                    <div className="space-y-3">
                                        <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 ml-2">
                                            <Calendar size={14} className="text-[#008080]" /> {t("booking.select_date")}
                                        </label>
                                        <input
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            value={selection.fecha}
                                            onChange={(e) => setSelection({ ...selection, fecha: e.target.value })}
                                            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white focus:ring-2 focus:ring-[#008080] outline-none font-bold text-sm md:text-base transition-all"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 ml-2">
                                            <Users size={14} className="text-[#008080]" /> {t("booking.travelers")}
                                        </label>
                                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-2">
                                            <button
                                                onClick={() => setSelection(s => ({ ...s, personas: Math.max(1, s.personas - 1) }))}
                                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 rounded-lg md:rounded-xl text-white font-black text-xl hover:bg-white/20 transition-all active:scale-90"
                                            >-</button>
                                            <span className="flex-grow text-center font-black text-white text-base md:text-lg">{selection.personas}</span>
                                            <button
                                                onClick={() => setSelection(s => ({ ...s, personas: s.personas + 1 }))}
                                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 rounded-lg md:rounded-xl text-white font-black text-xl hover:bg-white/20 transition-all active:scale-90"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className={`w-full py-4 md:py-5 mt-8 md:mt-10 rounded-full font-black text-base md:text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${addedToCart
                                        ? "bg-green-500 text-white"
                                        : "bg-[#008080] hover:bg-[#006666] text-white shadow-[#008080]/20"
                                        } active:scale-95`}
                                >
                                    {addedToCart ? (
                                        <><Check size={20} strokeWidth={3} className="md:w-6 md:h-6" /> {t("booking.added")}</>
                                    ) : (
                                        <><ShoppingCart size={18} className="md:w-5 md:h-5" /> {t("booking.add_to_cart")}</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 🔽 DETALLES */}
                    <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6 md:space-y-8">
                            <div className="bg-white/5 border border-white/5 rounded-[30px] md:rounded-[40px] p-6 md:p-10 space-y-6">
                                <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-3">
                                    <Info className="text-[#D1127C] w-5 h-5 md:w-6 md:h-6" />
                                    {t("details.title")}
                                </h2>
                                <p className="text-gray-400 leading-relaxed font-medium text-sm md:text-base">
                                    {description}
                                </p>
                            </div>

                            {itinerario && (
                                <div className="bg-white/5 border border-white/5 rounded-[30px] md:rounded-[40px] p-6 md:p-10 space-y-6">
                                    <h3 className="text-lg md:text-xl font-black text-white">{t("details.itinerary")}</h3>
                                    <p className="text-gray-400 font-medium whitespace-pre-line leading-relaxed text-sm md:text-base">
                                        {itinerario}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                {incluido.length > 0 && (
                                    <div className="bg-[#008080]/5 border border-[#008080]/10 rounded-[24px] md:rounded-[32px] p-6 md:p-8">
                                        <h3 className="text-base md:text-lg font-black text-[#008080] mb-5 md:mb-6 flex items-center gap-2">
                                            <CheckCircle size={18} className="md:w-5 md:h-5" />
                                            {t("details.included")}
                                        </h3>
                                        <ul className="space-y-3">
                                            {incluido.map((item: string, i: number) => (
                                                <li key={i} className="text-xs md:text-sm text-gray-300 flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#008080] flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {no_incluido.length > 0 && (
                                    <div className="bg-[#D1127C]/5 border border-[#D1127C]/10 rounded-[24px] md:rounded-[32px] p-6 md:p-8">
                                        <h3 className="text-base md:text-lg font-black text-[#D1127C] mb-5 md:mb-6 flex items-center gap-2">
                                            <X size={18} className="md:w-5 md:h-5" />
                                            {t("details.not_included")}
                                        </h3>
                                        <ul className="space-y-3">
                                            {no_incluido.map((item: string, i: number) => (
                                                <li key={i} className="text-xs md:text-sm text-gray-300 flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D1127C] flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            {caracteristicas.length > 0 && (
                                <div className="bg-white/5 border border-white/5 rounded-[24px] md:rounded-[32px] p-6 md:p-8">
                                    <h3 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                                        {t("details.service_features")}
                                    </h3>
                                    <div className="space-y-4">
                                        {caracteristicas.map((item: string, i: number) => (
                                            <div key={i} className="text-xs md:text-sm text-gray-400 font-medium flex items-center gap-3">
                                                <div className="w-1 h-4 bg-[#008080] rounded-full" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {accesibilidad.length > 0 && (
                                <div className="bg-white/5 border border-white/5 rounded-[24px] md:rounded-[32px] p-6 md:p-8">
                                    <h3 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                                        {t("details.accessibility")}
                                    </h3>
                                    <ul className="space-y-4">
                                        {accesibilidad.map((item: string, i: number) => (
                                            <li key={i} className="text-xs md:text-sm text-gray-400 font-medium flex gap-3">
                                                <span className="text-[#008080]">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}