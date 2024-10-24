import { Skeleton } from '@/components/ui/skeleton';
import { Heart } from 'lucide-react';

export default function OverviewSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="w-full h-[211px]" />
          <Skeleton className="w-full h-[211px]" />
          <Skeleton className="w-full h-[211px]" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center text-xl">
            <Heart className="mr-2 text-red-500" size={24} fill="#ef4444" />
            <h1>Liked</h1>
          </div>
          <Skeleton className="w-full h-[300px]" />
        </div>
      </div>
    </div>
  );
}
