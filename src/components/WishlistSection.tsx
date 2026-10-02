'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { WishEntry } from '@/lib/types';

function WishCard({ wish, index }: { wish: WishEntry; index: number }) {
  const [showOriginal, setShowOriginal] = useState(false);

  const date = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric',
  }).format(new Date(wish.timestamp));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-cream-200 hover:border-cream-300"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cream-200 to-blush-100 flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-lg italic text-stone-500">
              {wish.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-stone-700">{wish.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`font-sans text-xs px-2 py-0.5 rounded-full ${
                wish.attendance === 'hadir'
                  ? 'bg-sage-100 text-sage-500'
                  : 'bg-stone-100 text-stone-400'
              }`}>
                {wish.attendance === 'hadir' ? '✅ Hadir' : '❌ Tidak Hadir'}
              </span>
              <span className="font-sans text-xs text-stone-300">{date}</span>
            </div>
          </div>
        </div>
        {wish.isFormatted && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-cream-50 to-gold-300/10 border border-cream-200 rounded-full px-2 py-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span className="font-sans text-xs text-stone-400">AI</span>
          </div>
        )}
      </div>

      <blockquote className="font-serif text-sm italic text-stone-600 leading-relaxed">
        &ldquo;{showOriginal ? wish.originalWish : wish.formattedWish}&rdquo;
      </blockquote>

      {wish.isFormatted && (
        <button
          onClick={() => setShowOriginal(!showOriginal)}
          className="mt-3 font-sans text-xs text-stone-400 hover:text-cream-500 transition-colors"
        >
          {showOriginal ? '✨ Tampilkan versi AI' : '💬 Tampilkan pesan asli'}
        </button>
      )}
    </motion.div>
  );
}

export default function WishlistSection() {
  const [wishes, setWishes] = useState<WishEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/rsvp');
      const data = await res.json();
      if (data.success) {
        setWishes(data.wishes.filter((w: WishEntry) => w.formattedWish));
      }
    } catch {
      setError('Gagal memuat ucapan.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  return (
    <SectionWrapper id="wishlist" className="py-20 sm:py-24 md:py-36 bg-white/65 backdrop-blur-md border-b border-cream-200/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-stone-400 mb-3 sm:mb-4">Doa & Harapan</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl italic text-stone-700">Ucapan Tamu</h2>
          <div className="ornament mt-4 sm:mt-6 mb-4 sm:mb-6">
            <span className="text-gold-400">✦</span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Setiap ucapan yang dikirimkan, diperindah oleh AI dan disimpan sebagai kenangan.
          </p>
        </div>

        {/* Refresh button */}
        <div className="flex justify-end mb-4 sm:mb-6">
          <button
            onClick={fetchWishes}
            disabled={loading}
            className="inline-flex items-center gap-1.5 sm:gap-2 font-sans text-xs tracking-wider uppercase text-stone-400 hover:text-cream-500 transition-colors border border-cream-200 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 active:scale-95"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="w-8 h-8 border-2 border-cream-300 border-t-cream-500 rounded-full animate-spin" />
            <p className="font-sans text-sm text-stone-400">Memuat ucapan...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="font-sans text-sm text-stone-400">{error}</p>
          </div>
        ) : wishes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 glass rounded-2xl sm:rounded-3xl"
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-blush-200 mx-auto mb-3 sm:mb-4" />
            <p className="font-serif text-lg sm:text-xl italic text-stone-400">Belum ada ucapan.</p>
            <p className="font-sans text-xs sm:text-sm text-stone-300 mt-1 sm:mt-2">Jadilah yang pertama memberikan doa!</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {wishes.map((wish, i) => (
                <WishCard key={wish.id} wish={wish} index={i} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </SectionWrapper>
  );
}
