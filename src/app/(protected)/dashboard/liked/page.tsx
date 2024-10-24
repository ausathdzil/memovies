import { getLikedMovies, getUser } from '@/lib/data';
import { verifySession } from '@/lib/session';
import Link from 'next/link';

export default async function Page() {
  const user = await getUser();
  const likedCollection = await getLikedMovies(user.id);

  return (
    <article>
      <h1>Your Liked Movies: </h1>
      <ul>
        {likedCollection.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.tmdbId}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
