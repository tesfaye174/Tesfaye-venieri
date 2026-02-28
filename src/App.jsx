import React, { useEffect } from 'react';
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
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });

        // Console Branding
        console.log('%c👨‍💻 Tesfaye Venieri', 'color: #FF6600; font-size: 24px; font-weight: bold;');
        console.log('%cCoding the Future with Hope', 'color: #003366; font-size: 16px; font-weight: bold;');
    }, []);

    return (
        <div className="app">
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
