import { getDiscoverMovies } from '@/lib/data';
import { SearchParams } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const movies = await getDiscoverMovies(searchParams);
  const search = searchParams.search || '';
  const filteredMovies = movies?.filter(
    (movie) =>
      movie.poster_path &&
      movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {filteredMovies && (
        <ul className="px-6 pb-6 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {filteredMovies.map((movie) => (
            <li
              className="w-full h-full text-center space-y-6 border border-black p-8"
              key={movie.id}
            >
              <Link
                className="flex flex-col items-center gap-8"
                href={`/movies/${movie.id}`}
              >
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
                <article>
                  <p className="text-sm text-wrap font-semibold">
                    {movie.title}
                  </p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
