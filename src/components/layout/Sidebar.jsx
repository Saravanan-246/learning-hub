import React from "react";
import {
  LayoutDashboard,
  CalendarDays,
  FolderKanban,
  Activity, // 🔥 Track icon
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({
  activeItem,
  onItemChange,
  isCollapsed,
  onToggleCollapse,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "weeks", label: "Weeks", icon: CalendarDays },
    { id: "resources", label: "Resources", icon: FolderKanban },
    { id: "track", label: "Track", icon: Activity }, // ✅ NEW
  ];

  return (
    <>
      {/* 🔥 MOBILE OVERLAY */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onToggleCollapse}
        />
      )}

      {/* 🔥 SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50
          bg-neutral-950 border-r border-neutral-800
          transition-all duration-300 ease-in-out

          ${isCollapsed ? "w-20" : "w-64"}

          ${
            isCollapsed
              ? "translate-x-[-100%] lg:translate-x-0"
              : "translate-x-0"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-3 h-14 border-b border-neutral-800">
          {!isCollapsed && (
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Menu
            </span>
          )}

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* NAV */}
        <nav className="mt-3 px-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <div key={item.id} className="relative group">
                
                {/* 🔥 ACTIVE BAR */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-blue-500 rounded-r-full" />
                )}

                <button
                  onClick={() => {
                    onItemChange(item.id);
                    if (window.innerWidth < 1024) {
                      onToggleCollapse();
                    }
                  }}
                  className={`
                    w-full flex items-center gap-3 rounded-lg
                    transition-all duration-200 relative

                    ${
                      isActive
                        ? "bg-neutral-800 text-white shadow-md shadow-black/30"
                        : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                    }

                    ${isCollapsed ? "justify-center py-3" : "px-3 py-2.5"}
                  `}
                >
                  {/* ICON */}
                  <Icon
                    size={18}
                    className={`
                      transition-all duration-200
                      ${isActive ? "scale-110 text-blue-400" : "group-hover:scale-105"}
                    `}
                  />

                  {/* LABEL */}
                  {!isCollapsed && (
                    <span className="text-sm font-medium tracking-wide">
                      {item.label}
                    </span>
                  )}
                </button>

                {/* 🔥 TOOLTIP (collapsed) */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs bg-neutral-800 text-white rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 🔥 FOOTER */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-0 w-full px-3">
            <div className="text-xs text-neutral-500 text-center">
              Learning Hub  
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;