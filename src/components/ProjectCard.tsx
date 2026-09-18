import React from 'react';
import { Project } from '../types';
import { GitHubIcon } from './Icons';
import { SKILL_PROJECT_MAP } from '../data/skills';

interface ProjectCardProps {
  project: Project;
  activeTech: string | null;
  onOpenDetails?: () => void;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  activeTech,
  onOpenDetails,
  index = 0,
}) => {
  const isMatch = activeTech
    ? (SKILL_PROJECT_MAP[activeTech]?.some(
        (p) => p.toLowerCase() === project.name.toLowerCase()
      ) ||
       project.technologies.some(
        (t) => t.toLowerCase() === activeTech.toLowerCase() ||
               (activeTech.toLowerCase() === 'nlp' && t.toLowerCase() === 'nlp') ||
               (activeTech.toLowerCase() === 'natural language processing' && t.toLowerCase() === 'nlp')
      ))
    : false;

  const renderProjectIcon = () => {
    switch (project.id) {
      case 'i-heart':
        return (
          <div className="project-card-logo-wrapper" aria-hidden="true">
            <img
              src="/iheart-logo.png"
              alt="I-HEART Logo"
              className="project-card-logo"
            />
          </div>
        );
      case 'fixit':
        return (
          <div className="project-card-logo-wrapper" aria-hidden="true">
            <img
              src="/fixit-logo.png"
              alt="Fixit Logo"
              className="project-card-logo"
            />
          </div>
        );
      case 'lore':
        return (
          <div className="project-card-logo-wrapper" aria-hidden="true">
            <img
              src="/lore-logo.png"
              alt="LORE Logo"
              className="project-card-logo"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <article
      className={`project-item reveal-item reveal-delay-${Math.min(index + 1, 6)} ${
        isMatch ? 'highlighted' : ''
      }`}
      id={`project-${project.id}`}
      aria-label={`${project.name} Project Card. Click to view detailed project information.`}
      onClick={() => onOpenDetails?.()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetails?.();
        }
      }}
    >
      <div className="project-top-row">
        <div className="project-header">
          <div className="project-name-tagline-wrap">
            <h3 className="project-name">{project.name}</h3>
            <span className="project-inline-tagline">{project.tagline}</span>
          </div>
        </div>

        {renderProjectIcon()}
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-tech-list" aria-label="Technologies used">
        {project.technologies.map((tech) => {
          const isTechMatched =
            activeTech && tech.toLowerCase() === activeTech.toLowerCase();
          return (
            <span
              key={tech}
              className={`project-tech-tag ${isTechMatched ? 'tag-matched' : ''}`}
            >
              {tech}
            </span>
          );
        })}
      </div>

      <div className="project-footer">
        {/* GitHub Icon Only (Click opens repository without opening modal) */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-github-icon-btn"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Open ${project.name} repository on GitHub`}
          title="Open GitHub Repository"
        >
          <GitHubIcon size={18} />
        </a>
      </div>
    </article>
  );
};
