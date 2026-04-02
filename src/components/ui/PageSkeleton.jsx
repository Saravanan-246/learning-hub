import Skeleton from "./Skeleton";

// 🔥 helper for random widths
const randomWidth = (min = 40, max = 100) => {
  return `${Math.floor(Math.random() * (max - min) + min)}%`;
};

const PageSkeleton = () => {
  return (
    <div className="space-y-8 animate-fadeIn">

      {/* HEADER */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-[50%] rounded-lg" />
        <Skeleton className="h-4 w-[70%] rounded-md" />
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4"
          >
            {/* title */}
            <Skeleton
              className="h-5 rounded-md"
              style={{ width: randomWidth(40, 80) }}
            />

            {/* lines */}
            <Skeleton
              className="h-4 rounded-md"
              style={{ width: randomWidth(70, 100) }}
            />
            <Skeleton
              className="h-4 rounded-md"
              style={{ width: randomWidth(50, 90) }}
            />

            {/* button */}
            <Skeleton
              className="h-8 rounded-md"
              style={{ width: randomWidth(60, 100) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageSkeleton;