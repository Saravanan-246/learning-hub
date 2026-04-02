import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Link as LinkIcon, Image, CheckCircle } from 'lucide-react';

const DayCard = ({ day, onClick }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem(`day-${day?.id}-completed`) === 'true';
    setIsCompleted(completed);
  }, [day?.id]);

  const getResourceIcon = (type) => {
    switch (type) {
      case 'image': return Image;
      case 'pdf':
      case 'ppt': return FileText;
      case 'link': return LinkIcon;
      default: return FileText;
    }
  };

  const resources = day?.resources || [];
  const resourceTypes = [...new Set(resources.map(r => r.type))];

  return (
    <div
      onClick={onClick}
      className={`group relative bg-neutral-900 border rounded-2xl p-6 cursor-pointer transition-all duration-300 
      hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40
      ${isCompleted
        ? 'border-green-600 bg-gradient-to-br from-neutral-900 to-green-900/20'
        : 'border-neutral-800 hover:border-neutral-700'
      }`}
    >

      {/* 🔥 Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-xl"></div>

      <div className="relative z-10">

        {/* TOP */}
        <div className="flex items-start justify-between mb-5">

          {/* DAY CIRCLE */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md
            ${isCompleted
              ? 'bg-green-500 shadow-green-500/30'
              : 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-purple-500/30'
            }`}
          >
            <span className="text-white font-bold text-lg">
              {day?.day}
            </span>
          </div>

          {/* RESOURCE ICONS */}
          <div className="flex items-center gap-1">
            {isCompleted && (
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle size={14} className="text-white" />
              </div>
            )}

            {resourceTypes.slice(0, 3).map((type, index) => {
              const Icon = getResourceIcon(type);
              return (
                <div
                  key={index}
                  className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center"
                >
                  <Icon size={12} className="text-neutral-400" />
                </div>
              );
            })}

            {resourceTypes.length > 3 && (
              <div className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center">
                <span className="text-neutral-400 text-xs">
                  +{resourceTypes.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-semibold text-neutral-100 mb-2 tracking-tight">
          Day {day?.day}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
          {day?.title}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-neutral-500 text-sm">
            <Calendar size={14} />
            <span>{resources.length} resources</span>
          </div>

          {/* HOVER BUTTON */}
          <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200">
            <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
              <Calendar size={16} className="text-neutral-300" />
            </div>
          </div>
        </div>

        {/* COMPLETED BADGE */}
        {isCompleted && (
          <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-600 rounded-lg text-green-400 text-xs font-medium">
            <CheckCircle size={12} />
            Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCard;