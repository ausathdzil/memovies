import MoviesSection from '@/components/movies/movies-sections';
import MoviesSectionSkeleton from '@/components/skeletons/movies-section-skeleton';
import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export const experimental_ppr = true;

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-168px)] p-16 flex flex-col items-center justify-center gap-8">
      <Suspense fallback={<MoviesSectionSkeleton />}>
        <MoviesSection />
      </Suspense>
      <Link href="/movies/discover">
        <Button className="border-2 border-zinc-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-teal-500 text-black hover:bg-zinc-950 hover:text-white py-6 px-8 text-lg flex items-center">
          <Film className="mr-2" />
          <span>Discover movies</span>
        </Button>
      </Link>
    </main>
  );
}
