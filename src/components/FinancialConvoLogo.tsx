import React from 'react';
import logoMark from '../assets/images/logo-mark.png';

interface FinancialConvoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  variant?: 'full' | 'mark-only' | 'horizontal';
  className?: string;
  showTagline?: boolean;
  taglineText?: string;
}

export const FinancialConvoLogo: React.FC<FinancialConvoLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  showTagline = true,
  taglineText = 'Learn. Build. Earn.',
}) => {
  const emblemSizes = { sm: 30, md: 40, lg: 64, hero: 96 };
  const emblemSize = emblemSizes[size] || 40;

  return (
    <div
      className={`inline-flex items-center select-none ${
        variant === 'full' ? 'flex-col text-center' : 'flex-row items-center gap-3'
      } ${className}`}
    >
      <img
        src={logoMark}
        alt="Financial Convo"
        width={emblemSize}
        height={emblemSize}
        className="flex-shrink-0 object-contain"
        style={{ width: emblemSize, height: emblemSize }}
      />

      {variant !== 'mark-only' && (
        <div className={variant === 'full' ? 'mt-3' : 'text-left'}>
          <div
            className={`font-display font-semibold tracking-wide text-[#0B1330] ${
              size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base sm:text-lg' : size === 'lg' ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            Financial Convo
          </div>

          {showTagline && (
            <div
              className={`text-[#2F3AE4] tracking-[0.2em] uppercase font-mono ${
                size === 'sm' ? 'text-[9px] mt-0.5' : size === 'md' ? 'text-[10px] mt-0.5' : 'text-xs mt-1'
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
