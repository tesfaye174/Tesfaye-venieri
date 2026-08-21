import React, { useEffect, useState, useCallback } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleVisibility = useCallback(() => {
        if (window.scrollY > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [toggleVisibility]);

    const scrollToTop = (e) => {
        e.preventDefault();
        setIsAnimating(true);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setTimeout(() => setIsAnimating(false), 800);
    };

    return (
        <a
            href="#"
            id="scroll-to-top"
            className={`scroll-to-top ${isVisible ? 'visible' : ''} ${isAnimating ? 'animating' : ''}`}
            onClick={scrollToTop}
            aria-label="Torna su"
            title="Torna su"
        >
            <FaArrowUp />
        </a>
    );
};

export default ScrollToTop;
