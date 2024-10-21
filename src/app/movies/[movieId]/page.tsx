import MovieDetails from '@/components/movies/movie/movie-details';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export const experimental_ppr = true;

export default function Page(props: { params: Promise<{ movieId: number }> }) {
  return (
    <main className="min-h-[calc(100vh-168px)] flex flex-col items-center justify-center py-6 mx-auto">
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <MovieDetails params={props.params} />
      </Suspense>
    </main>
  );
}
