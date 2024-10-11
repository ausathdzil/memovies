import TVShowCarousel from '@/components/tv-shows/tv-show-carousel';
import { getOnTheAir } from "@/lib/data";

export default async function OnTheAirSection() {
  const tvShows = await getOnTheAir();
  
  return (
    <section className="space-y-4 w-full">
      <h1 className="text-3xl text-center font-semibold">On The Air</h1>
      {tvShows && <TVShowCarousel tvShows={tvShows} />}
    </section>
  );
}
