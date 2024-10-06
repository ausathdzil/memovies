import NowPlayingSection from '@/components/movies/now-playing-section';
import PopularSection from '@/components/movies/popular-section';
import TopRatedSection from '@/components/movies/top-rated-section';
import UpcomingSection from '@/components/movies/upcoming-section';

export default async function Page() {
  return (
    <>
      <NowPlayingSection />
      <PopularSection />
      <TopRatedSection />
      <UpcomingSection />
    </>
  );
}
