'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/actions';
import { Loader2 } from 'lucide-react';
import { startTransition, useActionState } from 'react';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget));
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
          placeholder="Enter your password"
        />
        {state?.errors?.password && (
          <p className="text-destructive text-sm">{state.errors.password}</p>
        )}
      </div>
      <Button
        className="w-full bg-background text-primary hover:bg-teal-400 border-2 border-black"
        disabled={pending}
        type="submit"
      >
        {pending && <Loader2 className="animate-spin mr-2" size={16} />}
        <span>Login</span>
      </Button>
      {state?.message && (
        <p className="text-destructive text-sm">{state.message}</p>
      )}
    </form>
  );
}
