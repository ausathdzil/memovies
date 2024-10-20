import MovieCarousel from '@/components/movies/movie-carousel';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '@/lib/data';

export default async function MoviesSection() {
  const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
    getNowPlayingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
  ]);

  return (
    <>
      <section className="space-y-4 w-full">
        <h1 className="text-3xl text-center font-semibold">Now Playing</h1>
        {nowPlaying && <MovieCarousel movies={nowPlaying} />}
      </section>
      <section className="space-y-4 w-full">
        <h1 className="text-3xl text-center font-semibold">Popular</h1>
        {popular && <MovieCarousel movies={popular} />}
      </section>
      <section className="space-y-4 w-full">
        <h1 className="text-3xl text-center font-semibold">Top Rated</h1>
        {topRated && <MovieCarousel movies={topRated} />}
      </section>
      <section className="space-y-4 w-full">
        <h1 className="text-3xl text-center font-semibold">Upcoming</h1>
        {upcoming && <MovieCarousel movies={upcoming} />}
      </section>
    </>
  );
}
