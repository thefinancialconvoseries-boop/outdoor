import React from 'react';
import { Award } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { HUB_PODS, HUB_STRUCTURE } from '../data/campaign';

export const PhaseTwoSection: React.FC = () => {
  return (
    <section id="phase-2" className="w-full py-16 sm:py-24 border-t border-[#E4DAC4] bg-[#F1EAD9]/50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SectionHeading index="03" eyebrow="Phase 2" title="Hub Week" note="Days 1–5, per campus" />

        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8A8373] mb-2">Full-service hubs</div>
          <p className="text-base text-[#4A453B] leading-relaxed">{HUB_STRUCTURE}</p>
        </div>

        <div className="mt-4 text-sm text-[#8A8373] italic font-display">
          Every pod teaches the concept before processing any sign-up.
        </div>

        {/* Pod flow diagram */}
        <ol className="mt-12 relative border-l border-[#221F1A]/15 pl-8 space-y-10">
          {HUB_PODS.map((pod) => (
            <li key={pod.id} className="relative">
              <span
                className={`absolute -left-[41px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono ${
                  pod.isExitPoint
                    ? 'bg-[#221F1A] text-[#FBF8F2]'
                    : 'bg-[#FBF8F2] border border-[#221F1A]/30 text-[#221F1A]'
                }`}
              >
                {pod.step}
              </span>

              <div className="flex items-center gap-2">
                <h3 className="text-lg font-display font-semibold text-[#221F1A]">{pod.name}</h3>
                {pod.isExitPoint && (
                  <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#BE5A29]">
                    <Award className="w-3 h-3" /> Exit point
                  </span>
                )}
              </div>

              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3">
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-wider text-[#8A8373]">Teach</dt>
                  <dd className="mt-1 text-sm text-[#4A453B] leading-relaxed">{pod.teach}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-wider text-[#8A8373]">Show</dt>
                  <dd className="mt-1 text-sm text-[#4A453B] leading-relaxed">{pod.show}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-mono uppercase tracking-wider text-[#8A8373]">Do</dt>
                  <dd className="mt-1 text-sm text-[#4A453B] leading-relaxed">{pod.doAction}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
