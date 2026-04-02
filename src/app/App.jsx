import React, { useState, useMemo, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar.jsx";
import Navbar from "../components/layout/Navbar.jsx";

import Dashboard from "../features/dashboard/Dashboard.jsx";
import Resources from "../features/resources/Resources.jsx";
import WeekList from "../features/weeks/WeekList.jsx";
import WeekPage from "../features/weeks/WeekPage.jsx";
import TrackPage from "../features/track/TrackPage.jsx";

import PageSkeleton from "../components/ui/PageSkeleton.jsx";

const App = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleNavigation = (item) => {
    setLoading(true); // 🔥 start loading
    setActiveItem(item);
    setSelectedWeek(null);
  };

  // 🔥 handle loading delay (simulate smooth transition)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // smooth feel (not too long)

    return () => clearTimeout(timer);
  }, [activeItem, selectedWeek]);

  const renderPage = useMemo(() => {
    if (selectedWeek) {
      return (
        <WeekPage
          weekId={selectedWeek}
          onBack={() => setSelectedWeek(null)}
        />
      );
    }

    switch (activeItem) {
      case "weeks":
        return <WeekList />;

      case "resources":
        return <Resources />;

      case "track":
        return <TrackPage />;

      case "dashboard":
      default:
        return <Dashboard onWeekSelect={setSelectedWeek} />;
    }
  }, [activeItem, selectedWeek]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      
      <Navbar
        onToggleSidebar={handleSidebarToggle}
        activeItem={activeItem}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      <Sidebar
        activeItem={activeItem}
        onItemChange={handleNavigation}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
      />

      <div
        className={`
          pt-16 transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          
          {/* 🔥 MAIN MAGIC */}
          {loading ? <PageSkeleton /> : renderPage}

        </main>
      </div>
    </div>
  );
};

export default App;