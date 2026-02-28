// ========================================
// CONTACT MODULE
// ========================================

import { showNotification } from './utils.js';

export function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Loading state
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.style.cursor = 'not-allowed';

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Send data to API
            // Note: In dev, Vite proxy handles /api -> localhost:3001
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show success message
                        showNotification(data.message, 'success');
                        // Reset form
                        contactForm.reset();
                    } else {
                        // Show error message
                        showNotification(data.error || 'Errore durante l\'invio.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showNotification('Errore di connessione. Riprova più tardi.', 'error');
                })
                .finally(() => {
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                });
        });
    }
}
