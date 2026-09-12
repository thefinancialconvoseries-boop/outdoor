import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FinancialConvoLogo } from './FinancialConvoLogo';
import { SCENES, ACTIVITIES } from '../data/scenes';
import { AspectRatioMode } from '../types';
import { Sparkles, MapPin, Calendar, Users, ShieldCheck } from 'lucide-react';

interface CinematicVideoPlayerProps {
  currentTime: number;
  isPlaying: boolean;
  aspectRatio: AspectRatioMode;
  showFilmGrain: boolean;
  audioActive: boolean;
  onTogglePlay: () => void;
}

export const CinematicVideoPlayer: React.FC<CinematicVideoPlayerProps> = ({
  currentTime,
  isPlaying,
  aspectRatio,
  showFilmGrain,
  audioActive,
  onTogglePlay,
}) => {
  // Determine active scene
  const currentScene = useMemo(() => {
    return SCENES.find((s) => currentTime >= s.startSec && currentTime < s.endSec) || SCENES[SCENES.length - 1];
  }, [currentTime]);

  // Determine active activity if in "experience" phase (20 - 38s)
  const currentActivity = useMemo(() => {
    if (currentTime < 20 || currentTime >= 38) return null;
    return ACTIVITIES.find((a) => currentTime >= a.startSec && currentTime < a.endSec) || ACTIVITIES[0];
  }, [currentTime]);

  // Aspect ratio class
  const aspectClass = {
    '16:9': 'aspect-video',
    '2.39:1': 'aspect-[2.39/1]',
    '9:16': 'aspect-[9/16] max-h-[85vh]',
  }[aspectRatio];

  // Camera animation transforms according to active scene
  const getCameraStyle = () => {
    if (!isPlaying) {
      return { transform: 'scale(1.03) translate3d(0, 0, 0)' };
    }

    const sceneProgress = Math.max(0, Math.min(1, (currentTime - currentScene.startSec) / (currentScene.endSec - currentScene.startSec)));

    switch (currentScene.cameraMovement) {
      case 'slow-zoom-in':
        return {
          transform: `scale(${1.02 + sceneProgress * 0.08}) translate3d(0, -${sceneProgress * 1.5}%, 0)`,
          transition: 'transform 0.2s linear',
        };
      case 'slow-zoom-out':
        return {
          transform: `scale(${1.1 - sceneProgress * 0.07}) translate3d(${sceneProgress * 1}%, 0, 0)`,
          transition: 'transform 0.2s linear',
        };
      case 'slow-pan-right':
        return {
          transform: `scale(1.05) translate3d(-${(sceneProgress - 0.5) * 4}%, 0, 0)`,
          transition: 'transform 0.2s linear',
        };
      case 'gentle-drift':
        return {
          transform: `scale(${1.03 + Math.sin(sceneProgress * Math.PI) * 0.04}) translate3d(0, ${Math.cos(sceneProgress * Math.PI) * 1.5}%, 0)`,
          transition: 'transform 0.2s linear',
        };
      default:
        return {
          transform: 'scale(1.04) translate3d(0, 0, 0)',
        };
    }
  };

  return (
    <div
      id="cinematic-screen-container"
      onClick={onTogglePlay}
      className={`relative w-full ${aspectClass} max-w-6xl mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800/80 cursor-pointer select-none group`}
    >
      {/* 1. SCENE BACKGROUND MEDIA */}
      <div className="absolute inset-0 overflow-hidden bg-[#030812]">
        {/* Scene 0-10: Cape Coast Dawn */}
        {currentTime < 10 && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('${SCENES[0].imageSrc}')`,
              opacity: currentTime < 1.5 ? currentTime / 1.5 : 1,
              ...getCameraStyle(),
            }}
          />
        )}

        {/* Scene 10-20: Ghanaian Guests Outdoor Round Table */}
        {currentTime >= 10 && currentTime < 20 && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('${SCENES[2].imageSrc}')`,
              ...getCameraStyle(),
            }}
          />
        )}

        {/* Scene 20-38: Interactive Challenges & Tactile Budget Activity */}
        {currentTime >= 20 && currentTime < 38 && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('${SCENES[3].imageSrc}')`,
              ...getCameraStyle(),
            }}
          />
        )}

        {/* Scene 38-47: The Human Moment / Goal Ladder & Blueprints */}
        {currentTime >= 38 && currentTime < 47 && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('${SCENES[4].imageSrc}')`,
              ...getCameraStyle(),
            }}
          />
        )}

        {/* Scene 47-53: Exclusivity (Clean, ultra-luxurious deep navy geometric frame) */}
        {currentTime >= 47 && currentTime < 53 && (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#07172C] via-[#050D1A] to-[#02060D] flex items-center justify-center">
            {/* Subtle architectural luxury grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066ff0a_1px,transparent_1px),linear-gradient(to_bottom,#0066ff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute w-96 h-96 rounded-full bg-[#0066FF]/10 blur-[120px] pointer-events-none" />
          </div>
        )}

        {/* Scene 53-60: Final Invitation / Cape Coast Golden Hour */}
        {currentTime >= 53 && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('${SCENES[6].imageSrc}')`,
              ...getCameraStyle(),
            }}
          />
        )}
      </div>

      {/* 2. CINEMATIC GRADIENT & VIGNETTE OVERLAYS */}
      {/* Deep cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(3,8,18,0.78)_100%)]" />

      {/* Top and bottom subtle grading gradient for typography readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/75" />

      {/* Subtle blue anamorphic flare streak */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent pointer-events-none blur-[1px]" />

      {/* 3. OPTIONAL 35MM FILM GRAIN */}
      {showFilmGrain && (
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen animate-film-grain"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '4px 4px',
          }}
        />
      )}

      {/* 4. CINEMATIC LETTERBOXING (Scope 2.39:1 bars if enabled) */}
      {aspectRatio === '2.39:1' && (
        <>
          <div className="absolute top-0 left-0 right-0 h-6 bg-black z-20 pointer-events-none border-b border-white/5" />
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-black z-20 pointer-events-none border-t border-white/5" />
        </>
      )}

      {/* 5. TOP BRAND WATERMARK & CAPE COAST TIMESTAMP HUD */}
      <div className="absolute top-5 left-6 right-6 flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-slate-300 text-xs tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
          <span className="font-medium font-cinematic uppercase tracking-[0.2em] text-white/90">
            THE FINANCIAL CONVO
          </span>
          <span className="text-white/40">|</span>
          <span className="text-slate-400 font-light text-[11px] tracking-widest uppercase">
            Cape Coast, Ghana
          </span>
        </div>

        <div className="flex items-center gap-3">
          {audioActive && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] tracking-widest text-[#38BDF8] uppercase font-mono">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping mr-1" />
              Afro-Instrumental
            </div>
          )}

          <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 font-mono text-xs text-white/80">
            {new Date(currentTime * 1000).toISOString().substring(14, 19)} / 01:00
          </div>
        </div>
      </div>

      {/* 6. SYNCHRONIZED CINEMATIC SCENE OVERLAYS (0 - 60 SECONDS) */}
      <div className="absolute inset-0 flex items-center justify-center p-8 z-20 text-center pointer-events-none">
        {/* =========================================================================
            SECTION 1: 0–5 SECONDS — THE HOOK
            "THE FINANCIAL CONVO SERIES" -> "invites you to…"
           ========================================================================= */}
        {currentTime < 5 && (
          <div className="flex flex-col items-center justify-center max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-[#38BDF8] text-xs sm:text-sm tracking-[0.4em] uppercase font-medium mb-4"
            >
              Exclusive Invitation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }}
              className="text-2xl sm:text-4xl md:text-5xl font-cinematic font-bold tracking-[0.25em] text-white uppercase drop-shadow-2xl"
            >
              THE FINANCIAL CONVO SERIES
            </motion.h1>

            {currentTime >= 2.5 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="mt-6 text-lg sm:text-2xl font-light italic tracking-wider text-slate-300 font-serif"
              >
                invites you to…
              </motion.p>
            )}
          </div>
        )}

        {/* =========================================================================
            SECTION 2: 5–10 SECONDS — EVENT REVEAL
            Reveal the Financial Convo logo -> "THE FINANCIAL CONVO" -> "Learn. Build. Earn."
           ========================================================================= */}
        {currentTime >= 5 && currentTime < 10 && (
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="p-4"
            >
              <FinancialConvoLogo
                size="hero"
                variant="full"
                animated={true}
                showTagline={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="mt-4 flex items-center justify-center gap-3 text-sm sm:text-base tracking-[0.45em] text-[#38BDF8] font-light uppercase"
            >
              <span>Learn</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span>Build</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span>Earn</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-6 text-xs text-slate-300/80 tracking-[0.25em] uppercase font-mono"
            >
              Cape Coast, Ghana • September 2026
            </motion.div>
          </div>
        )}

        {/* =========================================================================
            SECTION 3: 10–20 SECONDS — THE PURPOSE
            "A different kind of conversation about money."
            Topics: "MONEY MINDSET", "BUILDING AN EMERGENCY FUND", "BUDGETING BASICS"
           ========================================================================= */}
        {currentTime >= 10 && currentTime < 20 && (
          <div className="flex flex-col items-center max-w-3xl w-full px-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#0066FF]/40 text-[#38BDF8] text-xs tracking-[0.3em] uppercase font-medium mb-4"
            >
              The Gathering
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-2xl sm:text-3xl md:text-4xl font-cinematic font-semibold text-white tracking-wider max-w-2xl leading-tight drop-shadow-xl"
            >
              “A different kind of conversation about money.”
            </motion.h2>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              {/* Topic 1: Money Mindset (Reveals at 12s) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: currentTime >= 12 ? 1 : 0,
                  y: currentTime >= 12 ? 0 : 20,
                }}
                transition={{ duration: 0.7 }}
                className="px-5 py-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg w-full sm:w-auto text-center"
              >
                <div className="text-[10px] text-[#38BDF8] tracking-widest uppercase font-mono">01</div>
                <div className="text-sm font-semibold tracking-wider uppercase font-cinematic">MONEY MINDSET</div>
              </motion.div>

              {/* Topic 2: Emergency Fund (Reveals at 14.5s) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: currentTime >= 14.5 ? 1 : 0,
                  y: currentTime >= 14.5 ? 0 : 20,
                }}
                transition={{ duration: 0.7 }}
                className="px-5 py-3 rounded-xl bg-black/60 backdrop-blur-md border border-[#0066FF]/50 text-white shadow-lg w-full sm:w-auto text-center"
              >
                <div className="text-[10px] text-[#38BDF8] tracking-widest uppercase font-mono">02</div>
                <div className="text-sm font-semibold tracking-wider uppercase font-cinematic">BUILDING AN EMERGENCY FUND</div>
              </motion.div>

              {/* Topic 3: Budgeting Basics (Reveals at 17s) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: currentTime >= 17 ? 1 : 0,
                  y: currentTime >= 17 ? 0 : 20,
                }}
                transition={{ duration: 0.7 }}
                className="px-5 py-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg w-full sm:w-auto text-center"
              >
                <div className="text-[10px] text-[#38BDF8] tracking-widest uppercase font-mono">03</div>
                <div className="text-sm font-semibold tracking-wider uppercase font-cinematic">BUDGETING BASICS</div>
              </motion.div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 4: 20–38 SECONDS — THE EXPERIENCE
            Fast, elegant cinematic cuts of 4 activities:
            1. SPEND, SAVE OR SKIP
            2. MONEY MINDSET BINGO
            3. BUDGET ENVELOPE CHALLENGE (NEEDS, WANTS, SAVINGS, EMERGENCY)
            4. FIX MY BUDGET
           ========================================================================= */}
        {currentTime >= 20 && currentTime < 38 && currentActivity && (
          <div className="flex flex-col items-center max-w-2xl w-full px-4">
            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#38BDF8]/40 text-[#38BDF8] text-[11px] tracking-[0.3em] uppercase font-mono mb-3">
              Interactive Experience
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentActivity.id}
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.04, y: -10 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center text-center w-full"
              >
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-cinematic font-bold tracking-[0.18em] text-white uppercase drop-shadow-2xl">
                  {currentActivity.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-slate-200 font-light tracking-wider max-w-xl">
                  {currentActivity.tagline}
                </p>

                {/* Specific Visual Cues for Activity 3: Budget Envelope Challenge */}
                {currentActivity.id === 'activity-3' && (
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-w-lg">
                    {['NEEDS', 'WANTS', 'SAVINGS', 'EMERGENCY'].map((label, idx) => (
                      <div
                        key={label}
                        className="py-2.5 px-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                        {label}
                      </div>
                    ))}
                  </div>
                )}

                {/* Specific Visual Badges for Activity 1, 2, 4 */}
                {currentActivity.id !== 'activity-3' && (
                  <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
                    {currentActivity.keyElements.map((elem) => (
                      <span
                        key={elem}
                        className="px-3 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/15 text-slate-300 text-xs tracking-wider"
                      >
                        {elem}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* =========================================================================
            SECTION 5: 38–47 SECONDS — THE HUMAN MOMENT
            Slow pace, emotional & aspirational.
            "Think." -> "Discuss." -> "Challenge your habits." -> "Build your blueprint."
           ========================================================================= */}
        {currentTime >= 38 && currentTime < 47 && (
          <div className="flex flex-col items-center max-w-2xl text-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#38BDF8] text-xs tracking-[0.4em] uppercase font-mono mb-6"
            >
              The Blueprint
            </motion.div>

            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: currentTime >= 38.2 ? 1 : 0,
                  y: currentTime >= 38.2 ? 0 : 15,
                }}
                transition={{ duration: 0.8 }}
                className="text-2xl sm:text-3xl font-cinematic font-light tracking-[0.25em] text-white"
              >
                Think.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: currentTime >= 40.2 ? 1 : 0,
                  y: currentTime >= 40.2 ? 0 : 15,
                }}
                transition={{ duration: 0.8 }}
                className="text-2xl sm:text-3xl font-cinematic font-light tracking-[0.25em] text-white"
              >
                Discuss.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: currentTime >= 42.2 ? 1 : 0,
                  y: currentTime >= 42.2 ? 0 : 15,
                }}
                transition={{ duration: 0.8 }}
                className="text-2xl sm:text-3xl font-cinematic font-medium tracking-[0.2em] text-white drop-shadow-lg"
              >
                Challenge your habits.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: currentTime >= 44.2 ? 1 : 0,
                  scale: currentTime >= 44.2 ? 1 : 0.95,
                }}
                transition={{ duration: 1 }}
                className="text-3xl sm:text-5xl font-cinematic font-bold tracking-[0.2em] text-white uppercase drop-shadow-2xl pt-2"
              >
                Build your blueprint.
              </motion.div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 6: 47–53 SECONDS — EXCLUSIVITY
            Clean, elegant frame.
            Large typography:
            “10–15 GUESTS”
            “STRICTLY BY INVITATION”
           ========================================================================= */}
        {currentTime >= 47 && currentTime < 53 && (
          <div className="flex flex-col items-center justify-center max-w-2xl text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#38BDF8] text-xs tracking-[0.35em] uppercase font-mono mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              Private Curated Cohort
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl font-cinematic font-bold tracking-[0.25em] text-white uppercase"
            >
              10–15 GUESTS
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="w-28 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent my-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.2 }}
              className="text-lg sm:text-2xl md:text-3xl font-cinematic tracking-[0.35em] text-[#38BDF8] uppercase font-semibold"
            >
              STRICTLY BY INVITATION
            </motion.p>
          </div>
        )}

        {/* =========================================================================
            SECTION 7: 53–60 SECONDS — FINAL INVITATION
            Outdoor golden hour Cape Coast shot:
            “26 SEPTEMBER 2026”
            “CAPE COAST”
            “Your seat is waiting.”
            Finish with official Financial Convo logo:
            THE FINANCIAL CONVO
            “Learn. Build. Earn.”
           ========================================================================= */}
        {currentTime >= 53 && (
          <div className="flex flex-col items-center justify-center max-w-3xl text-center px-4">
            {currentTime < 56.5 ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center gap-4 text-xs sm:text-sm tracking-[0.4em] text-[#38BDF8] uppercase font-mono mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#38BDF8]" />
                    26 SEPTEMBER 2026
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#38BDF8]" />
                    CAPE COAST, GHANA
                  </span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-cinematic font-bold text-white tracking-[0.2em] uppercase drop-shadow-2xl">
                  “Your seat is waiting.”
                </h3>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="flex flex-col items-center"
              >
                <FinancialConvoLogo
                  size="hero"
                  variant="full"
                  animated={true}
                  showTagline={true}
                  taglineText="Learn. Build. Earn."
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-5 text-xs sm:text-sm tracking-[0.35em] text-slate-300/90 uppercase font-mono"
                >
                  26 SEPTEMBER 2026 • CAPE COAST, GHANA
                </motion.div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* 7. PLAY / PAUSE HUD PROMPT (Appears on hover or pause) */}
      {!isPlaying && (
        <div className="absolute inset-0 z-40 bg-black/45 backdrop-blur-[2px] flex items-center justify-center transition-opacity">
          <div className="p-5 rounded-full bg-black/70 border border-white/20 text-white shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <svg
              className="w-10 h-10 text-white fill-current ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
