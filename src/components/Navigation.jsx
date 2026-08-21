import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [progress, setProgress] = useState(0);
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('portfolio-theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    });

    const navRef = useRef(null);
    const observerRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const sections = ['home', 'about', 'projects', 'skills', 'contact'];
        
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-150px 0px -70% 0px',
                threshold: 0
            }
        );

        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observerRef.current.observe(element);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (expanded && menuRef.current) {
            const focusableElements = menuRef.current.querySelectorAll(
                'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }, [expanded]);

    const handleKeyDown = useCallback((e) => {
        if (!expanded || !menuRef.current) return;

        const focusableElements = menuRef.current.querySelectorAll(
            'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Escape') {
            setExpanded(false);
            return;
        }

        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement?.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement?.focus();
            }
        }
    }, [expanded]);

    const closeNav = useCallback(() => setExpanded(false), []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    const toggleNav = useCallback(() => {
        setExpanded(prev => !prev);
    }, []);

    return (
        <>
            <div
                className="scroll-progress-bar"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
            />
            <nav 
                ref={navRef}
                className={`navbar-custom ${scrolled ? 'scrolled' : ''}`} 
                role="navigation" 
                aria-label="Main navigation"
                onKeyDown={handleKeyDown}
            >
                <div className="nav-container">
                    <a href="#home" className="logo" aria-label="Tesfaye Venieri — Home" onClick={closeNav}>
                        <div className="logo-icon-box">
                            <img src="/assets/img/logo.png" alt="TV logo" className="logo-img" />
                        </div>
                        <div className="logo-text-box">Tesfaye</div>
                    </a>

                    <button
                        className="navbar-toggler"
                        onClick={toggleNav}
                        aria-label={expanded ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}
                        aria-expanded={expanded}
                        aria-controls="main-navbar-nav"
                    >
                        <div className={`hamburger ${expanded ? 'active' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>

                    <div 
                        ref={menuRef}
                        className={`nav-collapse ${expanded ? 'expanded' : ''}`} 
                        id="main-navbar-nav"
                        aria-hidden={!expanded}
                        aria-modal={expanded}
                    >
                        <div className="nav-menu">
                            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={closeNav}>Home</a>
                            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={closeNav}>Viaggio</a>
                            <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`} onClick={closeNav}>Lavori</a>
                            <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`} onClick={closeNav}>Toolkit</a>
                            <button 
                                className="theme-toggle" 
                                onClick={toggleTheme} 
                                aria-label={theme === 'dark' ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'} 
                                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                            >
                                {theme === 'dark' ? <FaSun /> : <FaMoon />}
                            </button>
                            <a href="#contact" className="nav-cta" onClick={closeNav}>Parliamo</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
