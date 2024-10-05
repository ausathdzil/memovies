import { getTVShow, getTVShows } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { tvShowId: number };
}) {
  const tvshow = await getTVShow(params.tvShowId);

  if (!tvshow) {
    notFound();
  }

  return (
    <section className="mt-12">
      <div className="relative max-w-7xl mx-auto min-h-[450px] overflow-hidden rounded-lg">
        <Image
          className="object-cover object-top"
          src={`https://image.tmdb.org/t/p/w1280${tvshow.backdrop_path}`}
          alt={tvshow.name}
          priority
          fill
        />
        <div className="absolute inset-0 bg-primary/75 backdrop-filter backdrop-blur-sm rounded-lg" />
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8">
          <div className="relative w-[180px] sm:w-[256px] h-[270px] sm:h-[384px] flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
              alt={tvshow.name}
              priority
              fill
            />
          </div>
          <article className="text-primary-foreground flex-grow space-y-2 sm:text-xl">
            <h1 className="text-2xl sm:text-4xl font-semibold">
              {tvshow.name}
            </h1>
            <p className="text-zinc-300 sm:text-lg italic">{tvshow.tagline}</p>
            <p>⭐ {tvshow.vote_average.toFixed(1)}</p>
            <div className="flex flex-wrap gap-2">
              {tvshow.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-2 bg-primary-foreground/20 rounded-full text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p>{tvshow.overview}</p>
            <p className="text-sm sm:text-base">
              First Air Date:{' '}
              {new Date(tvshow.first_air_date).toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-sm sm:text-base">Status: {tvshow.status}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
