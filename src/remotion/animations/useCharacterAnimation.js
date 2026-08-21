import { useEffect, useState } from 'react';

/**
 * Hook per animare il personaggio attraverso diverse scene
 * @param {number} frame - Frame corrente
 * @param {number} fps - Frames per second (default 30)
 * @returns {Object} State del personaggio (position, gesture, emotion, etc)
 */
const useCharacterAnimation = (frame, fps = 30) => {
  const [characterState, setCharacterState] = useState({
    x: 0,
    y: 0,
    scale: 1,
    emotion: 'neutral',
    gesture: 'idle',
    opacity: 1,
    rotation: 0,
  });

  useEffect(() => {
    const time = frame / fps; // Tempo in secondi

    // Configurazione delle scene (ogni scena ha un tempo di inizio e durata)
    const scenes = [
      {
        name: 'intro',
        start: 0,
        duration: 2,
        animation: (t) => ({
          x: -300 + t * 150, // Entra da sinistra
          y: 50,
          opacity: Math.min(t * 2, 1),
          emotion: 'neutral',
          gesture: 'idle',
          scale: 1,
        }),
      },
      {
        name: 'wave',
        start: 2,
        duration: 2,
        animation: (t) => ({
          x: 0,
          y: 50,
          opacity: 1,
          emotion: 'happy',
          gesture: 'wave',
          scale: 1 + Math.sin(t * Math.PI * 2) * 0.05, // Bounce leggero
        }),
      },
      {
        name: 'pointing-projects',
        start: 4,
        duration: 2,
        animation: (t) => ({
          x: -50 + t * 50, // Si sposta leggermente a destra
          y: 50,
          opacity: 1,
          emotion: 'excited',
          gesture: 'pointing',
          scale: 1,
        }),
      },
      {
        name: 'typing',
        start: 6,
        duration: 2.5,
        animation: (t) => ({
          x: 0,
          y: 50,
          opacity: 1,
          emotion: 'focused',
          gesture: 'typing',
          scale: 1,
        }),
      },
      {
        name: 'celebrate',
        start: 8.5,
        duration: 2,
        animation: (t) => ({
          x: 0,
          y: 40 - Math.abs(Math.sin(t * Math.PI * 2)) * 20, // Salta
          opacity: 1,
          emotion: 'excited',
          gesture: 'celebrate',
          scale: 1 + Math.sin(t * Math.PI * 2) * 0.08,
        }),
      },
      {
        name: 'outro',
        start: 10.5,
        duration: 2,
        animation: (t) => ({
          x: 300 * t, // Esce a destra
          y: 50,
          opacity: Math.max(1 - t * 1.5, 0),
          emotion: 'happy',
          gesture: 'idle',
          scale: 1,
        }),
      },
    ];

    // Trovare la scena attuale
    let currentScene = null;
    for (const scene of scenes) {
      if (time >= scene.start && time < scene.start + scene.duration) {
        currentScene = scene;
        break;
      }
    }

    if (currentScene) {
      const t = time - currentScene.start; // Tempo dentro la scena (0 a 1)
      const progress = t / currentScene.duration;
      const state = currentScene.animation(progress);

      setCharacterState((prev) => ({
        ...prev,
        ...state,
      }));
    } else {
      // Default state se non in nessuna scena
      setCharacterState({
        x: 0,
        y: 50,
        scale: 1,
        emotion: 'neutral',
        gesture: 'idle',
        opacity: 0,
      });
    }
  }, [frame, fps]);

  return characterState;
};

/**
 * Easing functions per animazioni più fluide
 */
export const easing = {
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * (t - 2)) * (2 * (t - 2)) + 1,
  easeOutElastic: (t) => {
    const c5 = (2 * Math.PI) / 4.5;
    return t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c5) + 1;
  },
};

/**
 * Animator helper para animar valores numerici
 */
const animateValue = (from, to, progress, easingFn = easing.easeOutQuad) => {
  return from + (to - from) * easingFn(progress);
};

/**
 * Interpolate tra due colori (hex)
 */
const interpolateColor = (color1, color2, t) => {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r = Math.round((c1 >> 16 & 255) + ((c2 >> 16 & 255) - (c1 >> 16 & 255)) * t);
  const g = Math.round((c1 >> 8 & 255) + ((c2 >> 8 & 255) - (c1 >> 8 & 255)) * t);
  const b = Math.round((c1 & 255) + ((c2 & 255) - (c1 & 255)) * t);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

export { useCharacterAnimation, animateValue, interpolateColor };
