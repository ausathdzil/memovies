import { OverviewCards, Profile } from '@/components/dashboard/overview-cards';
import OverviewSkeleton from '@/components/skeletons/dashboard/overview-skeleton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <section className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <Suspense fallback={<Skeleton className="w-1/4 h-[52px]" />}>
          <Profile />
        </Suspense>
        <Link href="/dashboard/profile">
          <Button
            className="border-2 border-zinc-950 shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-zinc-50 hover:bg-teal-500"
            variant="secondary"
          >
            Edit Profile
          </Button>
        </Link>
      </div>
      <Separator className="bg-zinc-950 h-[2px] rounded" />
      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewCards />
      </Suspense>
    </section>
  );
}
