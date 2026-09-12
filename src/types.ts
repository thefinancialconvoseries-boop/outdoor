export interface SceneTiming {
  id: string;
  name: string;
  startSec: number;
  endSec: number;
  phaseLabel: string;
  headline: string;
  subtitle?: string;
  keyPoints?: string[];
  imageSrc?: string;
  cameraMovement: 'slow-pan-right' | 'slow-zoom-in' | 'slow-zoom-out' | 'steady-tracking' | 'gentle-drift';
}

export interface ActivityDetail {
  id: string;
  title: string;
  tagline: string;
  startSec: number;
  endSec: number;
  description: string;
  keyElements: string[];
}

export type AspectRatioMode = '16:9' | '2.39:1' | '9:16';
