import React, { useState } from "react";
import { Calendar, CheckCircle, ArrowLeft } from "lucide-react";
import daysData from "../../data/days.json";

const WeekPage = ({ weekId, onBack }) => {
  const days = daysData?.days || [];

  const weekIndex = parseInt(weekId) - 1;
  const startIndex = weekIndex * 5;
  const weekDays = days.slice(startIndex, startIndex + 5);

  const [selectedDay, setSelectedDay] = useState(null);

  if (selectedDay) {
    return (
      <DayDetail
        day={selectedDay}
        onBack={() => setSelectedDay(null)}
      />
    );
  }

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* BACK */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Week {weekId}
        </h1>
        <p className="text-neutral-400 text-sm">
          Days {startIndex + 1} –{" "}
          {Math.min(startIndex + 5, days.length)}
        </p>
      </div>

      {/* DAY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {weekDays.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            onClick={() => setSelectedDay(day)}
          />
        ))}
      </div>
    </div>
  );
};

const DayCard = ({ day, onClick }) => {
  const isCompleted =
    localStorage.getItem(`day-${day.id}-completed`) === "true";

  return (
    <div
      onClick={onClick}
      className={`group bg-neutral-900 border rounded-xl p-5 cursor-pointer transition-all duration-200 hover:border-neutral-600 hover:bg-neutral-800/60 ${
        isCompleted ? "border-green-600" : "border-neutral-800"
      }`}
    >
      {/* TOP */}
      <div className="flex justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${
            isCompleted
              ? "bg-green-500"
              : "bg-neutral-800 text-white"
          }`}
        >
          {day.day}
        </div>

        {isCompleted && (
          <CheckCircle className="text-green-500" size={18} />
        )}
      </div>

      {/* TITLE */}
      <h3 className="text-white font-semibold mb-1">
        Day {day.day}
      </h3>

      <p className="text-neutral-400 text-sm mb-3 line-clamp-2">
        {day.title}
      </p>

      {/* FOOTER */}
      <div className="flex items-center gap-2 text-neutral-500 text-xs">
        <Calendar size={12} />
        {(day.resources || []).length} items
      </div>
    </div>
  );
};

const DayDetail = ({ day, onBack }) => {
  const [isCompleted, setIsCompleted] = useState(
    localStorage.getItem(`day-${day.id}-completed`) === "true"
  );

  const toggle = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    localStorage.setItem(`day-${day.id}-completed`, newState);
  };

  const grouped = (day.resources || []).reduce((acc, r) => {
    acc[r.type] = acc[r.type] || [];
    acc[r.type].push(r);
    return acc;
  }, {});

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">

      {/* BACK */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* HEADER */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Day {day.day}
          </h1>
          <p className="text-neutral-400">{day.title}</p>
        </div>

        <button
          onClick={toggle}
          className={`px-4 py-2 rounded-lg text-sm transition ${
            isCompleted
              ? "bg-green-600 text-white"
              : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
          }`}
        >
          {isCompleted ? "Completed" : "Mark Done"}
        </button>
      </div>

      {/* RESOURCES */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type}>
            <h3 className="text-neutral-300 font-semibold mb-3 capitalize">
              {type}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((r) => (
                <div
                  key={r.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-600 transition"
                >
                  {r.type === "image" && (
                    <img
                      src={r.url}
                      alt={r.title}
                      className="rounded-lg mb-2 h-40 w-full object-cover"
                    />
                  )}

                  <p className="text-sm text-white mb-2">{r.title}</p>

                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Open
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekPage;