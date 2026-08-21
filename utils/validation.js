/**
 * Shared validation module for the contact form.
 * Pure functions with no side effects or external dependencies.
 * Compatible with both browser and Node.js environments.
 */

/**
 * Sanitizes contact form fields by trimming and truncating each value.
 * @param {{ name: string, email: string, message: string }} data - The raw form data to sanitize.
 * @returns {{ name: string, email: string, message: string }} The sanitized fields:
 *   - name: trimmed and truncated to 100 characters
 *   - email: trimmed and truncated to 100 characters
 *   - message: trimmed and truncated to 5000 characters
 */
export function sanitizeContactFields({ name, email, message }) {
  return {
    name: typeof name === 'string' ? name.trim().substring(0, 100) : '',
    email: typeof email === 'string' ? email.trim().substring(0, 100) : '',
    message: typeof message === 'string' ? message.trim().substring(0, 5000) : '',
  };
}
/**
 * Validates the name field.
 * @param {string} name - The name to validate.
 * @returns {{ valid: boolean, error: string | null }} Validation result.
 */
export function validateName(name) {
  const trimmed = typeof name === 'string' ? name.trim() : '';

  if (trimmed.length < 2) {
    return { valid: false, error: 'Il nome deve contenere almeno 2 caratteri.' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Il nome non può superare i 100 caratteri.' };
  }

  return { valid: true, error: null };
}

/**
 * Validates the email field using a simplified but robust RFC 5322 compliant regex.
 * Supports multiple subdomains and TLDs with at least 2 characters.
 * @param {string} email - The email to validate.
 * @returns {{ valid: boolean, error: string | null }} Validation result.
 */
export function validateEmail(email) {
  const trimmed = typeof email === 'string' ? email.trim() : '';

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

  if (!trimmed) {
    return { valid: false, error: 'L\'email è obbligatoria.' };
  }

  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Inserisci un indirizzo email valido.' };
  }

  return { valid: true, error: null };
}

/**
 * Validates the message field.
 * @param {string} message - The message to validate.
 * @returns {{ valid: boolean, error: string | null }} Validation result.
 */
export function validateMessage(message) {
  const trimmed = typeof message === 'string' ? message.trim() : '';

  if (trimmed.length < 10) {
    return { valid: false, error: 'Il messaggio deve contenere almeno 10 caratteri.' };
  }

  if (trimmed.length > 2000) {
    return { valid: false, error: 'Il messaggio non può superare i 2000 caratteri.' };
  }

  return { valid: true, error: null };
}

/**
 * Validates the entire contact form.
 * @param {{ name: string, email: string, message: string }} data - The form data to validate.
 * @returns {{ valid: boolean, errors: { name: string | null, email: string | null, message: string | null } }} Validation result.
 */
export function validateContactForm(data) {
  const nameResult = validateName(data.name);
  const emailResult = validateEmail(data.email);
  const messageResult = validateMessage(data.message);

  const errors = {
    name: nameResult.error,
    email: emailResult.error,
    message: messageResult.error,
  };

  return {
    valid: nameResult.valid && emailResult.valid && messageResult.valid,
    errors,
  };
}

