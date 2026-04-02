import React, { useEffect, useState, useMemo } from "react";

const STORAGE_KEY = "activity-data";

const GraphPage = () => {
  const [data, setData] = useState({});

  // ✅ LOAD DATA (MERGE BOTH SOURCES)
  useEffect(() => {
    const load = () => {
      const activity =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

      const merged = { ...activity };

      // 🔥 ALSO READ FROM day-* (fallback support)
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("day-") && key.endsWith("-completed")) {
          if (localStorage.getItem(key) === "true") {
            const today = formatDateLocal(new Date());
            merged[today] = 1;
          }
        }
      });

      setData(merged);
    };

    load();

    // 🔥 Listen for updates inside same tab also
    window.addEventListener("storage", load);

    return () => window.removeEventListener("storage", load);
  }, []);

  // ✅ LAST 30 DAYS
  const last30 = useMemo(() => {
    const arr = [];

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);

      const key = formatDateLocal(d);

      arr.push({
        key,
        value: data[key] === 1 ? 1 : 0,
      });
    }

    return arr;
  }, [data]);

  // ✅ TOTAL
  const total = useMemo(
    () => last30.reduce((sum, d) => sum + d.value, 0),
    [last30]
  );

  // ✅ CONSISTENCY
  const consistency = useMemo(
    () => Math.round((total / 30) * 100),
    [total]
  );

  // ✅ BEST
  const best = useMemo(
    () => Math.max(...last30.map((d) => d.value)),
    [last30]
  );

  // ✅ STREAK
  const streak = useMemo(() => {
    let count = 0;

    for (let i = last30.length - 1; i >= 0; i--) {
      if (last30[i].value === 1) count++;
      else break;
    }

    return count;
  }, [last30]);

  // ✅ GRAPH PATH
  const path = useMemo(() => {
    return last30
      .map((d, i) => {
        const x = (i / (last30.length - 1)) * 300;
        const y = 100 - d.value * 80;

        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  }, [last30]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-xl font-semibold mb-6">
          Productivity Insights
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card title="Active Days" value={total} />
          <Card title="Consistency" value={`${consistency}%`} />
          <Card title="Streak" value={streak} />
          <Card title="Best Day" value={best} />
        </div>

        {/* GRAPH */}
        <div className="bg-neutral-900 rounded-xl p-5">
          <p className="text-sm text-neutral-400 mb-4">
            Last 30 Days Activity
          </p>

          <svg viewBox="0 0 300 100" className="w-full h-40">
            <path
              d={path}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />

            {last30.map((d, i) => {
              const x = (i / (last30.length - 1)) * 300;
              const y = 100 - d.value * 80;

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#3b82f6"
                />
              );
            })}
          </svg>
        </div>

      </div>
    </div>
  );
};

// ✅ CARD
const Card = ({ title, value }) => (
  <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
    <p className="text-xs text-neutral-400">{title}</p>
    <h2 className="text-xl font-semibold mt-1">{value}</h2>
  </div>
);

// ✅ DATE FORMAT
const formatDateLocal = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${da}`;
};

export default GraphPage;