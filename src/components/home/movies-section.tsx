import { getMovies } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function MoviesSection() {
  const movies = await getMovies();
  const filteredMovies = movies
    ? movies.sort((a, b) => b.popularity - a.popularity).splice(0, 6)
    : [];

  return (
    <section className="mt-2">
      {movies && (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
          {filteredMovies.map((movie) => (
            <li className="text-center space-y-4" key={movie.id}>
              <Link href={`/movies/${movie.id}`}>
                <div className="relative w-[256px] h-[384px]">
                  <Image
                    className="border-2 border-black shadow-[10px_10px_0_0_rgba(0,0,0,1)] rounded-xl"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
