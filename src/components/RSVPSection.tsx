'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionWrapper from './SectionWrapper';
import { RSVPFormData } from '@/lib/types';
import { supabase } from '@/lib/supabase';

type FormData = RSVPFormData;

export default function RSVPSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { attendance: 'hadir', guestCount: 1 },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // 1. Simpan ke tabel 'wishes' di Supabase
      const { error } = await supabase.from('wishes').insert([
        {
          name: data.name,
          email: data.email,
          attendance: data.attendance,
          guest_count: data.guestCount,
          message: data.wish || '',
        },
      ]);

      if (error) {
        console.error('SUPABASE DETAIL ERROR:', error);
        alert('Gagal Supabase: ' + (error.message || JSON.stringify(error)));
        throw error;
      }

      // 2. Kirim Email Konfirmasi Otomatis dengan Debugging Response
      try {
        console.log('Mengirim request fetch ke /api/send-rsvp-email...', {
          name: data.name,
          email: data.email,
          attendance: data.attendance,
          guestCount: data.guestCount,
        });

        const emailRes = await fetch('/api/send-rsvp-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            attendance: data.attendance,
            guestCount: data.guestCount,
          }),
        });

        const emailResult = await emailRes.json();
        console.log('HASIL RESPON DARI API EMAIL:', emailResult);

        if (!emailRes.ok) {
          console.error('API Email mengembalikan error status:', emailRes.status, emailResult);
        }
      } catch (emailErr) {
        console.error('Gagal total saat fetch ke /api/send-rsvp-email:', emailErr);
      }

      setSubmitted(true);
      toast.success('RSVP dan ucapan berhasil dikirim!');
    } catch (err) {
      console.error('Supabase error:', err);
      toast.error('Gagal mengirim RSVP. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full bg-white border border-cream-200 rounded-xl px-4 py-3 font-sans text-sm text-stone-700 placeholder-stone-300 input-ring transition-all duration-200 focus:border-cream-400`;
  const labelClass = 'font-sans text-xs tracking-[0.1em] uppercase text-stone-500 mb-1.5 block';
  const errorClass = 'font-sans text-xs text-blush-500 mt-1';

  return (
    <SectionWrapper id="rsvp" className="py-20 sm:py-24 md:py-36 bg-cream-50/50 backdrop-blur-md border-b border-cream-200/40">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-stone-400 mb-3 sm:mb-4">Konfirmasi Kehadiran</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl italic text-stone-700">RSVP</h2>
          <div className="ornament mt-4 sm:mt-6 mb-4 sm:mb-6">
            <span className="text-gold-400">✦</span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed max-w-lg mx-auto">
            Kehadiran Anda adalah hadiah terindah bagi kami. Mohon konfirmasi paling lambat 7 hari sebelum acara.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-sage-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="font-serif text-2xl sm:text-3xl italic text-stone-700 mb-2 sm:mb-3">Terima Kasih!</h3>
              <p className="font-sans text-xs sm:text-sm text-stone-500 mb-6 sm:mb-8">
                RSVP Anda telah kami terima. Kami tidak sabar menanti kehadiran Anda.
              </p>
              <button
                onClick={() => { setSubmitted(false); reset(); }}
                className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-stone-500 hover:text-cream-500 transition-colors border border-stone-200 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 active:scale-95"
              >
                <RefreshCw className="w-3 h-3" />
                Kirim lagi
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm space-y-5 sm:space-y-6"
            >
              {/* Name */}
              <div>
                <label className={labelClass}>Nama Lengkap *</label>
                <input
                  type="text"
                  placeholder="Nama Anda..."
                  className={inputClass}
                  {...register('name', { required: 'Nama wajib diisi' })}
                />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  placeholder="email@contoh.com"
                  className={inputClass}
                  {...register('email', {
                    required: 'Email wajib diisi',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Format email tidak valid' },
                  })}
                />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>

              {/* Attendance */}
              <div>
                <label className={labelClass}>Kehadiran *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {[
                    { value: 'hadir', label: '✅ Hadir' },
                    { value: 'tidak_hadir', label: '❌ Tidak Hadir' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="relative flex items-center justify-center p-3 sm:p-3.5 border-2 rounded-xl cursor-pointer transition-all duration-200 has-[:checked]:border-cream-400 has-[:checked]:bg-cream-50/80 border-cream-200 hover:border-cream-300 text-center active:scale-[0.98]"
                    >
                      <input
                        type="radio"
                        value={opt.value}
                        className="sr-only"
                        defaultChecked={opt.value === 'hadir'}
                        {...register('attendance')}
                      />
                      <span className="font-sans text-xs sm:text-sm text-stone-600 font-medium">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guest count */}
              <div>
                <label className={labelClass}>Jumlah Tamu</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className={inputClass}
                  {...register('guestCount', { min: 1, max: 10, valueAsNumber: true })}
                />
              </div>

              {/* Wish */}
              <div>
                <label className={labelClass}>Ucapan & Doa</label>
                <textarea
                  rows={4}
                  placeholder="Tulis ucapan dan doa untuk pasangan pengantin..."
                  className={`${inputClass} resize-none`}
                  {...register('wish', { required: 'Ucapan wajib diisi' })}
                />
                {errors.wish && <p className={errorClass}>{errors.wish.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 disabled:bg-stone-400 text-cream-100 font-sans text-xs tracking-[0.2em] uppercase px-6 py-4 rounded-xl transition-all duration-300 shadow hover:shadow-md"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</>
                ) : (
                  <><Send className="w-4 h-4" /> Kirim RSVP</>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}