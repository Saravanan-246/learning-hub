import React, { useEffect, useState } from "react";
import Skeleton from "../../components/ui/Skeleton";

const DayDetail = ({ day, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  const [isCompleted, setIsCompleted] = useState(
    localStorage.getItem(`day-${day.id}-completed`) === "true"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setAnimate(true);
    }, 1000); // ✅ clean timing

    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    localStorage.setItem(`day-${day.id}-completed`, newState);
  };

  const grouped = (day.resources || []).reduce((acc, r) => {
    let key = "General";
    const title = r.title.toLowerCase();

    if (title.includes("data structures")) key = "Data Structures";
    else if (title.includes("array")) key = "Arrays";

    if (!acc[key]) acc[key] = [];
    acc[key].push(r);

    return acc;
  }, {});

  // 🔥 MATCHED SKELETON
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-8">

          {/* HEADER */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>

          {/* TOPIC SECTION */}
          {Array(2).fill(0).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 space-y-5"
            >
              {/* topic header */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>

              {/* cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {Array(4).fill(0).map((_, j) => (
                  <div
                    key={j}
                    className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3"
                  >
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-8 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-neutral-950 text-white transition-all duration-500 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="mx-auto max-w-5xl px-4 py-6">

        {/* HEADER */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
          <button
            onClick={onBack}
            className="mb-4 text-sm text-neutral-400 hover:text-white"
          >
            ← Back
          </button>

          <span className="text-xs text-blue-300">Day {day.day}</span>
          <h1 className="text-2xl font-semibold mt-2">{day.title}</h1>

          <button
            onClick={toggle}
            className={`mt-4 px-4 py-2 rounded-xl ${
              isCompleted ? "bg-green-500" : "bg-blue-600"
            }`}
          >
            {isCompleted ? "Completed" : "Mark as Done"}
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-6">
          {Object.entries(grouped).map(([topic, items]) => (
            <div key={topic}>
              <h2 className="text-lg font-semibold mb-3">{topic}</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {items.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800"
                  >
                    {r.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DayDetail;