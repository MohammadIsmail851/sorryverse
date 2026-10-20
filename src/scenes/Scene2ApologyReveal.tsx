import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import { GlassHeart } from '../components/GlassHeart';
import type { ApologyConfig } from '../config/apologyConfig';

interface Scene2Props {
  config: ApologyConfig;
  onProceed: () => void;
}

// Cinematic split-letter component with perspective spring
const CinematicWord: React.FC<{
  word: string;
  delay?: number;
  color?: string;
  size?: string;
}> = ({ word, delay = 0, color = '#648BFF', size = 'text-5xl sm:text-7xl md:text-9xl' }) => {
  return (
    <div
      className={`inline-flex font-serif font-black tracking-wider ${size}`}
      aria-label={word}
      style={{ perspective: '1200px' }}
    >
      {word.split('').map((letter, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{
            opacity: 0,
            y: i % 2 === 0 ? -80 : 80,
            rotateX: i % 2 === 0 ? 90 : -90,
            filter: 'blur(12px)',
            color: '#aaa',
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            color: color,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            delay: delay + i * 0.08,
          }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d', display: 'inline-block' }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export const Scene2ApologyReveal: React.FC<Scene2Props> = ({ config, onProceed }) => {
  const [phase, setPhase] = useState<'intro' | 'reforming' | 'revealed'>('intro');

  useEffect(() => {
    const timer1 = window.setTimeout(() => setPhase('reforming'), 1600);
    const timer2 = window.setTimeout(() => setPhase('revealed'), 3200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const fastForward = () => setPhase('revealed');

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 py-12">
      {/* Dynamic background soft glow mesh */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(207,229,255,0.45) 0%, rgba(220,214,255,0.3) 45%, rgba(255,224,235,0.2) 70%, transparent 90%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main Apology Headline — Cinematic 3-Phase Reveal */}
      <div
        onClick={fastForward}
        className="min-h-[180px] sm:min-h-[220px] flex items-center justify-center mb-8 cursor-pointer select-none"
        title="Tap to fast-forward"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.12, filter: 'blur(20px)', transition: { duration: 0.5 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-widest text-[#78809B]"
            >
              {config.scene2.introPart1}
            </motion.div>
          )}

          {phase === 'reforming' && (
            <motion.div
              key="reforming"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="flex flex-col items-center gap-2"
            >
              <CinematicWord
                word={config.scene2.mainWord}
                delay={0}
                color="#648BFF"
                size="text-5xl sm:text-7xl md:text-8xl"
              />
              {/* Underline sweep */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                style={{ originX: 0 }}
                className="h-1 w-full rounded-full bg-gradient-to-r from-[#8DBBFF] via-[#648BFF] to-[#DCD6FF]"
              />
            </motion.div>
          )}

          {phase === 'revealed' && (
            <motion.div
              key="revealed"
              initial={{ scale: 0.85, filter: 'blur(10px)', opacity: 0 }}
              animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <h1
                className="font-serif text-5xl sm:text-7xl md:text-9xl font-black tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #648BFF 0%, #7B73F0 35%, #8DBBFF 65%, #DCD6FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 24px rgba(100,139,255,0.35))',
                }}
              >
                {config.scene2.mainWord}
              </h1>
              {/* Cinematic period dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 500, damping: 25 }}
                className="w-3 h-3 rounded-full bg-gradient-to-br from-[#8DBBFF] to-[#648BFF] shadow-lg shadow-[#8DBBFF]/40"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glass Heart — integrating the reusable heart */}
      <AnimatedElement variant="soft-glow-pulse" className="mb-8">
        <GlassHeart
          size="sm"
          enablePointerTilt={false}
          idleFloat={true}
          glowColor="#FFE0EB"
        />
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
