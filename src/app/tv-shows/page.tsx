import AiringTodaySection from '@/components/tv-shows/airing-today-section';
import OnTheAirSection from '@/components/tv-shows/on-the-air-section';
import PopularSection from '@/components/tv-shows/popular-section';
import TopRatedSection from '@/components/tv-shows/top-rated-section';

export default function Page() {
  return (
    <main className="p-16 flex flex-col items-center">
      <AiringTodaySection />
      <OnTheAirSection />
      <PopularSection />
      <TopRatedSection />
    </main>
  );
}
