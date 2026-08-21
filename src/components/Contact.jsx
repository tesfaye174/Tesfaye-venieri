import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaCaretRight } from 'react-icons/fa';
import { validateContactForm } from '../../utils/validation.js';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ type: null, message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState({});
    const textareaRef = useRef(null);
    const debounceRef = useRef(null);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                const { errors: formErrors } = validateContactForm(formData);
                setErrors(formErrors);
            }, 300);
        }
    }, [touched, formData]);

    const handleBlur = useCallback((e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const { errors: formErrors } = validateContactForm(formData);
        setErrors(formErrors);
    }, [formData]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [formData.message]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setTouched({ name: true, email: true, message: true });

        const { valid, errors: formErrors } = validateContactForm(formData);
        setErrors(formErrors);

        if (!valid) {
            setStatus({ type: 'danger', message: 'Controlla i campi evidenziati.' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: 'info', message: 'Invio in corso...' });

        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Errore di timeout durante l\'invio. Riprova più tardi.')), 30000)
        );

        try {
            const response = await Promise.race([
                fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }),
                timeout,
            ]);

            const data = await response.json();

            if (response.ok && data.success) {
                setStatus({ type: 'success', message: data.message });
                setFormData({ name: '', email: '', message: '' });
                setErrors({});
                setTouched({});
                setTimeout(() => setStatus({ type: null, message: '' }), 5000);
            } else {
                throw new Error(data.error || 'Si è verificato un errore durante l\'invio.');
            }
        } catch (error) {
            setStatus({ type: 'danger', message: error.message || 'Errore di connessione. Riprova più tardi.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-info" data-aos="fade-right">
                        <h2 className="contact-title">
                            Cerco Stage.<br />
                            Parliamo.
                        </h2>
                        <p className="contact-subtitle">
                            Cerco opportunità di stage 2026 dove unire competenze full-stack e visione strategica.
                            Scrivi pure in italiano, inglese o amarico.
                        </p>

                        <div className="contact-cards">
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

                    <div className="contact-form-side" data-aos="fade-left">
                        {status.type && (
                            <div className={`contact-alert contact-alert--${status.type}`} role="alert">
                                {status.message}
                            </div>
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
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Es. Mario Rossi"
                                    aria-required="true"
                                    aria-invalid={!!errors.name}
                                    className={errors.name ? 'is-invalid' : ''}
                                />
                                <div className="input-focus-line" aria-hidden="true"></div>
                                {errors.name && <div className="error-message">{errors.name}</div>}
                            </div>

                            <div className="form-field">
                                <label htmlFor="contact-email">Email</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Es. mario.rossi@azienda.it"
                                    aria-required="true"
                                    aria-invalid={!!errors.email}
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    className={errors.email ? 'is-invalid' : ''}
                                />
                                <div className="input-focus-line" aria-hidden="true"></div>
                                {errors.email && <div className="error-message">{errors.email}</div>}
                            </div>

                            <div className="form-field">
                                <label htmlFor="contact-message">Messaggio</label>
                                <textarea
                                    ref={textareaRef}
                                    id="contact-message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Di cosa hai bisogno?"
                                    className={`contact-textarea ${errors.message ? 'is-invalid' : ''}`}
                                    aria-required="true"
                                    aria-invalid={!!errors.message}
                                />
                                <div className="input-focus-line" aria-hidden="true"></div>
                                {errors.message && <div className="error-message">{errors.message}</div>}
                            </div>

                            <button type="submit" className="btn-submit" disabled={isLoading} aria-label="Invia il messaggio">
                                {isLoading ? 'Invio in corso...' : <><span>Invia Messaggio</span> <FaCaretRight aria-hidden="true" /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;


