import Image from 'next/image';
import SectionWrapper from './SectionWrapper';
import { config } from '../../next.config';

const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Juan Govindo Dima Huda';
const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Indri Christine Mone';

export default function CoupleSection() {
  return (
    <SectionWrapper
      id="couple"
      className="py-20 sm:py-24 md:py-36 bg-white/65 backdrop-blur-md border-y border-cream-200/40"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section label */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-stone-400 mb-4 sm:mb-5">
            Dengan kasih karunia Tuhan yang mempersatukan,
          </p>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl italic text-stone-700 max-w-2xl mx-auto leading-relaxed px-4">
            Kami percaya bahwa cinta adalah anugerah terindah dari Tuhan. Kini, saatnya kami melangkah dalam ikatan kudus pernikahan, dengan penuh syukur dan kerendahan hati, kami mengundang kehadiran dan doa restu Bapak/Ibu/Saudara/i.
          </h2>
          <div className="ornament mt-6 sm:mt-8">
            <span className="text-gold-400">✦</span>
          </div>
          <p className="mt-6 sm:mt-8 font-serif text-sm sm:text-base italic text-stone-500 max-w-xl mx-auto leading-relaxed px-4">
            {config.quote.arabic}<br />
            <span className="text-xs sm:text-sm not-italic font-sans text-stone-400 mt-1 inline-block">{config.quote.source}</span>
          </p>
        </div>

        {/* Couple cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Groom */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-cream-50/90 border border-cream-200 hover:border-cream-400 transition-colors duration-500 shadow-sm">
            
            {/* Wadah Foto & Bingkai Presisi di Tengah */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              {/* Lapisan Bawah: Foto Bundar */}
              <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center">
                {config.groom.photo ? (
                  <Image
                    src={config.groom.photo}
                    alt={`Foto ${groomName}`}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="font-serif text-4xl italic text-stone-500">{groomName[0]}</span>
                )}
              </div>

              {/* Lapisan Atas: Gambar Bingkai / Frame (Skala disesuaikan jadi 125 agar pas tidak terlalu besar) */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
                <Image
                  src="/images/frame.png"
                  alt="Ornament Frame"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain scale-[1.25]"
                />
              </div>
            </div>

            <p className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-stone-400 mb-1.5 sm:mb-2">Mempelai Pria</p>
            <h3 className="font-serif text-2xl sm:text-3xl italic text-stone-700 mb-2 sm:mb-3">{groomName}</h3>
            <p className="font-serif text-xs sm:text-sm italic text-stone-500 leading-relaxed px-2">{config.groom.parentNames}</p>
            <p className="font-sans text-xs text-stone-400 mt-1">{config.groom.hometown}</p>
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center text-center p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-blush-50/90 border border-blush-100 hover:border-blush-200 transition-colors duration-500 shadow-sm">
            
            {/* Wadah Foto & Bingkai Presisi di Tengah */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              {/* Lapisan Bawah: Foto Bundar */}
              <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center">
                {config.bride.photo ? (
                  <Image
                    src={config.bride.photo}
                    alt={`Foto ${brideName}`}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="font-serif text-4xl italic text-blush-400">{brideName[0]}</span>
                )}
              </div>

              {/* Lapisan Atas: Gambar Bingkai / Frame */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
                <Image
                  src="/images/frame.png"
                  alt="Ornament Frame"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain scale-[1.25]"
                />
              </div>
            </div>

            <p className="font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-stone-400 mb-1.5 sm:mb-2">Mempelai Wanita</p>
            <h3 className="font-serif text-2xl sm:text-3xl italic text-stone-700 mb-2 sm:mb-3">{brideName}</h3>
            <p className="font-serif text-xs sm:text-sm italic text-stone-500 leading-relaxed px-2">{config.bride.parentNames}</p>
            <p className="font-sans text-xs text-stone-400 mt-1">{config.bride.hometown}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}