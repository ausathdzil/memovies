'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Film } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 shadow-sm',
        isScrolled && 'bg-background/80 backdrop-blur-md'
      )}
    >
      <nav className="flex items-stretch border-b-2 border-zinc-950">
        <Link
          className="font-bold p-4 sm:p-6 border-r-2 border-zinc-950 flex items-center space-x-2 hover:bg-zinc-100 transition ease-in-out"
          href="/"
        >
          <Film size={24} />
          <span>Memovies</span>
        </Link>
        <div className="hidden md:flex">
          <Link
            className="p-6 border-r-2 border-zinc-950 hover:bg-zinc-100 transition ease-in-out"
            href="/movies"
          >
            Movies
          </Link>
          <Link
            className="p-6 border-zinc-950 border-r-2 hover:bg-zinc-100 transition ease-in-out"
            href="/movies/discover"
          >
            Discover
          </Link>
        </div>
        <div className="flex grow justify-end items-center">
          <Link
            className="h-full sm:border-l-2 border-zinc-950 flex items-center px-4 sm:px-6"
            href="/dashboard"
          >
            <Button className="border-2 border-zinc-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-zinc-50 text-black hover:bg-teal-500">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
