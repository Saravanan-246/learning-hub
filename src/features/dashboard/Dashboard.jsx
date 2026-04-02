import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  CheckCircle,
  Target,
  Activity,
} from "lucide-react";
import daysData from "../../data/days.json";
import DashboardSkeleton from "../../components/ui/DashboardSkeleton";

const Dashboard = ({ onWeekSelect }) => {
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setAnimate(true);
    }, 700); // smooth realistic loading

    return () => clearTimeout(timer);
  }, []);

  const days = daysData?.days || [];

  const totalDays = days.length;

  const completedDays = days.filter(
    (day) => localStorage.getItem(`day-${day.id}-completed`) === "true"
  ).length;

  const completionPercentage = totalDays
    ? Math.round((completedDays / totalDays) * 100)
    : 0;

  const nextIncompleteDay = days.find(
    (day) => localStorage.getItem(`day-${day.id}-completed`) !== "true"
  );

  const lastCompletedDay = [...days]
    .reverse()
    .find(
      (day) => localStorage.getItem(`day-${day.id}-completed`) === "true"
    );

  const weeks = [];
  for (let i = 0; i < days.length; i += 5) {
    const chunk = days.slice(i, i + 5);

    weeks.push({
      id: i / 5 + 1,
      days: chunk,
      completed: chunk.filter(
        (d) => localStorage.getItem(`day-${d.id}-completed`) === "true"
      ).length,
    });
  }

  // 🔥 SHOW SKELETON
  if (loading) return <DashboardSkeleton />;

  return (
    <div
      className={`pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-500 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-neutral-400">Track your learning progress</p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:scale-[1.02] transition">
          <div className="flex justify-between mb-4">
            <TrendingUp className="text-blue-400" />
            <span className="text-2xl font-bold text-blue-400">
              {completionPercentage}%
            </span>
          </div>

          <h3 className="text-white font-semibold">Overall Progress</h3>
          <p className="text-neutral-400 text-sm mb-4">
            {completedDays}/{totalDays}
          </p>

          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-700"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <Target className="text-orange-400 mb-3" />
          <h3 className="text-white font-semibold">Today's Focus</h3>

          {nextIncompleteDay ? (
            <div className="bg-neutral-800 p-3 rounded-lg mt-3 flex justify-between">
              <span className="text-sm text-white">
                Day {nextIncompleteDay.day}
              </span>

              <button
                onClick={() =>
                  onWeekSelect(Math.ceil(nextIncompleteDay.day / 5))
                }
                className="bg-orange-500 px-3 py-1 text-xs rounded-md"
              >
                Start
              </button>
            </div>
          ) : (
            <p className="text-green-400 mt-3">Done 🎉</p>
          )}
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
          <Activity className="text-green-400 mb-3" />
          <h3 className="text-white font-semibold">Recent Activity</h3>

          {lastCompletedDay ? (
            <p className="text-sm text-white mt-3">
              Day {lastCompletedDay.day}
            </p>
          ) : (
            <p className="text-neutral-400 mt-3">No activity</p>
          )}
        </div>
      </div>

      {/* WEEKS */}
      <h2 className="text-lg font-semibold text-white mb-4">
        Learning Weeks
      </h2>

      <div className="flex flex-wrap gap-3">
        {weeks.map((week) => {
          const progress = Math.round(
            (week.completed / week.days.length) * 100
          );

          return (
            <button
              key={week.id}
              onClick={() => onWeekSelect(week.id)}
              className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm"
            >
              Week {week.id} ({progress}%)
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;