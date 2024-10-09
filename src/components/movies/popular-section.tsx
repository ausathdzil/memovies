import MovieCarousel from '@/components/movies/movie-carousel';
import { getPopularMovies } from '@/lib/data';

export default async function PopularSection() {
  const movies = await getPopularMovies();

  return (
    <section className="space-y-4 w-full">
      <h1 className="text-3xl text-center font-semibold">Popular</h1>
      {movies && (
        <MovieCarousel movies={movies} />
      )}
    </section>
  );
}
