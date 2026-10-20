import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import type { ApologyConfig } from '../config/apologyConfig';
import { ambientSound } from '../audio/ambientSound';

interface Scene6Props {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene6InteractiveSurprise: React.FC<Scene6Props> = ({ config, onProceed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleHeartClick = () => {
    setIsOpen(true);
    setClickCount((c) => c + 1);
    ambientSound.playHarmonicChord();

    // Soft pastel confetti burst
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#CFE5FF', '#8DBBFF', '#DCD6FF', '#FFE0EB', '#FFFFFF'],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 py-16 max-w-4xl mx-auto">
      {/* Subtitle */}
      <AnimatedElement variant="fade-translate" className="mb-3">
        <span className="px-4 py-1.5 rounded-full bg-[#FFE0EB]/60 border border-[#FFE0EB] text-xs font-semibold tracking-wider uppercase text-[#648BFF] inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Surprise</span>
        </span>
      </AnimatedElement>

      <AnimatedText
        text="A Gentle Moment of Truth"
        variant="blur-to-sharp"
        as="h2"
        className="font-serif text-3xl sm:text-5xl font-bold text-[#202642] tracking-tight mb-2"
      />
      <p className="text-sm text-[#78809B] mb-8 font-light max-w-md">
        {config.scene6Surprise.prompt}
      </p>

      {/* Floating 3D Interactive Glass Heart */}
      <div className="relative my-6 cursor-pointer" onClick={handleHeartClick}>
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.1,
            rotate: 15,
            boxShadow: '0 0 45px rgba(141, 187, 255, 0.7)',
          }}
          whileTap={{ scale: 0.9 }}
          className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-[#CFE5FF] via-white to-[#FFE0EB] p-1.5 shadow-2xl shadow-[#8DBBFF]/30 flex items-center justify-center group"
        >
          <div className="w-full h-full rounded-full bg-white/75 backdrop-blur-xl border border-white/90 flex flex-col items-center justify-center shadow-inner">
            <motion.div
              animate={isOpen ? { scale: [1, 1.3, 1] } : { scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            >
              <Heart
                className={`w-14 h-14 sm:w-16 sm:h-16 transition-colors duration-500 ${
                  isOpen ? 'text-[#648BFF] fill-[#FFE0EB]' : 'text-[#8DBBFF] fill-[#CFE5FF]/60'
                }`}
              />
            </motion.div>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#648BFF] mt-1">
              {isOpen ? 'Touched' : 'Tap Me'}
            </span>
          </div>

          {/* Glowing ambient ring */}
          <div className="absolute inset-0 rounded-full bg-[#8DBBFF]/25 blur-xl -z-10 group-hover:bg-[#648BFF]/40 transition-colors" />
        </motion.div>

        {/* Orbiting fragments when opened */}
        <AnimatePresence>
          {isOpen && (
            <>
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 110;
                const y = Math.sin(rad) * 110;
                return (
                  <motion.div
                    key={`petal-${i}-${clickCount}`}
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{ scale: 1, opacity: 0.9, x, y }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 240,
                      damping: 18,
                      delay: i * 0.05,
                    }}
                    className="absolute top-1/2 left-1/2 w-7 h-7 -mt-3.5 -ml-3.5 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-md flex items-center justify-center text-xs text-[#648BFF] pointer-events-none"
                  >
                    ✨
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Revealed Message Container */}
      <div className="min-h-[140px] flex flex-col items-center justify-center max-w-xl mx-auto my-4">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="revealed-surprise"
              initial={{ opacity: 0, y: 25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 shadow-glass"
            >
              <h3 className="font-editorial italic text-xl sm:text-3xl text-[#202642] mb-3 leading-relaxed">
                “{config.scene6Surprise.revealedMessage}”
              </h3>
              <p className="text-xs sm:text-sm text-[#78809B] font-light">
                {config.scene6Surprise.subtext}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="tap-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="text-xs text-[#78809B] italic"
            >
              (Touch the crystal heart to reveal the innermost thought)
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Continue */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {isOpen && (
          <Button
            size="sm"
            variant="glass"
            onClick={handleHeartClick}
            icon={<RotateCw className="w-3.5 h-3.5" />}
          >
            Burst Sparkles Again
          </Button>
        )}
        <Button
          size="md"
          variant="primary"
          onClick={onProceed}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Hear The Final Words
        </Button>
      </div>
    </div>
  );
};
