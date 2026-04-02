import Skeleton from "./Skeleton";

const DayCardSkeleton = () => {
  return (
    <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-8 w-full rounded-lg" />
    </div>
  );
};

export default DayCardSkeleton;