import TVShowCarousel from '@/components/tv-shows/tv-show-carousel';
import { getPopularTVShows } from "@/lib/data";

export default async function PopularSection() {
  const tvShows = await getPopularTVShows();
  
  return (
    <section className="space-y-4 w-full">
      <h1 className="text-3xl text-center font-semibold">Popular</h1>
      {tvShows && <TVShowCarousel tvShows={tvShows} />}
    </section>
  );
}
