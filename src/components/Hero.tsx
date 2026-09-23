import React from 'react';
import heroImage from '../assets/images/forum_discussion.jpg';
import { CAMPAIGN_AIM, CAMPAIGN_FORMAT, CAMPUSES } from '../data/campaign';

export const Hero: React.FC = () => {
  return (
    <section id="overview" className="relative w-full blueprint-grid">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold leading-[1.05] text-[#0B1330]">
              The Financial
              <br />
              Blueprint
            </h1>

            <p className="mt-5 text-xl sm:text-2xl font-display italic text-[#1B2A6B]">
              Your money. Your plan. Your future.
            </p>

            <p className="mt-6 max-w-xl text-base text-[#333D66] leading-relaxed">
              {CAMPAIGN_AIM}
            </p>

            <p className="mt-3 max-w-xl text-sm text-[#7178A0]">{CAMPAIGN_FORMAT}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#phase-1"
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#2F3AE4] hover:bg-[#1B2A6B] text-[#FFFFFF] text-sm font-medium transition-colors"
              >
                See the roadmap
              </a>
              <a
                href="#register"
                className="inline-flex items-center px-6 py-3 rounded-full border border-[#0B1330]/25 hover:border-[#0B1330] text-[#0B1330] text-sm font-medium transition-colors"
              >
                Register for Hub Week
              </a>
            </div>
          </div>

          {/* Framed photo plate */}
          <figure className="relative">
            <div className="relative border border-[#0B1330]/15 p-2 bg-[#FFFFFF]">
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t border-l border-[#0B1330]/40" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t border-r border-[#0B1330]/40" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b border-l border-[#0B1330]/40" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b border-r border-[#0B1330]/40" />
              <img
                src={heroImage}
                alt="Students in conversation"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover grayscale-[15%]"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#7178A0]">
              <span>Fig. 01 — The Convo</span>
              <span>Scale: Campus-wide</span>
            </figcaption>
          </figure>
        </div>

        {/* Campus stops */}
        <div className="mt-16 pt-6 border-t border-[#D7E0F5] flex flex-wrap items-center gap-x-8 gap-y-3">
          {CAMPUSES.map((campus) => (
            <div key={campus.id} className="flex items-baseline gap-2">
              <span className="text-xs font-mono text-[#2F3AE4]">0{campus.order}</span>
              <span className="text-sm text-[#0B1330]">{campus.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
