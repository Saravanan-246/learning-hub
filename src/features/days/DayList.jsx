import React, { useState, useMemo } from "react";
import DayCard from "../../components/ui/DayCard.jsx";
import DayDetail from "./DayDetail.jsx";
import daysData from "../../data/days.json";

const DayList = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [search, setSearch] = useState("");

  const days = daysData?.days || [];

  const filteredDays = useMemo(() => {
    return days.filter((day) =>
      day.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, days]);

  const completedCount = days.filter(
    (day) => localStorage.getItem(`day-${day.id}-completed`) === "true"
  ).length;

  const progress = Math.round((completedCount / (days.length || 1)) * 100);

  if (selectedDay) {
    return (
      <DayDetail
        day={selectedDay}
        onBack={() => setSelectedDay(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top hero section */}
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
              DSA Learning Tracker
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Learning Days
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-400 sm:text-base">
              Track your daily learning progress, search topics quickly, and
              continue from where you stopped.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-xs text-neutral-500">Total Days</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {days.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-xs text-neutral-500">Completed</p>
                <p className="mt-1 text-lg font-semibold text-emerald-400">
                  {completedCount}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-xs text-neutral-500">Remaining</p>
                <p className="mt-1 text-lg font-semibold text-orange-300">
                  {Math.max(days.length - completedCount, 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress card */}
          <div className="rounded-3xl border border-white/10 bg-neutral-900/80 p-6 shadow-xl shadow-black/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Overall Progress</p>
                <p className="mt-1 text-xs text-neutral-500">
                  Keep consistency every day
                </p>
              </div>

              <div className="rounded-2xl bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-300 border border-blue-500/20">
                {progress}%
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs text-neutral-400">
                <span>{completedCount} completed</span>
                <span>{days.length} total</span>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Status
              </p>
              <p className="mt-2 text-sm text-neutral-300">
                {progress === 100
                  ? "All learning days completed. Great work."
                  : progress >= 50
                  ? "Nice progress. Keep pushing daily."
                  : "You are getting started. Stay consistent."}
              </p>
            </div>
          </div>
        </div>

        {/* Search toolbar */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-neutral-900/70 p-4 shadow-lg shadow-black/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Browse learning days
              </h2>
              <p className="mt-1 text-xs text-neutral-500">
                Search topics and open any day card
              </p>
            </div>

            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search topics, arrays, structures..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-neutral-950/80 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Section title */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {search ? "Search Results" : "All Learning Days"}
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              {filteredDays.length} day{filteredDays.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>

        {/* Grid / Empty */}
        {filteredDays.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-neutral-900/40 px-6 py-16 text-center">
            <div className="mx-auto max-w-md">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                🔍
              </div>
              <h3 className="text-lg font-semibold text-white">
                No results found
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Try a different keyword or search with a shorter topic name.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredDays.map((day) => (
              <DayCard
                key={day.id}
                day={day}
                onClick={() => setSelectedDay(day)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DayList;
