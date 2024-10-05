import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import FloatingDock from '@/components/layout/dock';

const manrope = localFont({
  src: './fonts/Manrope-VariableFont_wght.ttf',
  variable: '--font-manrope',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Memovies',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <main className="font-[family-name:var(--font-manrope)] max-w-5xl min-h-[calc(100vh-96px)] flex flex-col items-center justify-center gap-16 p-16 mx-auto">
          {children}
        </main>
        <FloatingDock />
        <Footer />
      </body>
    </html>
  );
}
