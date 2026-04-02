const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 ora
const RATE_LIMIT_MAX = 5;

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    // Rate limiting base per IP
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW };

    if (now > entry.resetAt) {
        entry.count = 0;
        entry.resetAt = now + RATE_LIMIT_WINDOW;
    }

    if (entry.count >= RATE_LIMIT_MAX) {
        return res.status(429).json({ success: false, error: 'Troppi messaggi inviati. Riprova tra un\'ora.' });
    }

    entry.count++;
    rateLimitMap.set(ip, entry);

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Vi prego di compilare tutti i campi obbligatori.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, error: 'Formato email non valido.' });
        }

        console.log(`[New Contact] From: ${name.substring(0, 100)} (${email.substring(0, 100)})`);

        res.status(200).json({ success: true, message: 'Messaggio inviato con successo! Grazie per avermi contattato.' });

    } catch (error) {
        console.error('Contact API Error:', error);
        res.status(500).json({ success: false, error: 'Errore interno del server. Riprova più tardi.' });
    }
}
