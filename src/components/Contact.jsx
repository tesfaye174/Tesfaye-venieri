import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { FaEnvelope, FaLinkedin, FaCaretRight } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: null, message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Invio in corso...' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus({ type: 'success', message: data.message });
                setFormData({ name: '', email: '', message: '' });

                // Clear success message after 5 seconds
                setTimeout(() => setStatus({ type: null, message: '' }), 5000);
            } else {
                throw new Error(data.error || 'Si è verificato un errore durante l\'invio.');
            }
        } catch (error) {
            console.error('Contact Error:', error);
            setStatus({ type: 'danger', message: error.message || 'Errore di connessione. Riprova più tardi.' });
        }
    };

    return (
        <section className="contact" id="contact">
            <Container>
                <Row className="gy-5 align-items-center">
                    <Col lg={5} data-aos="fade-right">
                        <div className="contact-info-side">
                            <h2 className="contact-title" data-label="CONNECT">
                                Parliamo del Tuo <br />
                                <span className="text-gradient">Prossimo Progetto</span>.
                            </h2>
                            <p className="contact-subtitle">
                                Sempre aperto a nuove sfide e collaborazioni nel mondo tech e manageriale.
                            </p>

                            <div className="contact-grid">
                                <div className="contact-card">
                                    <FaEnvelope />
                                    <h4>Email</h4>
                                    <a href="mailto:tesfaye.venieri@studio.unibo.it">Scrivimi</a>
                                </div>
                                <div className="contact-card">
                                    <FaLinkedin />
                                    <h4>LinkedIn</h4>
                                    <a href="https://linkedin.com/in/tesfaye-venieri" target="_blank" rel="noopener noreferrer">Connettiamoci</a>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col lg={7} data-aos="fade-left">
                        <div className="contact-form-side">
                            {status.type && (
                                <Alert variant={status.type === 'success' ? 'success' : 'dark'} className="mb-4">
                                    {status.message}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit} className="contact-form">
                                <div className="input-group">
                                    <label>Nome e Cognome</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Es. Mario Rossi"
                                    />
                                    <div className="input-focus-line"></div>
                                </div>

                                <div className="input-group">
                                    <label>Email Istituzionale / Lavorativa</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Es. mario.rossi@azienda.it"
                                    />
                                    <div className="input-focus-line"></div>
                                </div>

                                <div className="input-group">
                                    <label>Il Tuo Messaggio</label>
                                    <textarea
                                        rows="1"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Come posso aiutarti?"
                                        style={{ overflow: 'hidden' }}
                                    />
                                    <div className="input-focus-line"></div>
                                </div>

                                <button type="submit" className="btn-submit">
                                    Invia Messaggio <FaCaretRight />
                                </button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;
