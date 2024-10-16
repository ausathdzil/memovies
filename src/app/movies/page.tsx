import NowPlayingSection from '@/components/movies/now-playing-section';
import PopularSection from '@/components/movies/popular-section';
import TopRatedSection from '@/components/movies/top-rated-section';
import UpcomingSection from '@/components/movies/upcoming-section';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="p-16 flex flex-col items-center gap-8">
      <NowPlayingSection />
      <PopularSection />
      <TopRatedSection />
      <UpcomingSection />
      <Link className="text-lg hover:underline" href="/movies/discover">
        <Button className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-teal-500 text-black hover:bg-black hover:text-white">
          <span>Discover more movies</span>
          <ArrowRight className="ml-2" />
        </Button>
      </Link>
    </main>
  );
}
