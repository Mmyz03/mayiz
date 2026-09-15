import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProjectDetail } from '../types';
import { GitHubIcon } from './Icons';

export type ModalStatus = 'closed' | 'opening' | 'open' | 'closing';

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

const ANIMATION_DURATION = 700;

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [status, setStatus] = useState<ModalStatus>(project ? 'opening' : 'closed');
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(project);
  const timerRef = useRef<number | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const lockBodyScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const unlockBodyScroll = () => {
    document.body.style.overflow = '';
  };

  // Handle close action: immediately unlock body scroll so user's first swipe works natively
  const triggerClose = useCallback(() => {
    if (status === 'closing' || status === 'closed') return;

    // 1. Immediately unlock body scroll so native scrolling is enabled on the very first touch
    unlockBodyScroll();

    // 2. Set status to closing to trigger reverse CSS animations and pointer-events: none
    setStatus('closing');

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 3. Keep mounted for the full animation duration, then clean up state
    timerRef.current = window.setTimeout(() => {
      setStatus('closed');
      setActiveProject(null);
      timerRef.current = null;
      onCloseRef.current();
    }, ANIMATION_DURATION);
  }, [status]);

  // Synchronize when project prop changes from parent
  useEffect(() => {
    if (project) {
      // User opened a project
      setActiveProject(project);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      lockBodyScroll();
      setStatus('opening');
      timerRef.current = window.setTimeout(() => {
        setStatus('open');
        timerRef.current = null;
      }, ANIMATION_DURATION);
    } else if (status === 'open' || status === 'opening') {
      // Parent triggered close externally
      triggerClose();
    }
  }, [project]);

  // Escape key handler
  useEffect(() => {
    if (status !== 'open' && status !== 'opening') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [status, triggerClose]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      unlockBodyScroll();
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

