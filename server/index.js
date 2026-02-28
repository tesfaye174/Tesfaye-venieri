import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// --- SECURITY MIDDLEWARE ---
// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
    max: 100, // max 100 requests per windowMs
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Contact form specific limiter
const contactLimiter = rateLimit({
    max: 5, // max 5 messages per hour per IP
    windowMs: 60 * 60 * 1000,
    message: 'Troppi messaggi inviati. Riprova più tardi.'
});

// Body parser, reading data from body into req.body
app.use(cors());
app.use(bodyParser.json({ limit: '10kb' })); // Limit body size

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Data storage paths
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Ensure messages file exists
if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
}

// --- LOGGING ---
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        message: 'Portfolio API is running securely',
        timestamp: new Date().toISOString()
    });
});

// Contact Form Endpoint
app.post('/api/contact', contactLimiter, (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation (extra layer of sanitization already handled by xss-clean)
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Vi prego di compilare tutti i campi obbligatori.' });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, error: 'Formato email non valido.' });
        }

        // Create new message object
        const newMessage = {
            id: Date.now(),
            date: new Date().toISOString(),
            name: name.substring(0, 100),
            email: email.substring(0, 100),
            message: message.substring(0, 5000)
        };

        // Read existing messages
        const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
        const messages = JSON.parse(data);

        // Add new message
        messages.push(newMessage);

        // Save back to file
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

        console.log(`[New Contact] From: ${name} (${email})`);

        // Success response
        res.json({ success: true, message: 'Messaggio inviato con successo! Grazie per avermi contattato.' });

    } catch (error) {
        console.error('SERVER ERROR (Contact):', error);
        res.status(500).json({ success: false, error: 'Errore interno del server. Riprova più tardi.' });
    }
});

// --- GLOBAL ERROR HANDLING ---
app.use((err, req, res, next) => {
    console.error('FATAL ERROR:', err.stack);
    res.status(500).json({ success: false, error: 'Qualcosa è andato storto nel server.' });
});

app.listen(PORT, () => {
    console.log(`🚀 Secure API Server running on http://localhost:${PORT}`);
});
