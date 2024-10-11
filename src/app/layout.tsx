import FloatingDock from '@/components/layout/dock';
import Footer from '@/components/layout/footer';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <main className="max-w-5xl min-h-[calc(100vh-94px)] flex flex-col items-center justify-center gap-8 p-16 mx-auto">
          {children}
        </main>
        <FloatingDock />
        <Footer />
      </body>
    </html>
  );
}
