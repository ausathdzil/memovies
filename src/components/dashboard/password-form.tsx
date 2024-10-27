'use client';

import { useUser } from '@/components/auth/user-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updatePassword } from '@/lib/actions';
import clsx from 'clsx';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { startTransition, useActionState, useState } from 'react';

export default function PasswordForm() {
  const user = useUser();
  const updatePasswordWithId = updatePassword.bind(null, user?.id as string);
  const [state, formAction, pending] = useActionState(
    updatePasswordWithId,
    undefined
  );

  const [isCurrentVisible, setIsCurrentVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);

  const toggleCurrentVisibility = () => setIsCurrentVisible(!isCurrentVisible);
  const toggleNewVisibility = () => setIsNewVisible(!isNewVisible);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget));
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label htmlFor="currentPassword">Current Password</Label>
        <div className="relative">
          <Input
            className={clsx(
              'pr,9',
              state?.errors?.currentPassword &&
                'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
            )}
            type={isCurrentVisible ? 'text' : 'password'}
            id="currentPassword"
            name="currentPassword"
            placeholder="Enter your current password"
          />
          <button
            className="absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleCurrentVisibility}
            aria-label={isCurrentVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isCurrentVisible}
            aria-controls="newPassword"
          >
            {isCurrentVisible ? (
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
        {state?.errors?.currentPassword && (
          <p className="text-destructive text-sm">
            {state.errors.currentPassword[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Input
            className={clsx(
              'pr,9',
              state?.errors?.newPassword &&
                'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
            )}
            type={isNewVisible ? 'text' : 'password'}
            id="newPassword"
            name="newPassword"
            placeholder="Enter a unique password"
          />
          <button
            className="absolute inset-y-px right-px flex h-full w-9 items-center justify-center rounded-r-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleNewVisibility}
            aria-label={isNewVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isNewVisible}
            aria-controls="newPassword"
          >
            {isNewVisible ? (
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
        {state?.errors?.newPassword && (
          <div className="text-destructive text-sm">
            <p>Password must:</p>
            <ul>
              {state.errors.newPassword.map((error, index) => (
                <li key={index}>&bull; {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button
        className="bg-background text-primary hover:bg-teal-500 border-2 border-zinc-950"
        disabled={pending}
        type="submit"
      >
        {pending && <Loader2 className="animate-spin mr-2" size={16} />}
        <span>Update password</span>
      </Button>
      {state?.message && (
        <p className="text-sm text-teal-500">{state.message}</p>
      )}
    </form>
  );
}
