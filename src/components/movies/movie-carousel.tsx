import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Movie } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieCarousel({ movies }: { movies: Movie[] }) {
  return (
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
            <div className="p-1 space-y-4 text-center">
              <Link
                className="flex items-center justify-center"
                href={`/movies/${movie.id}`}
              >
                <div className="relative w-[180px] sm:w-[256px] h-[270px] sm:h-[384px]">
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
              <article>
                <p className="text-lg font-semibold">{movie.title}</p>
                <p>
                  {new Date(movie.release_date).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </article>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
