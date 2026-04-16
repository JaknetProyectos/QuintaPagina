"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useParams } from "next/navigation";
import useDestination from "@/hooks/useDestination";
import { useExperiences } from "@/hooks/useExperiences";

import {
  ArrowLeft,
  Clock,
  Star,
  MapPin,
  Calendar,
  Users,
  X,
  Check,
  Sparkles,
  ChevronRight,
  Info
} from "lucide-react";
import { saveReservation } from "@/lib/reservations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPriceWithDecimals } from "@/lib/price";
import { useLocale, useTranslations } from "next-intl";

// Loading skeleton M3 Style
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#001212]">
      <div className="h-[40vh] bg-white/5 animate-pulse" />
      <div className="container mx-auto px-6 py-12 space-y-8">
        <div className="h-12 bg-white/5 rounded-full w-1/3 animate-pulse" />
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[400px] bg-white/5 rounded-[40px] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Booking Modal - Estilo Cristal M3
function BookingModal({
  isOpen,
  onClose,
  experience
}: {
  isOpen: boolean;
  onClose: () => void;
  experience: { title: string; price: string; destinationName: string } | null;
}) {
  const t = useTranslations("CategoryPage.modal");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fecha: "",
    personas: "1",
    nombre: "",
    email: "",
    telefono: "",
  });

  if (!isOpen || !experience) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveReservation({
      ...formData,
      activityTitle: experience.title,
      destinationName: experience.destinationName,
      price: experience.price,
      comentarios: "",
    });
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ fecha: "", personas: "1", nombre: "", email: "", telefono: "" });
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={handleClose} />
      <div className="relative bg-[#001212] border border-white/10 rounded-[48px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="bg-[#008080] px-8 py-10 flex items-center justify-between relative overflow-hidden">
            <Sparkles className="absolute top-2 right-12 text-white/10" size={80} />
            <div className="text-white relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-2">{t("book_label")}</p>
                <h3 className="text-2xl font-black tracking-tighter italic">{experience.title}</h3>
            </div>
            <button type="button" onClick={handleClose} className="bg-black/20 text-white p-3 rounded-full hover:bg-black/40 transition-colors relative z-10">
                <X className="w-6 h-6" />
            </button>
        </div>

        <div className="p-10">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">{t("fields.date")}</label>
                  <input
                    type="date"
                    min={today}
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#008080] font-bold"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">{t("fields.people")}</label>
                  <select
                    value={formData.personas}
                    onChange={(e) => setFormData({ ...formData, personas: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#008080] font-bold appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n} className="bg-[#001212]">{n}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">{t("fields.name")}</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#008080] font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">{t("fields.email")}</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#008080] font-bold"
                        required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">{t("fields.phone")}</label>
                    <input
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-[#008080] font-bold"
                        required
                    />
                  </div>
              </div>

              <div className="bg-[#008080]/10 border border-[#008080]/20 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#008080]">
                    <Info size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{t("per_person")}</span>
                </div>
                <span className="text-xl font-black text-white italic tracking-tighter">{experience.price}</span>
              </div>

              <button type="submit" className="w-full bg-[#008080] text-white py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] shadow-xl shadow-[#008080]/10 hover:bg-[#006666] transition-all active:scale-95">
                {t("confirm_button")}
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6">
              <div className="w-24 h-24 bg-[#008080] rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-[#008080]/20">
                <Check className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">{t("success.title")}</h3>
                <p className="text-gray-500 text-sm font-medium">{t("success.message")}</p>
              </div>
              <button type="button" onClick={handleClose} className="w-full bg-white text-black py-5 rounded-full font-black uppercase text-xs tracking-[0.3em] hover:bg-[#008080] hover:text-white transition-all">
                {t("success.close")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DestinationPage() {
  const t = useTranslations("CategoryPage");
  const params = useParams();
  const slug = params.slug as string;

  const { data: destination, loading: destLoading } = useDestination(slug);
  const { data: experiences, loading: expLoading } = useExperiences({ destinationSlug: slug, pageSize: 12 });
const locale = useLocale();

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    experience: { title: string; price: string; destinationName: string } | null;
  }>({
    isOpen: false,
    experience: null,
  });

  if (destLoading) {
    return <PageSkeleton />;
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#001212] flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">{t("not_found.title")}</h1>
          <Link href="/" className="inline-flex items-center gap-2 bg-[#008080] text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all">
            <ArrowLeft size={16} /> {t("not_found.back")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#001212] pt-32 pb-24">
        
        {/* Hero Destino Editorial */}
        <section className="relative h-[40vh] md:h-[50vh] flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[#008080]/5 animate-pulse" />
            <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
                <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none italic uppercase animate-in slide-in-from-bottom-8 duration-1000">
                    {destination.name}
                </h1>
                <div className="w-24 h-1.5 bg-[#D1127C] mx-auto rounded-full mt-8 animate-in zoom-in duration-1000" />
            </div>
        </section>

        <div className="container mx-auto px-6">
          {/* Grilla de Experiencias */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {expLoading ? (
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[450px] bg-white/5 rounded-[40px] animate-pulse" />
                ))
              ) : (
                experiences.map((exp) => (
                  <Link
                    key={exp.id}
                    href={`/experiencias/${exp.id}`}
                    className="group bg-white/5 rounded-[48px] overflow-hidden border border-white/5 hover:border-[#008080]/30 transition-all duration-700 flex flex-col"
                  >
                    {/* Imagen con Overlay */}
                    <div className="relative h-72 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                        style={{ backgroundImage: `url(${exp.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001212] via-transparent to-transparent opacity-60" />
                      <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                         <p className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={12} className="text-[#008080]" /> {t("tax_included")}
                         </p>
                      </div>
                    </div>

                    {/* Contenido Editorial */}
                    <div className="p-10 flex-grow flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-tight group-hover:text-[#008080] transition-colors">
                            {locale === "es" ? exp.title : exp.title_english}
                        </h2>
                        <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-end justify-between border-t border-white/5 pt-6">
                            <div className="space-y-1">
                                <p className="text-2xl font-black text-white italic tracking-tighter">
                                    MXN ${formatPriceWithDecimals(exp.price)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#008080] group-hover:text-white text-gray-600 transition-all">
                                <ChevronRight size={24} />
                            </div>
                        </div>

                        <button
                          className="w-full bg-[#008080] text-white py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-[#008080]/10 hover:bg-[#D1127C] transition-all"
                        >
                          {t("book_now")}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Booking Modal */}
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={() => setBookingModal({ isOpen: false, experience: null })}
          experience={bookingModal.experience}
        />
      </main>
      <Footer />
    </>
  );
}