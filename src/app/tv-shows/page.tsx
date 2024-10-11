import AiringTodaySection from '@/components/tv-shows/airing-today-section';
import OnTheAirSection from '@/components/tv-shows/on-the-air-section';
import PopularSection from '@/components/tv-shows/popular-section';
import TopRatedSection from '@/components/tv-shows/top-rated-section';

export default function Page() {
  return (
    <>
      <AiringTodaySection />
      <OnTheAirSection />
      <PopularSection />
      <TopRatedSection />
    </>
  );
}
