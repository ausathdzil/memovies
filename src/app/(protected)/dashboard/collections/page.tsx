import { getCollections, getUser } from '@/lib/data';

export default async function Page() {
  const user = await getUser();
  const collections = await getCollections(user.id);

  return (
    <article>
      <h1>Your Collections:</h1>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>{collection.name}</li>
        ))}
      </ul>
    </article>
  );
}
