import { getTVShow, getTVShows } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { tvShowId: number };
}) {
  const tvShow = await getTVShow(params.tvShowId);

  if (!tvShow) {
    notFound();
  }

  return (
    <section className="mt-12">
      <div className="relative max-w-7xl mx-auto min-h-[450px] overflow-hidden rounded-lg border-2 border-black shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
        <Image
          className="object-cover object-top"
          src={`https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path}`}
          alt={tvShow.name}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
          fill
        />
        <div className="absolute inset-0 bg-primary/75 backdrop-filter backdrop-blur-sm rounded-lg" />
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8">
          <div className="relative w-[180px] sm:w-[256px] h-[270px] sm:h-[384px] flex-shrink-0 overflow-hidden rounded-lg border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.name}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
              fill
            />
          </div>
          <article className="text-primary-foreground flex-grow space-y-2 sm:text-xl">
            <h1 className="text-2xl sm:text-4xl font-semibold">
              {tvShow.name}
            </h1>
            <p className="text-zinc-300 sm:text-lg italic">{tvShow.tagline}</p>
            <p>⭐ {tvShow.vote_average.toFixed(1)}</p>
            <div className="flex flex-wrap gap-2">
              {tvShow.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-2 bg-primary-foreground/20 rounded-full text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p>{tvShow.overview}</p>
            <p className="text-base">
              First Air Date:{' '}
              {new Date(tvShow.first_air_date).toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}