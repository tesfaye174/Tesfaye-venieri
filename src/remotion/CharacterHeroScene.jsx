import React, { useEffect, useState } from 'react';
import Character from './components/Character';
import { useCharacterAnimation } from './animations/useCharacterAnimation';
import './styles/CharacterHeroScene.css';

/**
 * Scena alternativa semplificata che non richiede Remotion
 * Usa solo React hooks per le animazioni
 */
const CharacterHeroScene = () => {
  const [frame, setFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Ottenere lo stato del personaggio basato sul frame
  const characterState = useCharacterAnimation(frame, 30);

  // Determinare se mostrare il laptop in base al gesture
  const showLaptop = characterState.gesture === 'typing';

  useEffect(() => {
    if (!isAnimating) return;

    let animationFrameId;
    let frameCount = 0;
    const totalFrames = 630; // 21 secondi a 30fps

    const animate = () => {
      frameCount = (frameCount + 1) % totalFrames;
      setFrame(frameCount);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isAnimating]);

  return (
    <div className="character-hero-scene" onMouseEnter={() => setIsAnimating(true)}>
      {/* Background */}
      <div className="hero-background">
        <div className="gradient-bg"></div>
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="text-content">
          <h1 className="hero-title">
            <span>Tesfaye</span>
            <span>Venieri</span>
          </h1>
          <p className="hero-subtitle">Full-Stack Developer</p>
          <p className="hero-description">
            Coding the Future with Hope
          </p>

          <div className="tech-tags">
            <span>JAVA</span>
            <span>KOTLIN</span>
            <span>REACT</span>
            <span>SQL</span>
          </div>
        </div>

        {/* Character Animation */}
        <div className="character-display">
          <Character
            x={characterState.x}
            y={characterState.y}
            scale={characterState.scale}
            emotion={characterState.emotion}
            gesture={characterState.gesture}
            opacity={characterState.opacity}
            showLaptop={showLaptop}
          />
        </div>
      </div>

      {/* Play/Pause Controls */}
      <button
        className="animation-control"
        onClick={() => setIsAnimating(!isAnimating)}
        title={isAnimating ? 'Pausa animazione' : 'Riproduci animazione'}
      >
        {isAnimating ? '⏸' : '▶'}
      </button>

      {/* Frame counter (debug) */}
      <div className="frame-counter">
        {Math.floor(frame / 30)}s
      </div>
    </div>
  );
};

export default CharacterHeroScene;
