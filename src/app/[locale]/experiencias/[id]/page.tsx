"use client";

import { useParams } from "next/navigation";
import { useExperience } from "@/hooks/useExperience";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { saveReservation } from "@/lib/reservations";
import { Calendar, Check, CheckCircle, ChevronLeft, ChevronRight, CreditCard, Lock, ShoppingCart, Users, X, Info, ShieldCheck, MapPin } from "lucide-react";
import { sendConfirmationEmail } from "@/lib/email";

import { useCart } from "@/context/CartContext";
import Loading from "@/components/Loading";
import { Link } from "@/i18n/routing";
import { checkout } from "@/lib/cart";
import { formatPriceWithDecimals } from "@/lib/price";
import { useLocale, useTranslations } from "next-intl";

export default function ExperienceDetailPage() {
    const t = useTranslations("ExperienceDetailPage");
    const params = useParams();
    const id = params.id as string;
    const { addToCart } = useCart();
    const { data, loading, error } = useExperience(id);
    const locale = useLocale()

    const [selectedImage, setSelectedImage] = useState(0);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [form, setForm] = useState({
        fecha: "",
        personas: "1",
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        cp: "",
    });

    const [card, setCard] = useState({
        number: "",
        name: "",
        month: "",
        year: "",
        cvv: "",
    });

    const [selection, setSelection] = useState({
        fecha: "",
        personas: 1,
    });
    const [addedToCart, setAddedToCart] = useState(false);

    const [successOpen, setSuccessOpen] = useState(false);
    const [reservationData, setReservationData] = useState<any>(null);

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

    data.priceFormatted = data.priceFormatted ?? "";
    data.caracteristicas_servicio = data.caracteristicas_servicio ?? [];
    data.destinationName = data.destinationName ?? "";
    data.destinationSlug = data.destinationSlug ?? "";
    data.incluido = data.incluido ?? [];
    data.no_incluido = data.no_incluido ?? [];
    data.accesibilidad = data.accesibilidad ?? [];

    const priceNumber = Number(data.price);
    const total = priceNumber * Number(form.personas || 1);
    const images = data.images?.length ? data.images : [data.image];

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setSelectedImage((prev) => prev === 0 ? images.length - 1 : prev - 1);

    const handleAddToCart = () => {
        if (!selection.fecha) {
            alert(t("alerts.select_date"));
            return;
        }

        addToCart({
            experienceId: data.id,
            title: data.title,
            destinationName: data.destinationName ?? "",
            price: Number(data.price),
            personas: selection.personas,
            fecha: selection.fecha,
        });

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-[#001212] pt-28 pb-20">
                <div className="max-w-7xl mx-auto px-6">

                    {/* 🔥 GRID PRINCIPAL */}
                    <div className="grid lg:grid-cols-2 gap-16 items-start">

                        {/* 🖼 GALERÍA - Estilo MD3 Elevated */}
                        <div className="space-y-6">
                            <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src={images[selectedImage]}
                                    onClick={() => setGalleryOpen(true)}
                                    className="w-full h-[500px] object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
                                    <MapPin size={16} className="text-[#008080]" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">{data.destinationName}</span>
                                </div>
                                <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-xl text-white text-[10px] font-black px-4 py-2 rounded-full border border-white/10">
                                    {selectedImage + 1} / {images.length}
                                </div>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                {images.map((img: any, i: number) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setSelectedImage(i)}
                                        className={`relative flex-shrink-0 h-24 w-32 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${selectedImage === i ? "border-[#008080] scale-95" : "border-transparent opacity-40 hover:opacity-100"}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 🧾 INFO + COMPRA */}
                        <div className="space-y-8">

                            {/* INFO */}
                            <div className="space-y-4">
                                <Link href={`/categoria/${data.destinationSlug}`} className="inline-block">
                                    <span className="text-[#D1127C] text-xs font-black uppercase tracking-[0.3em]">
                                        {data.destinationName}
                                    </span>
                                </Link>

                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1]">
                                    {data.title}
                                </h1>

                                <p className="text-gray-400 leading-relaxed text-lg font-medium">
                                    {data.description}
                                </p>
                            </div>

                            {/* 🔥 CARD COMPRA - Glassmorphism */}
                            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 shadow-2xl sticky top-28">

                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-4xl font-black text-white tracking-tight">
                                        MXN ${formatPriceWithDecimals(data.price)}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                            {t("booking.per_person")}
                                        </span>
                                        <span className="text-[10px] font-bold text-[#008080] uppercase tracking-widest">
                                            {t("booking.tax_included")}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-white/5">
                                    {/* Campo Fecha */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 ml-2">
                                            <Calendar size={14} className="text-[#008080]" /> {t("booking.select_date")}
                                        </label>
                                        <input
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            value={selection.fecha}
                                            onChange={(e) => setSelection({ ...selection, fecha: e.target.value })}
                                            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-[#008080] outline-none font-bold transition-all"
                                        />
                                    </div>

                                    {/* Campo Personas */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 ml-2">
                                            <Users size={14} className="text-[#008080]" /> {t("booking.travelers")}
                                        </label>
                                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2">
                                            <button
                                                onClick={() => setSelection(s => ({ ...s, personas: Math.max(1, s.personas - 1) }))}
                                                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl text-white font-black text-xl hover:bg-white/20 transition-all active:scale-90"
                                            >-</button>
                                            <span className="flex-grow text-center font-black text-white text-lg">{selection.personas}</span>
                                            <button
                                                onClick={() => setSelection(s => ({ ...s, personas: s.personas + 1 }))}
                                                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl text-white font-black text-xl hover:bg-white/20 transition-all active:scale-90"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className={`w-full py-5 mt-10 rounded-full font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${addedToCart
                                        ? "bg-green-500 text-white"
                                        : "bg-[#008080] hover:bg-[#006666] text-white shadow-[#008080]/20"
                                        } active:scale-95`}
                                >
                                    {addedToCart ? (
                                        <><Check size={24} strokeWidth={3} /> {t("booking.added")}</>
                                    ) : (
                                        <><ShoppingCart size={20} /> {t("booking.add_to_cart")}</>
                                    )}
                                </button>

                                <div className="mt-8 flex items-center justify-around text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-white/5 pt-6">
                                    <div className="flex items-center gap-2 italic">
                                        <CheckCircle size={14} className="text-[#008080]" />
                                        {t("trust.quick_confirmation")}
                                    </div>
                                    <div className="flex items-center gap-2 italic">
                                        <ShieldCheck size={14} className="text-[#008080]" />
                                        {t("trust.secure_payment")}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 🔽 DETALLES - MD3 Surfaces */}
                    <div className="mt-24 grid lg:grid-cols-3 gap-8">
                        
                        {/* COLUMNA PRINCIPAL */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-6">
                                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                    <Info className="text-[#D1127C]" />
                                    {t("details.title")}
                                </h2>
                                <p className="text-gray-400 leading-relaxed font-medium">
                                    {data.description || ""}
                                </p>
                            </div>

                            {data.itinerario && (
                                <div className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-6">
                                    <h3 className="text-xl font-black text-white">{t("details.itinerary")}</h3>
                                    <p className="text-gray-400 font-medium whitespace-pre-line leading-relaxed">
                                        {data.itinerario || ""}
                                    </p>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-8">
                                {data.incluido?.length > 0 && (
                                    <div className="bg-[#008080]/5 border border-[#008080]/10 rounded-[32px] p-8">
                                        <h3 className="text-lg font-black text-[#008080] mb-6 flex items-center gap-2">
                                            <CheckCircle size={20} />
                                            {t("details.included")}
                                        </h3>
                                        <ul className="space-y-3">
                                            {data.incluido.map((item: string, i: number) => (
                                                <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#008080] flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {data.no_incluido?.length > 0 && (
                                    <div className="bg-[#D1127C]/5 border border-[#D1127C]/10 rounded-[32px] p-8">
                                        <h3 className="text-lg font-black text-[#D1127C] mb-6 flex items-center gap-2">
                                            <X size={20} />
                                            {t("details.not_included")}
                                        </h3>
                                        <ul className="space-y-3">
                                            {data.no_incluido.map((item: string, i: number) => (
                                                <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D1127C] flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* COLUMNA LATERAL DETALLES */}
                        <div className="space-y-8">
                            {data.caracteristicas_servicio?.length > 0 && (
                                <div className="bg-white/5 border border-white/5 rounded-[32px] p-8">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                                        {t("details.service_features")}
                                    </h3>
                                    <div className="space-y-4">
                                        {data.caracteristicas_servicio.map((item: string, i: number) => (
                                            <div key={i} className="text-sm text-gray-400 font-medium flex items-center gap-3">
                                                <div className="w-1 h-4 bg-[#008080] rounded-full" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {data.accesibilidad?.length > 0 && (
                                <div className="bg-white/5 border border-white/5 rounded-[32px] p-8">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                                        {t("details.accessibility")}
                                    </h3>
                                    <ul className="space-y-4">
                                        {data.accesibilidad.map((item: string, i: number) => (
                                            <li key={i} className="text-sm text-gray-400 font-medium flex gap-3">
                                                <span className="text-[#008080]">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {data.reservaciones_antelacion && (
                                <div className="bg-[#008080]/10 border border-[#008080]/20 rounded-[32px] p-8">
                                    <h3 className="text-sm font-black text-[#008080] uppercase tracking-widest mb-4">
                                        {t("details.booking_info")}
                                    </h3>
                                    <p className="text-sm text-gray-300 font-medium leading-relaxed italic">
                                        "{data.reservaciones_antelacion}"
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            <Footer />

            {/* 🔥 MODAL GALERÍA - MD3 Scrim */}
            {galleryOpen && (
                <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
                    <button
                        onClick={() => setGalleryOpen(false)}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={40} strokeWidth={1.5} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-8 p-4 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <ChevronLeft size={48} />
                    </button>

                    <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
                        <img
                            src={images[selectedImage]}
                            className="max-h-[85vh] max-w-full rounded-[32px] shadow-2xl border border-white/10 object-contain"
                        />
                    </div>

                    <button
                        onClick={nextImage}
                        className="absolute right-8 p-4 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <ChevronRight size={48} />
                    </button>
                </div>
            )}
        </>
    );
}