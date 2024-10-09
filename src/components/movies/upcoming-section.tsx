import MovieCarousel from '@/components/movies/movie-carousel';
import { getUpcomingMovies } from '@/lib/data';

export default async function UpcomingSection() {
  const movies = await getUpcomingMovies();

  return (
    <section className="space-y-4 w-full">
      <h1 className="text-3xl text-center font-semibold">Upcoming</h1>
      {movies && (
        <MovieCarousel movies={movies} />
      )}
    </section>
  );
}
