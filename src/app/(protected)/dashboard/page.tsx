import { getLikedMovies, getUser } from '@/lib/data';
import Link from 'next/link';

export default async function Page() {
  const user = await getUser();
  const likedMovies = await getLikedMovies(user.id);

  return (
    <>
      <article className="font-semibold">
        <h1>
          Welcome, <span className="text-teal-500">{user.name}</span>!
        </h1>
      </article>
      <article className="space-y-2">
        {likedMovies.length > 0 ? (
          <>
            <h2>Liked Movies:</h2>
            <ul>
              {likedMovies.map((movie) => (
                <li key={movie.id}>
                  <Link
                    className="hover:underline underline-offset-2"
                    href={`/movies/${movie.tmdbId}`}
                  >
                    {movie.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No liked movies yet</p>
        )}
      </article>
    </>
  );
}
