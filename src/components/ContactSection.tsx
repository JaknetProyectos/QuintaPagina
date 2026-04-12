"use client";

import { useState } from "react";
import { Send, Check, Loader2, Calendar, Users, MessageSquare, Phone, Mail, User } from "lucide-react";
import { useQuotes } from "@/hooks/useQuote";
import { useLocale, useTranslations } from "next-intl";

export default function ContactAventura() {
  const t = useTranslations("ContactAventura");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const locale = useLocale()
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "Viaje a medida (Servicio Concierge)",
    fechaSalida: "",
    fechaRegreso: "",
    personas: "1",
    mensaje: "",
  });

  const { createQuote } = useQuotes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabaseData = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        personas: formData.personas,
        experiencia_slug: formData.motivo.toLowerCase().replace(/\s+/g, '-'),
        experiencia_title: formData.motivo,
        detalles: `
          Fechas: ${formData.fechaSalida} al ${formData.fechaRegreso}
          Mensaje: ${formData.mensaje}
        `.trim(),
      };

      const newQuote = await createQuote(supabaseData as any);

      if (!newQuote?.id) throw new Error("No ID generated");

      const response = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: newQuote.id,
          detalles: `
          Fechas: ${formData.fechaSalida} al ${formData.fechaRegreso}
          Mensaje: ${formData.mensaje}
        `.trim(),
          experiencia_title: supabaseData.experiencia_title,
          locale
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(t("alerts.email_error"));
      }
    } catch (error) {
      console.error(error);
      alert(t("alerts.connection_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="bg-gray-50/50 py-24 px-4 relative overflow-hidden">
      {/* Elementos decorativos M3 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#008080] via-[#D1127C] to-[#008080]" />
      
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          
          {/* SECCIÓN DE TÍTULO (Layout Asimétrico) */}
          <div className="lg:w-1/3 space-y-6 pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008080]/10 text-[#008080] font-bold text-xs uppercase tracking-[0.2em]">
              <MessageSquare size={14} />
              {t("form.labels.reason")}
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter leading-[0.9]" 
                dangerouslySetInnerHTML={{ __html: t.raw("title") }} />
            <p className="text-xl text-gray-500 font-medium leading-relaxed border-l-4 border-[#D1127C] pl-6 py-2">
              {t("subtitle")}
            </p>
          </div>

          {/* COLUMNA DEL FORMULARIO - MD3 Surface Container */}
          <div className="lg:w-2/3 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] p-6 md:p-12 relative transition-all duration-500">
            {submitted ? (
              <div className="py-24 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-[#D1127C] text-white rounded-[32px] flex items-center justify-center mx-auto shadow-xl rotate-12">
                  <Check size={48} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-4xl font-bold text-gray-900">{t("success.title")}</h3>
                  <p className="text-lg text-gray-500 max-w-md mx-auto">{t("success.message")}</p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 rounded-full border-2 border-[#D1127C] text-[#D1127C] font-bold hover:bg-[#D1127C] hover:text-white transition-all active:scale-95"
                >
                  {t("success.send_another")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Grupos de inputs con Iconos para el efecto "Vivo" */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <User className="absolute left-5 top-5 text-gray-400 group-focus-within:text-[#008080] transition-colors" size={20} />
                    <input
                      required
                      type="text"
                      placeholder={t("form.placeholders.name")}
                      className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] pl-14 pr-6 py-5 outline-none focus:bg-white focus:border-[#008080]/30 focus:ring-4 focus:ring-[#008080]/5 transition-all font-medium"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-5 text-gray-400 group-focus-within:text-[#008080] transition-colors" size={20} />
                    <input
                      required
                      type="email"
                      placeholder={t("form.placeholders.email")}
                      className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] pl-14 pr-6 py-5 outline-none focus:bg-white focus:border-[#008080]/30 focus:ring-4 focus:ring-[#008080]/5 transition-all font-medium"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-end">
                  <div className="relative group">
                    <Phone className="absolute left-5 top-5 text-gray-400 group-focus-within:text-[#008080] transition-colors" size={20} />
                    <input
                      required
                      type="tel"
                      placeholder={t("form.placeholders.phone")}
                      className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] pl-14 pr-6 py-5 outline-none focus:bg-white focus:border-[#008080]/30 focus:ring-4 focus:ring-[#008080]/5 transition-all font-medium"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-4 text-[#008080]">{t("form.labels.reason")}</label>
                    <select
                      className="w-full bg-gray-50 border-2 border-transparent rounded-[20px] px-6 py-5 outline-none focus:bg-white focus:border-[#008080]/30 transition-all appearance-none cursor-pointer font-bold text-gray-700"
                      value={formData.motivo}
                      onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                    >
                      <option value="Viaje a medida (Servicio Concierge)">{t("form.options.concierge")}</option>
                      <option value="Duda sobre los tours">{t("form.options.tours_doubt")}</option>
                      <option value="Asistencia con reserva ya realizada">{t("form.options.booking_help")}</option>
                    </select>
                  </div>
                </div>

                <div className="bg-[#008080]/5 p-6 rounded-[32px] grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-2 text-gray-500">
                      <Calendar size={12} className="text-[#008080]" />
                      {t("form.labels.departure")}
                    </label>
                    <input
                      type="date"
                      className="w-full bg-white border-none rounded-[15px] px-4 py-3 outline-none focus:ring-2 focus:ring-[#008080] text-sm font-bold shadow-sm"
                      value={formData.fechaSalida}
                      onChange={(e) => setFormData({ ...formData, fechaSalida: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-2 text-gray-500">
                      <Calendar size={12} className="text-[#008080]" />
                      {t("form.labels.return")}
                    </label>
                    <input
                      type="date"
                      className="w-full bg-white border-none rounded-[15px] px-4 py-3 outline-none focus:ring-2 focus:ring-[#008080] text-sm font-bold shadow-sm"
                      value={formData.fechaRegreso}
                      onChange={(e) => setFormData({ ...formData, fechaRegreso: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-2 text-gray-500">
                      <Users size={12} className="text-[#008080]" />
                      {t("form.labels.travelers")}
                    </label>
                    <select
                      className="w-full bg-white border-none rounded-[15px] px-4 py-3 outline-none focus:ring-2 focus:ring-[#008080] text-sm font-bold shadow-sm cursor-pointer"
                      value={formData.personas}
                      onChange={(e) => setFormData({ ...formData, personas: e.target.value })}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n.toString()}>
                          {n} {n === 1 ? t("form.options.person") : t("form.options.people")}
                        </option>
                      ))}
                      <option value="9+">9+ {t("form.options.people")}</option>
                    </select>
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    placeholder={t("form.placeholders.message")}
                    rows={4}
                    className="w-full bg-gray-50 border-2 border-transparent rounded-[24px] px-8 py-6 outline-none focus:bg-white focus:border-[#008080]/30 focus:ring-4 focus:ring-[#008080]/5 transition-all font-medium resize-none"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#D1127C] text-white py-6 rounded-full font-black text-xl hover:bg-[#b00e68] transition-all flex items-center justify-center gap-4 shadow-[0_15px_30px_rgba(209,18,124,0.3)] active:scale-[0.96] disabled:opacity-50 group"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <span className="tracking-wide">{t("form.submit")}</span>
                        <Send size={22} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
                    {t("form.disclaimer")}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}