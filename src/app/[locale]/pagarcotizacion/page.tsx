"use client";
import { Suspense, useEffect, useState, useCallback } from "react";
import { useQuotes } from "@/hooks/useQuote";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, ShoppingCart, Check, Info, Search, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

function PayQuoteContent() {
    const t = useTranslations("payQuote");
    const searchParams = useSearchParams();
    const queryFolio = searchParams.get('folio');

    const [folio, setFolio] = useState("");
    const [montoManual, setMontoManual] = useState<string>("");
    const [nombre, setNombre] = useState<string>("");
    const [quoteData, setQuoteData] = useState<any>(null);
    const [searching, setSearching] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");

    const { getQuoteByFolio } = useQuotes();
    const { addToCart } = useCart();
    const router = useRouter();

    const autoSearch = useCallback(async (f: string) => {
        if (!f) return;
        setSearching(true);
        setInfoMessage("");
        try {
            const data = await getQuoteByFolio(f);
            if (data) {
                setQuoteData(data);
                setMontoManual(data.price?.toString() || "");
                setInfoMessage(t("statusFound"));
            } else {
                setQuoteData(null);
                setInfoMessage(t("statusExternal"));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSearching(false);
        }
    }, [getQuoteByFolio, t]);

    useEffect(() => {
        if (queryFolio) {
            const f = queryFolio.toUpperCase();
            setFolio(f);
            autoSearch(f);
        }
    }, [queryFolio, autoSearch]);

    const handleAddToBag = () => {
        if (!folio || !montoManual) return;

        const itemToAdd = {
            experienceId: quoteData?.folio || folio.toUpperCase(),
            title: quoteData?.experiencia_title || `${t("customOrder")}: ${folio.toUpperCase()}`,
            destinationName: t("destination"),
            price: Number(montoManual),
            nombre: nombre,
            personas: quoteData ? (parseInt(quoteData.personas) || 1) : 1,
            fecha: new Date().toISOString().split('T')[0],
            description: quoteData ? `${t("client")}: ${nombre}` : `${t("externalFolio")}: ${folio.toUpperCase()}`
        };

        addToCart(itemToAdd);
        router.push("/cart");
    };

    return (
        <div className="container mx-auto px-6 max-w-7xl">
            
            {/* SECCIÓN INFORMATIVA - ESTILO HERO LIGERO */}
            <section className="mb-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* IMAGE CONTAINER M3 */}
                    <div className="relative order-2 lg:order-1">
                        <div className="rounded-[48px] overflow-hidden border border-white/10 shadow-2xl relative group">
                            <Image
                                src={"https://53.fs1.hubspotusercontent-na1.net/hubfs/53/media/atencionclienteonline.jpeg"}
                                alt="Atención Personalizada"
                                width={800}
                                height={600}
                                className="object-cover w-full h-[450px] lg:h-[550px] transition-transform duration-1000 group-hover:scale-105"
                                loading="eager"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#001212] via-transparent to-transparent opacity-60" />
                        </div>
                        {/* Acento flotante */}
                        <div className="absolute -bottom-6 -right-6 bg-[#008080] p-8 rounded-[32px] shadow-xl hidden lg:block animate-bounce-slow">
                            <Sparkles className="text-white" size={32} />
                        </div>
                    </div>

                    {/* CONTENT AREA */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div className="space-y-2">
                            <Link href={`/categoria/servicios-especiales`} className="text-[#008080] text-xs font-black uppercase tracking-[0.3em] hover:text-[#D1127C] transition-colors">
                                {t("specialServices")}
                            </Link>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                                {t("personalizedExperience")}
                            </h2>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-4">
                            <h3 className="text-xl font-bold text-[#D1127C] flex items-center gap-2">
                                <Info size={20} />
                                {t("confirmationTitle")}
                            </h3>
                            <p className="text-gray-400 font-medium leading-relaxed">
                                {t("description")}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <p className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                <ArrowRight size={16} className="text-[#008080]" />
                                {t("stepsTitle")}
                            </p>
                            <div className="grid gap-4">
                                {[t("step1"), t("step2"), t("step3")].map((step, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                                        <span className="w-8 h-8 rounded-full bg-[#008080] flex items-center justify-center text-white text-xs font-black">
                                            {i + 1}
                                        </span>
                                        <p className="text-sm text-gray-300 font-bold tracking-wide">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col gap-4">
                            <Link href={"/#contacto"}>
                                <button className="w-full md:w-auto bg-[#D1127C] text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#b00e68] transition-all shadow-lg shadow-[#D1127C]/20 active:scale-95">
                                    {t("quoteButton")}
                                </button>
                            </Link>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                                {t("assistanceText")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FORMULARIO DE PAGO - ESTILO CRISTAL M3 */}
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] overflow-hidden shadow-2xl max-w-3xl mx-auto border-t-[#008080]/30 border-t-4">
                
                <div className="p-10 md:p-16">
                    <div className="text-center mb-16">
                        <h1 className="text-sm font-black text-white uppercase tracking-[0.4em] mb-2">{t("checkoutTitle")}</h1>
                        <div className="w-12 h-1 bg-[#008080] mx-auto rounded-full" />
                    </div>

                    <div className="space-y-12">
                        {/* INPUT FOLIO */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">{t("labelFolio")}</label>
                            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-3xl p-2 transition-all focus-within:border-[#008080] focus-within:ring-4 focus-within:ring-[#008080]/10">
                                <div className="p-4 text-gray-400">
                                    {searching ? <Loader2 className="animate-spin" /> : <Search size={24} />}
                                </div>
                                <input
                                    type="text"
                                    placeholder={t("placeholderFolio")}
                                    value={folio}
                                    onChange={(e) => setFolio(e.target.value)}
                                    onBlur={() => autoSearch(folio)}
                                    className="w-full bg-transparent py-4 text-2xl md:text-3xl font-black text-white uppercase tracking-tighter outline-none placeholder:text-gray-700"
                                />
                            </div>
                            {infoMessage && (
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full w-fit text-[10px] font-black tracking-widest uppercase italic shadow-sm ${quoteData ? 'bg-[#008080]/10 text-[#008080] border border-[#008080]/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>
                                    {quoteData ? <Check size={14} /> : <Info size={14} />}
                                    {infoMessage}
                                </div>
                            )}
                        </div>

                        {/* DATOS DEL CLIENTE DETECTADOS */}
                        {quoteData && (
                            <div className="p-8 bg-[#008080] rounded-[32px] text-white shadow-xl shadow-[#008080]/20 animate-in zoom-in-95 duration-500">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">{t("holderLabel")}</p>
                                <p className="text-2xl font-black tracking-tighter mb-4 italic">{quoteData.nombre}</p>
                                <div className="h-px bg-white/20 mb-4" />
                                <p className="text-xs font-bold uppercase tracking-widest opacity-80">{quoteData.experiencia_title}</p>
                            </div>
                        )}

                        {/* INPUT NOMBRE Y MONTO */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">{t("labelNombre")}</label>
                                <input
                                    type="text"
                                    placeholder={t("placeholderNombre")}
                                    className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-xl font-black text-white outline-none focus:border-[#008080] transition-all"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">{t("labelMonto")}</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-[#008080]">$</span>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 pl-12 text-2xl font-black text-white outline-none focus:border-[#008080] transition-all"
                                        value={montoManual}
                                        onChange={(e) => setMontoManual(e.target.value)}
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-600">MXN</span>
                                </div>
                            </div>
                        </div>

                        {/* BOTÓN FINAL */}
                        <div className="pt-8 space-y-6">
                            <button
                                onClick={handleAddToBag}
                                disabled={!folio || !montoManual}
                                className="w-full bg-[#008080] text-white py-6 rounded-full font-black uppercase text-sm tracking-[0.3em] hover:bg-[#006666] transition-all shadow-xl shadow-[#008080]/10 flex items-center justify-center gap-4 disabled:bg-white/5 disabled:text-gray-700 disabled:shadow-none active:scale-95 group"
                            >
                                <ShoppingCart size={20} className="transition-transform group-hover:-rotate-12" /> 
                                {t("addToCart")}
                            </button>

                            <div className="flex items-center justify-center gap-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                                <span>•</span>
                                <div className="text-center italic">{t("confirmationDisclaimer")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PayQuotePage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#001212] pt-40 pb-32">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="animate-spin text-[#008080]" size={48} />
                        <span className="text-[10px] font-black text-[#008080] uppercase tracking-[0.5em] animate-pulse">Cargando Experiencia</span>
                    </div>
                }>
                    <PayQuoteContent />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}