import { validateContactForm } from '../utils/validation.js';
import fs from 'fs';

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 ora
const RATE_LIMIT_MAX = 5;

const ALLOWED_ORIGINS = [
    'https://tesfayevenieri.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
];

const TMP_MESSAGES_PATH = '/tmp/messages.json';

export default function handler(req, res) {
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none';");

    // CORS handling
    const origin = req.headers.origin;
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Metodo non consentito.' });
    }

    // Rate limiting
    // NOTA: il rate limiting basato su Map in memoria non è globale in ambiente
    // serverless (es. Vercel con istanze multiple). Per produzione è consigliato
    // un servizio esterno come Upstash Redis o Vercel KV.
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW };

    if (now > entry.resetAt) {
        entry.count = 0;
        entry.resetAt = now + RATE_LIMIT_WINDOW;
    }

    if (entry.count >= RATE_LIMIT_MAX) {
        res.setHeader('Retry-After', Math.ceil((entry.resetAt - now) / 1000).toString());
        return res.status(429).json({ success: false, error: 'Troppi messaggi inviati. Riprova tra un'\''ora.' });
    }

    entry.count++;
    rateLimitMap.set(ip, entry);

    try {
        const { name, email, message } = req.body || {};

        const validation = validateContactForm({ name, email, message });
        if (!validation.valid) {
            const fieldErrors = Object.entries(validation.errors)
                .filter(([, error]) => error !== null)
                .map(([field, error]) => ({ field, error }));

            const firstError = fieldErrors[0];
            return res.status(400).json({
                success: false,
                error: firstError ? firstError.error : 'Dati del modulo non validi.',
                errors: validation.errors,
            });
        }

        const maskedIp = typeof ip === 'string' ? ip.substring(0, 8) + '***' : '***';
        const partialName = typeof name === 'string' ? name.trim().substring(0, 2) + '***' : '***';
        console.log(`[New Contact] IP: ${maskedIp} | Nome: ${partialName}`);

        // Persistenza minima in produzione
        // NOTA: In Vercel il filesystem è ephemeral; i dati salvati in /tmp potrebbero
        // essere persi tra istanze o deploy. Questo è solo un fallback best-effort.
        try {
            const messages = fs.existsSync(TMP_MESSAGES_PATH)
                ? JSON.parse(fs.readFileSync(TMP_MESSAGES_PATH, 'utf-8'))
                : [];

            messages.push({
                name: name.trim(),
                email: email.trim(),
                message: message.trim(),
                receivedAt: new Date().toISOString(),
                ip,
            });

            fs.writeFileSync(TMP_MESSAGES_PATH, JSON.stringify(messages, null, 2));
        } catch (ioError) {
            console.error('Contact API: errore salvataggio messaggio su /tmp:', ioError);
        }

        return res.status(200).json({ success: true, message: 'Messaggio inviato con successo! Grazie per avermi contattato.' });

    } catch (error) {
        console.error('Contact API Error:', error);
        return res.status(500).json({ success: false, error: 'Errore interno del server. Riprova più tardi.' });
    }
}
