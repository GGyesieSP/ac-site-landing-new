import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArtistConsent',
  description: "ArtistConsent empowers creators in the digital age. We provide tools that help artists maintain control over their likeness & work and share authentic stories that resonate on a human level. In a world of increasing automation, we ensure that each artist's unique vision remains potent and true to who they are.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}