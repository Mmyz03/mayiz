import React from 'react';

interface MascotIllustrationProps {
  pose?: 'salute' | 'wave';
}

export const MascotIllustration: React.FC<MascotIllustrationProps> = ({ pose = 'salute' }) => {
  return (
    <div 
      className={`mascot-wrapper ${pose === 'wave' ? 'about-mascot' : 'hero-mascot'}`}
      role="img"
      aria-label={
        pose === 'wave'
          ? 'Hand-drawn illustration of Mayiz wearing everyday eyeglasses with interactive wave greeting'
          : 'Hand-drawn illustration of Mayiz wearing everyday eyeglasses giving a friendly salute'
      }
    >
      {/* Speech Bubble for About section (Appears on About card hover on desktop / touch-and-hold on mobile) */}
      {pose === 'wave' && (
        <div 
          className="about-speech-bubble"
          aria-hidden="true"
        >
          <span className="bubble-text">Hi</span>
        </div>
      )}

      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mascot-svg"
      >
        <defs>
          {/* Subtle warm backdrop glow */}
          <radialGradient id="mascotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-tint)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent-tint)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient background circle */}
        <circle cx="120" cy="120" r="95" fill="url(#mascotGlow)" />

        {/* Desk Surface */}
        <path
          d="M 30 195 L 210 195"
          stroke="var(--card-border)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Coffee Mug & Gentle Steam */}
        <g className="mascot-coffee">
          <rect
            x="48"
            y="172"
            width="18"
            height="22"
            rx="3"
            fill="var(--card-bg)"
            stroke="var(--text-primary)"
            strokeWidth="2.5"
          />
          {/* Handle */}
          <path
            d="M 48 178 C 42 178 42 186 48 186"
            stroke="var(--text-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Steam puffs */}
          <path
            d="M 54 167 Q 52 162 56 157"
            stroke="var(--accent-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="steam-puff puff-1"
          />
          <path
            d="M 60 168 Q 63 163 59 158"
            stroke="var(--accent-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="steam-puff puff-2"
          />
        </g>

        {/* Laptop */}
        <g className="mascot-laptop">
          {/* Screen base */}
          <path
            d="M 130 195 L 182 195"
            stroke="var(--text-primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Screen tilted back */}
          <polygon
            points="136,194 144,152 188,152 180,194"
            fill="var(--card-bg)"
            stroke="var(--text-primary)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Code lines on screen */}
          <line x1="147" y1="162" x2="168" y2="162" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="150" y1="168" x2="178" y2="168" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" />
          <line x1="148" y1="174" x2="164" y2="174" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Character Body / Torso */}
        <path
          d="M 82 195 C 82 165 92 150 115 150 C 138 150 148 165 148 195"
          fill="var(--mascot-shirt)"
          stroke="var(--text-primary)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Shirt Collar */}
        <path
          d="M 108 150 L 115 162 L 122 150"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Neck */}
        <rect
          x="108"
          y="138"
          width="14"
          height="14"
          fill="var(--mascot-skin)"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
        />

        {/* Head */}
        <ellipse
          cx="115"
          cy="110"
          rx="26"
          ry="30"
          fill="var(--mascot-skin)"
          stroke="var(--text-primary)"
          strokeWidth="3"
        />

        {/* Ears */}
        <ellipse cx="88" cy="112" rx="4" ry="7" fill="var(--mascot-skin)" stroke="var(--text-primary)" strokeWidth="2.5" />
        <ellipse cx="142" cy="112" rx="4" ry="7" fill="var(--mascot-skin)" stroke="var(--text-primary)" strokeWidth="2.5" />

        {/* Hair - Clean modern developer hairstyle */}
        <path
          d="M 88 108 C 87 90 95 78 115 78 C 135 78 143 90 142 108 C 138 98 128 92 115 93 C 102 92 92 98 88 108 Z"
          fill="var(--mascot-hair)"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* CLEAR EVERYDAY EYEGLASSES (Regular everyday eyeglasses with clear transparent lenses) */}
        {/* Left Lens Frame */}
        <rect
          x="95"
          y="104"
          width="16"
          height="14"
          rx="3.5"
          fill="var(--glasses-lens)"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
        />
        {/* Right Lens Frame */}
        <rect
          x="119"
          y="104"
          width="16"
          height="14"
          rx="3.5"
          fill="var(--glasses-lens)"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
        />
        {/* Glasses Bridge */}
        <line
          x1="111"
          y1="110"
          x2="119"
          y2="110"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
        />
        {/* Left & Right Temple arms */}
        <line x1="89" y1="108" x2="95" y2="108" stroke="var(--text-primary)" strokeWidth="2.5" />
        <line x1="135" y1="108" x2="141" y2="108" stroke="var(--text-primary)" strokeWidth="2.5" />

        {/* Eyes behind clear glasses */}
        <circle cx="103" cy="111" r="2.2" fill="var(--text-primary)" />
        <circle cx="127" cy="111" r="2.2" fill="var(--text-primary)" />

        {/* Eyebrows */}
        <path d="M 97 100 Q 103 98 109 100" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 121 100 Q 127 98 133 100" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Friendly confident smile */}
        <path
          d="M 108 126 Q 115 133 122 126"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left Arm resting on desk */}
        <path
          d="M 90 162 C 84 175 80 188 95 194"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* RIGHT ARM: POSE CONDITIONAL */}
        {pose === 'wave' ? (
          <>
            {/* Waving State on Hover (Shown via CSS on About card hover) */}
            <g className="mascot-waving-group">
              {/* 1. Stable Upper Arm from shoulder to elbow */}
              <path
                d="M 140 160 C 146 148 152 142 156 138"
                stroke="var(--text-primary)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />

              {/* 2. Oscillating Forearm & Hand (Pivoting directly at elbow 156, 138) */}
              <g className="mascot-forearm-hand">
                {/* Forearm from elbow up to wrist */}
                <path
                  d="M 156 138 C 160 126 164 118 168 112"
                  stroke="var(--text-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Open Waving Hand with fingers */}
                <circle
                  cx="169"
                  cy="104"
                  r="7"
                  fill="var(--mascot-skin)"
                  stroke="var(--text-primary)"
                  strokeWidth="2.5"
                />

                {/* Hand detail / fingers */}
                <path
                  d="M 165 99 Q 169 96 173 99"
                  stroke="var(--text-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Wave speed motion lines */}
                <path
                  d="M 179 94 C 184 100 184 108 179 114"
                  stroke="var(--accent-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 184 98 C 188 102 188 106 184 110"
                  stroke="var(--accent-primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </g>

            {/* Default Relaxed Pose (Hand resting naturally down on desk) */}
            <g className="mascot-relaxed-arm">
              <path
                d="M 140 160 C 150 172 155 184 145 194"
                stroke="var(--text-primary)"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </>
        ) : (
          /* STATUS & FOCUS / NOW & FOCUS PANEL: SALUTING POSE */
          <g className="mascot-salute-arm is-active-salute">
            {/* Upper arm & Forearm bent sharply upwards into salute */}
            <path
              d="M 140 162 C 156 150 166 138 163 122 C 160 110 152 102 138 98"
              stroke="var(--text-primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Hand at right eyebrow/temple in crisp salute */}
            <path
              d="M 134 94 L 142 101"
              stroke="var(--text-primary)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle
              cx="137"
              cy="97"
              r="4.5"
              fill="var(--mascot-skin)"
              stroke="var(--text-primary)"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

