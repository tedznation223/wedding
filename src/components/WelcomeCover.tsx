'use client';

import { useState } from 'react';
import { MailOpen } from 'lucide-react';

interface WelcomeCoverProps {
  onOpen: () => void;
  groomName: string;
  brideName: string;
}

export default function WelcomeCover({ onOpen, groomName, brideName }: WelcomeCoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Beri sedikit jeda animasi keluar sebelum masuk ke halaman utama
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-stone-900/90 backdrop-blur-md px-4 transition-opacity duration-700 ${
        isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center max-w-md w-full p-8 rounded-3xl bg-white/10 border border-white/20 shadow-2xl text-white backdrop-blur-xl animate-fade-in">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-300 mb-3">
          Undangan Pernikahan
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl italic mb-4 text-cream-100">
          {groomName} & {brideName}
        </h1>
        <div className="w-16 h-px bg-gold-400 mx-auto my-4"></div>
        <p className="font-sans text-xs text-stone-300 mb-8 leading-relaxed">
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.
        </p>

        <button
          onClick={handleOpenInvitation}
          className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-stone-900 font-sans text-sm font-medium tracking-wider px-8 py-3.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <MailOpen className="w-4 h-4" />
          Buka Undangan
        </button>
      </div>
    </div>
  );
}