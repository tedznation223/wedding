'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RefreshCw } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { supabase } from '@/lib/supabase';

// Tipe data disesuaikan dengan struktur tabel wishes di Supabase
interface WishEntry {
  id: number | string;
  name: string;
  attendance: string;
  message: string;
  originalWish?: string;
  formattedWish?: string;
  isFormatted?: boolean;
  created_at: string;
}

function WishCard({ wish, index }: { wish: WishEntry; index: number }) {
  const [showOriginal, setShowOriginal] = useState(false);

  // Tanggal menggunakan format Indonesia dengan zona waktu UTC agar tanggal tidak bergeser
  const date = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(wish.created_at));

  // Mendukung struktur teks AI jika ada, atau fallback ke message biasa
  const displayMessage = wish.isFormatted && wish.formattedWish 
    ? (showOriginal ? (wish.originalWish || wish.message) : wish.formattedWish)
    : wish.message;

  const isHadir = wish.attendance?.toLowerCase() === 'hadir';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-cream-200 hover:border-cream-300 bg-white/80"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cream-200 to-blush-100 flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-lg italic text-stone-500">
              {wish.name ? wish.name.charAt(0).toUpperCase() : '?'}
            </span>
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-stone-700">{wish.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`font-sans text-xs px-2 py-0.5 rounded-full ${
                isHadir
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-stone-100 text-stone-500'
              }`}>
                {isHadir ? '✅ Hadir' : '❌ Tidak Hadir'}
              </span>
              <span className="font-sans text-xs text-stone-400">{date}</span>
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
        &ldquo;{displayMessage}&rdquo;
      </blockquote>

      {wish.isFormatted && wish.originalWish && (
        <button
          onClick={() => setShowOriginal(!showOriginal)}
          className="mt-3 font-sans text-xs text-stone-400 hover:text-stone-600 transition-colors"
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

  // Fungsi mengambil data ucapan dari Supabase
  const fetchWishes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setWishes(data || []);
    } catch (err) {
      console.error('Error fetching wishes:', err);
      setError('Gagal memuat ucapan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();

    // Integrasi Supabase Realtime: Otomatis tambah ucapan baru tanpa perlu refresh manual
    const channel = supabase
      .channel('realtime-wishes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          setWishes((prev) => [payload.new as WishEntry, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
            Setiap ucapan yang dikirimkan, disimpan sebagai kenangan abadi di hari bahagia kami.
          </p>
        </div>

        {/* Refresh button */}
        <div className="flex justify-end mb-4 sm:mb-6">
          <button
            onClick={fetchWishes}
            disabled={loading}
            className="inline-flex items-center gap-1.5 sm:gap-2 font-sans text-xs tracking-wider uppercase text-stone-400 hover:text-stone-600 transition-colors border border-cream-200 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 active:scale-95 bg-white/50"
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
                <WishCard key={wish.id || i} wish={wish} index={i} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </SectionWrapper>
  );
}