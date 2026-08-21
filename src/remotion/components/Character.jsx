import React from 'react';
import './Character.css';

/**
 * Personaggio 3D-style - Versione SVG + HTML semplificata
 * Basato sull'immagine di riferimento con colori accurati
 */
const Character = ({
  x = 0,
  y = 0,
  scale = 1,
  emotion = 'neutral',
  gesture = 'idle',
  opacity = 1,
  showLaptop = false
}) => {
  // SVG rendering per un personaggio realistico
  return (
    <div
      className="character-wrapper"
      style={{
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        opacity,
        transition: 'transform 0.15s ease-out, opacity 0.15s ease-out'
      }}
    >
      <svg
        viewBox="0 0 180 300"
        className={`character character-${emotion} character-gesture-${gesture}`}
        style={{ width: '200px', height: '300px', display: 'block' }}
        role="img"
        aria-label="Tesfaye Venieri, Full-Stack Developer"
      >
        {/* Ombra */}
        <ellipse cx="90" cy="285" rx="60" ry="12" fill="rgba(0,0,0,0.3)" filter="blur(8px)" />

        {/* GAMBA SINISTRA */}
        <g className="leg-left">
          <rect x="70" y="200" width="12" height="55" fill="#1a3a52" rx="6" />
          <rect x="68" y="255" width="16" height="20" fill="#ffffff" rx="2" />
        </g>

        {/* GAMBA DESTRA */}
        <g className="leg-right">
          <rect x="98" y="200" width="12" height="55" fill="#1a3a52" rx="6" />
          <rect x="96" y="255" width="16" height="20" fill="#ffffff" rx="2" />
        </g>

        {/* CORPO - Maglione beige */}
        <ellipse cx="90" cy="160" rx="48" ry="55" fill="#f5f1e8" />

        {/* Colletto blu - LEFT */}
        <polygon points="50,130 65,130 70,150 50,145" fill="#1a3a52" />

        {/* Colletto blu - RIGHT */}
        <polygon points="130,130 115,130 110,150 130,145" fill="#1a3a52" />

        {/* Logo piccolo */}
        <rect x="80" y="150" width="20" height="15" fill="#d4a84b" rx="2" />

        {/* BRACCIA - Con animazioni gesture */}
        <g className={`arms arms-${gesture}`}>
          {/* Braccio Sinistro */}
          <g className="arm-left">
            <rect x="50" y="120" width="14" height="45" fill="#c9956a" rx="7" />
            <circle cx="50" cy="170" r="10" fill="#c9956a" />
          </g>

          {/* Braccio Destro */}
          <g className="arm-right">
            <rect x="116" y="120" width="14" height="45" fill="#c9956a" rx="7" />
            <circle cx="130" cy="170" r="10" fill="#c9956a" />
          </g>
        </g>

        {/* LAPTOP - Sincronizzato con typing */}
        {showLaptop && (
          <g className={`laptop laptop-${gesture}`}>
            <rect x="125" y="155" width="40" height="28" fill="#5a5a5a" rx="2" />
            <rect x="128" y="158" width="34" height="18" fill="#1a1a1a" />
            <rect x="128" y="177" width="34" height="4" fill="#666" />
          </g>
        )}

        {/* TESTA */}
        <g className="head">
          {/* Pelle */}
          <circle cx="90" cy="80" r="42" fill="#c9956a" />

          {/* Capelli neri */}
          <ellipse cx="90" cy="50" rx="42" ry="35" fill="#1a1a1a" />

          {/* Occhi */}
          <g className="eyes">
            {/* Occhio sinistro */}
            <ellipse cx="75" cy="75" rx="8" ry="9" fill="#ffffff" />
            <circle cx="75" cy="76" r="5" fill="#1a1a1a" className="pupil-left" />
            <circle cx="76" cy="74" r="2" fill="#ffffff" opacity="0.8" />

            {/* Occhio destro */}
            <ellipse cx="105" cy="75" rx="8" ry="9" fill="#ffffff" />
            <circle cx="105" cy="76" r="5" fill="#1a1a1a" className="pupil-right" />
            <circle cx="106" cy="74" r="2" fill="#ffffff" opacity="0.8" />
          </g>

          {/* Occhiali - Rettangolari */}
          <g className="glasses">
            {/* Lens LEFT */}
            <rect x="64" y="68" width="18" height="14" fill="rgba(100,150,200,0.1)" stroke="#2a2a2a" strokeWidth="1.2" rx="2" />
            <circle cx="70" cy="71" r="2" fill="#ffffff" opacity="0.6" />

            {/* Bridge */}
            <rect x="82" y="73" width="6" height="1.5" fill="#2a2a2a" />

            {/* Lens RIGHT */}
            <rect x="88" y="68" width="18" height="14" fill="rgba(100,150,200,0.1)" stroke="#2a2a2a" strokeWidth="1.2" rx="2" />
            <circle cx="94" cy="71" r="2" fill="#ffffff" opacity="0.6" />
          </g>

          {/* Naso */}
          <line x1="90" y1="75" x2="90" y2="85" stroke="#a67456" strokeWidth="2" opacity="0.6" />

          {/* Bocca - Espressiva */}
          <g className={`mouth mouth-${emotion}`}>
            <path d="M 80 95 Q 90 100 100 95" stroke="#a0734a" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>

          {/* Barba */}
          <ellipse cx="90" cy="100" rx="20" ry="6" fill="#2a2a2a" opacity="0.6" />

          {/* Orecchino dorato */}
          <circle cx="120" cy="85" r="5" fill="#d4a84b" />
          <circle cx="121" cy="84" r="1.5" fill="#ffffff" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

export default Character;
