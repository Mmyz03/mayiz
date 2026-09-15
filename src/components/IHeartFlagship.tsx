import React from 'react';
import { GitHubIcon } from './Icons';
import { IHeartVisual } from './IHeartVisual';
import { SKILL_PROJECT_MAP } from '../data/skills';
import { useTargetPetals, CardPetalsLayer } from './SectionPetals';

interface IHeartFlagshipProps {
  activeTech: string | null;
  onOpenDetails?: () => void;
}

const IHEART_TECHS = [
  'Python',
  'Machine Learning',
  'Explainable AI',
  'Health Data',
  'Flask',
  'Web Interface',
];

export const IHeartFlagship: React.FC<IHeartFlagshipProps> = ({
  activeTech,
  onOpenDetails,
}) => {
  const { activePetals, touchProps } = useTargetPetals();
  const isHighlighted = activeTech
    ? (SKILL_PROJECT_MAP[activeTech]?.includes('I-HEART') ||
       IHEART_TECHS.some((t) => t.toLowerCase() === activeTech.toLowerCase()))
    : false;

  return (
    <article
      id="project-i-heart"
      className={`flagship-compact-card ${isHighlighted ? 'flagship-highlighted' : ''}`}
      aria-label="I-HEART — Flagship Final-Year Major Project. Click to view detailed project information."
      onClick={() => onOpenDetails?.()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetails?.();
        }
      }}
      style={{ position: 'relative' }}
      {...touchProps}
    >
      <CardPetalsLayer petals={activePetals} />
      {/* Compact Top Header Bar */}
      <div className="flagship-compact-top-bar">
        <div className="flagship-top-left">
          <span className="flagship-compact-label">MAJOR PROJECT</span>
          <span className="flagship-compact-pill">Final-Year Major Project</span>
        </div>

        <div className="flagship-compact-status">
          <span className="status-live-dot" />
          <span className="status-label">CURRENTLY IN PROGRESS</span>
        </div>
      </div>

      {/* Balanced 2-Column Grid */}
      <div className="flagship-compact-grid">
        {/* Left Column: Info & Metadata */}
        <div className="flagship-compact-left">
          <div className="flagship-title-block">
            <div className="flagship-title-row">
              <div className="flagship-name-tagline-wrap">
                <h3 className="flagship-compact-title">I-HEART</h3>
                <span className="project-inline-tagline">predict today. protect tomorrow.</span>
              </div>
              <div className="flagship-logo-wrapper" aria-hidden="true">
                <img
                  src="/iheart-logo.png"
                  alt="I-HEART Logo"
                  className="flagship-project-logo"
                />
              </div>
            </div>
          </div>

          <p className="flagship-compact-desc">
            I-HEART is an AI-based health risk prediction system focused on diabetes and cardiovascular disease risk assessment, combining machine learning, health data, and explainability.
          </p>

          {/* Compact 3-Item Information List */}
          <div className="flagship-compact-info-list">
            <div className="compact-info-row">
              <span className="info-key">STATUS</span>
              <span className="info-val in-progress">
                <span className="info-dot" />
                Currently in progress
              </span>
            </div>

            <div className="compact-info-row">
              <span className="info-key">TYPE</span>
              <span className="info-val">Final-Year Major Project</span>
            </div>

            <div className="compact-info-row">
              <span className="info-key">FOCUS</span>
              <span className="info-val">AI-Based Health Risk Prediction</span>
            </div>
          </div>

          {/* Tech Tags & Action Link */}
          <div className="flagship-compact-footer">
            <div className="compact-tech-tags" aria-label="Technologies used">
              {IHEART_TECHS.map((tech) => {
                const isMatch =
                  activeTech && tech.toLowerCase() === activeTech.toLowerCase();
                return (
                  <span
                    key={tech}
                    className={`compact-tag ${isMatch ? 'matched' : ''}`}
                  >
                    {tech}
                  </span>
                );
              })}
            </div>

            {/* GitHub Icon Only (Click opens repository without opening modal) */}
            <a
              href="https://github.com/Mmyz03/I-HEART"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-github-icon-btn"
              onClick={(e) => e.stopPropagation()}
              aria-label="Open I-HEART repository on GitHub"
              title="Open GitHub Repository"
            >
              <GitHubIcon size={18} />
            </a>
          </div>
        </div>

        {/* Right Column: Compact Architecture Visual */}
        <div className="flagship-compact-right">
          <IHeartVisual />
        </div>
      </div>
    </article>
  );
};
