'use client';

import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { back } = useRouter();

  return (
    <main className="min-h-[calc(100vh-168px)] flex flex-col items-center justify-center gap-4 mx-auto">
      <Frown size={64} />
      <h1 className="text-4xl font-semibold text-center">Movie not found.</h1>
      <Button onClick={() => back()}>Go back</Button>
    </main>
  );
}
