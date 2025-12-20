import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LetterGlitch from './LetterGlitch';

export const FuturisticHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Letter Glitch Background */}
      <LetterGlitch
        glitchColors={['#0b0b13', '#14b8a6', '#e65100']}
        glitchSpeed={120}
        outerVignette={true}
        centerVignette={false}
        smooth={true}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center"
        style={{ y, opacity }}
      >
        {/* Main heading - iRhuman.ai branding */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="text-white">i</span>
            <span className="text-azure">R</span>
            <span className="text-white">human.</span>
            <span className="text-amber">ai</span>
          </motion.span>
        </h1>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
    </div>
  );
};

export default FuturisticHero;
