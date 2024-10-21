import { Skeleton } from '@/components/ui/skeleton';

export default function DiscoverSkeleton() {
  return (
    <div className="px-6 pb-6 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 border-zinc-950 rounded-xl">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="w-[194px] h-[236px] rounded-xl" />
      ))}
    </div>
  );
}
