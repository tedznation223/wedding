# 💒 Undangan Pernikahan Digital — Next.js + Tailwind CSS + Gemini AI

Website undangan pernikahan digital yang elegan dan minimalis, dilengkapi dengan fitur **AI Wish Formatter** yang didukung oleh **Google Gemini API**.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🎬 **Hero Section** | Animasi masuk bertahap dengan Framer Motion, nama pengantin, dan tanggal acara |
| ⏱️ **Countdown Timer** | Hitung mundur real-time hari, jam, menit, detik |
| 👫 **Couple Section** | Profil mempelai pria & wanita |
| 📍 **Event Section** | Detail jadwal akad & resepsi, link ke Google Maps |
| 📋 **RSVP Form** | Formulir konfirmasi kehadiran + kolom ucapan |
| ✨ **AI Wish Formatter** | Ucapan tamu diperindah otomatis oleh Gemini AI |
| 💬 **Wishlist** | Galeri ucapan yang sudah diformat, bisa toggle versi asli |
| 🌸 **Floating Petals** | Animasi kelopak bunga melayang |
| 📱 **Fully Responsive** | Desain mobile-first dengan Tailwind CSS |

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Konfigurasi Environment

Edit file `.env.local` dan isi dengan data Anda:

```env
# Dapatkan API key di: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Informasi pernikahan
NEXT_PUBLIC_GROOM_NAME=Reza
NEXT_PUBLIC_BRIDE_NAME=Aisha
NEXT_PUBLIC_WEDDING_DATE=2025-03-15T10:00:00
NEXT_PUBLIC_VENUE_NAME=Grand Ballroom The Ritz-Carlton
NEXT_PUBLIC_VENUE_ADDRESS=Jl. Prof. Dr. Satrio Kav. 18, Jakarta Selatan 12940
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📁 Struktur Proyek

```
wedding-invitation/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── format-wish/route.ts   # Gemini AI Wish Formatter endpoint
│   │   │   └── rsvp/route.ts          # RSVP submit & fetch endpoint
│   │   ├── globals.css                # Global styles + Google Fonts
│   │   ├── layout.tsx                 # Root layout + Toaster
│   │   └── page.tsx                   # Main page (mengimport semua sections)
│   ├── components/
│   │   ├── Navigation.tsx             # Sticky nav + mobile menu
│   │   ├── FloatingPetals.tsx         # Animasi kelopak bunga
│   │   ├── SectionWrapper.tsx         # Reusable scroll-in animation wrapper
│   │   ├── HeroSection.tsx            # Hero dengan Framer Motion stagger
│   │   ├── CoupleSection.tsx          # Profil kedua mempelai
│   │   ├── CountdownSection.tsx       # Countdown timer interaktif
│   │   ├── EventSection.tsx           # Detail jadwal + Google Maps
│   │   ├── RSVPSection.tsx            # Form RSVP + AI Wish Formatter
│   │   ├── WishlistSection.tsx        # Galeri ucapan tamu
│   │   └── FooterSection.tsx          # Footer dengan ayat Al-Qur'an
│   └── lib/
│       ├── types.ts                   # TypeScript interfaces
│       └── wishStore.ts               # In-memory wish store
├── .env.local                         # ⚠️ Jangan di-commit ke git!
├── .env.example                       # Template environment variables
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 Kustomisasi

### Warna & Font

Edit `tailwind.config.ts` untuk mengubah palet warna:
- `cream` — warna utama hangat
- `blush` — aksen merah muda
- `sage` — hijau natural
- `gold` — aksen emas untuk ornamen

Font:
- **Cormorant Garamond** (serif) — untuk nama & heading elegan
- **Jost** (sans) — untuk body text bersih

### Data Pernikahan

Semua data pernikahan dikonfigurasi via environment variables di `.env.local`.

Untuk mengubah detail mempelai di `CoupleSection.tsx` (nama orang tua, kota), edit langsung di komponen tersebut.

---

## 🤖 AI Wish Formatter — Cara Kerja

```
Tamu menulis ucapan
       ↓
Klik "Perindah dengan AI"
       ↓
POST /api/format-wish
       ↓
Gemini 1.5 Flash API
       ↓
Ucapan lebih puitis & hangat
       ↓
Preview di form sebelum submit
       ↓
Submit RSVP → disimpan di wishlist
```

Jika Gemini API key tidak dikonfigurasi, form RSVP tetap berfungsi normal tanpa fitur AI.

---

## 🗄️ Database (Produksi)

Saat ini menggunakan **in-memory store** (data reset saat server restart). Untuk produksi, ganti `src/lib/wishStore.ts` dengan:

| Platform | Keterangan |
|---|---|
| [Vercel KV](https://vercel.com/storage/kv) | Mudah di-setup, cocok untuk Vercel deploy |
| [Supabase](https://supabase.com) | PostgreSQL gratis, realtime |
| [Firebase Firestore](https://firebase.google.com) | NoSQL, mudah dikonfigurasi |

---

## 📦 Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables di Vercel Dashboard
# Settings → Environment Variables
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 3
- **Animasi:** Framer Motion 11
- **Form:** React Hook Form
- **AI:** Google Gemini 1.5 Flash
- **Notifikasi:** React Hot Toast
- **Icons:** Lucide React
- **Font:** Google Fonts (Cormorant Garamond + Jost)

---

> Made with 💗 for a special day
