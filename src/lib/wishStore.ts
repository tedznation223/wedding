import { WishEntry } from './types';

// In-memory store (resets on server restart)
// For production, replace with a database (e.g., Supabase, Firebase, Vercel KV)
const wishStore: WishEntry[] = [
  {
    id: '1',
    name: 'Sarah & David',
    originalWish: 'Selamat ya semoga langgeng',
    formattedWish:
      'Dengan segenap hati, kami mendoakan agar cinta kalian menjadi cahaya yang tak pernah padam — selamanya hangat, selamanya indah. Selamat menempuh hidup baru, semoga perjalanan ini dipenuhi kebahagiaan yang abadi.',
    isFormatted: true,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    attendance: 'hadir',
  },
  {
    id: '2',
    name: 'Bunda & Ayah',
    originalWish: 'Semoga bahagia selalu dan diberi keturunan yang sholeh',
    formattedWish:
      'Doa tulus kami panjatkan untukmu, nak. Semoga rumah tangga yang kalian bangun hari ini menjadi taman surga di dunia — dipenuhi cinta yang tulus, keturunan yang soleh, dan keberkahan yang mengalir tiada henti hingga akhir zaman.',
    isFormatted: true,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    attendance: 'hadir',
  },
];

export function getWishes(): WishEntry[] {
  return [...wishStore].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function addWish(wish: WishEntry): void {
  wishStore.unshift(wish);
}
