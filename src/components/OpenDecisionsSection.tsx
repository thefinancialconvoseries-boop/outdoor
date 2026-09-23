import React from 'react';
import { SectionHeading } from './SectionHeading';
import { OPEN_DECISIONS } from '../data/campaign';

export const OpenDecisionsSection: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 border-t border-[#D7E0F5] bg-[#EEF2FC]/50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SectionHeading index="05" title="Open Decisions" />

        <div className="divide-y divide-[#D7E0F5] border-y border-[#D7E0F5]">
          {OPEN_DECISIONS.map((decision) => (
            <div key={decision.id} className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-6">
              <div className="sm:w-16 flex-shrink-0">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider ${
                    decision.status === 'tbd' ? 'text-[#2F3AE4]' : 'text-[#1B2A6B]'
                  }`}
                >
                  {decision.status === 'tbd' ? 'TBD' : 'Set'}
                </span>
              </div>
              <div className="sm:w-56 flex-shrink-0 text-sm font-medium text-[#0B1330]">{decision.label}</div>
              <p className="text-sm text-[#4C5578] leading-relaxed">{decision.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
