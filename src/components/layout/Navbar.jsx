import React, { useState, useEffect, useRef } from "react";
import { User, ChevronDown, Pencil, Menu } from "lucide-react";

const Navbar = ({
  onToggleSidebar,
  activeItem = "dashboard",
  isSidebarCollapsed,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("User");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("learningHubUserName");
    if (saved) {
      setUserName(saved);
      setTempName(saved);
    }
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const saveName = () => {
    if (!tempName.trim()) return;
    setUserName(tempName.trim());
    localStorage.setItem("learningHubUserName", tempName.trim());
    setIsEditing(false);
  };

  return (
    <div
      className={`
        fixed top-3 z-50 transition-all duration-300
        ${isSidebarCollapsed ? "lg:left-24" : "lg:left-72"}
        left-3 right-3
      `}
    >
      <div className="bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-xl px-4 py-2 flex items-center justify-between shadow-lg">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-800"
          >
            <Menu size={18} className="text-neutral-200" />
          </button>

          <h1 className="text-sm font-semibold text-white capitalize">
            {activeItem}
          </h1>
        </div>

        {/* RIGHT */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-neutral-800"
          >
            <div className="w-7 h-7 bg-neutral-800 rounded-full flex items-center justify-center">
              <User size={14} className="text-neutral-300" />
            </div>

            <span className="hidden md:block text-xs text-neutral-200">
              {userName}
            </span>

            <ChevronDown
              size={14}
              className={`text-neutral-400 transition ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl p-3 shadow-xl">
              {!isEditing ? (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-neutral-200">{userName}</span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 rounded hover:bg-neutral-800"
                  >
                    <Pencil size={12} className="text-neutral-400" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    autoFocus
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveName();
                    }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveName}
                      className="flex-1 bg-neutral-700 text-white text-xs py-1 rounded hover:bg-neutral-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-neutral-800 text-neutral-300 text-xs py-1 rounded hover:bg-neutral-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;