import { getCollection, getCollectionItems } from '@/lib/data';
import { Suspense } from 'react';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return (
    <article>
      <Suspense fallback={<p>Loading...</p>}>
        <CurrentCollection id={params.id} />
      </Suspense>
    </article>
  );
}

async function CurrentCollection({ id }: { id: string }) {
  const collection = await getCollection(id);
  const collectionItems = await getCollectionItems(id);

  return (
    <>
      <h1>{collection.name}</h1>
      <p>{collection.description}</p>
      <ul>
        {collectionItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}
