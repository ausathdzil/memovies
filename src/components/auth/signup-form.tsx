'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signup } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { startTransition, useActionState } from 'react';

export default function SignUpForm() {
  const [state, formAction, pending] = useActionState(signup, undefined);

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
        <Input type="text" name="name" placeholder="Enter your name" />
        {state?.errors?.name && (
          <p className="text-destructive text-sm">
            {state.errors.name.join(', ')}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" placeholder="email@example.com" />
        {state?.errors?.email && (
          <p className="text-destructive text-sm">
            {state.errors.email.join(', ')}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Enter a unique password"
        />
        {state?.errors?.password?.length ? (
          <div className="text-destructive text-sm">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error, index) => (
                <li key={index}>&bull; {error}</li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Button
        className="w-full bg-background text-primary hover:bg-teal-400 border-2 border-black"
        disabled={pending}
        type="submit"
      >
        {pending && <Loader2 className="animate-spin mr-2" size={16} />}
        <span>Sign up</span>
      </Button>
      {state?.message && (
        <p className="text-destructive text-sm">{state.message}</p>
      )}
    </form>
  );
}
