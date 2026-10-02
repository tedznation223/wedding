'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { CountdownTime } from '@/lib/types';

const weddingDateRaw = process.env.NEXT_PUBLIC_WEDDING_DATE || '2026-10-14T16:00:00';

function calculateTimeLeft(targetDate: Date): CountdownTime {
  const diff = targetDate.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface TimeBoxProps {
  value: number;
  label: string;
  delay: number;
}

function TimeBox({ value, label, delay }: TimeBoxProps) {
  const [prevValue, setPrevValue] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setFlip(true);
      const t = setTimeout(() => { setFlip(false); setPrevValue(value); }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prevValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-1.5 sm:gap-3"
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 glass rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50 to-cream-100" />
        <span
          className={`relative z-10 font-serif text-2xl sm:text-3xl md:text-5xl italic text-stone-700 transition-all duration-300 ${
            flip ? 'opacity-0 -translate-y-3 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <p className="font-sans text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-stone-400">{label}</p>
    </motion.div>
  );
}

export default function CountdownSection() {
  const weddingDate = new Date(weddingDateRaw);
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(weddingDate));
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isOver = mounted && weddingDate.getTime() <= Date.now();

  return (
    <SectionWrapper id="countdown" className="py-20 sm:py-24 md:py-36 bg-cream-50/50 backdrop-blur-md border-b border-cream-200/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-stone-400 mb-3 sm:mb-4">Menuju Hari Istimewa</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl italic text-stone-700 mb-4">Hitung Mundur</h2>
        <div className="ornament mb-8 sm:mb-12">
          <span className="text-gold-400">✦</span>
        </div>

        {isOver ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl italic text-blush-400"
          >
            Hari bahagia telah tiba! ✨
          </motion.p>
        ) : (
          <div className="flex items-start justify-center gap-1.5 sm:gap-3 md:gap-6 lg:gap-8">
            <TimeBox value={timeLeft.days} label="Hari" delay={0} />
            <div className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl italic text-cream-400 pt-3 sm:pt-5 md:pt-8 select-none">:</div>
            <TimeBox value={timeLeft.hours} label="Jam" delay={0.1} />
            <div className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl italic text-cream-400 pt-3 sm:pt-5 md:pt-8 select-none">:</div>
            <TimeBox value={timeLeft.minutes} label="Menit" delay={0.2} />
            <div className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl italic text-cream-400 pt-3 sm:pt-5 md:pt-8 select-none">:</div>
            <TimeBox value={timeLeft.seconds} label="Detik" delay={0.3} />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
