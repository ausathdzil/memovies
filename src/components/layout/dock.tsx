import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Film, Home, LayoutDashboard, Tv, User } from 'lucide-react';
import Link from 'next/link';

const links = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    name: 'Movies',
    href: '/movies',
    icon: Film,
  },
  {
    name: 'TV Shows',
    href: '/tv-shows',
    icon: Tv,
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
  },
];

export default function FloatingDock() {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-primary-foreground/70 backdrop-filter backdrop-blur-lg rounded-full px-6 py-3 border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
      <nav>
        <ul className="flex space-x-4 sm:space-x-6">
          <TooltipProvider>
            {links.map((link) => (
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
