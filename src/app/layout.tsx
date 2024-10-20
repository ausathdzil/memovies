import FloatingDock from '@/components/layout/dock';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/header';
import { verifySession } from '@/lib/session';

const manrope = localFont({
  src: './fonts/Manrope-VariableFont_wght.ttf',
  variable: '--font-manrope',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Memovies',
  description: 'Save your precious memories.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body className={`${manrope.className} antialiased`}>
        <Header isAuth={session.isAuth} />
        {children}
        <FloatingDock />
        <Footer />
      </body>
    </html>
  );
}
