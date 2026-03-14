import type { Metadata } from 'next';
import { Noto_Sans, Geist_Mono, Noto_Serif } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Mr Love: Queen's Choice Archive",
  description:
    "Dive back into the world of Mr Love: Queen's Choice with our comprehensive archive. Explore media content from the beloved game.",
  openGraph: {
    title: "Mr Love: Queen's Choice Archive",
    description:
      "Dive back into the world of Mr Love: Queen's Choice with our comprehensive archive. Explore media content from the beloved game.",
    images: ['/karma-header.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
