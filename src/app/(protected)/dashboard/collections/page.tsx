import { getCollections } from '@/lib/data';
import { verifySession } from '@/lib/session';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <article>
      <h1>Your Collections:</h1>
      <ul>
        <Suspense fallback={<p>Loading...</p>}>
          <UserCollections />
        </Suspense>
      </ul>
    </article>
  );
}

async function UserCollections() {
  const session = await verifySession();
  const collections = await getCollections(session.userId as string);

  return (
    <>
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
    </>
  );
}
