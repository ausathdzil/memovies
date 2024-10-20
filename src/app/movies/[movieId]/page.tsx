import MovieDetails from '@/components/movies/movie/movie-details';
import { Suspense } from 'react';

export default function Page(props: { params: Promise<{ movieId: number }> }) {
  return (
    <main className="min-h-[calc(100vh-168px)] flex flex-col items-center justify-center py-6 mx-auto">
      <Suspense fallback={<p>Loading...</p>}>
        <MovieDetails params={props.params} />
      </Suspense>
    </main>
  );
}
