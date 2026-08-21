import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import mongoSanitize from 'mongo-sanitize';
import { validateContactForm, sanitizeContactFields } from '../utils/validation.js';

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
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Contact form specific limiter
const contactLimiter = rateLimit({
    max: 10,
    windowMs: 60 * 60 * 1000,
    message: { success: false, error: 'Troppi messaggi inviati. Riprova più tardi.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// CORS - solo origini consentite
const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://tesfayevenieri.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origine non consentita dal CORS'), false);
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Data storage paths
const MESSAGES_FILE = path.join(__dirname, 'messages.json');
// messages.json è un file sensibile che contiene dati PII (nome, email, messaggio).
// Assicurati che non venga committato in repository pubblici. Verificare .gitignore.

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

        // Validation estratta in utility
        const validationError = validateContactForm({ name, email, message });
        if (validationError) {
            return res.status(400).json({
                success: false,
                field: validationError.field,
                error: validationError.error
            });
        }

        // Sanitizzazione campi
        const sanitized = sanitizeContactFields({ name, email, message });

        // Create new message object (senza subject, non gestito dal backend)
        const newMessage = {
            id: Date.now(),
            date: new Date().toISOString(),
            name: sanitized.name,
            email: sanitized.email,
            message: sanitized.message
        };

        // Read existing messages
        const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
        const messages = JSON.parse(data);

        // Add new message
        messages.push(newMessage);

        // Scrittura atomica: scrivi su file temporaneo e rinomina
        const tmpFile = MESSAGES_FILE + '.tmp';
        try {
            fs.writeFileSync(tmpFile, JSON.stringify(messages, null, 2));
            fs.renameSync(tmpFile, MESSAGES_FILE);
        } catch (writeError) {
            console.error('Errore scrittura messages.json:', writeError);
            return res.status(500).json({
                success: false,
                error: 'Errore interno del server durante il salvataggio. Riprova più tardi.'
            });
        }

        // Log contatto con PII mascherata
        const maskedName = sanitized.name.substring(0, 2) + '***';
        const maskedEmail = sanitized.email.substring(0, 2) + '***';
        console.log(`[New Contact] Name: ${maskedName}, Email: ${maskedEmail}`);

        // Success response
        res.json({ success: true, message: 'Messaggio inviato con successo! Grazie per avermi contattato.' });

    } catch (error) {
        console.error('SERVER ERROR (Contact):', error);
        // Gestione robusta: non inviare risposta se headers già inviati
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                error: 'Errore interno del server. Riprova più tardi.'
            });
        } else {
            res.end('Internal Server Error');
        }
    }
});

// --- GLOBAL ERROR HANDLING ---
app.use((err, req, res, next) => {
    console.error('FATAL ERROR:', err.stack);
    if (!res.headersSent) {
        res.status(500).json({ success: false, error: 'Qualcosa è andato storto nel server.' });
    } else {
        res.end('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Secure API Server running on http://localhost:${PORT}`);
});
