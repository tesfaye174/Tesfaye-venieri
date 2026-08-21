# Remotion Animation Setup - Portfolio

Questo è un setup completo di Remotion per aggiungere animazioni professionali al tuo portfolio con un **personaggio animato 3D-style** che guida i visitatori.

## 📁 Struttura

```
src/remotion/
├── components/
│   ├── Character.jsx          # Componente 3D-style del personaggio
│   └── Character.css          # Styling del personaggio
├── animations/
│   └── useCharacterAnimation.js  # Hook per gestire le animazioni
├── scenes/
│   └── PortfolioIntroScene.jsx   # Scena Remotion principale
├── styles/
│   ├── SceneStyles.css        # Stili della scena
│   ├── RemotionPlayer.css     # Stili del player
│   └── CharacterHeroScene.css # Stili della scena Hero
├── CharacterHeroScene.jsx      # Versione React semplificata (CONSIGLIATA)
├── RemotionPlayer.jsx          # Player Remotion custom
├── PortfolioIntro.jsx          # Composizione Remotion
└── README.md                   # Questo file
```

## 🚀 Opzioni di Integrazione

### Opzione 1: CharacterHeroScene (CONSIGLIATA ⭐)
**Versione semplificata che usa solo React - NO Remotion server necessario**

```jsx
// Aggiungi al Hero.jsx
import CharacterHeroScene from './remotion/CharacterHeroScene';

// Sostituisci il contenuto o aggiungi una sezione:
<CharacterHeroScene />
```

**Vantaggi:**
- ✅ Nessuna dipendenza Remotion a runtime
- ✅ Veloce e lightweight
- ✅ Funziona ovunque (SSR friendly)
- ✅ Controli play/pause integrati

### Opzione 2: RemotionPlayer (Video in browser)
**Usa Remotion Player per una riproduzione più fluida**

```jsx
// Aggiungi al Hero.jsx
import RemotionPlayer from './remotion/RemotionPlayer';

// Usa il componente:
<RemotionPlayer autoPlay={true} width="100%" height="600px" />
```

**Vantaggi:**
- ✅ Controlli video profesionali
- ✅ Timeline interattiva
- ✅ Fullscreen support

### Opzione 3: Generare video finale (per produzione)
**Genera il video completo con Remotion CLI**

```bash
# Installare globalmente
npm install -g remotion

# Generare il video
remotion render src/remotion/PortfolioIntro.jsx portfolio-intro \
  --props='{}'

# Output: out/portfolio-intro.mp4
```

## 🎬 Animazioni Disponibili

### Gesture del Personaggio
- **idle** - Posizione neutra a riposo
- **wave** - Saluto amichevole
- **pointing** - Indica qualcosa
- **typing** - Posa da digitare
- **celebrate** - Celebrazione con salti

### Emozioni
- **neutral** - Neutrale
- **happy** - Felice (sorriso)
- **excited** - Entusiasta
- **focused** - Concentrato
- **sad** - Triste

### Timeline Predefinita
La scena default dura **21 secondi** con questa sequenza:

```
0-2s  : Intro - Personaggio entra da sinistra
2-4s  : Presentazione - Wave e smile
4-6s  : Progetti - Pointing gesture
6-8.5s: Skills - Typing pose
8.5-10.5s: Celebrazione - Jump e celebrate
10.5-12.5s: Outro - Esce a destra
```

## 🛠️ Personalizzazione

### Modificare le animazioni
Edita `src/remotion/animations/useCharacterAnimation.js`:

```javascript
const scenes = [
  {
    name: 'my-scene',
    start: 0,
    duration: 2,
    animation: (t) => ({
      x: -300 + t * 150,  // Posizione X
      y: 50,               // Posizione Y
      emotion: 'happy',    // Emozione
      gesture: 'pointing', // Gesto
      scale: 1 + t * 0.1,  // Scala (zoom)
    }),
  },
];
```

### Customizzare il personaggio
Edita `src/remotion/components/Character.jsx` per cambiare:
- Colori
- Forme
- Dettagli del viso
- Abbigliamento
- Accessori

### Aggiungere sfondi personalizzati
Modifica in `src/remotion/styles/SceneStyles.css` o `CharacterHeroScene.css`:

```css
.portfolio-intro-scene {
  background: your-image-url;
}
```

## 📊 Performance Tips

### Renderizzazione Ottimale
```javascript
// Usa React.memo per evitare re-render
const Character = React.memo(({ x, y, scale, emotion, gesture, opacity }) => {
  // Component
});
```

### WebGL per 3D avanzato
Se vuoi una versione 3D vera, integra Three.js:

```bash
npm install three @react-three/fiber @react-three/drei
```

Poi crea un componente Three.js e inseriscilo in Remotion.

## 🎨 Colori e Styling

I colori principali sono definiti nel CSS:

```css
/* Gold/Accent */
--primary: #d4a84b;
--primary-light: #e8c547;
--primary-lighter: #f0d563;

/* Background */
--dark-bg: rgb(20, 20, 30);
--darker-bg: rgb(10, 10, 20);

/* Text */
--light-text: #b0b0b0;
--muted-text: #888;
```

Cambia questi valori nel CSS per un tema diverso.

## 📱 Responsive Design

Le animazioni si scalano automaticamente su mobile grazie ai media query.
Per testare:

```bash
npm run dev  # Dev server Vite
# Apri DevTools e attiva device emulation
```

## 🐛 Debug & Troubleshooting

### Remotion non funziona?
```bash
# Reinstalla le dipendenze
npm install

# Pulisci cache
rm -rf node_modules package-lock.json
npm install
```

### Video non genera?
```bash
# Verifica Node.js versione (min 18)
node --version

# Prova con flag di debug
remotion render src/remotion/PortfolioIntro.jsx portfolio-intro --log=verbose
```

### Animazioni glitch?
- Verifica che i frame siano corretti
- Aumenta la durata della scena
- Riduci il numero di shape animate

## 🚀 Deploy

### Vercel (Consigliato)
```bash
# Il codice Remotion si renderizzerà a runtime
npm run build
vercel
```

### GitHub Pages
```bash
npm run build
# Commit i file dist/ verso gh-pages branch
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📚 Risorse

- [Remotion Docs](https://www.remotion.dev/)
- [React Spring (Animations)](https://www.react-spring.dev/)
- [Three.js (3D)](https://threejs.org/)
- [Babylon.js (3D alternativo)](https://www.babylonjs.com/)

## 💡 Idee Future

### Da aggiungere:
- [ ] Versione 3D vera con Three.js
- [ ] Interazione mouse/touch con il personaggio
- [ ] Suoni e musica di background
- [ ] Più gesti e animazioni
- [ ] Personaggi multipli
- [ ] AI-powered animations

### Integrazioni possibili:
- [ ] Lottie animations
- [ ] GSAP timeline
- [ ] Framer Motion
- [ ] WebGL shaders

## 📞 Support

Per problemi o domande:
1. Controlla la [documentazione Remotion](https://www.remotion.dev/docs)
2. Guarda gli esempi nel progetto
3. Testa in isolation con file separati

---

**Happy Coding! 🚀✨**
