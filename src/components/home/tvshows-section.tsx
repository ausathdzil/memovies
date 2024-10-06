import { getTVShows } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function TVShowsSection() {
  const tvShows = await getTVShows();
  const filteredTVShows = tvShows
    ? tvShows.sort((a, b) => b.popularity - a.popularity).splice(0, 6)
    : [];

  return (
    <section>
      {tvShows && (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
          {filteredTVShows.map((tvShow) => (
            <li className="text-center space-y-2" key={tvShow.id}>
              <Link href={`/tv-shows/${tvShow.id}`}>
                <div className="relative w-[256px] h-[384px]">
                  <Image
                    className="rounded-lg shadow"
                    src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                    alt={tvShow.name}
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
