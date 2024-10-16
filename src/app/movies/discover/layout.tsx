import SearchForm from '@/components/movies/discover/search-form';
import MovieListSideBar from '@/components/movies/discover/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getMovieGenres } from '@/lib/data';
import { Suspense } from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const genres = await getMovieGenres();

  return (
    <main className="h-screen flex">
      <Suspense>
        <MovieListSideBar genres={genres} />
      </Suspense>
      <div className="flex-grow flex flex-col">
        <Suspense>
          <SearchForm />
        </Suspense>
        <ScrollArea className="flex-grow h-full">{children}</ScrollArea>
      </div>
    </main>
  );
}
