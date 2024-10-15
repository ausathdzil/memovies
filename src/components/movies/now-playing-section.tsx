import MovieCarousel from '@/components/movies/movie-carousel';
import { getNowPlayingMovies } from '@/lib/data';

export default async function NowPlayingSection() {
  const movies = await getNowPlayingMovies();

  return (
    <section className="mt-16 space-y-4 w-full">
      <h1 className="text-3xl text-center font-semibold">Now Playing</h1>
      {movies && <MovieCarousel movies={movies} />}
    </section>
  );
}
