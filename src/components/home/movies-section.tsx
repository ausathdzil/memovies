import { getMovies } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function MoviesSection() {
  const movies = await getMovies();
  const filteredMovies = movies
    ? movies.sort((a, b) => b.popularity - a.popularity).splice(0, 6)
    : [];

  return (
    <section>
      {movies && (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
          {filteredMovies.map((movie) => (
            <li className="text-center space-y-2" key={movie.id}>
              <Link href={`/movies/${movie.id}`}>
                <div className="relative w-[256px] h-[384px]">
                  <Image
                    className="rounded-lg shadow"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    priority
                    fill
                  />
                </div>
              </Link>
              <article>
                <p className="text-lg font-semibold">{movie.title}</p>
                <p>⭐ {movie.vote_average.toFixed(1)}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
