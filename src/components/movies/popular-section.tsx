import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getPopularMovies } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default async function PopularSection() {
  const movies = await getPopularMovies();

  return (
    <section className="space-y-4 w-full">
      <h1 className="text-3xl text-center font-semibold">Popular</h1>
      {movies && (
        <Carousel
          className="w-full max-w-xs md:max-w-xl lg:max-w-4xl mx-auto"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {movies.map((movie) => (
              <CarouselItem
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                key={movie.id}
              >
                <div className="p-1 space-y-2 text-center">
                  <Link
                    className="flex items-center justify-center"
                    href={`/movies/${movie.id}`}
                  >
                    <div className="relative w-[180px] sm:w-[256px] h-[270px] sm:h-[384px]">
                      <Image
                        className="rounded-lg shadow"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        priority
                        fill
                      />
                    </div>
                  </Link>
                  <article>
                    <p className="text-lg font-semibold">{movie.title}</p>
                    <p>
                      {new Date(movie.release_date).toLocaleDateString(
                        'en-us',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </article>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </section>
  );
}
