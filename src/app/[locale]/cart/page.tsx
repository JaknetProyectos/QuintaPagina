"use client";

import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { checkout } from "@/lib/cart";
import { useState } from "react";
import { 
    CreditCard, Lock, CheckCircle, MapPin, ShieldCheck, 
    AlertTriangle, X, Trash2, ArrowRight, CreditCard as CardIcon,
    ChevronLeft, Sparkles, Receipt
} from "lucide-react";
import Image from "next/image";
import etominLogo from "@/public/etomin.png";
import securePaymentLogo from "@/public/secure-payment.png";
import { EmptyCart } from "@/components/EmptyCart";
import { useLocale, useTranslations } from "next-intl";

export default function CartPage() {
    const t = useTranslations("CartPage");
    const { cart, updateItem, removeItem, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState<any[] | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false); // Control del flujo de pago
    const locale = useLocale();

    // Datos de contacto y envío
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        pais: "México",
        calle: "",
        apartamento: "",
        ciudad: "",
        estado: "",
        cp: "",
    });

    // Datos de tarjeta
    const [card, setCard] = useState({
        number: "",
        name: "",
        month: "",
        year: "",
        cvv: "",
    });

    const total = cart.reduce((acc, item) => acc + item.price * (item.personas || 1), 0);

    // Función para facilitar testeos (Datos de ejemplo)
    const fillTestData = () => {
        setForm({
            nombre: "John Doe",
            email: "john@example.com",
            telefono: "5551234567",
            pais: "México",
            calle: "Av. Reforma 123",
            apartamento: "Piso 4, Int B",
            ciudad: "CDMX",
            estado: "Ciudad de México",
            cp: "06600",
        });
        setCard({
            number: "4111111111111111",
            name: "JOHN DOE",
            month: "12",
            year: "28",
            cvv: "123",
        });
    };

    const isFormValid =
        form.nombre &&
        form.email.includes("@") &&
        form.calle &&
        form.ciudad &&
        form.estado &&
        form.cp &&
        form.telefono &&
        form.pais;

    const canCheckout =
        isFormValid &&
        card.cvv &&
        card.name &&
        card.month &&
        card.year &&
        card.number.length >= 15 && card.cvv.length >= 3 &&
        cart.length > 0 &&
        cart.every(item => item.fecha && item.personas);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            if (!canCheckout) throw Error(t("alerts.complete_fields"));

            const direccionCompleta = `
                ${form.calle} 
                ${form.apartamento ? `, Apt/Int: ${form.apartamento}` : ""} 
                , ${form.ciudad}, ${form.estado}
                , ${form.pais}
            `.replace(/\s+/g, ' ').trim();

            const dataParaEnvio = {
                ...form,
                direccion: direccionCompleta
            };

            const result = await checkout(cart, dataParaEnvio, card, locale);

            clearCart();
            setTicket(result);
        } catch (err: any) {
            setPaymentError(err.message || t("alerts.process_error"));
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && !ticket && !paymentError) {
        return <EmptyCart />;
    }

    return (
        <>
            <Header />
            
            {/* MODAL DE ERROR - Estilo M3 Error Surface */}
            {paymentError && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[100] p-4">
                    <div className="bg-[#1A0A0A] border border-red-500/20 w-full max-w-md rounded-[40px] p-10 shadow-2xl text-center">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{t("modals.error_title")}</h2>
                        <p className="text-gray-400 text-sm mb-10 leading-relaxed font-medium">
                            {paymentError}
                        </p>
                        <button 
                            onClick={() => setPaymentError(null)} 
                            className="w-full py-5 bg-red-500 text-white rounded-full font-black uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95"
                        >
                            {t("modals.try_again")}
                        </button>
                    </div>
                </div>
            )}
            
            {/* MODAL DE ÉXITO - Estilo VIP Odyssey México */}
            {ticket && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center z-[100] p-4">
                    <div className="bg-[#001212] border border-[#008080]/30 w-full max-w-lg rounded-[48px] p-12 shadow-2xl text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#008080]" />
                        <div className="w-24 h-24 bg-[#008080] text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#008080]/20">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tighter mb-4">{t("modals.success_title")}</h2>
                        <p className="text-gray-400 mb-10 text-lg">
                            {t("modals.success_message")} <span className="text-[#008080] font-black">{form.email}</span>
                        </p>

                        <div className="text-left bg-white/5 rounded-[32px] p-8 mb-10 space-y-6 border border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#008080] mb-2">{t("modals.summary")}</p>
                            {ticket.map((res, i) => (
                                <div key={i} className="flex justify-between items-center group">
                                    <div className="space-y-1">
                                        <p className="text-sm font-black text-white uppercase tracking-tight">{res.activity_title}</p>
                                    </div>
                                    <Receipt size={18} className="text-white/10 group-hover:text-[#008080] transition-colors" />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => window.location.href = "/"}
                            className="w-full py-5 bg-white text-black rounded-full font-black uppercase text-xs tracking-[0.3em] hover:bg-[#008080] hover:text-white transition-all active:scale-95"
                        >
                            {t("modals.finish")}
                        </button>
                    </div>
                </div>
            )}

            <main className="min-h-screen bg-[#001212] pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-start">

                    {/* COLUMNA IZQUIERDA: CARRITO */}
                    <div className="lg:col-span-7 space-y-10">
                        <div className="flex items-end justify-between border-b border-white/5 pb-8">
                            <div className="space-y-2">
                                <h1 className="text-5xl font-black text-white tracking-tighter">{t("cart.title")}</h1>
                                <p className="text-[#008080] text-xs font-black uppercase tracking-[0.3em]">Shopping Bag</p>
                            </div>
                            <span className="bg-white/5 px-4 py-2 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest border border-white/5">
                                {cart.length} {t("cart.items")}
                            </span>
                        </div>

                        <div className="space-y-6">
                            {cart.map(item => (
                                <div key={item.experienceId} className="group bg-white/5 backdrop-blur-3xl rounded-[40px] p-8 border border-white/5 hover:border-[#008080]/30 transition-all duration-500">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white tracking-tight uppercase leading-none group-hover:text-[#008080] transition-colors">{item.title}</h3>
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">ID: {item.experienceId}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.experienceId)}
                                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2 italic">{t("cart.selected_date")}</label>
                                            <input
                                                type="date"
                                                value={item.fecha || ""}
                                                onChange={e => updateItem(item.experienceId, { fecha: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:ring-2 focus:ring-[#008080] outline-none transition-all font-bold"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2 italic">{t("cart.travelers")}</label>
                                            <input
                                                type="number"
                                                min={1}
                                                value={item.personas || 1}
                                                onChange={e => updateItem(item.experienceId, { personas: Number(e.target.value) })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:ring-2 focus:ring-[#008080] outline-none transition-all font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                                        <p className="font-black text-3xl text-white tracking-tighter">
                                            <span className="text-[#008080] mr-2">$</span>
                                            {(item.price * (item.personas || 1)).toLocaleString()}
                                            <span className="text-xs font-bold text-gray-500 uppercase ml-2 tracking-widest">MXN</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: PAGO / RESUMEN */}
                    <div className="lg:col-span-5 sticky top-28 space-y-8">
                        
                        {/* RESUMEN DE COMPRA SIEMPRE VISIBLE */}
                        <div className="bg-[#008080] rounded-[48px] p-10 text-white shadow-2xl shadow-[#008080]/20 relative overflow-hidden group">
                            <Sparkles className="absolute top-6 right-6 opacity-20 group-hover:rotate-12 transition-transform duration-700" size={40} />
                            <div className="space-y-2 relative z-10">
                                <span className="block text-[10px] font-black opacity-60 uppercase tracking-[0.4em]">{t("cart.total_estimated")}</span>
                                <span className="text-6xl font-black tracking-tighter leading-none">${total.toLocaleString()}</span>
                                <span className="block text-xs font-bold uppercase tracking-widest opacity-60">Mexican Pesos</span>
                            </div>

                            {!showForm && (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="w-full bg-white text-black py-6 mt-10 rounded-full font-black uppercase text-sm tracking-[0.3em] hover:bg-[#D1127C] hover:text-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                                >
                                    {t("payment.confirm_booking")} <ArrowRight size={20} />
                                </button>
                            )}
                        </div>

                        {/* FORMULARIOS (Condicionales) */}
                        {showForm && (
                            <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-700">
                                {/* Botón para volver atrás */}
                                <button 
                                    onClick={() => setShowForm(false)}
                                    className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-[#008080] transition-colors ml-4"
                                >
                                    <ChevronLeft size={14} /> {t("cart.remove").replace(t("cart.remove"), "Volver a la bolsa")}
                                </button>

                                {/* 1. Datos de Envío */}
                                <div className="bg-white/5 backdrop-blur-3xl rounded-[40px] p-8 md:p-10 border border-white/10">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                            <div className="w-2 h-2 bg-[#008080] rounded-full animate-pulse"></div> 
                                            {t("form.billing_details")}
                                        </h2>
                                        {/* Botón de Test */}
                                        <button 
                                            onClick={fillTestData}
                                            className="text-[8px] font-black text-[#D1127C] border border-[#D1127C]/30 px-3 py-1 rounded-full uppercase tracking-widest hover:bg-[#D1127C] hover:text-white transition-all"
                                        >
                                            Demo Data
                                        </button>
                                    </div>

                                    <div className="grid gap-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder={t("form.placeholders.name")} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] font-bold" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                                            <input type="email" placeholder={t("form.placeholders.email")} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] font-bold" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="tel" placeholder={t("form.placeholders.phone")} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] font-bold" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
                                            <div className="relative">
                                                <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] appearance-none font-bold cursor-pointer" value={form.pais} onChange={e => setForm({ ...form, pais: e.target.value })}>
                                                    <option value="México" className="bg-[#001212]">México</option>
                                                    <option value="USA" className="bg-[#001212]">USA</option>
                                                    <option value="España" className="bg-[#001212]">España</option>
                                                    <option value="Canadá" className="bg-[#001212]">Canadá</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-white text-[10px]">▼</div>
                                            </div>
                                        </div>
                                        <input type="text" placeholder={t("form.placeholders.address")} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] font-bold" value={form.calle} onChange={e => setForm({ ...form, calle: e.target.value })} />
                                        <input type="text" placeholder={t("form.placeholders.apartment")} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] font-bold italic" value={form.apartamento} onChange={e => setForm({ ...form, apartamento: e.target.value })} />
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <input type="text" placeholder={t("form.placeholders.city")} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] font-bold" value={form.ciudad} onChange={e => setForm({ ...form, ciudad: e.target.value })} />
                                            <input type="text" placeholder={t("form.placeholders.state")} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] font-bold" value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })} />
                                            <input type="text" placeholder={t("form.placeholders.zip")} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] font-bold" value={form.cp} onChange={e => setForm({ ...form, cp: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Datos de Pago */}
                                <div className="bg-white/5 backdrop-blur-3xl rounded-[40px] p-8 md:p-10 border border-white/10 relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                                        <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                            <CardIcon className="text-[#008080]" size={18} /> {t("payment.method")}
                                        </h2>
                                        <Image src={etominLogo} alt="Etomin" width={120} height={50} className="object-contain opacity-50 transition-all cursor-help" />
                                    </div>

                                    <div className="space-y-4">
                                        <input type="text" placeholder={t("payment.placeholders.card_name")} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] font-bold" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
                                        <div className="relative">
                                            <input type="text" placeholder={t("payment.placeholders.card_number")} maxLength={16} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[#008080] font-bold tracking-[0.2em]" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                                <div className="w-8 h-5 bg-white/10 rounded-sm"></div>
                                                <div className="w-8 h-5 bg-white/10 rounded-sm"></div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <input type="text" placeholder="MM" maxLength={2} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-center text-white outline-none focus:border-[#008080] font-bold" value={card.month} onChange={e => setCard({ ...card, month: e.target.value })} />
                                            <input type="text" placeholder="YY" maxLength={2} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-center text-white outline-none focus:border-[#008080] font-bold" value={card.year} onChange={e => setCard({ ...card, year: e.target.value })} />
                                            <input type="password" placeholder="CVV" maxLength={4} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-center text-white outline-none focus:border-[#008080] font-bold" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="mt-12 space-y-8">
                                        <button
                                            onClick={handleCheckout}
                                            disabled={loading || !canCheckout}
                                            className="w-full bg-[#D1127C] text-white py-6 rounded-full font-black uppercase text-sm tracking-[0.4em] hover:bg-[#b00e68] transition-all shadow-2xl shadow-[#D1127C]/20 disabled:bg-white/5 disabled:text-gray-700 disabled:shadow-none active:scale-95 group"
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center gap-3">
                                                    <Loader2 className="animate-spin" size={20} />
                                                    {t("payment.processing")}
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-3">
                                                    <Lock size={18} />
                                                    {t("payment.confirm_booking")}
                                                </div>
                                            )}
                                        </button>

                                        <div className="flex flex-col items-center gap-6">
                                            <Image src={securePaymentLogo} alt="Secure Payment" width={140} height={40} className="object-contain opacity-40" />
                                            <div className="flex items-center gap-2 text-[8px] font-black text-gray-600 uppercase tracking-widest leading-relaxed text-center max-w-xs">
                                                <ShieldCheck size={14} className="text-[#008080]" />
                                                {t("payment.security_notice")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

// Icono de carga auxiliar
const Loader2 = ({ size = 24, className = "" }) => (
    <svg className={`animate-spin ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);