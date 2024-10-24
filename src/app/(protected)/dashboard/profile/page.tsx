import ProfileForm from '@/components/dashboard/profile-form';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function Page() {
  return (
    <section className="w-full space-y-4">
      <h1 className="text-2xl font-bold">Account Information</h1>
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <ProfileForm />
      </Suspense>
    </section>
  );
}
