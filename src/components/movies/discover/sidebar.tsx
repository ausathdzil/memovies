'use client';

import SidebarFilterForm from '@/components/movies/discover/sidebar-filter-form';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import useTime from '@/lib/hooks';
import { Calendar, Clock, Star, Trophy } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';

export default function DiscoverSidebar() {
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
    <ScrollArea className="max-w-[20%] hidden lg:block border-y-2 border-l-2 border-zinc-950 rounded-s-xl">
      <nav className="p-6 border-b border-zinc-950 space-y-4">
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
        ].map((item) => (
          <Button
            className={`w-full justify-start border-2 border-zinc-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${item.color} text-white hover:bg-zinc-950 hover:text-white`}
            variant="outline"
            onClick={() => handleClick(item.params)}
            key={item.label}
          >
            <item.icon className="mr-2" size={16} />
            {item.label}
          </Button>
        ))}
      </nav>
      <Suspense>
        <SidebarFilterForm />
      </Suspense>
    </ScrollArea>
  );
}
