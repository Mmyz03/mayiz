import React from 'react';
import { Activity } from 'lucide-react';

const ECG_PATH =
  'M 0,90 L 60,90 Q 72,90 78,82 Q 84,74 90,82 Q 96,90 108,90 L 130,90 L 138,98 L 148,18 L 158,150 L 168,90 L 180,90 Q 192,90 202,76 Q 212,62 222,76 Q 232,90 244,90 L 280,90 Q 292,90 298,82 Q 304,74 310,82 Q 316,90 328,90 L 350,90 L 358,98 L 368,18 L 378,150 L 388,90 L 400,90 Q 412,90 422,76 Q 432,62 440,76';

export const IHeartVisual: React.FC = () => {
  return (
    <div className="iheart-ecg-card" aria-label="I-HEART Conceptual Live ECG Waveform Visual">
      {/* Subtle Header */}
      <div className="ecg-header">
        <div className="ecg-header-left">
          <Activity size={14} className="ecg-activity-icon" />
          <span className="ecg-header-label">I-HEART · LIVE SIGNAL</span>
        </div>
        <div className="ecg-live-badge">
          <span className="ecg-live-dot" />
          <span className="ecg-live-text">ACTIVE</span>
        </div>
      </div>

      {/* Main SVG ECG Canvas */}
      <div className="ecg-canvas-wrapper">
        <svg
          viewBox="0 0 440 180"
          className="ecg-svg"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Soft Ambient Glow Filter */}
            <filter id="ecgGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Sweep Gradient for Traveling Trace */}
            <linearGradient id="ecgSweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.15" />
              <stop offset="65%" stopColor="var(--accent-primary)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="1" />
            </linearGradient>

            {/* Subtle Grid Pattern */}
            <pattern id="ecgGrid" width="22" height="22" patternUnits="userSpaceOnUse">
              <path
                d="M 22 0 L 0 0 0 22"
                fill="none"
                stroke="var(--border-subtle)"
                strokeWidth="0.6"
                strokeOpacity="0.45"
              />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="100%" height="100%" fill="url(#ecgGrid)" />

          {/* Center Baseline */}
          <line
            x1="0"
            y1="90"
            x2="440"
            y2="90"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.35"
          />

          {/* Faint Full ECG Trace */}
          <path
            d={ECG_PATH}
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="1.8"
            strokeOpacity="0.22"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glowing Animated ECG Sweep */}
          <path
            d={ECG_PATH}
            fill="none"
            stroke="url(#ecgSweepGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ecg-animated-path"
            filter="url(#ecgGlow)"
          />

          {/* Traveling Pulse Dot along Path */}
          <g className="ecg-traveling-dot-group">
            {/* Outer soft pulse ring */}
            <circle r="11" fill="var(--accent-primary)" opacity="0.16" />
            {/* Mid pulse ring */}
            <circle r="6" fill="var(--accent-primary)" opacity="0.45" />
            {/* Crisp center dot with subtle pink-red core */}
            <circle r="3.5" fill="#2563EB" />
            <circle r="1.5" fill="#FFFFFF" />

            {/* Motion along the exact ECG curve */}
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              path={ECG_PATH}
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            />
          </g>
        </svg>
      </div>

      {/* Understated Bottom Footer Label */}
      <div className="ecg-footer">
        <span className="ecg-footer-note">Cardiovascular & Diabetes Risk AI Concept</span>
        <span className="ecg-footer-bpm">SIMULATED WAVEFORM</span>
      </div>
    </div>
  );
};
