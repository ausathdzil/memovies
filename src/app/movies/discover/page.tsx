import MoviesContainer from '@/components/movies/discover/movies-container';
import SearchForm from '@/components/movies/discover/search-form';
import DiscoverSidebar from '@/components/movies/discover/sidebar';
import { SearchParams } from '@/lib/definitions';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export const experimental_ppr = true;

export default function Page(props: { searchParams: Promise<SearchParams> }) {
  return (
    <main className="flex p-8 max-h-[calc(100vh-64px)]">
      <DiscoverSidebar />
      <div className="min-w-[80%] flex flex-col border-2 border-black rounded-e-xl">
        <Suspense>
          <SearchForm />
        </Suspense>
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <MoviesContainer props={props} />
        </Suspense>
      </div>
    </main>
  );
}
