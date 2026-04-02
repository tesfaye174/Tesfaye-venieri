import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

// Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 900,
            easing: 'ease-out-quart',
            once: true,
            offset: 80,
            delay: 0,
        });

        // Console Branding
        if (import.meta.env.DEV) {
            console.log('%c✦ Tesfaye Venieri', 'color: #D4A84B; font-size: 24px; font-weight: bold;');
            console.log('%cCoding the Future with Hope', 'color: #A89F96; font-size: 16px; font-weight: 300;');
        }

        // Custom cursor (desktop only)
        const dot = cursorDotRef.current;
        const ring = cursorRingRef.current;
        if (!dot || !ring) return;

        let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0, rafId;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        };

        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.11;
            ringY += (mouseY - ringY) * 0.11;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            rafId = requestAnimationFrame(animateRing);
        };

        const onEnter = () => {
            dot.classList.add('cursor--hover');
            ring.classList.add('cursor-ring--hover');
        };
        const onLeave = () => {
            dot.classList.remove('cursor--hover');
            ring.classList.remove('cursor-ring--hover');
        };

        document.addEventListener('mousemove', onMouseMove);
        rafId = requestAnimationFrame(animateRing);

        const interactables = document.querySelectorAll('a, button, .project-card-mini, .skill-category, .stat-card, .contact-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="app">
            <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true"></div>
            <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true"></div>
            <a href="#main-content" className="skip-link">Salta al contenuto</a>
            <Navigation />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default App;
