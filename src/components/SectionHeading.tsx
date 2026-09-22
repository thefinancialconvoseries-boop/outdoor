import React from 'react';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  note?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ index, eyebrow, title, note }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
      <div className="flex items-start gap-4">
        <span className="font-display text-4xl sm:text-5xl text-[#E4DAC4] leading-none select-none">{index}</span>
        <div className="pt-1">
          <div className="text-xs font-mono tracking-[0.2em] uppercase text-[#BE5A29]">{eyebrow}</div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-display font-semibold text-[#221F1A]">{title}</h2>
        </div>
      </div>
      {note && <div className="text-sm text-[#8A8373] sm:pb-1">{note}</div>}
    </div>
  );
};
