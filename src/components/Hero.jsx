import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload, FaCaretRight } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-grid-bg"></div>

            <Container className="hero-container">
                <Row className="align-items-center gy-5">
                    <Col lg={7}>
                        <div className="hero-text-side">
                            <div className="hero-badge" data-aos="fade-down">
                                <span className="pulse"></span> Available for new challenges 2026
                            </div>

                            <h1 className="hero-title" data-aos="fade-up">
                                Tesfaye Venieri
                            </h1>

                            <div className="hero-tagline-wrap" data-aos="fade-up" data-aos-delay="100">
                                <p className="hero-subtitle">Studente di Informatica per il Management @ UniBo</p>
                                <div className="hero-main-tagline">Coding the Future with Hope</div>
                            </div>

                            <p className="hero-description" data-aos="fade-up" data-aos-delay="200">
                                Da Addis Abeba a Bologna: unisco il rigore del codice alla visione strategica del management.
                                9 progetti reali, dalla progettazione database al mobile Android.
                            </p>

                            <div className="hero-actions" data-aos="fade-up" data-aos-delay="300">
                                <a href="#projects" className="btn-hyper">
                                    <span>Vedi i Progetti</span> <FaCaretRight />
                                </a>
                                <a href="/assets/docs/cv-tesfaye-venieri.pdf" target="_blank" rel="noopener noreferrer" className="btn-hyper-outline">
                                    <FaDownload /> CV.PDF
                                </a>
                            </div>

                            <div className="hero-social-strip" data-aos="fade-up" data-aos-delay="400">
                                <a href="https://linkedin.com/in/tesfaye-venieri" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                                <a href="https://github.com/tesfaye174" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                                <a href="mailto:tesfaye.venieri@studio.unibo.it"><FaEnvelope /></a>
                            </div>
                        </div>
                    </Col>

                    <Col lg={5} data-aos="zoom-out" data-aos-delay="200">
                        <div className="hero-visual-side">
                            <div className="hero-visual-container">
                                <img src="/assets/img/img1.png" alt="Tech Abstract" className="hero-main-visual" loading="eager" />
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
