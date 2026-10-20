import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PageTransitionId } from '../types/transitions';
import { pageTransitionVariants } from './pageTransitionVariants';

interface PageTransitionWrapperProps {
  transitionId: PageTransitionId;
  children: React.ReactNode;
  sceneKey: string | number;
  direction?: 'forward' | 'reverse';
  className?: string;
}

export const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({
  transitionId,
  children,
  sceneKey,
  direction = 'forward',
  className = ''
}) => {
  const variant = pageTransitionVariants[transitionId] || pageTransitionVariants['fade-through-white'];

  return (
    <div className="w-full min-h-screen overflow-x-clip" style={{ perspective: 1400 }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={sceneKey}
          custom={direction}
          variants={variant}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`w-full min-h-screen ${className}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
