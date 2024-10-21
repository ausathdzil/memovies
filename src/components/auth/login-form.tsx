'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/actions';
import clsx from 'clsx';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { startTransition, useActionState, useState } from 'react';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
        <Input
          className={
            state?.errors?.email &&
            'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
          }
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
        />
        {state?.errors?.email && (
          <p className="text-destructive text-sm">
            {state.errors.email.join(', ')}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            className={clsx(
              'pr,9',
              state?.errors?.password &&
                'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
            )}
            id="password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? 'text' : 'password'}
          />
          <button
            className="absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                role="presentation"
              />
            ) : (
              <Eye
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                role="presentation"
              />
            )}
          </button>
        </div>
        {state?.errors?.password && (
          <p className="text-destructive text-sm">{state.errors.password}</p>
        )}
      </div>
      <Button
        className="w-full bg-background text-primary hover:bg-teal-500 border-2 border-zinc-950"
        disabled={pending}
        type="submit"
      >
        {pending && <Loader2 className="animate-spin mr-2" size={16} />}
        <span>Login</span>
      </Button>
    </form>
  );
}
