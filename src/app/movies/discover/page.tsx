import MoviesContainer from '@/components/movies/discover/movies-container';
import SearchForm from '@/components/movies/discover/search-form';
import DiscoverSidebar from '@/components/movies/discover/sidebar';
import DiscoverSkeleton from '@/components/skeletons/discover-skeleton';
import { SearchParams } from '@/lib/definitions';
import { Suspense } from 'react';

export default function Page(props: { searchParams: Promise<SearchParams> }) {
  return (
    <main className="flex p-8 max-h-[calc(100vh-64px)]">
      <DiscoverSidebar />
      <div className="w-4/5 max-w-[80%] flex flex-col items-center border-2 border-zinc-950 rounded-e-xl">
        <Suspense>
          <SearchForm />
        </Suspense>
        <Suspense fallback={<DiscoverSkeleton />}>
          <MoviesContainer searchParams={props.searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
