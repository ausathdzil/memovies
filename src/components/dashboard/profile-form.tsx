'use client';

import { useUser } from '@/components/auth/user-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateAccount } from '@/lib/actions';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import { startTransition, useActionState } from 'react';

export default function ProfileForm() {
  const user = useUser();
  const updateAccountWithId = updateAccount.bind(null, user?.id as string);
  const [state, formAction, pending] = useActionState(
    updateAccountWithId,
    undefined
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget));
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          className={clsx(
            'w-1/2',
            state?.errors?.name &&
              'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
          )}
          name="name"
          id="name"
          defaultValue={user?.name}
          placeholder="Enter your name"
        />
        {state?.errors?.name && (
          <p className="text-destructive text-sm">
            {state.errors.name.join(' ')}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          className={clsx(
            'w-1/2',
            state?.errors?.email &&
              'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
          )}
          name="email"
          id="email"
          defaultValue={user?.email}
          placeholder="Enter your email"
        />
        {state?.errors?.email && (
          <p className="text-destructive text-sm">
            {state.errors.email.join(' ')}
          </p>
        )}
      </div>

      <Button
        className="bg-background text-primary hover:bg-teal-500 border-2 border-zinc-950"
        disabled={pending}
        type="submit"
      >
        {pending && <Loader2 className="animate-spin mr-2" size={16} />}
        <span>Save changes</span>
      </Button>
      {state?.message && (
        <p className="text-sm text-teal-500">{state.message}</p>
      )}
    </form>
  );
}
