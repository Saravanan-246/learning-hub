import React from 'react';

const Card = ({
  children,
  className = '',
  onClick,
  variant = 'default', // default | glass | outline
  padding = 'md', // sm | md | lg
}) => {

  // ✅ Variants
  const variants = {
    default: 'bg-neutral-900 border border-neutral-800',
    glass: 'bg-white/5 backdrop-blur border border-white/10',
    outline: 'bg-transparent border border-neutral-700',
  };

  // ✅ Padding sizes
  const paddings = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  // ✅ Clickable effect
  const clickable = onClick
    ? 'cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 active:scale-[0.98] transition-all duration-300'
    : '';

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl
        ${variants[variant]}
        ${paddings[padding]}
        ${clickable}
        ${className}
      `}
    >
      {/* 🔥 subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition duration-300 pointer-events-none"></div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;