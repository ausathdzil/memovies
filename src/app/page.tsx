import { getMovies, getTVShows } from '@/lib/data';
import Image from 'next/image';

export default async function Home() {
  const [movies, tvShows] = await Promise.all([getMovies(), getTVShows()]);
  const filteredMovies = movies
    .sort((a, b) => b.vote_average - a.vote_average)
    .splice(0, 6);
  const filteredTVShows = tvShows
    .sort((a, b) => b.vote_average - a.vote_average)
    .splice(0, 6);

  return (
    <>
      <section className="mt-16">
        <article className="space-y-2 text-center">
          <h1 className="text-6xl font-semibold">Memovies</h1>
          <p className="text-lg">Save your precious memories.</p>
        </article>
      </section>
      <section>
        {filteredMovies.length !== 0 && (
          <ul className="grid grid-cols-3 gap-x-16 gap-y-8">
            {filteredMovies.map((movie) => (
              <li key={movie.id}>
                <div className="relative w-[256px] h-[384px]">
                  <Image
                    className="rounded-lg shadow"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                  />
                </div>
                <h2>{movie.title}</h2>
                <p>{movie.vote_average}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        {filteredTVShows.length !== 0 && (
          <ul className="grid grid-cols-3 gap-x-16 gap-y-8">
            {filteredTVShows.map((tvShow) => (
              <li key={tvShow.id}>
                <div className="relative w-[256px] h-[384px]">
                  <Image
                    className="rounded-lg shadow"
                    src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                    alt={tvShow.name}
                    fill
                  />
                </div>
                <h2>{tvShow.name}</h2>
                <p>{tvShow.vote_average}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

