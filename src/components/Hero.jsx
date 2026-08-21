import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaCaretRight } from 'react-icons/fa';
import Character from '../remotion/components/Character';

const Hero = () => {
    return (
        <section className="hero" id="home" aria-label="Sezione principale">
            <div className="hero-container" id="main-content">
                <div className="hero-grid">
                    {/* LEFT COLUMN — Text Content */}
                    <div className="hero-text-side">
                        <div className="hero-badge hero-load-1">
                            <span className="pulse"></span> Disponibile per stage 2026
                        </div>

                        <h1 className="hero-title">
                            <span className="name-first hero-load-2">Tesfaye</span>
                            <span className="name-second hero-load-3">Venieri</span>
                        </h1>

                        <div className="hero-tagline-wrap">
                            <p className="hero-subtitle hero-load-4">Full-Stack Developer · Informatica per il Management @ UniBo</p>
                            <div className="hero-main-tagline hero-load-4">Coding the Future with Hope</div>
                        </div>

                        <div className="hero-rule hero-load-4"></div>

                        <p className="hero-description hero-load-5">
                            Il ponte tra codice e strategia. Da Addis Abeba a Bologna: 9 progetti reali,
                            dal sistema operativo al mobile Android, dall'architettura database alla web app.
                        </p>

                        <div className="hero-actions hero-load-6">
                            <a href="#projects" className="btn-hyper">
                                <span>Vedi i Progetti</span> <FaCaretRight />
                            </a>
                            <a href="/assets/docs/cv-tesfaye-venieri.pdf" target="_blank" rel="noopener noreferrer" className="btn-hyper-outline" aria-label="Scarica CV in PDF">
                                <FaDownload /> CV.PDF
                            </a>
                        </div>

                        <div className="hero-social-strip hero-load-6">
                            <a href="https://linkedin.com/in/tesfaye-venieri" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn di Tesfaye Venieri"><FaLinkedin /></a>
                            <a href="https://github.com/tesfaye174" target="_blank" rel="noopener noreferrer" aria-label="GitHub di Tesfaye Venieri"><FaGithub /></a>
                            <a href="mailto:tesfaye.venieri@studio.unibo.it" aria-label="Invia email a Tesfaye Venieri"><FaEnvelope /></a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN — Visual Arena */}
                    <div className="hero-visual-side">
                        <div className="hero-glow-ring"></div>

                        <div className="hero-char-stage">
                            <div className="hero-char-wrapper">
                                <Character gesture="idle" emotion="neutral" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Footer */}
            <div className="hero-footer">
                <div className="scroll-down-hint">
                    <div className="line"></div>
                    <span>Scroll to explore</span>
                </div>
                <div className="hero-coordinates">
                    <span className="coord-label">ORIGIN</span>
                    <span className="coord-value">9.03° N, 38.74° E</span>
                    <span className="coord-arrow">→</span>
                    <span className="coord-value">44.49° N, 11.34° E</span>
                </div>
                <div className="tech-stack-teaser">
                    <span>Active stack:</span>
                    <span className="tag">JAVA</span>
                    <span className="tag">KOTLIN</span>
                    <span className="tag">REACT</span>
                    <span className="tag">SQL</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;