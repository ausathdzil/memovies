import { getLikedMovies } from '@/lib/data';
import { verifySession } from '@/lib/session';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <article>
      <h1>Your Liked Movies: </h1>
      <ul>
        <Suspense fallback={<p>Loading...</p>}>
          <UserLiked />
        </Suspense>
      </ul>
    </article>
  );
}

async function UserLiked() {
  const session = await verifySession();
  const likedCollection = await getLikedMovies(session.userId as string);

  return (
    <>
      {likedCollection.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.tmdbId}`}>{movie.title}</Link>
        </li>
      ))}
    </>
  );
}
