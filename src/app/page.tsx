'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import CountdownSection from '@/components/CountdownSection';
import CoupleSection from '@/components/CoupleSection';
import EventSection from '@/components/EventSection';
import RSVPSection from '@/components/RSVPSection';
import WishlistSection from '@/components/WishlistSection';
import FooterSection from '@/components/FooterSection';
import FloatingPetals from '@/components/FloatingPetals';
import Navigation from '@/components/Navigation';
import BackgroundSlider from '@/components/BackgroundSlider';
import MusicPlayer from '@/components/MusicPlayer';
import WelcomeCover from '@/components/WelcomeCover';

const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Juan';
const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Indri';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true); // Musik langsung menyala pas tombol Buka Undangan diklik!
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="relative overflow-x-hidden min-h-screen">
      {!isOpen && (
        <WelcomeCover onOpen={handleOpen} groomName={groomName} brideName={brideName} />
      )}

      <BackgroundSlider fixed={true} />
      <FloatingPetals />
      {isOpen && <Navigation />}
      <HeroSection />
      <CoupleSection />
      <CountdownSection />
      <EventSection />
      <RSVPSection />
      <WishlistSection />
      <FooterSection />

      <MusicPlayer isPlaying={isPlaying} togglePlay={togglePlay} />
    </main>
  );
}