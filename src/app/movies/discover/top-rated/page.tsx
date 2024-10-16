import { getTopRatedMovies } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page() {
  const movies = await getTopRatedMovies();

  return (
    <>
      {movies && (
        <ul className="px-6 pb-6 grid grid-cols-5 justify-items-center">
          {movies.map((movie) => (
            <li
              className="w-full h-full text-center space-y-6 border border-black p-8"
              key={movie.id}
            >
              <Link href={`/movies/${movie.id}`}>
                <div className="relative w-[128px] h-[192px]">
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
              <p className="text-sm text-wrap font-semibold">{movie.title}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
