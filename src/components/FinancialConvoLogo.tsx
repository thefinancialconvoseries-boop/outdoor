import React from 'react';

interface FinancialConvoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  variant?: 'full' | 'mark-only' | 'horizontal';
  animated?: boolean;
  className?: string;
  showTagline?: boolean;
  taglineText?: string;
}

export const FinancialConvoLogo: React.FC<FinancialConvoLogoProps> = ({
  size = 'md',
  variant = 'full',
  animated = false,
  className = '',
  showTagline = true,
  taglineText = 'Learn. Build. Earn.',
}) => {
  // Dimensions
  const emblemSizes = {
    sm: 36,
    md: 52,
    lg: 84,
    hero: 120,
  };

  const emblemSize = emblemSizes[size] || 52;

  return (
    <div
      className={`inline-flex items-center select-none ${
        variant === 'full' ? 'flex-col text-center' : 'flex-row items-center gap-3'
      } ${className}`}
    >
      {/* Brand Emblem */}
      <div className="relative flex items-center justify-center">
        {animated && (
          <div
            className="absolute inset-0 rounded-full bg-[#0066FF]/25 blur-xl animate-pulse pointer-events-none"
            style={{ width: emblemSize * 1.4, height: emblemSize * 1.4 }}
          />
        )}
        <svg
          width={emblemSize}
          height={emblemSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-700 hover:scale-105"
        >
          <defs>
            {/* Blue and Sky Gradients */}
            <linearGradient id="fcGradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#0047B3" />
            </linearGradient>
            <linearGradient id="fcGradientAccent" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <filter id="subtleDrop" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0066FF" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Outer circle subtle border */}
          <circle cx="50" cy="50" r="47" stroke="#0066FF" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="3 3" />
          
          {/* Inner solid circular backdrop */}
          <circle cx="50" cy="50" r="43" fill="#07172C" />

          {/* Interlocking Financial Dialogue Arcs (Speech bubbles meeting financial growth loop) */}
          {/* Arc 1: Left speech curve */}
          <path
            d="M32 62C24 55 24 41 32 33C40 25 54 25 61 32"
            stroke="url(#fcGradientPrimary)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#subtleDrop)"
          />
          {/* Arc 2: Right speech curve with dialogue tail */}
          <path
            d="M68 38C76 45 76 59 68 67C60 75 46 75 39 68"
            stroke="url(#fcGradientAccent)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          
          {/* Dialogue Tail Pointer */}
          <path
            d="M68 67L74 74L63 71"
            fill="url(#fcGradientAccent)"
            stroke="url(#fcGradientAccent)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Center Upward Rising Financial Bar & Node (Growth / Build / Earn) */}
          <rect x="42" y="47" width="4" height="15" rx="2" fill="#38BDF8" />
          <rect x="48" y="41" width="4" height="21" rx="2" fill="#60A5FA" />
          <rect x="54" y="35" width="4" height="27" rx="2" fill="#FFFFFF" />

          {/* Rising Arrowhead / Chevron above bars */}
          <path
            d="M44 33L50 27L56 33"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {variant !== 'mark-only' && (
        <div className={variant === 'full' ? 'mt-3' : 'text-left'}>
          <div
            className={`font-semibold tracking-[0.25em] text-white uppercase font-cinematic ${
              size === 'sm'
                ? 'text-xs'
                : size === 'md'
                ? 'text-sm sm:text-base'
                : size === 'lg'
                ? 'text-lg sm:text-2xl'
                : 'text-2xl sm:text-3xl tracking-[0.3em]'
            }`}
          >
            THE FINANCIAL CONVO
          </div>

          {showTagline && (
            <div
              className={`text-[#38BDF8] tracking-[0.35em] uppercase font-light transition-all ${
                size === 'sm'
                  ? 'text-[9px] mt-0.5'
                  : size === 'md'
                  ? 'text-[11px] mt-1'
                  : size === 'lg'
                  ? 'text-xs sm:text-sm mt-1.5'
                  : 'text-sm sm:text-base mt-2 tracking-[0.4em]'
              }`}
            >
              {taglineText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
