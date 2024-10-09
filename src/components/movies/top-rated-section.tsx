import MovieCarousel from '@/components/movies/movie-carousel';
import { getTopRatedMovies } from '@/lib/data';

export default async function TopRatedSection() {
  const movies = await getTopRatedMovies();

  return (
    <section className="space-y-4 w-full">
      <h1 className="text-3xl text-center font-semibold">Top Rated</h1>
      {movies && <MovieCarousel movies={movies} />}
    </section>
  );
}
