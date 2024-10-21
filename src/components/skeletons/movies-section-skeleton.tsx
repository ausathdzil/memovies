import { Skeleton } from '@/components/ui/skeleton';

export default function MoviesSectionSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <div className="flex flex-col gap-4 items-center" key={i}>
          <Skeleton key={i} className="w-[200px] sm:w-[456px] h-[36px] rounded-lg" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-[256px] h-[384px] rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
