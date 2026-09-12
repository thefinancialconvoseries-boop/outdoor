/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CinematicVideoPlayer } from './components/CinematicVideoPlayer';
import { VideoControls } from './components/VideoControls';
import { SceneDirector } from './components/SceneDirector';
import { InvitationPassModal } from './components/InvitationPassModal';
import { FinancialConvoLogo } from './components/FinancialConvoLogo';
import { InvitationAudioEngine } from './components/AudioEngine';
import { AspectRatioMode } from './types';
import { TOTAL_DURATION_SEC } from './data/scenes';
import {
  Sparkles,
  Ticket,
  Maximize2,
  Calendar,
  MapPin,
  Users,
  Compass,
  Volume2,
  VolumeX,
} from 'lucide-react';

export default function App() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioMode>('16:9');
  const [showFilmGrain, setShowFilmGrain] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);
  const [audioStarted, setAudioStarted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioEngineRef = useRef<InvitationAudioEngine | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Initialize Audio Engine once
  useEffect(() => {
    audioEngineRef.current = new InvitationAudioEngine();
    return () => {
      if (audioEngineRef.current) {
        audioEngineRef.current.pause();
      }
    };
  }, []);

  // Time loop driven by requestAnimationFrame for frame-perfect 60fps cinematic playback
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      lastTimeRef.current = null;
      audioEngineRef.current?.pause();
      return;
    }

    // Audio Engine synchronization
    if (audioEngineRef.current) {
      audioEngineRef.current.syncPlayback(currentTime, true);
      setAudioStarted(true);
    }

    const step = (now: number) => {
      if (lastTimeRef.current !== null) {
        const deltaSec = (now - lastTimeRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + deltaSec;
          if (next >= TOTAL_DURATION_SEC) {
            setIsPlaying(false);
            audioEngineRef.current?.pause();
            return TOTAL_DURATION_SEC;
          }
          // Sync sound to new time
          audioEngineRef.current?.syncPlayback(next, true);
          return next;
        });
      }
      lastTimeRef.current = now;
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Toggle Play / Pause
  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const willPlay = !prev;
      if (willPlay && currentTime >= TOTAL_DURATION_SEC) {
        setCurrentTime(0);
      }
      if (willPlay && audioEngineRef.current) {
        audioEngineRef.current.resume();
        setAudioStarted(true);
      }
      return willPlay;
    });
  }, [currentTime]);

  // Seek to specific time (0 - 60s)
  const handleSeek = useCallback((newTime: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_DURATION_SEC, newTime));
    setCurrentTime(clamped);
    if (audioEngineRef.current) {
      audioEngineRef.current.syncPlayback(clamped, isPlaying);
    }
  }, [isPlaying]);

  // Replay
  const handleReplay = useCallback(() => {
    setCurrentTime(0);
    setIsPlaying(true);
    if (audioEngineRef.current) {
      audioEngineRef.current.syncPlayback(0, true);
    }
  }, []);

  // Mute / Unmute
  const handleToggleMute = useCallback(() => {
    if (audioEngineRef.current) {
      const muted = audioEngineRef.current.toggleMute();
      setIsMuted(muted);
    }
  }, []);

  // Volume change
  const handleChangeVolume = useCallback((vol: number) => {
    setVolume(vol);
    if (audioEngineRef.current) {
      audioEngineRef.current.setVolume(vol);
      if (vol > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  }, [isMuted]);

  // Fullscreen
  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard Shortcuts (Space: Play/Pause, Left/Right: Seek, M: Mute)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleSeek(currentTime - 5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSeek(currentTime + 5);
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        handleToggleMute();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        handleToggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, handleTogglePlay, handleSeek, handleToggleMute, handleToggleFullscreen]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col justify-between selection:bg-[#0066FF] selection:text-white"
    >
      {/* 1. TOP HEADER & BRAND BAR */}
      <header className="w-full border-b border-slate-800/80 bg-[#071322]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo with Preserved Proportions */}
          <div className="flex items-center gap-3">
            <FinancialConvoLogo
              size="md"
              variant="horizontal"
              showTagline={true}
              taglineText="Learn. Build. Earn."
            />
          </div>

          {/* Center Location & Date Badge */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-300 font-mono tracking-wider">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
              26 September 2026
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              Cape Coast, Ghana
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-[#60A5FA]">
              <Users className="w-3.5 h-3.5 text-[#60A5FA]" />
              10–15 Guests
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPassModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0284C7] hover:from-[#0052cc] hover:to-[#0369a1] text-white text-xs font-semibold tracking-wider transition-all shadow-md shadow-[#0066FF]/20 active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">View VIP Pass</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CINEMATIC THEATER VIEW */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center">
        {/* Cinematic Film Title Banner */}
        <div className="w-full max-w-6xl mb-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#38BDF8] flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              60-Second Official Cinematic Invitation Film
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-cinematic font-bold tracking-wider text-white mt-1">
              THE FINANCIAL CONVO
            </h1>
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center justify-center sm:justify-end gap-3">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
              STRICTLY BY INVITATION
            </span>
            <span className="text-[#38BDF8]">4K Master • 60s</span>
          </div>
        </div>

        {/* Cinematic Screen Player */}
        <CinematicVideoPlayer
          currentTime={currentTime}
          isPlaying={isPlaying}
          aspectRatio={aspectRatio}
          showFilmGrain={showFilmGrain}
          audioActive={audioStarted && !isMuted}
          onTogglePlay={handleTogglePlay}
        />

        {/* Video Scrubber & Playback Controls */}
        <VideoControls
          currentTime={currentTime}
          duration={TOTAL_DURATION_SEC}
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          aspectRatio={aspectRatio}
          showFilmGrain={showFilmGrain}
          isFullscreen={isFullscreen}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
          onToggleMute={handleToggleMute}
          onChangeVolume={handleChangeVolume}
          onChangeAspectRatio={setAspectRatio}
          onToggleFilmGrain={() => setShowFilmGrain((prev) => !prev)}
          onToggleFullscreen={handleToggleFullscreen}
          onReplay={handleReplay}
        />

        {/* 3. SCENE DIRECTOR / STORYBOARD DRAWER */}
        <SceneDirector
          currentTime={currentTime}
          onSelectScene={handleSeek}
        />
      </main>

      {/* 4. FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#040A14] py-6 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-cinematic font-semibold tracking-wider text-white uppercase">
              The Financial Convo Series
            </span>
            <span>•</span>
            <span className="italic text-[#38BDF8]">“Learn. Build. Earn.”</span>
          </div>

          <div className="font-mono text-center sm:text-right text-[11px]">
            Cape Coast, Ghana • 26 September 2026 • Curated for 10–15 Guests
          </div>
        </div>
      </footer>

      {/* VIP Invitation Pass Modal */}
      <InvitationPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
      />
    </div>
  );
}
