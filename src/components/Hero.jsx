import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaCaretRight } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className="hero" id="home" aria-label="Sezione principale">
            <div className="hero-grid-bg"></div>

            <Container className="hero-container">
                <Row className="align-items-center gy-5">
                    <Col lg={7}>
                        <div className="hero-text-side">
                            <div className="hero-badge" data-aos="fade-down">
                                <span className="pulse"></span> Disponibile per stage 2026
                            </div>

                            <h1 className="hero-title" data-aos="fade-up">
                                <span className="name-first">Tesfaye</span>
                                <span className="name-second">Venieri</span>
                            </h1>

                            <div className="hero-tagline-wrap" data-aos="fade-up" data-aos-delay="100">
                                <p className="hero-subtitle">Full-Stack Developer · Informatica per il Management @ UniBo</p>
                                <div className="hero-main-tagline">Coding the Future with Hope</div>
                            </div>

                            <div className="hero-rule" data-aos="fade-up" data-aos-delay="150"></div>

                            <p className="hero-description" data-aos="fade-up" data-aos-delay="200">
                                Il ponte tra codice e strategia. Da Addis Abeba a Bologna: 9 progetti reali,
                                dal sistema operativo al mobile Android, dall'architettura database alla web app.
                            </p>

                            <div className="hero-actions" data-aos="fade-up" data-aos-delay="300">
                                <a href="#projects" className="btn-hyper">
                                    <span>Vedi i Progetti</span> <FaCaretRight />
                                </a>
                                <a href="/assets/docs/cv-tesfaye-venieri.pdf" target="_blank" rel="noopener noreferrer" className="btn-hyper-outline" aria-label="Scarica CV in PDF">
                                    <FaDownload /> CV.PDF
                                </a>
                            </div>

                            <div className="hero-social-strip" data-aos="fade-up" data-aos-delay="400">
                                <a href="https://linkedin.com/in/tesfaye-venieri" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn di Tesfaye Venieri"><FaLinkedin /></a>
                                <a href="https://github.com/tesfaye174" target="_blank" rel="noopener noreferrer" aria-label="GitHub di Tesfaye Venieri"><FaGithub /></a>
                                <a href="mailto:tesfaye.venieri@studio.unibo.it" aria-label="Invia email a Tesfaye Venieri"><FaEnvelope /></a>
                            </div>
                        </div>
                    </Col>

                    <Col lg={5} data-aos="zoom-out" data-aos-delay="200">
                        <div className="hero-visual-side">
                            <div className="hero-visual-container">
                                <img src="/assets/img/image.png" alt="Illustrazione tecnica astratta" className="hero-main-visual" loading="eager" />
                                <div className="visual-glitch-border"></div>
                                <div className="visual-float-marker marker-1">001_DEV</div>
                                <div className="visual-float-marker marker-2">002_MNG</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

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
