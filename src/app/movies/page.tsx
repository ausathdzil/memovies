import MoviesSection from '@/components/movies/movies-sections';
import { Button } from '@/components/ui/button';
import { Film, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-168px)] p-16 flex flex-col items-center justify-center gap-8">
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <MoviesSection />
        <Link href="/movies/discover">
          <Button className="border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-teal-400 text-black hover:bg-black hover:text-white py-6 px-8 text-lg flex items-center">
            <Film className="mr-2" />
            <span>Discover movies</span>
          </Button>
        </Link>
      </Suspense>
    </main>
  );
}
