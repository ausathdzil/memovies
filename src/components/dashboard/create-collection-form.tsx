'use client';

import { useUser } from '@/components/auth/user-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createCollection } from '@/lib/actions';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import { startTransition, useActionState } from 'react';
import { useFormStatus } from 'react-dom';

export function CreateCollectionForm() {
  const user = useUser();
  const createCollectionWithId = createCollection.bind(
    null,
    user?.id as string
  );
  const [state, formAction, pending] = useActionState(
    createCollectionWithId,
    undefined
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => formAction(new FormData(event.currentTarget)));
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          className={clsx(
            'pr,9',
            state?.errors?.name &&
              'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
          )}
          id="name"
          name="name"
          placeholder="Enter collection name"
        />
        {state?.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          className={clsx(
            'pr,9',
            state?.errors?.description &&
              'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
          )}
          placeholder="Add a description"
          name="description"
          id="description"
        />
        {state?.errors?.description && (
          <p className="text-red-500 text-sm">{state.errors.description}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          className="bg-background text-primary hover:bg-teal-500 border-2 border-zinc-950"
          disabled={pending}
          type="submit"
        >
          {pending && <Loader2 className="animate-spin mr-2" size={16} />}
          <span>Create</span>
        </Button>
      </div>
      {state?.message && (
        <p className="text-teal-500 text-sm">{state.message}</p>
      )}
    </form>
  );
}
