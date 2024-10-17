import { getDiscoverMovies } from '@/lib/data';
import { SearchParams } from '@/lib/definitions';
import { Frown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const data = await getDiscoverMovies(searchParams);
  const movies = data?.results;
  const search = searchParams.search || '';
  const filteredMovies = movies?.filter(
    (movie) =>
      movie.poster_path &&
      movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!filteredMovies?.length) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <Frown size={64} />
        <h1 className="text-5xl font-bold">No movies found</h1>
      </div>
    );
  }

  return (
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
              <p className="text-sm text-wrap font-semibold">{movie.title}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}
