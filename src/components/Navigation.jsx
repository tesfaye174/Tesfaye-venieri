import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
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

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

            const sections = ['home', 'about', 'projects', 'skills', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeNav = () => setExpanded(false);
    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    return (
        <>
            <div
                className="scroll-progress-bar"
                style={{ width: `${progress}%` }}
                aria-hidden="true"
            />
            <Navbar
                expand="lg"
                fixed="top"
                className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
                expanded={expanded}
                onToggle={(isExpanded) => setExpanded(isExpanded)}
            >
                <Container className="nav-container">
                    <Navbar.Brand href="#home" className="logo" aria-label="Tesfaye Venieri — Home">
                        <div className="logo-icon-box">
                            <img src="/assets/img/logo.png" alt="TV logo" className="logo-img" />
                        </div>
                        <div className="logo-text-box">Tesfaye</div>
                    </Navbar.Brand>

                    <Navbar.Toggle
                        aria-controls="main-navbar-nav"
                        className="navbar-toggler"
                        aria-label="Apri menu di navigazione"
                    >
                        <div className={`hamburger ${expanded ? 'active' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Navbar.Toggle>

                    <Navbar.Collapse id="main-navbar-nav">
                        <Nav className="ms-auto nav-menu align-items-lg-center">
                            <Nav.Link
                                href="#home"
                                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                                onClick={closeNav}
                                aria-label="Vai all'inizio"
                            >
                                // Home
                            </Nav.Link>
                            <Nav.Link
                                href="#about"
                                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                                onClick={closeNav}
                                aria-label="Vai al viaggio"
                            >
                                // Viaggio
                            </Nav.Link>
                            <Nav.Link
                                href="#projects"
                                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                                onClick={closeNav}
                                aria-label="Vai ai progetti"
                            >
                                // Lavori
                            </Nav.Link>
                            <Nav.Link
                                href="#skills"
                                className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                                onClick={closeNav}
                                aria-label="Vai alle competenze"
                            >
                                // Toolkit
                            </Nav.Link>
                            <button
                                className="theme-toggle"
                                onClick={toggleTheme}
                                aria-label={theme === 'dark' ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'}
                                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                            >
                                {theme === 'dark' ? <FaSun /> : <FaMoon />}
                            </button>
                            <a
                                href="#contact"
                                className="nav-cta"
                                onClick={closeNav}
                                aria-label="Vai ai contatti"
                            >
                                Parliamo
                            </a>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;
