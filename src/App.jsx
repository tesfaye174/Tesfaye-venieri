import React, { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './css/style.css';

// Components
import Navigation from './components/Navigation';
import HeroCanvas from './components/HeroCanvas';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const interactablesRef = useRef([]);

    const prefersReducedMotion = useCallback(() => 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches, 
        []
    );

    useEffect(() => {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothTouch: false,
            touchMultiplier: 2,
        });

        let lenisRafId;
        const raf = (time) => {
            lenis.raf(time);
            lenisRafId = requestAnimationFrame(raf);
        };
        lenisRafId = requestAnimationFrame(raf);

        AOS.init({
            duration: 900,
            easing: 'ease-out-quart',
            once: true,
            offset: 80,
            delay: 0,
        });

        // Console Branding
        if (import.meta.env.DEV) {
            console.log('%c✦ Tesfaye Venieri', 'color: #C89B3C; font-size: 24px; font-weight: bold;');
            console.log('%cCoding the Future with Hope', 'color: #A89F96; font-size: 16px; font-weight: 300;');
        }

        // Custom cursor (desktop only)
        const dot = cursorDotRef.current;
        const ring = cursorRingRef.current;

        let cursorRafId;
        let onMouseMove, onEnter, onLeave;

        if (dot && ring && !prefersReducedMotion()) {
            let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

            onMouseMove = (e) => {
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
                cursorRafId = requestAnimationFrame(animateRing);
            };

            onEnter = () => {
                dot.classList.add('cursor--hover');
                ring.classList.add('cursor-ring--hover');
            };

            onLeave = () => {
                dot.classList.remove('cursor--hover');
                ring.classList.remove('cursor-ring--hover');
            };

            document.addEventListener('mousemove', onMouseMove);
            cursorRafId = requestAnimationFrame(animateRing);

            interactablesRef.current = document.querySelectorAll('a, button, .project-card-mini, .skill-category, .stat-card, .contact-card');
            interactablesRef.current.forEach(el => {
                el.addEventListener('mouseenter', onEnter);
                el.addEventListener('mouseleave', onLeave);
            });
        }

        return () => {
            // Cleanup Lenis
            cancelAnimationFrame(lenisRafId);
            lenis.destroy();

            // Cleanup cursor
            if (onMouseMove) document.removeEventListener('mousemove', onMouseMove);
            if (cursorRafId) cancelAnimationFrame(cursorRafId);
            interactablesRef.current.forEach(el => {
                if (onEnter && onLeave) {
                    el.removeEventListener('mouseenter', onEnter);
                    el.removeEventListener('mouseleave', onLeave);
                }
            });
        };
    }, [prefersReducedMotion]);

    return (
        <div className="app">
            <Preloader />
            <ErrorBoundary>
                <HeroCanvas />
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
            </ErrorBoundary>
        </div>
    );
};

export default App;
