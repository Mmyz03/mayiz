import React, { useEffect, useState, useRef } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProjectDetail } from '../types';
import { GitHubIcon } from './Icons';

export type ModalStatus = 'closed' | 'opening' | 'open' | 'closing';

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [status, setStatus] = useState<ModalStatus>(project ? 'opening' : 'closed');
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(project);
  const timerRef = useRef<number | null>(null);

  // Synchronize when project prop changes from parent
  useEffect(() => {
    if (project) {
      // User clicked a project card
      setActiveProject(project);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setStatus('opening');
      timerRef.current = window.setTimeout(() => {
        setStatus('open');
        timerRef.current = null;
      }, 450);
    } else if (status === 'open' || status === 'opening') {
      // Parent triggered close externally
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setStatus('closing');
      timerRef.current = window.setTimeout(() => {
        setStatus('closed');
        setActiveProject(null);
        timerRef.current = null;
      }, 450);
    }
  }, [project]);

  // Handle close action (from X button, close button, backdrop, or escape)
  const triggerClose = () => {
    if (status === 'closing' || status === 'closed') return;
    setStatus('closing');
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // Hold component mounted during the entire 450ms reverse animation
    timerRef.current = window.setTimeout(() => {
      setStatus('closed');
      setActiveProject(null);
      timerRef.current = null;
      onClose();
    }, 450);
  };

  // Lock body scroll while modal is visible in any state
  useEffect(() => {
    if (status === 'closed') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [status]);

  // Clean up any pending timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (status === 'closed' || !activeProject) return null;

  return (
    <div
      className={`project-modal-backdrop modal-status-${status}`}
      onClick={triggerClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className={`project-modal-container modal-status-${status}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="project-modal-header">
          <div className="modal-header-left">
            <div className="modal-logo-wrapper" aria-hidden="true">
              <img
                src={activeProject.logoSrc}
                alt={`${activeProject.name} Logo`}
                className="modal-project-logo"
              />
            </div>
            <div>
              <div className="modal-title-row">
                <h3 id="modal-project-title" className="modal-project-title">
                  {activeProject.name}
                </h3>
                {activeProject.isInProgress ? (
                  <span className="modal-status-badge in-progress">
                    <span className="modal-live-dot" />
                    IN PROGRESS
                  </span>
                ) : (
                  <span className="modal-status-badge">
                    {activeProject.type}
                  </span>
                )}
              </div>
              <p className="modal-project-tagline">{activeProject.tagline}</p>
            </div>
          </div>

          <div className="modal-header-actions">
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-github-icon-btn"
              aria-label={`Open ${activeProject.name} repository on GitHub`}
              title="View on GitHub"
            >
              <GitHubIcon size={18} />
            </a>

            <button
              type="button"
              className="modal-close-btn"
              onClick={triggerClose}
              aria-label="Close project details"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area with Smooth Crossfade on project switch */}
        <div className="project-modal-body" key={activeProject.id}>
          {/* Section: WHAT IT IS */}
          <div className="modal-section-block">
            <h4 className="modal-section-heading">WHAT IT IS</h4>
            <p className="modal-text-content">{activeProject.whatItIs}</p>
          </div>

          {/* Section: PURPOSE / WHY IT WAS BUILT */}
          <div className="modal-section-block">
            <h4 className="modal-section-heading">PURPOSE</h4>
            <p className="modal-text-content">{activeProject.purpose}</p>
          </div>

          {/* Section: HOW IT WORKS */}
          <div className="modal-section-block">
            <h4 className="modal-section-heading">HOW IT WORKS</h4>
            <div className="modal-steps-list">
              {activeProject.howItWorks.map((step, idx) => (
                <div key={idx} className="modal-step-item">
                  <span className="modal-step-bullet">
                    <ArrowRight size={13} />
                  </span>
                  <span className="modal-step-text">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: KEY COMPONENTS */}
          {activeProject.keyComponents.length > 0 && (
            <div className="modal-section-block">
              <h4 className="modal-section-heading">KEY COMPONENTS</h4>
              <div className="modal-components-grid">
                {activeProject.keyComponents.map((comp) => (
                  <div key={comp.title} className="modal-component-card">
                    <div className="modal-component-header">
                      <CheckCircle2 size={14} className="component-check-icon" />
                      <span className="modal-component-title">{comp.title}</span>
                    </div>
                    <p className="modal-component-desc">{comp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: TECHNOLOGIES */}
          <div className="modal-section-block">
            <h4 className="modal-section-heading">TECHNOLOGIES</h4>
            <div className="modal-tech-tags" aria-label="Technologies list">
              {activeProject.technologies.map((tech) => (
                <span key={tech} className="modal-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="project-modal-footer">
          <a
            href={activeProject.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-footer-github-link"
          >
            <GitHubIcon size={16} />
            <span>Open in GitHub</span>
            <ExternalLink size={13} className="modal-footer-arrow" />
          </a>

          <button
            type="button"
            className="modal-footer-close-btn"
            onClick={triggerClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

