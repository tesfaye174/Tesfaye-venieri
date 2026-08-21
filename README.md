# Tesfaye Venieri - Portfolio

Personal portfolio website built with React + Vite.

**Live:** [tesfayevenieri.vercel.app](https://tesfayevenieri.vercel.app/)

## Tech Stack

- **Frontend:** React 18, React Icons, AOS
- **Build:** Vite 5, Terser
- **Backend:** Express.js (local dev), Vercel Serverless Functions (production)
- **Deploy:** Vercel

## Getting Started

```bash
# Installa dipendenze
npm install

# Avvia frontend (dev server su porta 3000)
npm run dev

# Avvia backend locale (Express su porta 3001)
npm run server
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run server` | Start Express backend |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## Project Structure

```text
src/
  components/    # React components (Hero, About, Skills, Projects, Contact, etc.)
  css/
    base/        # Variables, reset, typography
    layout/      # Navbar, footer
    components/  # Buttons, cards
    pages/       # Hero, sections, contact
    modules/     # Utilities
  remotion/      # Remotion video scenes
utils/           # Validazione e utility condivise (client + server)
server/          # Express backend (local dev)
api/             # Vercel serverless functions
public/          # Static assets
```

## Ambiente Online vs Offline

### Online (Produzione - Vercel)
- **Piattaforma:** Vercel Serverless Functions
- **Frontend:** SPA statica servita da Vercel (`dist/`)
- **Backend:** `api/contact.js` — funzione serverless
- **Persistence:** Nessuna persistenza garantita (i messaggi vengono loggati su console Vercel e salvati in `/tmp` ephemeral)
- **Sicurezza:** Headers di sicurezza impostati manualmente, rate limiting basato su Map in memoria (non globale tra istanze), validazione centralizzata
- **Limitazioni:** Il rate limiting non è globale in ambiente serverless. Per produzione è consigliato un servizio esterno (es. Vercel KV / Upstash Redis). Per persistenza duratura, integrare un database (es. Supabase, Firebase) o un servizio email (Nodemailer).

### Offline (Sviluppo Locale)
- **Piattaforma:** PC locale con Node.js
- **Frontend:** Vite dev server (porta 3000)
- **Backend:** `server/index.js` — Express.js (porta 3001)
- **Persistence:** File `server/messages.json` (con scrittura atomica)
- **Sicurezza:** Helmet, CORS limitato a localhost e dominio produzione, rate-limit globale e specifico per contatto, sanitizzazione XSS/NoSQL, logging PII mascherato
- **Proxy:** Vite inoltra `/api` a `localhost:3001`

### Tabella di confronto

| Aspetto | Online (Vercel) | Offline (Locale) |
| ------- | --------------- | ---------------- |
| Runtime | Serverless | Express |
| Porta | 443 (HTTPS) | 3000 (frontend), 3001 (backend) |
| CORS | Whitelist di domini | Whitelist di domini |
| Rate Limit | Map in memoria (per-istanza) | express-rate-limit (globale) |
| Persistenza | `/tmp` ephemeral | `messages.json` (filesystem locale) |
| Logging | PII-safe | PII-safe, mascherato |
| Headers sicurezza | Impostati manualmente | Helmet + headers manuali |

## Note di Sicurezza

- **Variabili d'ambiente:** Il file `.env` è in `.gitignore`. In produzione su Vercel, configura le variabili d'ambiente nel dashboard di Vercel (Impostazioni > Environment Variables).
- **Dati sensibili:** `server/messages.json` contiene dati PII (nome, email, messaggio). Non committarlo in repository pubblici.
- **Rate limiting:** In produzione il rate limiting non è globale. Per carichi elevati, integrare Vercel KV o un servizio esterno.
- **Persistenza:** In produzione i messaggi non sono persistenti tra istanze serverless. Integrare un database esterno per storage duraturo.
- **Sanificazione:** Tutti gli input sono sanificati sia lato client che lato server. Validazione centralizzata in `utils/validation.js`.
- **Logging:** I log mascherano le informazioni personali (PII) per evitare esposizione accidentale.

## Author

**Tesfaye Venieri** - Informatica per il Management @ UniBo

- [LinkedIn](https://linkedin.com/in/tesfaye-venieri)
- [GitHub](https://github.com/tesfaye174)
