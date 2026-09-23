import React from 'react';
import { Award } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { HUB_PODS, HUB_STRUCTURE } from '../data/campaign';

export const PhaseTwoSection: React.FC = () => {
  return (
    <section id="phase-2" className="w-full py-16 sm:py-24 border-t border-[#D7E0F5] bg-[#EEF2FC]/50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SectionHeading index="03" title="Hub Week" note="Days 1–5, per campus" />

        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-[#7178A0] mb-2">Full-service hubs</div>
          <p className="text-base text-[#333D66] leading-relaxed">{HUB_STRUCTURE}</p>
        </div>

        <div className="mt-4 text-sm text-[#7178A0] italic font-display">
          Every pod teaches the concept before processing any sign-up.
        </div>

        {/* Pod flow diagram */}
        <ol className="mt-12 relative border-l border-[#0B1330]/15 pl-8 space-y-10">
          {HUB_PODS.map((pod) => (
            <li key={pod.id} className="relative">
              <span
                className={`absolute -left-[41px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono ${
                  pod.isExitPoint
                    ? 'bg-[#2F3AE4] text-[#FFFFFF]'
                    : 'bg-[#FFFFFF] border border-[#0B1330]/30 text-[#0B1330]'
                }`}
              >
                {pod.step}
              </span>

              <div className="flex items-center gap-2">
                <h3 className="text-lg font-display font-semibold text-[#0B1330]">{pod.name}</h3>
                {pod.isExitPoint && (
                  <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#2F3AE4]">
                    <Award className="w-3 h-3" /> Exit point
                  </span>
                )}
              </div>

              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3">
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-wider text-[#7178A0]">Teach</dt>
                  <dd className="mt-1 text-sm text-[#333D66] leading-relaxed">{pod.teach}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-wider text-[#7178A0]">Show</dt>
                  <dd className="mt-1 text-sm text-[#333D66] leading-relaxed">{pod.show}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-wider text-[#7178A0]">Do</dt>
                  <dd className="mt-1 text-sm text-[#333D66] leading-relaxed">{pod.doAction}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
