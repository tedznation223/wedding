'use client';

import { useRef, useEffect } from 'react';
import { Disc, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

export default function MusicPlayer({ isPlaying, togglePlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 1;

    if (isPlaying) {
      audio.play().catch((err) => console.log("Play error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src="/wedding-song.mp3" loop preload="auto" />

      <button
        onClick={togglePlay}
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-stone-900/80 backdrop-blur-md text-cream-100 shadow-lg border border-cream-200/30 hover:scale-105 active:scale-95 transition-all duration-300 group"
        aria-label="Toggle Music"
      >
        <Disc
          className={`w-6 h-6 sm:w-7 sm:h-7 text-gold-400 absolute transition-transform duration-700 ${
            isPlaying ? 'animate-spin' : 'opacity-60'
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
        </div>
      </button>
    </div>
  );
}