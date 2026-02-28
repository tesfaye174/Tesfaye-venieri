import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaCaretUp } from 'react-icons/fa';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-top-border"></div>

            <Container className="footer-main">
                <Row className="gy-5">
                    <Col lg={6} className="footer-column footer-logo">
                        <h2>TESFAYE<br />VENIERI</h2>
                        <p>Studente di Informatica per il Management presso l'Università di Bologna. Sviluppo soluzioni tecnologiche per il business del futuro.</p>
                    </Col>

                    <Col lg={3} className="footer-column">
                        <span className="footer-heading">Navigazione</span>
                        <div className="footer-links">
                            <a href="#home">Home</a>
                            <a href="#about">Viaggio</a>
                            <a href="#skills">Toolkit</a>
                            <a href="#projects">Lavori</a>
                        </div>
                    </Col>

                    <Col lg={3} className="footer-column">
                        <span className="footer-heading">Social</span>
                        <div className="footer-social-grid">
                            <a href="https://github.com/tesfaye174" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Github"><FaGithub /></a>
                            <a href="https://linkedin.com/in/tesfaye-venieri" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn"><FaLinkedin /></a>
                            <a href="mailto:tesfaye.venieri@studio.unibo.it" className="footer-social-link" aria-label="Email"><FaEnvelope /></a>
                            <button onClick={scrollToTop} className="footer-social-link" aria-label="Scroll to top"><FaCaretUp /></button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div className="footer-bottom">
                <Container>
                    <div className="footer-bottom-content">
                        <span>© 2026 // DESIGNED & CODED BY TV.</span>
                        <span><FaCode /> BUILT WITH REACT + VITE</span>
                        <span className="status-badge"><span className="pulse"></span> SYSTEM_ONLINE</span>
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
