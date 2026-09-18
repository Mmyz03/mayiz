import React from 'react';
import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, DiscordIcon } from './Icons';
import { MagneticButton } from './MagneticButton';
import { personalInfo } from '../data/personal';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="final-contact-footer">
      <div className="container">
        {/* Centered Contact Area */}
        <div className="final-contact-block">
          {/* Heading: Drop a Line */}
          <h2 className="final-contact-heading reveal-item">
            <span className="contact-heading-text">Drop a Line</span>
          </h2>

          {/* Description */}
          <p className="final-contact-desc reveal-item reveal-delay-1">
            Anything you wanna share? Feel free to reach out.
          </p>

          {/* Circular Icon Buttons: GitHub, LinkedIn, Discord, Email */}
          <div className="final-social-icons-row" role="list">
            <div className="reveal-item reveal-delay-2">
              <MagneticButton
                strength="weak"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="final-circle-icon-btn social-btn-github"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GitHubIcon size={20} className="final-icon-svg social-icon-github" />
              </MagneticButton>
            </div>

            <div className="reveal-item reveal-delay-3">
              <MagneticButton
                strength="weak"
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="final-circle-icon-btn social-btn-linkedin"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <LinkedInIcon size={20} className="final-icon-svg social-icon-linkedin" />
              </MagneticButton>
            </div>

            <div className="reveal-item reveal-delay-4">
              <MagneticButton
                strength="weak"
                href={personalInfo.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="final-circle-icon-btn social-btn-discord"
                aria-label="Discord Profile"
                title="Discord"
              >
                <DiscordIcon size={20} className="final-icon-svg social-icon-discord" />
              </MagneticButton>
            </div>

            <div className="reveal-item reveal-delay-5">
              <MagneticButton
                strength="weak"
                href={`mailto:${personalInfo.email}`}
                className="final-circle-icon-btn social-btn-email"
                aria-label="Send Email"
                title="Email"
              >
                <Mail size={20} className="final-icon-svg social-icon-email" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Very Simple Divider */}
        <div className="final-footer-divider" />

        {/* Minimal Footer Row: Left (© 2026 Mohammed Mayiz Mohtesham) & Right (bbye — until next time.) */}
        <div className="final-footer-row reveal-item reveal-delay-2">
          <span className="final-footer-copy">
            © 2026 {personalInfo.name}
          </span>
          <span className="final-footer-brand">
            bbye — until next time.
          </span>
        </div>
      </div>
    </footer>
  );
};
