import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import type { ApologyConfig } from '../config/apologyConfig';

interface Scene2Props {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene2ApologyReveal: React.FC<Scene2Props> = ({ config, onProceed }) => {
  const [phase, setPhase] = useState<'intro' | 'reforming' | 'revealed'>('intro');

  useEffect(() => {
    // Dramatic step 1: Show "I AM..."
    const timer1 = window.setTimeout(() => {
      setPhase('reforming');
    }, 1600);

    // Dramatic step 2: Reform into "SORRY."
    const timer2 = window.setTimeout(() => {
      setPhase('revealed');
    }, 2900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const fastForward = () => {
    setPhase('revealed');
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 py-12">
      {/* Dynamic background soft glow mesh */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-gradient-to-tr from-[#CFE5FF]/40 via-[#DCD6FF]/35 to-[#FFE0EB]/30 rounded-full blur-3xl -z-10"
      />

      {/* Main Apology Headline container */}
      <div
        onClick={fastForward}
        className="min-h-[140px] sm:min-h-[180px] flex items-center justify-center mb-6 cursor-pointer select-none"
        title="Tap to reveal"
      >
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-widest text-[#78809B]"
            >
              {config.scene2.introPart1}
            </motion.div>
          )}

          {phase === 'reforming' && (
            <motion.div
              key="reforming"
              aria-label={config.scene2.mainWord}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2 sm:gap-4 font-serif text-5xl sm:text-7xl md:text-8xl font-black text-[#648BFF]"
            >
              {config.scene2.mainWord.split('').map((letter, i) => (
                <motion.span
                  key={`letter-${i}`}
                  initial={{
                    y: (i % 2 === 0 ? -60 : 60),
                    x: (i - 2) * 25,
                    opacity: 0,
                    filter: 'blur(8px)',
                    rotate: (i % 2 === 0 ? -24 : 24),
                  }}
                  animate={{
                    y: 0,
                    x: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    rotate: 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 18,
                    delay: i * 0.07,
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          )}

          {phase === 'revealed' && (
            <motion.div
              key="revealed"
              initial={{ scale: 0.88, filter: 'blur(8px)', opacity: 0 }}
              animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#648BFF] via-[#7B73F0] to-[#8DBBFF]">
                {config.scene2.mainWord}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Small glowing animated heart underneath */}
      <AnimatedElement variant="soft-glow-pulse" className="mb-8">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: 'easeInOut',
          }}
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-[#8DBBFF]/40 shadow-glass flex items-center justify-center text-[#648BFF]"
        >
          <Heart className="w-6 h-6 fill-[#FFE0EB] text-[#648BFF]" />
        </motion.div>
      </AnimatedElement>

      {/* Supporting message */}
      <div className="max-w-xl mx-auto mb-10">
        <AnimatedText
          text={config.scene2.heartfeltNote}
          variant="blur-to-sharp"
          as="p"
          className="font-editorial text-lg sm:text-2xl text-[#202642] italic leading-relaxed"
          delay={0.2}
        />
      </div>

      {/* Continue button */}
      <AnimatedElement variant="spring-overshoot" delay={0.4}>
        <Button
          size="md"
          variant="primary"
          onClick={onProceed}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {config.scene2.continueButton}
        </Button>
      </AnimatedElement>
    </div>
  );
};
