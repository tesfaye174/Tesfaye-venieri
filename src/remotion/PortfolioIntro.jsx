import React from 'react';
import { Composition } from 'remotion';
import PortfolioIntroScene from './scenes/PortfolioIntroScene';

/**
 * Configurazione della composizione Remotion
 * Definisce il video intro del portfolio con il personaggio animato
 */
const PortfolioIntro = () => {
  return (
    <Composition
      id="portfolio-intro"
      component={PortfolioIntroScene}
      durationInFrames={630} // 21 secondi a 30fps
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  );
};

export default PortfolioIntro;
