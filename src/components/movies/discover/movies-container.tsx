import { ScrollArea } from '@/components/ui/scroll-area';
import { getDiscoverMovies, getSearchMovies } from '@/lib/data';
import { SearchParams } from '@/lib/definitions';
import { Frown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function MoviesContainer({
  props,
}: {
  props: { searchParams: Promise<SearchParams> };
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query || '';

  let movies;
  if (query) {
    const searchData = await getSearchMovies(query);
    movies = searchData?.results;
  } else {
    const discoverData = await getDiscoverMovies(searchParams);
    movies = discoverData?.results;
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-2">
        <Frown size={64} />
        <h1 className="text-5xl font-bold">No movies found</h1>
      </div>
    );
  }

  return (
    <ScrollArea>
      <div className="px-6 pb-6 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 border-black rounded-xl">
        {movies.map((movie) => (
          <Link
            className="flex flex-col items-center text-center gap-6"
            href={`/movies/${movie.id}`}
            key={movie.id}
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
        ))}
      </div>
    </ScrollArea>
  );
}
