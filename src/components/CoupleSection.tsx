import Image from 'next/image';
import SectionWrapper from './SectionWrapper';

const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Juan';
const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Indri';

// ============================================================
// ✏️  EDIT BAGIAN INI UNTUK KUSTOMISASI TEKS & FOTO
// ============================================================
const config = {
  groom: {
    parentNames: 'Putra dari Bapak David dima huda & Ibu Rosiana dima huda ully', // ← ganti nama orang tua
    hometown: 'Kupang, Indonesia',                    // ← ganti kota asal
    photo: '',    // ← isi path foto, contoh: '/images/groom.jpg'
                  //   (letakkan foto di folder public/images/)
  },
  bride: {
    parentNames: 'Putri dari Bapak Otnial anderias mone & Ibu Martha salendang', // ← ganti nama orang tua
    hometown: 'Kupang, Indonesia',                     // ← ganti kota asal
    photo: '',    // ← isi path foto, contoh: '/images/bride.jpg'
  },
  quote: {
    arabic: 'Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.',
    source: '(Matius 19:6)', // ← ganti sumber kutipan
  },
};
// ============================================================

export default function CoupleSection() {
  return (
    <SectionWrapper
      id="couple"
      className="py-20 sm:py-24 md:py-36 bg-white/65 backdrop-blur-md border-y border-cream-200/40"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-stone-400 mb-3 sm:mb-4">
            Dengan Penuh Kasih
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl italic text-stone-700">
            Dalam nama Bapa Putra dan Roh Kudus
          </h2>
          <div className="ornament mt-4 sm:mt-6">
            <span className="text-gold-400">✦</span>
          </div>
          <p className="mt-4 sm:mt-6 font-serif text-base sm:text-lg italic text-stone-500 max-w-xl mx-auto leading-relaxed px-2">
            {config.quote.arabic}<br />
            <span className="text-xs sm:text-sm not-italic font-sans text-stone-400">{config.quote.source}</span>
          </p>
        </div>

        {/* Couple cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Groom */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-cream-50/90 border border-cream-200 hover:border-cream-400 transition-colors duration-500 shadow-sm">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gradient-to-br from-cream-200 to-sage-100 flex items-center justify-center mb-4 sm:mb-6 shadow-sm">
              {config.groom.photo ? (
                <Image
                  src={config.groom.photo}
                  alt={`Foto ${groomName}`}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="font-serif text-4xl sm:text-5xl italic text-stone-500">{groomName[0]}</span>
              )}
            </div>
            <p className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-stone-400 mb-1.5 sm:mb-2">Mempelai Pria</p>
            <h3 className="font-serif text-3xl sm:text-4xl italic text-stone-700 mb-2 sm:mb-3">{groomName}</h3>
            <p className="font-serif text-xs sm:text-sm italic text-stone-500 leading-relaxed px-2">{config.groom.parentNames}</p>
            <p className="font-sans text-xs text-stone-400 mt-1">{config.groom.hometown}</p>
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-blush-50/90 border border-blush-100 hover:border-blush-200 transition-colors duration-500 shadow-sm">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gradient-to-br from-blush-100 to-cream-200 flex items-center justify-center mb-4 sm:mb-6 shadow-sm">
              {config.bride.photo ? (
                <Image
                  src={config.bride.photo}
                  alt={`Foto ${brideName}`}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="font-serif text-4xl sm:text-5xl italic text-blush-400">{brideName[0]}</span>
              )}
            </div>
            <p className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-stone-400 mb-1.5 sm:mb-2">Mempelai Wanita</p>
            <h3 className="font-serif text-3xl sm:text-4xl italic text-stone-700 mb-2 sm:mb-3">{brideName}</h3>
            <p className="font-serif text-xs sm:text-sm italic text-stone-500 leading-relaxed px-2">{config.bride.parentNames}</p>
            <p className="font-sans text-xs text-stone-400 mt-1">{config.bride.hometown}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
