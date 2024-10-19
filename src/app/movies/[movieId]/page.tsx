import LikeButton from '@/components/movies/movie/like-button';
import { getMovie, isMediaLiked } from '@/lib/data';
import { verifySession } from '@/lib/session';
import { CalendarDays, Clock, LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page(props: {
  params: Promise<{ movieId: number }>;
}) {
  const params = await props.params;
  const movie = await getMovie(params.movieId);
  const session = await verifySession();

  if (movie?.success === false || !movie) {
    notFound();
  }

  const isLiked = await isMediaLiked(session.userId as string, movie.id);

  return (
    <main className="min-h-[calc(100vh-168px)] flex flex-col justify-center mx-auto">
      <div className="relative max-w-4xl mx-auto min-h-[450px] overflow-hidden rounded-lg border-2 border-black shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
        <Image
          className="object-cover object-top"
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
          fill
        />
        <div className="absolute inset-0 bg-primary/85 backdrop-filter rounded-lg" />
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
          <div className="space-y-4 text-primary-foreground">
            <article className="space-y-2 sm:text-lg">
              <h1 className="text-2xl sm:text-4xl font-semibold">
                {movie.title}
              </h1>
              <p className="text-zinc-300 sm:text-lg italic">{movie.tagline}</p>
              <p>⭐ {movie.vote_average.toFixed(1)}</p>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Link
                    className="px-3 py-2 bg-primary-foreground/20 rounded-full text-xs hover:bg-primary-foreground/50 transition ease-in-out duration-75"
                    href={`/movies/discover?genre=${genre.id}`}
                    key={genre.id}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
              <p>{movie.overview}</p>
            </article>
            {session.isAuth && (
              <div className="flex items-center gap-4">
                <LikeButton
                  movie={movie}
                  userId={session.userId as string}
                  initialLiked={isLiked}
                />
              </div>
            )}
            <article className="space-y-4 text-base">
              <div className="flex space-x-2 items-center">
                <CalendarDays />
                <p>
                  Release Date:{' '}
                  {new Date(movie.release_date).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex space-x-2 items-center">
                <Clock />
                <p>Runtime: {movie.runtime} minutes</p>
              </div>
              <div className="flex space-x-2 items-center text-teal-400">
                <LinkIcon />
                <a
                  className="hover:underline underline-offset-2"
                  href={movie.homepage}
                  target="_blank"
                  rel="noreferrer"
                >
                  More info
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
