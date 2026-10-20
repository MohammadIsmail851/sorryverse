import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import { GlassHeart } from '../components/GlassHeart';
import type { ApologyConfig } from '../config/apologyConfig';
import { ambientSound } from '../audio/ambientSound';

interface Scene6Props {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene6InteractiveSurprise: React.FC<Scene6Props> = ({ config, onProceed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const handleHeartClick = useCallback(() => {
    setIsOpen(true);
    setBurstKey((k) => k + 1);
    ambientSound.playHarmonicChord();

    // Layered confetti burst — two waves for drama
    try {
      // First burst — center upward
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.55, x: 0.5 },
        colors: ['#CFE5FF', '#8DBBFF', '#DCD6FF', '#FFE0EB', '#FFFFFF', '#E3DCFF'],
        ticks: 250,
        gravity: 0.75,
        scalar: 0.95,
        shapes: ['circle'],
      });
      // Second burst — sides (delayed)
      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 100,
          origin: { y: 0.6, x: 0.3 },
          colors: ['#8DBBFF', '#DCD6FF', '#FFE0EB'],
          ticks: 180,
          gravity: 0.9,
          scalar: 0.8,
        });
        confetti({
          particleCount: 30,
          spread: 100,
          origin: { y: 0.6, x: 0.7 },
          colors: ['#CFE5FF', '#FFE0EB', '#DCD6FF'],
          ticks: 180,
          gravity: 0.9,
          scalar: 0.8,
        });
      }, 200);
    } catch {
      // fallback
    }
  }, []);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 py-16 max-w-4xl mx-auto">
      {/* Subtitle badge */}
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

      {/* Living 3D Glass Heart — Main Interactive Element */}
      <AnimatedElement variant="floating-idle" className="my-6 relative">
        <GlassHeart
          size="xl"
          onClick={handleHeartClick}
          enablePointerTilt={true}
          idleFloat={true}
          glowColor={isOpen ? '#FFE0EB' : '#8DBBFF'}
        />

        {/* Orbiting sparkles after click */}
        <AnimatePresence>
          {isOpen && (
            <>
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 90;
                const y = Math.sin(rad) * 90;
                return (
                  <motion.div
                    key={`orbit-${i}-${burstKey}`}
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1.2, 1],
                      opacity: [0, 1, 0.8],
                      x,
                      y,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 18,
                      delay: i * 0.06,
                    }}
                    className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-md flex items-center justify-center text-sm pointer-events-none"
                  >
                    {['✨', '💫', '🌸', '⭐', '🕊️', '🌟'][i]}
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>
      </AnimatedElement>

      {/* Revealed Message */}
      <div className="min-h-[140px] flex flex-col items-center justify-center max-w-xl mx-auto my-4">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="revealed-surprise"
              initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/90 shadow-glass"
            >
              <h3 className="font-editorial italic text-xl sm:text-3xl text-[#202642] mb-3 leading-relaxed">
                "{config.scene6Surprise.revealedMessage}"
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

      {/* Continue buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {isOpen && (
          <Button
            size="sm"
            variant="glass"
            onClick={handleHeartClick}
            icon={<RotateCw className="w-3.5 h-3.5" />}
          >
            Burst Again
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
