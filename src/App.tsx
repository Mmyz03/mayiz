import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { projects } from './data/projects';
import './styles/index.css';

export function App() {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  useEffect(() => {
    // Enable instantaneous :active touch state triggering across all mobile/touch browsers
    const handleTouchStart = () => {};
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    // Lightweight, high-performance scroll reveal engine
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal-item').forEach((el) => {
        el.setAttribute('data-revealed', 'true');
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true');
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px 40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-item');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="portfolio-app">
      <Navbar />
      <main>
        {/* 1. Home */}
        <Hero />
        {/* 2. About */}
        <About />
        {/* 3. Skills */}
        <Skills
          activeTech={activeTech}
          onHoverTech={setActiveTech}
        />
        {/* 4. Projects */}
        <Projects
          projects={projects}
          activeTech={activeTech}
        />
        {/* 5. Resume Call-to-Action */}
        <Resume />
      </main>
      {/* Contact Footer */}
      <Footer />
      {/* Move to Top Button */}
      <BackToTop />
    </div>
  );
}

export default App;
