import React from 'react';
import { useVideoConfig, useCurrentFrame, interpolate, Easing } from 'remotion';
import Character from '../components/Character';
import '../styles/SceneStyles.css';

const PortfolioIntroScene = () => {
  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const time = frame / fps;

  // Calcolo dello stato del personaggio per ogni tempo
  const getCharacterState = () => {
    // Scene timeline:
    // 0-2s: Intro - Personaggio entra da sinistra
    // 2-4s: Presentazione - Onda e smile
    // 4-6s: Progetti - Pointing ai progetti
    // 6-8.5s: Skills - Typing pose
    // 8.5-10.5s: Celebrazione
    // 10.5-12.5s: Outro - Esce

    if (time < 2) {
      // Intro: entra da sinistra
      const progress = time / 2;
      return {
        x: interpolate(progress, [0, 1], [-500, -100], {
          extrapolateLeft: Easing.in(Easing.ease),
        }),
        y: 0,
        scale: interpolate(progress, [0, 1], [0.5, 1]),
        emotion: 'neutral',
        gesture: 'idle',
        opacity: interpolate(progress, [0, 1], [0, 1]),
      };
    } else if (time < 4) {
      // Presentazione
      const progress = (time - 2) / 2;
      return {
        x: -100,
        y: 0,
        scale: 1 + Math.sin(progress * Math.PI * 2) * 0.05,
        emotion: 'happy',
        gesture: 'idle',
        opacity: 1,
      };
    } else if (time < 6) {
      // Pointing ai progetti
      const progress = (time - 4) / 2;
      return {
        x: interpolate(progress, [0, 1], [-100, 100], {
          easing: Easing.out(Easing.ease),
        }),
        y: 0,
        scale: 1,
        emotion: 'excited',
        gesture: 'pointing',
        opacity: 1,
      };
    } else if (time < 8.5) {
      // Typing pose - skills
      const progress = (time - 6) / 2.5;
      return {
        x: 100 - progress * 100,
        y: 0,
        scale: 1,
        emotion: 'focused',
        gesture: 'typing',
        opacity: 1,
      };
    } else if (time < 10.5) {
      // Celebrazione
      const progress = (time - 8.5) / 2;
      return {
        x: 0,
        y: -Math.abs(Math.sin(progress * Math.PI * 2)) * 40,
        scale: 1 + Math.sin(progress * Math.PI * 2) * 0.1,
        emotion: 'excited',
        gesture: 'celebrate',
        opacity: 1,
      };
    } else {
      // Outro - esce a destra
      const progress = (time - 10.5) / 1.5;
      return {
        x: interpolate(progress, [0, 1], [0, 500], {
          extrapolateRight: Easing.out(Easing.ease),
        }),
        y: 0,
        scale: 1,
        emotion: 'happy',
        gesture: 'idle',
        opacity: interpolate(progress, [0, 1], [1, 0]),
      };
    }
  };

  const characterState = getCharacterState();

  // Background dinamico che cambia colore
  const bgColor = interpolate(frame, [0, 630], [
    'rgb(20, 20, 30)',
    'rgb(10, 10, 20)',
  ]);

  return (
    <div className="portfolio-intro-scene" style={{ backgroundColor: bgColor }}>
      {/* Grid background animato */}
      <div className="animated-grid">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="grid-line"
            style={{
              animationDelay: `${i * 0.1}s`,
              opacity: interpolate(frame, [0, 315, 630], [0.3, 0.5, 0.3]),
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="intro-content">
        {/* Left side - Text */}
        <div className="intro-text-side">
          <div className="intro-top">
            <h1 className="intro-main-title">
              <span
                style={{
                  opacity: interpolate(
                    frame,
                    [0, 60, 120],
                    [0, 0.5, 1],
                    { extrapolateRight: Easing.ease }
                  ),
                }}
              >
                Tesfaye
              </span>
              {' '}
              <span
                style={{
                  opacity: interpolate(
                    frame,
                    [30, 90, 150],
                    [0, 0.5, 1],
                    { extrapolateRight: Easing.ease }
                  ),
                }}
              >
                Venieri
              </span>
            </h1>

            <p
              className="intro-subtitle"
              style={{
                opacity: interpolate(frame, [120, 180, 240], [0, 0.5, 1]),
              }}
            >
              Full-Stack Developer
            </p>

            <p
              className="intro-tagline"
              style={{
                opacity: interpolate(frame, [180, 240, 300], [0, 0.5, 1]),
              }}
            >
              Coding the Future with Hope
            </p>
          </div>

          {/* Skill indicators that appear during typing scene */}
          <div className="intro-skills">
            {['JAVA', 'KOTLIN', 'REACT', 'SQL'].map((skill, index) => (
              <div
                key={skill}
                className="skill-badge"
                style={{
                  opacity: interpolate(
                    frame,
                    [
                      180 + index * 30,
                      240 + index * 30,
                      630,
                    ],
                    [0, 1, 1],
                    { easing: Easing.out(Easing.ease) }
                  ),
                  transform: `translateY(${interpolate(
                    frame,
                    [180 + index * 30, 240 + index * 30],
                    [20, 0],
                    { extrapolateRight: Easing.ease }
                  )}px)`,
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Character */}
        <div className="intro-character-side">
          <div className="character-container">
            <Character
              x={width / 2 + characterState.x}
              y={height / 2 + characterState.y}
              scale={characterState.scale}
              emotion={characterState.emotion}
              gesture={characterState.gesture}
              opacity={characterState.opacity}
            />
          </div>
        </div>
      </div>

      {/* Bottom - Call to action */}
      <div
        className="intro-cta"
        style={{
          opacity: interpolate(frame, [450, 510, 630], [0, 1, 1]),
        }}
      >
        <p>Scroll to explore</p>
        <div className="scroll-arrow">↓</div>
      </div>
    </div>
  );
};

export default PortfolioIntroScene;
