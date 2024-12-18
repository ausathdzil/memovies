import FloatingDock from '@/components/layout/dock';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const manrope = localFont({
  src: './fonts/Manrope-VariableFont_wght.ttf',
  variable: '--font-manrope',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Memovies',
  description: 'Save your precious memories.',
};

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body className={`${manrope.className} antialiased`}>
        <Header />
        {children}
        <FloatingDock />
        <Footer />
      </body>
    </html>
  );
}
