import { Heart } from 'lucide-react';

const rawGroom = process.env.NEXT_PUBLIC_GROOM_NAME || 'juan';
const rawBride = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Indri';

const groomName = rawGroom.split(' ')[0];
const brideName = rawBride.split(' ')[0];

export default function FooterSection() {
  return (
    <footer className="relative z-10 bg-stone-900/90 backdrop-blur-md text-cream-200 py-16 px-6 text-center border-t border-stone-800/60">
      <div className="max-w-xl mx-auto">
        <div className="ornament mb-8">
          <span className="text-gold-400">✦</span>
        </div>
        <h3 className="font-serif text-4xl italic text-cream-100 mb-3">
          {groomName} & {brideName}
        </h3>
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-cream-400 mb-8">
          We can't wait to celebrate with you
        </p>
        <p className="font-serif text-sm italic text-cream-300 leading-relaxed max-w-sm mx-auto">
          "Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia."
        </p>
        <p className="font-sans text-xs text-cream-500 mt-1">—Matius 19:6</p>

        <div className="mt-12 pt-8 border-t border-stone-700 flex items-center justify-center gap-2 text-stone-500 text-xs">
          <span>Made by</span>
          <Heart className="w-3 h-3 text-blush-400 fill-current" />
          <span>Tedz Nation X</span>
        </div>
      </div>
    </footer>
  );
}