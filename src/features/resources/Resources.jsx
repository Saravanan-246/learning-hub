import React, { useState } from 'react';
import { Image, FileText, Link as LinkIcon, Download, ExternalLink } from 'lucide-react';
import daysData from '../../data/days.json';

const Resources = () => {
  const [filter, setFilter] = useState('all'); // ✅ filter state

  const allResources = (daysData?.days || []).flatMap((day) =>
    (day?.resources || []).map((resource, index) => ({
      ...resource,
      id: resource.id || `${day.day}-${index}`,
      dayNumber: day.day,
      dayTitle: day.title,
    }))
  );

  // ✅ FILTER LOGIC
  const filteredResources =
    filter === 'all'
      ? allResources
      : allResources.filter((res) => res.type === filter);

  const getResourceIcon = (type) => {
    switch (type) {
      case 'image': return Image;
      case 'pdf':
      case 'ppt': return FileText;
      case 'link': return LinkIcon;
      default: return FileText;
    }
  };

  const getResourceColor = (type) => {
    switch (type) {
      case 'image': return 'text-green-400 bg-green-400/20';
      case 'pdf': return 'text-red-400 bg-red-400/20';
      case 'ppt': return 'text-orange-400 bg-orange-400/20';
      case 'link': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-neutral-400 bg-neutral-400/20';
    }
  };

  const renderResourceAction = (resource) => {
    if (!resource?.url) return null;

    const isLink = resource.type === 'link';

    return (
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-all duration-200 text-neutral-100 text-sm hover:scale-105"
      >
        {isLink ? <ExternalLink size={14} /> : <Download size={14} />}
        {isLink ? 'Open' : 'Download'}
      </a>
    );
  };

  // ✅ FILTER BUTTON UI
  const filters = ['all', 'image', 'pdf', 'ppt', 'link'];

  return (
    <div className="min-h-screen bg-neutral-950 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-100 mb-2">Resources</h1>
          <p className="text-neutral-400">All learning materials in one place</p>
        </div>

        {/* 🔥 FILTER BAR */}
        <div className="flex flex-wrap gap-3 mb-6">
          {filters.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize
                ${
                  filter === type
                    ? 'bg-white text-black'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* CONTAINER */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">

          {/* TOP */}
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-xl font-semibold text-neutral-100">
              {filter.toUpperCase()} Resources ({filteredResources.length})
            </h2>
          </div>

          {/* LIST */}
          <div className="divide-y divide-neutral-800">
            {filteredResources.length === 0 ? (
              <p className="p-6 text-neutral-400 text-center">
                No {filter} resources found
              </p>
            ) : (
              filteredResources.map((resource) => {
                const Icon = getResourceIcon(resource.type);
                const colorClass = getResourceColor(resource.type);

                return (
                  <div
                    key={resource.id}
                    className="p-6 hover:bg-neutral-800/50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">

                      {/* LEFT */}
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                          <Icon size={20} />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-neutral-100 font-medium">
                              {resource.title || 'Untitled'}
                            </h3>
                            <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded-full">
                              Day {resource.dayNumber}
                            </span>
                          </div>

                          <p className="text-neutral-400 text-sm mb-2">
                            {resource.dayTitle}
                          </p>

                          <span className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
                            {resource.type?.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* RIGHT */}
                      {renderResourceAction(resource)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;