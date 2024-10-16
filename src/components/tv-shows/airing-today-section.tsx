import TVShowCarousel from '@/components/tv-shows/tv-show-carousel';
import { getAiringToday } from '@/lib/data';

export default async function AiringTodaySection() {
  const tvShows = await getAiringToday();

  return (
    <section className="mt-16 space-y-4 w-full">
      <h1 className="text-3xl text-center font-semibold">Airing Today</h1>
      {tvShows && <TVShowCarousel tvShows={tvShows} />}
    </section>
  );
}
