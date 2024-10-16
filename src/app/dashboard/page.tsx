import { Button } from '@/components/ui/button';
import { getUser } from '@/lib/data';
import { deleteSession } from '@/lib/session';

export default async function Page() {
  const user = await getUser();

  return (
    <section className="space-y-4">
      <pre>{JSON.stringify(user, null, 2)}</pre>
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
