import React from 'react';
import { SCENES, ACTIVITIES } from '../data/scenes';
import { Play, Sparkles, Compass, Users, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface SceneDirectorProps {
  currentTime: number;
  onSelectScene: (startSec: number) => void;
}

export const SceneDirector: React.FC<SceneDirectorProps> = ({
  currentTime,
  onSelectScene,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 p-6 rounded-2xl bg-[#071322]/80 border border-slate-800/80 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-widest uppercase mb-1">
            <Layers className="w-4 h-4" />
            Curated 60-Second Sequence
          </div>
          <h2 className="text-xl sm:text-2xl font-cinematic font-semibold text-white tracking-wide">
            Cinematic Invitation Storyboard
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#38BDF8]">
            Cape Coast, Ghana
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
            26 Sept 2026
          </span>
        </div>
      </div>

      {/* Grid of 7 Curated Scenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {SCENES.map((scene, idx) => {
          const isActive = currentTime >= scene.startSec && currentTime < scene.endSec;

          return (
            <div
              key={scene.id}
              onClick={() => onSelectScene(scene.startSec)}
              className={`group relative flex flex-col justify-between p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-b from-[#0A2540] to-[#061424] border-[#0066FF] shadow-lg shadow-[#0066FF]/10 scale-[1.02]'
                  : 'bg-[#040A14]/70 border-slate-800 hover:border-slate-700 hover:bg-[#071322]'
              }`}
            >
              {/* Top Row: Scene number and timecode badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono tracking-wider font-semibold text-[#38BDF8]">
                  SCENE {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/50 text-slate-300 border border-white/10">
                  {scene.phaseLabel}
                </span>
              </div>

              {/* Title and Headline */}
              <div className="mb-3">
                <h3 className="text-base font-cinematic font-semibold text-white group-hover:text-[#38BDF8] transition-colors">
                  {scene.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {scene.headline}
                </p>
                {scene.subtitle && (
                  <p className="text-[11px] text-slate-300/80 italic mt-0.5">
                    {scene.subtitle}
                  </p>
                )}
              </div>

              {/* Specific features for key scenes */}
              {scene.id === 'experience' && (
                <div className="mt-1 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase tracking-wider text-slate-300 font-mono">
                    4 Fast Teaser Cuts:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ACTIVITIES.map((act) => (
                      <span
                        key={act.id}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300"
                      >
                        {act.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Jump Cue */}
              <div className="mt-3 pt-2 border-t border-slate-800/50 flex items-center justify-between text-xs text-slate-300 group-hover:text-white">
                <span className="text-[11px] tracking-wide">
                  {isActive ? 'Currently Playing' : 'Jump to Scene'}
                </span>
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-[#0066FF]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
