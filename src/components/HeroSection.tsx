'use client';

import { motion } from 'framer-motion';
import BackgroundSlider from './BackgroundSlider';

// Ambil env lalu potong ambil kata pertama saja untuk nama panggilan
const rawGroom = process.env.NEXT_PUBLIC_GROOM_NAME || 'Juan';
const rawBride = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Indri';

const groomName = rawGroom.split(' ')[0];
const brideName = rawBride.split(' ')[0];

const weddingDateRaw = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-10-14T16:00:00';
const weddingDate = new Date(weddingDateRaw);

const formattedDate = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(weddingDate);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Decorative circles */}
      <motion.div
        className="absolute top-10 left-5 sm:top-20 sm:left-10 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-blush-100 opacity-30"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-48 h-48 sm:w-80 sm:h-80 rounded-full bg-sage-100 opacity-20"
        animate={{ scale: [1, 1.06, 1], rotate: [0, -4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 max-w-5xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Pre-title */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.35em] uppercase text-stone-400 mb-4 sm:mb-6"
        >
          Undangan Pernikahan
        </motion.p>

        {/* Ornament top */}
        <motion.div variants={itemVariants} className="ornament mb-6 sm:mb-8 w-36 sm:w-48">
          <span className="text-gold-400 text-base sm:text-lg">✦</span>
        </motion.div>

        {/* Groom name */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl italic text-stone-700 leading-[1.05] tracking-tight break-words px-2"
        >
          {groomName}
        </motion.h1>

        {/* Ampersand */}
        <motion.p
          variants={itemVariants}
          className="font-serif text-3xl sm:text-5xl md:text-7xl italic text-cream-400 my-1 sm:my-2 leading-none"
        >
          &
        </motion.p>

        {/* Bride name */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl italic text-stone-700 leading-[1.05] tracking-tight break-words px-2"
        >
          {brideName}
        </motion.h1>

        {/* Ornament bottom */}
        <motion.div variants={itemVariants} className="ornament mt-6 sm:mt-8 mb-4 sm:mb-6 w-36 sm:w-48">
          <span className="text-gold-400 text-base sm:text-lg">✦</span>
        </motion.div>

        {/* Date */}
        <motion.p
          variants={itemVariants}
          className="font-serif text-lg md:text-xl italic text-stone-500 capitalize"
        >
          {formattedDate}
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-stone-400">Gulir ke bawah</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-cream-400 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}