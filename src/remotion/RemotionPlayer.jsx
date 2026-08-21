import React, { useEffect, useRef, useState } from 'react';
import PortfolioIntroScene from './scenes/PortfolioIntroScene';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import './styles/RemotionPlayer.css';

/**
 * Player Remotion custom per il portfolio
 * Riproduce l'animazione del personaggio nel browser senza necessitare di generazione video
 */
const RemotionPlayer = ({ autoPlay = true, width = '100%', height = '100%' }) => {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(21); // 21 secondi
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const currentTimeRef = useRef(0);

  // Simulare il comportamento di Remotion senza la libreria
  useEffect(() => {
    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      if (isPlaying) {
        const elapsed = (currentTime - startTimeRef.current) / 1000; // Converti a secondi
        currentTimeRef.current = elapsed;
        setProgress(Math.min(elapsed / duration, 1));

        // Se il video finisce, fermalo
        if (elapsed >= duration) {
          setIsPlaying(false);
          setProgress(1);
          startTimeRef.current = null;
        } else {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      }
    };

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, duration]);

  const handlePlayPause = () => {
    if (progress >= 1) {
      // Restart
      startTimeRef.current = null;
      setProgress(0);
      currentTimeRef.current = 0;
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    currentTimeRef.current = newProgress * duration;
    startTimeRef.current = null;
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="remotion-player-wrapper"
      ref={containerRef}
      style={{ width, height }}
    >
      <div className="player-viewport">
        {/* Renderizzare il componente della scena */}
        <PortfolioIntroScene />
      </div>

      {/* Controlli del player */}
      <div className="player-controls">
        <button
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={handlePlayPause}
          title={isPlaying ? 'Pausa' : progress >= 1 ? 'Riproduci' : 'Play'}
        >
          {isPlaying ? '⏸' : progress >= 1 ? '↺' : '▶'}
        </button>

        <div className="progress-container">
          <span className="time-display">
            {formatTime(currentTimeRef.current)}
          </span>
          <input
            type="range"
            className="progress-slider"
            min="0"
            max="1"
            step="0.001"
            value={progress}
            onChange={handleProgressChange}
            title="Scrolla per cambiare il tempo"
          />
          <span className="time-display">
            {formatTime(duration)}
          </span>
        </div>

        <button
          className="fullscreen-button"
          title="Fullscreen"
          onClick={() => {
            if (containerRef.current?.requestFullscreen) {
              containerRef.current.requestFullscreen();
            }
          }}
        >
          ⛶
        </button>
      </div>

      {/* Loading indicator */}
      <div className="player-loading" style={{ opacity: isPlaying ? 0 : 0 }}>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default RemotionPlayer;

/**
 * Componente semplificato che usa Canvas per il rendering
 * Versione alternativa più performante
 */
export const RemotionPlayerCanvas = ({ width = 1920, height = 1080 }) => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const frameRef = useRef(0);
  const fpsRef = useRef(30);

  useEffect(() => {
    const animate = () => {
      if (isPlaying) {
        frameRef.current = (frameRef.current + 1) % (fpsRef.current * 21); // Loop ogni 21 secondi
      }

      // Il rendering reale avverrebbe qui con un canvas context
      // Per ora, delegiamo al componente React
      requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [isPlaying]);

  return (
    <div className="remotion-player-canvas">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};
