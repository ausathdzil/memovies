import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/data';
import { deleteSession } from '@/lib/session';

export default async function Page() {
  const user = await getUser();

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <article className="text-xl text-center font-semibold">
        <h1>
          Hello <span className="text-teal-500">{user.name}</span>!
        </h1>
        <h1>This page is still under construction.</h1>
        <p>🙇</p>
      </article>
      <form
        action={async () => {
          'use server';
          await deleteSession();
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </section>
  );
}
