'use client';

import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { MapPin, Clock, CalendarDays } from 'lucide-react';

const venueName = process.env.NEXT_PUBLIC_VENUE_NAME || 'GKPB Jemaat "Hosana", Kwanji';
const venueAddress = process.env.NEXT_PUBLIC_VENUE_ADDRESS || 'Jl. Tibung Sari No.10, Dalung, Kec. Kuta Utara, Kabupaten Badung, Bali 80361';
const weddingDateRaw = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-10-14T16:00:00';

const weddingDate = new Date(weddingDateRaw);

const events = [
  {
    id: 1,
    type: 'Pemberkatan Nikah',
    emoji: '⛪',
    date: new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(weddingDate),
    time: '16.00 WITA - Selesai',
    venue: venueName,
    address: venueAddress,
    color: 'from-sage-50 to-cream-50',
    border: 'border-sage-200',
  },
  {
    id: 2,
    type: 'Pernikahan',
    emoji: '🌸',
    date: new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(weddingDate),
    time: '16.30 WITA - Selesai',
    venue: venueName,
    address: venueAddress,
    color: 'from-blush-50 to-cream-50',
    border: 'border-blush-100',
  },
];

export default function EventSection() {
  // Menggunakan format URL Google Maps universal agar otomatis membuka aplikasi di HP
  const mapsQuery = encodeURIComponent(venueName + ', ' + venueAddress);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <SectionWrapper id="event" className="py-20 sm:py-24 md:py-36 bg-white/65 backdrop-blur-md border-b border-cream-200/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-stone-400 mb-3 sm:mb-4">Jadwal Acara</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl italic text-stone-700">Detail Acara</h2>
          <div className="ornament mt-4 sm:mt-6">
            <span className="text-gold-400">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl sm:rounded-3xl bg-gradient-to-br ${event.color} border ${event.border} p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{event.emoji}</div>
              <h3 className="font-serif text-xl sm:text-2xl italic text-stone-700 mb-4 sm:mb-6">{event.type}</h3>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <CalendarDays className="w-4 h-4 text-cream-500 mt-0.5 flex-shrink-0" />
                  <span className="font-sans text-xs sm:text-sm text-stone-600 capitalize">{event.date}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-cream-500 mt-0.5 flex-shrink-0" />
                  <span className="font-sans text-xs sm:text-sm text-stone-600">{event.time}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cream-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-xs sm:text-sm font-medium text-stone-700">{event.venue}</p>
                    <p className="font-sans text-[11px] sm:text-xs text-stone-400 mt-0.5 leading-relaxed">{event.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Maps embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-cream-200 shadow-sm"
        >
          <div className="relative py-12 px-6 sm:h-80 bg-cream-100 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📍</div>
              <p className="font-serif text-base sm:text-lg italic text-stone-700 mb-1.5">{venueName}</p>
              <p className="font-sans text-xs text-stone-400 mb-6 leading-relaxed px-2">{venueAddress}</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cream-500 hover:bg-cream-400 active:scale-95 text-white font-sans text-xs sm:text-sm tracking-wider px-6 py-3 rounded-full transition-all duration-300 shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                Buka di Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}