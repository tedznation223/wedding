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

export default function Home() {
  return (
    <main className="relative overflow-x-hidden min-h-screen">
      {/* Background Slideshow Global untuk Semua Section */}
      <BackgroundSlider fixed={true} />
      <FloatingPetals />
      <Navigation />
      <HeroSection />
      <CoupleSection />
      <CountdownSection />
      <EventSection />
      <RSVPSection />
      <WishlistSection />
      <FooterSection />
    </main>
  );
}
