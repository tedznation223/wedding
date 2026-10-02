import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const groomName = process.env.NEXT_PUBLIC_GROOM_NAME || 'Juan';
const brideName = process.env.NEXT_PUBLIC_BRIDE_NAME || 'Indri';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#faf6ee',
};

export const metadata: Metadata = {
  title: `Undangan Pernikahan ${groomName} & ${brideName}`,
  description: `Dengan penuh kebahagiaan, kami mengundang Anda untuk menyaksikan pernikahan ${groomName} dan ${brideName}.`,
  openGraph: {
    title: `Undangan Pernikahan ${groomName} & ${brideName}`,
    description: `Dengan penuh kebahagiaan, kami mengundang Anda untuk menyaksikan pernikahan ${groomName} dan ${brideName}.`,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#faf6ee',
              color: '#2c2416',
              border: '1px solid #dfc49a',
              borderRadius: '12px',
              fontFamily: 'Jost, sans-serif',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
