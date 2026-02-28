import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaTerminal } from 'react-icons/fa';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active section tracking
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeNav = () => setExpanded(false);

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
            expanded={expanded}
            onToggle={(isExpanded) => setExpanded(isExpanded)}
        >
            <Container className="nav-container">
                <Navbar.Brand href="#home" className="logo" aria-label="Tesfaye Venieri Home">
                    <div className="logo-icon-box">
                        <FaTerminal />
                    </div>
                    <div className="logo-text-box">
                        Tesfaye
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="navbar-toggler"
                    aria-label="Toggle navigation"
                >
                    <div className={`hamburger ${expanded ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto nav-menu">
                        <Nav.Link
                            href="#home"
                            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                            onClick={closeNav}
                        >
                            // Home
                        </Nav.Link>
                        <Nav.Link
                            href="#about"
                            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                            onClick={closeNav}
                        >
                            // Viaggio
                        </Nav.Link>
                        <Nav.Link
                            href="#skills"
                            className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                            onClick={closeNav}
                        >
                            // Toolkit
                        </Nav.Link>
                        <Nav.Link
                            href="#projects"
                            className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                            onClick={closeNav}
                        >
                            // Lavori
                        </Nav.Link>
                        <Nav.Link
                            href="#contact"
                            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                            onClick={closeNav}
                        >
                            // Contatti
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
