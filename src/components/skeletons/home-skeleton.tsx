import { Skeleton } from '@/components/ui/skeleton';

export default function HomeSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className="w-[256px] h-[384px] rounded-xl" />
      ))}
    </div>
  );
}
