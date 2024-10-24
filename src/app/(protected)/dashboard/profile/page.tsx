import { getUser } from '@/lib/data';

export default async function Page() {
  const user = await getUser();

  return (
    <article>
      <h1>Profile</h1>
      <p>
        Welcome, <span className="text-teal-500">{user.name}</span>!
      </p>
    </article>
  );
}
