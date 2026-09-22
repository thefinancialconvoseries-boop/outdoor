import { NavHeader } from './components/NavHeader';
import { Hero } from './components/Hero';
import { PhaseOneSection } from './components/PhaseOneSection';
import { PhaseTwoSection } from './components/PhaseTwoSection';
import { TimelineSection } from './components/TimelineSection';
import { OpenDecisionsSection } from './components/OpenDecisionsSection';
import { RegistrationSection } from './components/RegistrationSection';
import { CAMPAIGN_PARENT } from './data/campaign';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FBF8F2] text-[#221F1A] flex flex-col justify-between">
      <NavHeader />

      <main className="flex-1 w-full">
        <Hero />
        <PhaseOneSection />
        <PhaseTwoSection />
        <TimelineSection />
        <OpenDecisionsSection />
        <RegistrationSection />
      </main>

      <footer className="w-full border-t border-[#E4DAC4] py-8 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8A8373]">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-[#221F1A]">The Financial Blueprint</span>
            <span>·</span>
            <span className="italic">{CAMPAIGN_PARENT}</span>
          </div>

          <div className="font-mono text-center sm:text-right">
            UCC · OLA Training College · Bakaano Nursing · CCTU
          </div>
        </div>
      </footer>
    </div>
  );
}
