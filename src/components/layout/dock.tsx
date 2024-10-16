'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import clsx from 'clsx';
import { Film, Home, LayoutDashboard, Tv, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FloatingDock() {
  const currentPath = usePathname();

  return (
    <div
      className={clsx(
        `fixed left-1/2 transform -translate-x-1/2 bg-primary-foreground/70 backdrop-filter backdrop-blur-lg rounded-full px-6 py-3 border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]`,
        currentPath.startsWith('/movies/discover') ? 'bottom-6' : 'top-4'
      )}
    >
      <nav>
        <ul className="flex space-x-4 sm:space-x-6">
          <TooltipProvider>
            {[
              { name: 'Home', href: '/', icon: Home },
              { name: 'Movies', href: '/movies', icon: Film },
              { name: 'TV Shows', href: '/tv-shows', icon: Tv },
              { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
              { name: 'Profile', href: '/profile', icon: User },
            ].map((link) => (
              <li key={link.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={link.href}>
                      <Button
                        className="p-2 rounded-full"
                        variant="ghost"
                        size="icon"
                        aria-label={link.name}
                      >
                        <link.icon className="hover:scale-105 transition-transform" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{link.name}</TooltipContent>
                </Tooltip>
              </li>
            ))}
          </TooltipProvider>
        </ul>
      </nav>
    </div>
  );
}
