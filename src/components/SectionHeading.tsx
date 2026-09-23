import React from 'react';

interface SectionHeadingProps {
  index: string;
  title: string;
  note?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ index, title, note }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
      <div className="flex items-start gap-4">
        <span className="font-display text-4xl sm:text-5xl text-[#D7E0F5] leading-none select-none">{index}</span>
        <h2 className="pt-1 text-2xl sm:text-3xl font-display font-semibold text-[#0B1330]">{title}</h2>
      </div>
      {note && <div className="text-sm text-[#7178A0] sm:pb-1">{note}</div>}
    </div>
  );
};
