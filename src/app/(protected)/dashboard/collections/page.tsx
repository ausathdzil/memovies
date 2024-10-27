import { getCollections, getUser } from '@/lib/data';
import Link from 'next/link';

export default async function Page() {
  const user = await getUser();
  const collections = await getCollections(user.id);

  return (
    <article>
      <h1>Your Collections:</h1>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link
              href={
                collection.name === 'Liked'
                  ? '/dashboard/liked'
                  : `/dashboard/collections/${collection.id}`
              }
            >
              {collection.name}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
