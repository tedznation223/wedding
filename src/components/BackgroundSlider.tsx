'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// ✏️ DAFTAR FOTO SLIDE BACKGROUND
// Ganti dengan foto lokal Anda di public/images/, misal:
// ['/images/slide1.jpg', '/images/slide2.jpg', '/images/slide3.jpg']
// ============================================================
export const defaultSlides = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80', // Elegant couple outdoor
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80', // Wedding ring & hands
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=80', // Warm romantic sunset couple
];

interface BackgroundSliderProps {
  slides?: string[];
  intervalMs?: number;
  fixed?: boolean;
}

export default function BackgroundSlider({
  slides = defaultSlides,
  intervalMs = 6000,
  fixed = true,
}: BackgroundSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  return (
    <div className={`${fixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden pointer-events-none z-0`}>
      {/* Gambar dengan Animasi Cross-Fade & Ken Burns (Zoom Pelan) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.8, ease: 'easeInOut' },
            scale: { duration: intervalMs / 1000, ease: 'easeOut' },
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${slides[currentIndex]}')`,
          }}
        />
      </AnimatePresence>

      {/* Lapisan Tint & Blur Halus agar Teks di Semua Section Tetap Jelas */}
      <div className="absolute inset-0 bg-cream-50/75 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100/60 via-transparent to-cream-100/60" />

      {/* Indikator Titik Slide Elegan di Pojok Kanan Bawah */}
      {slides.length > 1 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full glass shadow-sm pointer-events-auto">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? 'w-5 bg-stone-700'
                  : 'w-1.5 bg-stone-400/50 hover:bg-stone-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
