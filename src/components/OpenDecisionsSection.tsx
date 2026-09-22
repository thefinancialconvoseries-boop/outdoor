import React from 'react';
import { SectionHeading } from './SectionHeading';
import { OPEN_DECISIONS } from '../data/campaign';

export const OpenDecisionsSection: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 border-t border-[#E4DAC4] bg-[#F1EAD9]/50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SectionHeading index="05" eyebrow="Status" title="Open Decisions" />

        <div className="divide-y divide-[#E4DAC4] border-y border-[#E4DAC4]">
          {OPEN_DECISIONS.map((decision) => (
            <div key={decision.id} className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6">
              <div className="sm:w-16 flex-shrink-0">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider ${
                    decision.status === 'tbd' ? 'text-[#BE5A29]' : 'text-[#2E4F73]'
                  }`}
                >
                  {decision.status === 'tbd' ? 'TBD' : 'Set'}
                </span>
              </div>
              <div className="sm:w-56 flex-shrink-0 text-sm font-medium text-[#221F1A]">{decision.label}</div>
              <p className="text-sm text-[#6B6558] leading-relaxed">{decision.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
