import { getCollection, getCollectionItems } from '@/lib/data';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const collection = await getCollection(params.id);
  const collectionItems = await getCollectionItems(params.id);

  return (
    <article>
      <h1>{collection.name}</h1>
      <p>{collection.description}</p>
      <ul>
        {collectionItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </article>
  );
}
