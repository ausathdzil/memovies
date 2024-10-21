import { getPopularTVShows } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function TVShowsSection() {
  const tvShows = await getPopularTVShows();
  const filteredTVShows = tvShows
    ? tvShows.sort((a, b) => b.popularity - a.popularity).splice(0, 6)
    : [];

  return (
    <section className="sm:w-full sm:max-w-4xl">
      {tvShows && (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
          {filteredTVShows.map((tvShow) => (
            <li
              className="flex flex-col items-center text-center space-y-4"
              key={tvShow.id}
            >
              <Link href={`/tv-shows/${tvShow.id}`}>
                <div className="relative w-[256px] h-[384px]">
                  <Image
                    className="border-2 border-zinc-950 shadow-[10px_10px_0_0_rgba(0,0,0,1)] rounded-xl"
                    src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                    alt={tvShow.name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                    fill
                  />
                </div>
              </Link>
              <article>
                <p className="text-lg font-semibold">{tvShow.name}</p>
                <p>⭐ {tvShow.vote_average.toFixed(1)}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
