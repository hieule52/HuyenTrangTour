"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, CheckCircle, AlertCircle, Loader2, Send } from "lucide-react";
import { BookingFormSchema, BookingFormValues } from "@/lib/validation";
import { getLocalizedRoutes } from "@/data/routes";

const LANGUAGE_OPTIONS = [
  { value: "vi", label: "Tiếng Việt" },
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "zh", label: "中文" },
  { value: "ko", label: "한국어" },
  { value: "ja", label: "日本語" },
];

export default function BookingForm() {
  const t = useTranslations('booking');
  const locale = useLocale();
  const routes = getLocalizedRoutes(locale);
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
      language: (locale as any) || "vi",
      pickupPoint: "",
      destination: "",
      date: "",
      time: "",
      passengers: 2,
      route: "",
      notes: "",
    },
  });

  // Tự động điền dữ liệu từ URL query parameters nếu có (từ Card hoặc QuickBooking)
  useEffect(() => {
    const routeParam = searchParams.get("route");
    const pickupParam = searchParams.get("pickup");
    const destParam = searchParams.get("destination");
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");
    const passengersParam = searchParams.get("passengers");

    if (routeParam) {
      const matched = routes.find((r) => r.id === routeParam);
      if (matched) {
        setValue("route", `${matched.name} (${matched.vehicle})`);
        setValue("pickupPoint", matched.name.split("–")[0]?.trim() || "Huế");
        setValue("destination", matched.name.split("–")[1]?.trim() || matched.name);
      } else {
        setValue("route", routeParam);
      }
    }
    if (pickupParam) setValue("pickupPoint", pickupParam);
    if (destParam) setValue("destination", destParam);
    if (dateParam) setValue("date", dateParam);
    if (timeParam) setValue("time", timeParam);
    if (passengersParam) setValue("passengers", parseInt(passengersParam, 10) || 2);
  }, [searchParams, setValue]);

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || t('notice'));
      }

      setSubmitStatus("success");
      setStatusMessage(resData.message || t('successDesc'));
      reset();
    } catch (err: any) {
      setSubmitStatus("error");
      setStatusMessage(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8 md:p-10 shadow-xl border border-gray-100">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600 bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
          {t('badge')}
        </span>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-brand-500 mt-3">
          {t('title')}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {t('subtitle')}
        </p>
      </div>

      {/* Success Notification */}
      {submitStatus === "success" && (
        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-emerald-900">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base text-emerald-800">{t('successTitle')}</h4>
              <p className="mt-1 text-sm text-emerald-700 leading-relaxed">{statusMessage}</p>
              <div className="mt-4 pt-3 border-t border-emerald-200/60 flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-emerald-800">{t('urgentHelp')}</span>
                <a
                  href="tel:0364483597"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {t('callNow')}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {submitStatus === "error" && (
        <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200 p-5 text-rose-900">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base text-rose-800">Error</h4>
              <p className="mt-1 text-sm text-rose-700">{statusMessage}</p>
              <p className="mt-2 text-xs text-rose-600">
                Hotline: <a href="tel:0364483597" className="underline font-bold">0364 483 597</a>.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Row 1: Tên & Điện thoại */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              {t('nameLabel')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder={t('namePlaceholder')}
              {...register("customerName")}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.customerName
                  ? "border-rose-400 bg-rose-50/30 focus:border-rose-500"
                  : "border-gray-200 bg-surface-warm focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
              }`}
            />
            {errors.customerName && (
              <p className="mt-1 text-xs text-rose-500">{errors.customerName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              {t('phoneLabel')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              placeholder={t('phonePlaceholder')}
              {...register("phone")}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.phone
                  ? "border-rose-400 bg-rose-50/30 focus:border-rose-500"
                  : "border-gray-200 bg-surface-warm focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Email & Ngôn ngữ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              {t('emailLabel')}
            </label>
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              {...register("email")}
              className="w-full rounded-xl border border-gray-200 bg-surface-warm px-4 py-3 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              {t('langLabel')} <span className="text-rose-500">*</span>
            </label>
            <select
              {...register("language")}
              className="w-full rounded-xl border border-gray-200 bg-surface-warm px-4 py-3 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.language && (
              <p className="mt-1 text-xs text-rose-500">{errors.language.message}</p>
            )}
          </div>
        </div>

        {/* Row 3: Điểm đón & Điểm đến */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              {t('pickupLabel')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder={t('pickupPlaceholder')}
              {...register("pickupPoint")}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.pickupPoint
                  ? "border-rose-400 bg-rose-50/30 focus:border-rose-500"
                  : "border-gray-200 bg-surface-warm focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
              }`}
            />
            {errors.pickupPoint && (
              <p className="mt-1 text-xs text-rose-500">{errors.pickupPoint.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              {t('destLabel')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder={t('destPlaceholder')}
              {...register("destination")}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.destination
                  ? "border-rose-400 bg-rose-50/30 focus:border-rose-500"
                  : "border-gray-200 bg-surface-warm focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
              }`}
            />
            {errors.destination && (
              <p className="mt-1 text-xs text-rose-500">{errors.destination.message}</p>
            )}
          </div>
        </div>

        {/* Row 4: Ngày, Giờ & Số khách */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              {t('dateLabel')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              {...register("date")}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.date
                  ? "border-rose-400 bg-rose-50/30 focus:border-rose-500"
                  : "border-gray-200 bg-surface-warm focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-rose-500">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              {t('timeLabel')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="time"
              {...register("time")}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                errors.time
                  ? "border-rose-400 bg-rose-50/30 focus:border-rose-500"
                  : "border-gray-200 bg-surface-warm focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
              }`}
            />
            {errors.time && (
              <p className="mt-1 text-xs text-rose-500">{errors.time.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
              {t('passengersLabel')} <span className="text-rose-500">*</span>
            </label>
            <select
              {...register("passengers", { valueAsNumber: true })}
              className="w-full rounded-xl border border-gray-200 bg-surface-warm px-4 py-3 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 5: Tuyến xe */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
            {t('routeLabel')}
          </label>
          <select
            {...register("route")}
            className="w-full rounded-xl border border-gray-200 bg-surface-warm px-4 py-3 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition"
          >
            <option value="">{t('routePlaceholder')}</option>
            {routes.map((r) => (
              <option key={r.id} value={`${r.name} - ${r.priceVND.toLocaleString("vi-VN")}đ`}>
                {r.name} ({r.priceVND.toLocaleString("vi-VN")}đ / ${r.priceUSD})
              </option>
            ))}
          </select>
        </div>

        {/* Row 6: Ghi chú */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
            {t('notesLabel')}
          </label>
          <textarea
            rows={3}
            placeholder={t('notesPlaceholder')}
            {...register("notes")}
            className="w-full rounded-xl border border-gray-200 bg-surface-warm p-4 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-900 shadow-lg shadow-gold-500/25 transition-all hover:from-gold-400 hover:to-gold-500 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{t('submitting')}</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>{t('submitBtn')}</span>
              </>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-gray-500">
            {t('notice')}
          </p>
        </div>
      </form>
    </div>
  );
}
