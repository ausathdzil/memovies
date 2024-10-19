'use client';

import SidebarFilterForm from '@/components/movies/discover/sidebar-filter-form';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MovieGenre } from '@/lib/definitions';
import useTime from '@/lib/hooks';
import {
  Calendar,
  Clock,
  Film,
  Home,
  LayoutDashboard,
  Star,
  Trophy,
  Tv,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function MovieListSideBar({
  genres,
}: {
  genres: MovieGenre[] | null;
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { oneMonthAgo, oneMonthLater } = useTime();

  const handleClick = (query: {
    sort_by: string;
    with_release_type?: string;
    without_genres?: string;
    vote_count?: string;
    min_date?: string;
    max_date?: string;
  }) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (key === 'with_release_type') {
        params.append(key, value);
      } else {
        params.append(key, value);
      }
    });

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ScrollArea className="hidden lg:block min-w-fit border-r-2 border-black">
      <div className="w-full p-6 border-b border-black flex justify-center">
        <nav>
          <ul className="flex space-x-4">
            <TooltipProvider>
              {[
                { name: 'Home', href: '/', icon: Home },
                { name: 'Movies', href: '/movies', icon: Film },
                { name: 'TV Shows', href: '/tv-shows', icon: Tv },
                {
                  name: 'Dashboard',
                  href: '/dashboard',
                  icon: LayoutDashboard,
                },
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
      <nav className="p-6 border-b border-black">
        <ul className="space-y-4">
          {[
            {
              icon: Calendar,
              label: 'Now Playing',
              color: 'bg-red-500',
              params: {
                sort_by: 'popularity.desc',
                with_release_type: '2|3',
                min_date: `${oneMonthAgo.toISOString().split('T')[0]}`,
                max_date: `${oneMonthLater.toISOString().split('T')[0]}`,
              },
            },
            {
              icon: Star,
              label: 'Popular',
              color: 'bg-orange-500',
              params: {
                sort_by: 'popularity.desc',
              },
            },
            {
              icon: Trophy,
              label: 'Top Rated',
              color: 'bg-green-500',
              params: {
                sort_by: 'vote_average.desc',
                without_genres: '99,10755',
                vote_count: '200',
              },
            },
            {
              icon: Clock,
              label: 'Upcoming',
              color: 'bg-blue-500',
              params: {
                sort_by: 'popularity.desc',
                with_release_type: '2',
                min_date: `${oneMonthLater.toISOString().split('T')[0]}`,
                max_date: `${oneMonthLater.toISOString().split('T')[0]}`,
              },
            },
          ].map((item, index) => (
            <li key={index}>
              <Button
                className={`w-full justify-start border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${item.color} text-white hover:bg-black hover:text-white`}
                variant="outline"
                onClick={() => handleClick(item.params)}
              >
                <item.icon className="mr-2" size={16} />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <SidebarFilterForm genres={genres} />
    </ScrollArea>
  );
}
