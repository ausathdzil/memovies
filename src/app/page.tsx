import MoviesSection from '@/components/home/movies-section';
import TVShowsSection from '@/components/home/tvshows-section';
import HomeSkeleton from '@/components/skeletons/home-skeleton';
import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-94px)] flex flex-col items-center gap-16 p-16 mx-auto">
      <section className="flex flex-col items-center gap-8">
        <article className="space-y-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-semibold">
            Your personal <span className="text-teal-500">cinematic</span>{' '}
            journey
          </h1>
          <p className="text-xl">Relive your favorite memories</p>
        </article>
        <Link href="/movies/discover">
          <Button className="border-2 border-zinc-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-teal-500 text-black hover:bg-zinc-950 hover:text-white py-6 px-8 text-lg flex items-center">
            <Film className="mr-2" />
            <span>Discover movies</span>
          </Button>
        </Link>
      </section>
      <Suspense fallback={<HomeSkeleton />}>
        <MoviesSection />
        <TVShowsSection />
      </Suspense>
    </main>
  );
}
