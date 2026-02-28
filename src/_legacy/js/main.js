// ========================================
// TESFAYE VENIERI - PORTFOLIO
// Main Entry Point
// ========================================

import '../css/style.css'; // Import CSS so Vite bundles it
import 'aos/dist/aos.css'; // Import AOS CSS
import { debounce } from './modules/utils.js';
import { initNavigation, updateActiveNavLink, handleScrollNav } from './modules/navigation.js';
import { initAnimations, animateSkillBars } from './modules/animations.js';
import { initContactForm } from './modules/contact.js';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Modules
    initNavigation();
    initAnimations();
    initContactForm();

    // Console Branding
    console.log('%c👨‍💻 Tesfaye Venieri', 'color: #FF6600; font-size: 24px; font-weight: bold;');
    console.log('%cCoding the Future with Hope', 'color: #003366; font-size: 16px; font-weight: bold;');
    console.log('%cInteressato a lavorare insieme? Contattami: tesfaye.venieri@studio.unibo.it', 'color: #666; font-size: 12px;');

    // Global Scroll Handler with Debounce
    const optimizedScrollHandler = debounce(() => {
        handleScrollNav();
        updateActiveNavLink();
        animateSkillBars();
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);

    // Initial check
    handleScrollNav();
    updateActiveNavLink();
    animateSkillBars();

    console.log('Portfolio initialized successfully with modular structure!');
});
