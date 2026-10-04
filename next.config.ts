import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Tambahkan allowedDevOrigins di sini untuk mengizinkan akses dari HP via IP lokal
  allowedDevOrigins: ['192.168.0.103'],
};

export default nextConfig;

// ============================================================
// ✏️  EDIT BAGIAN INI UNTUK KUSTOMISASI TEKS & FOTO
// ============================================================
export const config = {
  groom: {
    parentNames: 'Putra dari Bapak David dima huda & Ibu Rosiana dima huda ully', // ← ganti nama orang tua
    hometown: 'Kupang, Indonesia', // ← ganti kota asal
    photo: '/images/groom.jpg', // ← isi path foto, contoh: '/images/groom.jpg'
    //   (letakkan foto di folder public/images/)
  },
  bride: {
    parentNames: 'Putri dari Bapak Otnial anderias mone & Ibu Martha salendang', // ← ganti nama orang tua
    hometown: 'Kupang, Indonesia', // ← ganti kota asal
    photo: '/images/bride.jpg', // ← isi path foto, contoh: '/images/bride.jpg'
  },
  quote: {
    arabic: 'Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.',
    source: '(Matius 19:6)', // ← ganti sumber kutipan
  },
};