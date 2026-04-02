import Skeleton from "./Skeleton";

const WeekSkeleton = () => {
  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-[40%] rounded-lg" />
        <Skeleton className="h-4 w-[60%] rounded-md" />
      </div>

      {/* Week boxes */}
      <div className="flex flex-wrap gap-3">
        {Array(10).fill(0).map((_, i) => (
          <Skeleton
            key={i}
            className="h-10 rounded-lg"
            style={{
              width: `${Math.floor(Math.random() * 60 + 80)}px`, // 🔥 random width
              animationDelay: `${i * 0.05}s`, // stagger effect
            }}
          />
        ))}
      </div>

      {/* Optional progress bars */}
      <div className="space-y-3 mt-4">
        {Array(3).fill(0).map((_, i) => (
          <Skeleton
            key={i}
            className="h-3 w-full rounded-full"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekSkeleton;