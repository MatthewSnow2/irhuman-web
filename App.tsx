import React from 'react';
import { FuturisticHero } from './components/ui/FuturisticHero';
import { ShapesBackground } from './components/ui/ShapesBackground';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Animated Background */}
      <ShapesBackground />

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Splash Page - iRhuman.ai */}
        <FuturisticHero />
      </div>
    </div>
  );
};

export default App;
