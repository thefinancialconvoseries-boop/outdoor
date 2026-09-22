import React from 'react';
import { SectionHeading } from './SectionHeading';
import { CONNECTIVE_TISSUE_STEPS, DELIVERY_CHANNELS, SENSITIZATION_CORE_MESSAGE } from '../data/campaign';

export const PhaseOneSection: React.FC = () => {
  return (
    <section id="phase-1" className="w-full py-16 sm:py-24 border-t border-[#E4DAC4]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Phase 1"
          title="Sensitization Drive"
          note="A week or two ahead of Hub Week, same campus"
        />

        <p className="text-base text-[#4A453B] leading-relaxed max-w-2xl">
          Pure priming gets the campaign into students' heads before Hub Week opens, so nothing starts cold. Every
          location carries the same message — a general financial literacy framing, plus a direct prompt about the
          upcoming Hub Week. Only the setting changes; the content doesn't.
        </p>

        {/* Core message, as a pull-quote */}
        <blockquote className="mt-10 pl-6 border-l-2 border-[#BE5A29]">
          <p className="font-display italic text-lg sm:text-xl text-[#221F1A] leading-relaxed">
            "{SENSITIZATION_CORE_MESSAGE}"
          </p>
          <cite className="block mt-3 text-xs font-mono uppercase tracking-wider text-[#8A8373] not-italic">
            Core message, every campus
          </cite>
        </blockquote>

        {/* Delivery channels — a simple list, not a grid of duplicate cards */}
        <div className="mt-14">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8A8373] mb-4">Where it's delivered</div>
          <div className="divide-y divide-[#E4DAC4] border-y border-[#E4DAC4]">
            {DELIVERY_CHANNELS.map((channel) => (
              <div key={channel.id} className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                <div className="sm:w-40 flex-shrink-0 text-sm font-medium text-[#221F1A]">{channel.location}</div>
                <div className="sm:w-56 flex-shrink-0 text-sm text-[#BE5A29]">{channel.style}</div>
                <p className="text-sm text-[#6B6558] leading-relaxed">{channel.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Connective tissue */}
        <div className="mt-14">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8A8373] mb-4">
            Connective tissue — QR to sign-up
          </div>
          <ol className="relative border-l border-[#E4DAC4] pl-6 space-y-6">
            {CONNECTIVE_TISSUE_STEPS.map((step, index) => (
              <li key={step} className="relative">
                <span className="absolute -left-[29px] top-0.5 w-3 h-3 rounded-full bg-[#FBF8F2] border-2 border-[#BE5A29]" />
                <p className="text-sm text-[#4A453B] leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
