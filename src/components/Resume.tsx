import React from 'react';
import { ExternalLink, Download } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const Resume: React.FC = () => {
  // Same-origin relative path to static PDF asset in public directory
  const resumeAssetUrl = `${import.meta.env.BASE_URL}Mayiz's%20Resume.pdf`;
  const resumeFileName = "Mayiz's Resume.pdf";

  return (
    <section id="resume" className="resume-section">
      <div className="container">
        <div className="resume-card reveal-item">
          <div className="resume-content-group">
            <h2 className="resume-heading reveal-item">Resume</h2>
            <p className="resume-supporting-text reveal-item reveal-delay-1">
              Want the full picture?
            </p>
          </div>

          <div className="resume-actions-group reveal-item reveal-delay-2">
            <MagneticButton
              strength="medium"
              href={resumeAssetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn-primary"
            >
              <span>VIEW RESUME</span>
              <ExternalLink size={14} className="btn-icon" />
            </MagneticButton>

            <MagneticButton
              strength="medium"
              href={resumeAssetUrl}
              download={resumeFileName}
              className="resume-btn-secondary"
            >
              <span>DOWNLOAD PDF</span>
              <Download size={14} className="btn-icon" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};


