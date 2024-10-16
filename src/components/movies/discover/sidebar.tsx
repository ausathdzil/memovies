import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getMovieGenres } from '@/lib/data';
import { Calendar, Clock, Film, Star, Trophy } from 'lucide-react';
import Link from 'next/link';
import SidebarFilterForm from './sidebar-filter-form';

export default async function MovieListSideBar() {
  const genres = await getMovieGenres();

  return (
    <ScrollArea className="hidden lg:block min-w-fit border-r-2 border-black">
      <div className="p-6 border-b border-black">
        <Link
          className="flex items-center justify-center hover:text-teal-500 transition ease-in-out"
          href="/"
        >
          <Film className="mr-2" size={24} />
          <span className="text-lg font-semibold">Memovies</span>
        </Link>
      </div>
      <nav className="p-6 border-b border-black">
        <ul className="space-y-4">
          {[
            {
              icon: Calendar,
              label: 'Now Playing',
              color: 'bg-red-500',
              href: '/movies/discover/now-playing',
            },
            {
              icon: Star,
              label: 'Popular',
              color: 'bg-orange-500',
              href: '/movies/discover/popular',
            },
            {
              icon: Trophy,
              label: 'Top Rated',
              color: 'bg-green-500',
              href: '/movies/discover/top-rated',
            },
            {
              icon: Clock,
              label: 'Upcoming',
              color: 'bg-blue-500',
              href: '/movies/discover/upcoming',
            },
          ].map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <Button
                  className={`w-full justify-start border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${item.color} text-white hover:bg-black hover:text-white`}
                  variant="outline"
                >
                  <item.icon className="mr-2" size={16} />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <SidebarFilterForm genres={genres} />
    </ScrollArea>
  );
}
