import { getMovie } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { movieId: number };
}) {
  const movie = await getMovie(params.movieId);

  if (movie?.success === false || !movie) {
    notFound();
  }

  return (
    <main className="min-h-[calc(100vh-94px)] flex flex-col justify-center p-8 mx-auto">
      <div className="mt-16 xl:mt-12 relative max-w-4xl mx-auto min-h-[450px] overflow-hidden rounded-lg border-2 border-black shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
        <Image
          className="object-cover object-top"
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
          fill
        />
        <div className="absolute inset-0 bg-primary/75 backdrop-filter backdrop-blur-sm rounded-lg" />
        <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8">
          <div className="relative w-[180px] sm:w-[256px] h-[270px] sm:h-[384px] flex-shrink-0 overflow-hidden rounded-lg border-2 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
              fill
            />
          </div>
          <article className="text-primary-foreground flex-grow space-y-2 sm:text-xl">
            <h1 className="text-2xl sm:text-4xl font-semibold">
              {movie.title}
            </h1>
            <p className="text-zinc-300 sm:text-lg italic">{movie.tagline}</p>
            <p>⭐ {movie.vote_average.toFixed(1)}</p>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-2 bg-primary-foreground/20 rounded-full text-xs"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p>{movie.overview}</p>
            <p className="text-base">
              Release Date:{' '}
              {new Date(movie.release_date).toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
