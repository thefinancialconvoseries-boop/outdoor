import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Tv,
  Film,
  FastForward,
  Rewind,
  Music,
} from 'lucide-react';
import { SCENES } from '../data/scenes';
import { AspectRatioMode } from '../types';

interface VideoControlsProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  aspectRatio: AspectRatioMode;
  showFilmGrain: boolean;
  isFullscreen: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onToggleMute: () => void;
  onChangeVolume: (vol: number) => void;
  onChangeAspectRatio: (ratio: AspectRatioMode) => void;
  onToggleFilmGrain: () => void;
  onToggleFullscreen: () => void;
  onReplay: () => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  currentTime,
  duration,
  isPlaying,
  isMuted,
  volume,
  aspectRatio,
  showFilmGrain,
  isFullscreen,
  onTogglePlay,
  onSeek,
  onToggleMute,
  onChangeVolume,
  onChangeAspectRatio,
  onToggleFilmGrain,
  onToggleFullscreen,
  onReplay,
}) => {
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(pos * duration);
  };

  const handleTimelineHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverTime(pos * duration);
  };

  const currentPercent = (currentTime / duration) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto mt-4 px-2 select-none">
      {/* 1. TIMELINE & CHAPTER MARKS */}
      <div className="relative group/timeline py-3 cursor-pointer" onMouseMove={handleTimelineHover} onMouseLeave={() => setHoverTime(null)} onClick={handleTimelineClick}>
        {/* Hover Time Tooltip */}
        {hoverTime !== null && (
          <div
            className="absolute -top-7 transform -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 border border-slate-700 text-[11px] font-mono text-white pointer-events-none z-30"
            style={{ left: `${(hoverTime / duration) * 100}%` }}
          >
            {formatTime(hoverTime)}
          </div>
        )}

        {/* Scrubber Background Bar */}
        <div className="relative h-1.5 w-full bg-slate-800 rounded-full overflow-visible transition-all group-hover/timeline:h-2.5">
          {/* Chapter Dividers */}
          {SCENES.map((scene) => {
            const leftPct = (scene.startSec / duration) * 100;
            return (
              <div
                key={scene.id}
                className="absolute top-0 bottom-0 w-[2px] bg-slate-600/80 z-10"
                style={{ left: `${leftPct}%` }}
                title={`${scene.phaseLabel}: ${scene.name}`}
              />
            );
          })}

          {/* Played Progress Bar */}
          <div
            className="h-full bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#60A5FA] rounded-full relative"
            style={{ width: `${currentPercent}%` }}
          >
            {/* Scrubber Knob */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md transform scale-0 group-hover/timeline:scale-100 transition-transform" />
          </div>
        </div>

        {/* Scene Marker Labels Underneath Scrubber */}
        <div className="hidden sm:flex justify-between items-center mt-2 text-[10px] font-mono text-slate-400">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={(e) => {
                e.stopPropagation();
                onSeek(scene.startSec);
              }}
              className={`hover:text-[#38BDF8] transition-colors ${
                currentTime >= scene.startSec && currentTime < scene.endSec
                  ? 'text-[#38BDF8] font-semibold'
                  : 'text-slate-300'
              }`}
            >
              {scene.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2. PRIMARY CONTROLS ROW */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Left: Playback Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="video-btn-play-pause"
            onClick={onTogglePlay}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white shadow-lg transition-transform active:scale-95"
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={() => onSeek(Math.max(0, currentTime - 5))}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Backward 5 seconds"
          >
            <Rewind className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSeek(Math.min(duration, currentTime + 5))}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Forward 5 seconds"
          >
            <FastForward className="w-4 h-4" />
          </button>

          <button
            onClick={onReplay}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Replay from beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Timecode */}
          <div className="text-xs sm:text-sm font-mono text-slate-300 ml-1">
            <span className="text-white font-medium">{formatTime(currentTime)}</span>
            <span className="text-slate-300"> / {formatTime(duration)}</span>
          </div>
        </div>

        {/* Center: Audio Track Indicator & Volume */}
        <div className="flex items-center gap-3 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-[#38BDF8] font-mono pr-2 border-r border-slate-800">
            <Music className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Afro-Lounge OST</span>
          </div>

          <button
            id="video-btn-mute"
            onClick={onToggleMute}
            className="text-slate-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          <input
            id="video-volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
            className="w-16 sm:w-20 accent-[#0066FF] cursor-pointer h-1.5 rounded-lg bg-slate-700"
            title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
          />
        </div>

        {/* Right: Aspect Ratio & Cinematic Effects */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Film Grain Toggle */}
          <button
            onClick={onToggleFilmGrain}
            className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors ${
              showFilmGrain
                ? 'bg-slate-800 text-[#38BDF8] border border-[#0066FF]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
            title="Toggle 35mm film grain"
          >
            <Film className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grain</span>
          </button>

          {/* Aspect Ratio Selector */}
          <div className="flex items-center bg-slate-900/80 rounded-lg p-0.5 border border-slate-800">
            {(['16:9', '2.39:1', '9:16'] as AspectRatioMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => onChangeAspectRatio(mode)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                  aspectRatio === mode
                    ? 'bg-[#0066FF] text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={`Aspect ratio: ${mode}`}
              >
                {mode === '2.39:1' ? 'Scope' : mode}
              </button>
            ))}
          </div>

          {/* Fullscreen Button */}
          <button
            id="video-btn-fullscreen"
            onClick={onToggleFullscreen}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit full screen' : 'Full screen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
