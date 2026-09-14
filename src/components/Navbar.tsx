import React, { useEffect, useState, useRef } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#footer', id: 'footer' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMenuClosing(false);
    setIsMenuMounted(true);
    setIsMobileMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMenuClosing(true);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMenuMounted(false);
      setIsMenuClosing(false);
      closeTimeoutRef.current = null;
    }, 460);
  };

  const toggleMenu = () => {
    if (isMobileMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const shouldBeScrolled = scrollY > 15;
      setIsScrolled((prev) => (prev === shouldBeScrolled ? prev : shouldBeScrolled));

      const sectionIds = NAV_ITEMS.map((item) => item.id);
      const scrollPos = scrollY + 180;
      const windowBottom = (window.innerHeight || document.documentElement.clientHeight) + scrollY;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY < 120) {
        setActiveSection((prev) => (prev === 'home' ? prev : 'home'));
        ticking = false;
        return;
      }

      if (windowBottom >= docHeight - 80) {
        setActiveSection((prev) => (prev === 'footer' ? prev : 'footer'));
        ticking = false;
        return;
      }

      let matchedSection = 'home';
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            matchedSection = id;
            break;
          }
        }
      }
      setActiveSection((prev) => (prev === matchedSection ? prev : matchedSection));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollState();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection(id);
    closeMenu();

    const el = document.getElementById(id);
    if (el) {
      const topOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: id === 'home' ? 0 : id === 'footer' ? document.documentElement.scrollHeight : offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand */}
        <a
          href="#home"
          className="nav-brand"
          onClick={(e) => handleNavClick('home', e)}
        >
          <span>hey, i'm Mayiz</span>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="nav-desktop-group">
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="nav-mobile-group">
          <button
            type="button"
            className={`hamburger-btn ${isMobileMenuOpen ? 'is-open' : ''}`}
            onClick={toggleMenu}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-box" aria-hidden="true">
              <span className="hamburger-line line-top" />
              <span className="hamburger-line line-mid" />
              <span className="hamburger-line line-bot" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Symmetrical Open/Close Transitions */}
      {isMenuMounted && (
        <div className={`mobile-menu-dropdown ${isMenuClosing ? 'is-closing' : ''}`}>
          <ul className="mobile-nav-links">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="active-dot" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};
