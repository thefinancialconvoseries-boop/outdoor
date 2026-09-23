import React from 'react';
import { SectionHeading } from './SectionHeading';
import {
  CAMPUSES,
  HUB_WEEK_DAYS,
  SENSITIZATION_DAYS_MAX,
  SENSITIZATION_DAYS_MIN,
} from '../data/campaign';

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="w-full py-16 sm:py-24 border-t border-[#D7E0F5]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SectionHeading index="04" title="Campus Timeline" />

        <p className="max-w-2xl text-base text-[#333D66] leading-relaxed">
          Sensitization runs immediately before Hub Week, back-to-back, at the same campus — one continuous{' '}
          {SENSITIZATION_DAYS_MIN + HUB_WEEK_DAYS}–{SENSITIZATION_DAYS_MAX + HUB_WEEK_DAYS}-day on-site block before
          the team moves to the next campus.
        </p>

        <div className="mt-12 space-y-5">
          {CAMPUSES.map((campus) => (
            <div key={campus.id} className="flex items-center gap-4 sm:gap-6">
              <div className="w-8 flex-shrink-0 text-xs font-mono text-[#2F3AE4]">0{campus.order}</div>
              <div className="w-28 sm:w-44 flex-shrink-0 text-sm font-medium text-[#0B1330]">{campus.name}</div>
              <div className="flex-1 flex h-3 rounded-full overflow-hidden bg-[#EEF2FC]">
                <div className="bg-[#8B97F0]" style={{ flexBasis: '40%' }} />
                <div className="bg-[#1B2A6B]" style={{ flexBasis: '60%' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-6 text-xs text-[#7178A0]">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#8B97F0] inline-block" />
            Sensitization ({SENSITIZATION_DAYS_MIN}–{SENSITIZATION_DAYS_MAX} days)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#1B2A6B] inline-block" />
            Hub Week ({HUB_WEEK_DAYS} days)
          </span>
        </div>
      </div>
    </section>
  );
};
