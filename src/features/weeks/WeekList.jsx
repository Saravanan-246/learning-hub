import React, { useState, useEffect } from "react";
import { Calendar, CheckCircle, ChevronRight } from "lucide-react";
import WeekPage from "./WeekPage.jsx";
import daysData from "../../data/days.json";
import WeekSkeleton from "../../components/ui/WeekSkeleton";

const WeekList = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  // 🔥 LOADING EFFECT
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setAnimate(true);
    }, 800); // smooth timing

    return () => clearTimeout(t);
  }, []);

  // ✅ SAFE DATA
  const days = Array.isArray(daysData?.days) ? daysData.days : [];

  // 🔥 OPEN WEEK PAGE
  if (selectedWeek) {
    return (
      <WeekPage
        weekId={selectedWeek}
        onBack={() => setSelectedWeek(null)}
      />
    );
  }

  // 🔥 SKELETON
  if (loading) return <WeekSkeleton />;

  // 🔥 GROUP INTO WEEKS
  const weeks = [];
  for (let i = 0; i < days.length; i += 5) {
    const chunk = days.slice(i, i + 5);

    const completed = chunk.filter(
      (d) => localStorage.getItem(`day-${d.id}-completed`) === "true"
    ).length;

    const progress = chunk.length
      ? Math.round((completed / chunk.length) * 100)
      : 0;

    weeks.push({
      id: i / 5 + 1,
      days: chunk,
      completed,
      progress,
    });
  }

  return (
    <div
      className={`pt-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-all duration-500 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >

      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">Weeks</h1>
        <p className="text-neutral-400 text-sm">
          Track your weekly progress
        </p>
      </div>

      {/* EMPTY STATE */}
      {weeks.length === 0 ? (
        <div className="text-center text-neutral-500 mt-20">
          No data found. Please check your days.json file.
        </div>
      ) : (
        <div className="space-y-4">
          {weeks.map((week, i) => (
            <div
              key={week.id}
              onClick={() => setSelectedWeek(week.id)}
              style={{ animationDelay: `${i * 0.05}s` }} // 🔥 stagger
              className="group bg-neutral-900 border border-neutral-800 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/60 hover:scale-[1.01]"
            >
              {/* TOP */}
              <div className="flex items-center justify-between mb-3">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center">
                    <Calendar size={16} className="text-blue-400" />
                  </div>

                  <div>
                    <h3 className="text-white text-sm font-semibold">
                      Week {week.id}
                    </h3>
                    <p className="text-neutral-400 text-xs">
                      {week.completed}/{week.days.length} completed
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2">
                  {week.progress === 100 && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                  <ChevronRight
                    size={16}
                    className="text-neutral-500 group-hover:text-white transition"
                  />
                </div>
              </div>

              {/* PROGRESS */}
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-700 ease-out"
                  style={{ width: `${week.progress}%` }}
                />
              </div>

              {/* FOOTER */}
              <div className="mt-2 flex justify-between text-[11px] text-neutral-500">
                <span>{week.days.length} days</span>
                <span>{week.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeekList;