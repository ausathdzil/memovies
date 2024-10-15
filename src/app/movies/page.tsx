import NowPlayingSection from '@/components/movies/now-playing-section';
import PopularSection from '@/components/movies/popular-section';
import TopRatedSection from '@/components/movies/top-rated-section';
import UpcomingSection from '@/components/movies/upcoming-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <NowPlayingSection />
      <PopularSection />
      <TopRatedSection />
      <UpcomingSection />
      <Link className="text-lg hover:underline" href="/movies/list">
        <Button
          className="bg-background text-primary text-lg hover:bg-teal-400 border-2 border-black"
          size="lg"
        >
          Find more movies -&gt;
        </Button>
      </Link>
    </>
  );
}
