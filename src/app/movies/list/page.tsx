import MovieListSideBar from '@/components/movies/list/sidebar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getMovies } from '@/lib/data';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page() {
  const movies = await getMovies();

  return (
    <section className="w-full border-2 border-black h-screen mt-14 rounded-xl flex">
      <MovieListSideBar />
      <ScrollArea className="flex-grow">
        <div className="relative p-6">
          <Search className="absolute top-1/2 left-10 transform -translate-y-1/2" />
          <Input
            className="pl-12"
            placeholder="Search for movies..."
            type="search"
          />
        </div>
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
      </ScrollArea>
    </section>
  );
}
