import SearchForm from '@/components/movies/discover/search-form';
import MovieListSideBar from '@/components/movies/discover/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getMovieGenres } from '@/lib/data';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const genres = await getMovieGenres();

  return (
    <main className="h-screen flex">
      <MovieListSideBar genres={genres} />
      <div className="flex-grow flex flex-col">
        <SearchForm />
        <ScrollArea className="flex-grow h-full">{children}</ScrollArea>
      </div>
    </main>
  );
}
