import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProjectDetail } from '../types';
import { GitHubIcon } from './Icons';

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

const ANIMATION_DURATION = 820;

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(project);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
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
    if (isClosing) return;

    // 1. Immediately unlock body scroll so native scrolling is enabled on the very first touch
    unlockBodyScroll();

    // 2. Set closing state
    setIsClosing(true);

    // 3. Immediately notify parent to reset selected project state so re-clicking the same project works instantly
    onCloseRef.current();

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    // 4. Keep modal mounted for the full animation duration, then clean up state
    closeTimerRef.current = window.setTimeout(() => {
      setIsClosing(false);
      setActiveProject(null);
      closeTimerRef.current = null;
    }, ANIMATION_DURATION);
  }, [isClosing]);

  // Synchronize when project prop changes from parent
  useEffect(() => {
    if (project) {
      // User opened a project
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setIsClosing(false);
      setActiveProject(project);
      lockBodyScroll();

      // Reset scroll position to top whenever a project opens
      if (backdropRef.current) {
        backdropRef.current.scrollTop = 0;
      }
    } else if (activeProject && !isClosing) {
      triggerClose();
    }
  }, [project]);

  // Escape key handler
  useEffect(() => {
    if (!activeProject || isClosing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject, isClosing, triggerClose]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      unlockBodyScroll();
    };
  }, []);

  if (!activeProject) return null;

  const stateClass = isClosing ? 'is-closing' : 'is-open';

  return (
    <div
      ref={backdropRef}
      className={`project-modal-backdrop ${stateClass}`}
      onClick={triggerClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className={`project-modal-container ${stateClass}`}
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

        {/* Content Area with Unified Smooth Transition */}
        <div className="project-modal-body">
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

