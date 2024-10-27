import PasswordForm from '@/components/dashboard/password-form';
import ProfileForm from '@/components/dashboard/profile-form';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function Page() {
  return (
    <section className="w-full space-y-16">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Account Information</h1>
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <ProfileForm />
        </Suspense>
      </div>
      <div className="space-y-4 w-1/2">
        <h1 className="text-2xl font-bold">Security</h1>
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <PasswordForm />
        </Suspense>
      </div>
    </section>
  );
}
