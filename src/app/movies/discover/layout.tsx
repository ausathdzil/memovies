import SearchForm from '@/components/movies/discover/search-form';
import MovieListSideBar from '@/components/movies/discover/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen flex">
      <MovieListSideBar />
      <div className="flex-grow flex flex-col">
        <SearchForm />
        <ScrollArea className="flex-grow h-full">{children}</ScrollArea>
      </div>
    </main>
  );
}
