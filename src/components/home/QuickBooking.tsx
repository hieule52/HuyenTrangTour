"use client";

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MapPin, ArrowRight } from 'lucide-react';

export default function QuickBooking() {
  const t = useTranslations('quickBooking');
  const router = useRouter();
  const [form, setForm] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: '2',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      pickup: form.pickup,
      destination: form.destination,
      date: form.date,
      time: form.time,
      passengers: form.passengers,
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <section className="relative z-30 -mt-10 px-4 pb-0">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl bg-white shadow-hero border border-surface-muted"
        >
          <div className="p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-1 w-8 rounded bg-gold-500" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-500">
                {t('title')}
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {/* Pickup */}
                <div className="lg:col-span-1">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-brand-600">
                    <MapPin className="h-3.5 w-3.5 text-gold-500" />
                    {t('pickup')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('pickupPlaceholder')}
                    value={form.pickup}
                    onChange={(e) => setForm({ ...form, pickup: e.target.value })}
                    className="w-full rounded-xl border border-surface-muted bg-surface-warm px-4 py-2.5 text-sm text-brand-700 placeholder-brand-300 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition"
                  />
                </div>

                {/* Destination */}
                <div className="lg:col-span-1">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-brand-600">
                    <MapPin className="h-3.5 w-3.5 text-gold-500" />
                    {t('destination')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('destinationPlaceholder')}
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    className="w-full rounded-xl border border-surface-muted bg-surface-warm px-4 py-2.5 text-sm text-brand-700 placeholder-brand-300 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition"
                  />
                </div>

                {/* Date */}
                <div className="lg:col-span-1">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-brand-600">
                    <Calendar className="h-3.5 w-3.5 text-gold-500" />
                    {t('date')}
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full rounded-xl border border-surface-muted bg-surface-warm px-4 py-2.5 text-sm text-brand-700 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition"
                  />
                </div>

                {/* Time */}
                <div className="lg:col-span-1">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-brand-600">
                    <Clock className="h-3.5 w-3.5 text-gold-500" />
                    {t('time')}
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full rounded-xl border border-surface-muted bg-surface-warm px-4 py-2.5 text-sm text-brand-700 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition"
                  />
                </div>

                {/* Passengers */}
                <div className="lg:col-span-1">
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-brand-600">
                    <Users className="h-3.5 w-3.5 text-gold-500" />
                    {t('passengers')}
                  </label>
                  <select
                    value={form.passengers}
                    onChange={(e) => setForm({ ...form, passengers: e.target.value })}
                    className="w-full rounded-xl border border-surface-muted bg-surface-warm px-4 py-2.5 text-sm text-brand-700 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <option key={num} value={num}>
                        {num} {t('personUnit')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-7 py-3 text-sm font-bold uppercase tracking-wider text-brand-900 shadow-gold transition-all hover:bg-gold-400 hover:shadow-cta"
                >
                  <span>{t('button')}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
