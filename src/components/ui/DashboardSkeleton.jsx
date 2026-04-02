import Skeleton from "./Skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-fadeIn">

      {/* 🔥 HEADER */}
      <div className="space-y-3">
        <Skeleton className="h-9 w-48 rounded-xl" />
        <Skeleton className="h-4 w-72 rounded-md" />
      </div>

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3).fill(0).map((_, i) => (
          <div
            key={i}
            className="relative bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl p-6 overflow-hidden"
          >
            {/* shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />

            <div className="space-y-4 relative z-10">
              {/* icon + % */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-md" />
              </div>

              {/* title */}
              <Skeleton className="h-5 w-32 rounded-md" />

              {/* subtitle */}
              <Skeleton className="h-4 w-40 rounded-md" />

              {/* progress */}
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 WEEKS SECTION */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-44 rounded-md" />

        <div className="flex flex-wrap gap-3">
          {Array(8).fill(0).map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg"
            >
              <Skeleton className="h-9 w-24 rounded-lg" />

              {/* shimmer */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;