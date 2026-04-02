import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { FaEnvelope, FaLinkedin, FaGithub, FaCaretRight } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: null, message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: 'info', message: 'Invio in corso...' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus({ type: 'success', message: data.message });
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus({ type: null, message: '' }), 5000);
            } else {
                throw new Error(data.error || 'Si è verificato un errore durante l\'invio.');
            }
        } catch (error) {
            console.error('Contact Error:', error);
            setStatus({ type: 'danger', message: error.message || 'Errore di connessione. Riprova più tardi.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="contact" id="contact">
            <Container>
                <Row className="gy-5 align-items-center">
                    <Col lg={5} data-aos="fade-right">
                        <div className="contact-info-side">
                            <h2 className="contact-title">
                                Cerco Stage.<br />
                                Parliamo.
                            </h2>
                            <p className="contact-subtitle">
                                Cerco opportunità di stage 2026 dove unire competenze full-stack e visione strategica.
                                Scrivi pure in italiano, inglese o amarico.
                            </p>

                            <div className="contact-grid">
                                <div className="contact-card">
                                    <FaEnvelope aria-hidden="true" />
                                    <h4>Email</h4>
                                    <a href="mailto:tesfaye.venieri@studio.unibo.it" aria-label="Invia email a Tesfaye Venieri">Scrivimi</a>
                                </div>
                                <div className="contact-card">
                                    <FaLinkedin aria-hidden="true" />
                                    <h4>LinkedIn</h4>
                                    <a href="https://linkedin.com/in/tesfaye-venieri" target="_blank" rel="noopener noreferrer" aria-label="Profilo LinkedIn di Tesfaye Venieri">Connettiamoci</a>
                                </div>
                                <div className="contact-card">
                                    <FaGithub aria-hidden="true" />
                                    <h4>GitHub</h4>
                                    <a href="https://github.com/tesfaye174" target="_blank" rel="noopener noreferrer" aria-label="Profilo GitHub di Tesfaye Venieri">Guarda il codice</a>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col lg={7} data-aos="fade-left">
                        <div className="contact-form-side">
                            {status.type && (
                                <Alert variant={status.type === 'success' ? 'success' : 'dark'} className="mb-4" role="alert">
                                    {status.message}
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="contact-form" noValidate>
                                <div className="form-field">
                                    <label htmlFor="contact-name">Nome e Cognome</label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Es. Mario Rossi"
                                        aria-required="true"
                                    />
                                    <div className="input-focus-line" aria-hidden="true"></div>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="contact-email">Email</label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Es. mario.rossi@azienda.it"
                                        aria-required="true"
                                    />
                                    <div className="input-focus-line" aria-hidden="true"></div>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="contact-message">Messaggio</label>
                                    <textarea
                                        id="contact-message"
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                                        placeholder="Di cosa hai bisogno?"
                                        style={{ overflow: 'hidden', resize: 'none' }}
                                        aria-required="true"
                                    />
                                    <div className="input-focus-line" aria-hidden="true"></div>
                                </div>

                                <button type="submit" className="btn-submit" disabled={isLoading} aria-label="Invia il messaggio">
                                    {isLoading ? 'Invio in corso...' : <><span>Invia Messaggio</span> <FaCaretRight aria-hidden="true" /></>}
                                </button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;
