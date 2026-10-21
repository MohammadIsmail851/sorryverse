import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { ambientSound } from '../audio/ambientSound';

interface CurtainIntroProps {
  onComplete: () => void;
  isReplaying?: boolean;
}

export const CurtainIntro: React.FC<CurtainIntroProps> = ({ onComplete, isReplaying = false }) => {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Real readiness detection
  useEffect(() => {
    let isMounted = true;

    // Check when fonts and DOM are ready without artificial long delays
    const checkReadiness = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      } catch {
        // Fallback gracefully
      }

      // Small gentle delay (400ms) to ensure smooth initial paint
      setTimeout(() => {
        if (isMounted) {
          setIsReady(true);
        }
      }, 500);
    };

    if (document.readyState === 'complete') {
      checkReadiness();
    } else {
      window.addEventListener('load', checkReadiness);
      return () => {
        isMounted = false;
        window.removeEventListener('load', checkReadiness);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [isReplaying]);

  // Lock body scroll while curtain is covering the screen
  useEffect(() => {
    if (!isDismissed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDismissed]);

  const handleOpenCurtains = () => {
    setIsOpen(true);
    // Play gentle harmonious ambient chime
    try {
      ambientSound.playHarmonicChord();
    } catch {
      // Audio is non-blocking
    }

    // After curtain movement finishes, dismiss overlay and hand off to main site
    const duration = prefersReducedMotion ? 400 : 2200;
    setTimeout(() => {
      setIsDismissed(true);
      onComplete();
    }, duration);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden select-none transition-opacity duration-700 ${
        isOpen ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="Cinematic Theatre Curtain Intro"
    >
      {/* ================= LEFT CURTAIN ================= */}
      <motion.div
        initial={{ x: '0%', scaleX: 1 }}
        animate={
          isOpen
            ? prefersReducedMotion
              ? { opacity: 0 }
              : { x: '-102%', scaleX: 0.16, opacity: [1, 1, 0.4, 0] }
            : { x: '0%', scaleX: 1, opacity: 1 }
        }
        transition={{
          duration: prefersReducedMotion ? 0.4 : 2.2,
          ease: [0.25, 1, 0.35, 1],
        }}
        style={{ originX: 0 }}
        className="absolute top-0 left-0 w-1/2 h-full z-10 shadow-2xl"
      >
        {/* Fabric Folds and Pleats */}
        <div
          className="w-full h-full relative"
          style={{
            background: `
              linear-gradient(to right, 
                rgba(32, 38, 66, 0.08) 0%, 
                transparent 12%, 
                rgba(255, 255, 255, 0.7) 24%, 
                rgba(141, 187, 255, 0.18) 38%, 
                rgba(32, 38, 66, 0.09) 52%, 
                rgba(255, 255, 255, 0.8) 68%, 
                rgba(220, 214, 255, 0.22) 82%, 
                rgba(32, 38, 66, 0.14) 100%
              ),
              repeating-linear-gradient(90deg, 
                #F8FBFF 0px, 
                #EEF5FF 32px, 
                #CFE5FF 64px, 
                #E3DCFF 96px, 
                #FFE2ED 128px, 
                #FFFFFF 160px
              )
            `,
            boxShadow: 'inset -8px 0 24px -4px rgba(32, 38, 66, 0.12)',
          }}
        >
          {/* Subtle Fabric Grain / Sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-[#CFE5FF]/20 pointer-events-none" />

          {/* Top Decorative Curtain Pelmet / Fringe */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/90 to-transparent border-b border-[#CFE5FF]/40 shadow-sm" />
        </div>
      </motion.div>

      {/* ================= RIGHT CURTAIN ================= */}
      <motion.div
        initial={{ x: '0%', scaleX: 1 }}
        animate={
          isOpen
            ? prefersReducedMotion
              ? { opacity: 0 }
              : { x: '102%', scaleX: 0.16, opacity: [1, 1, 0.4, 0] }
            : { x: '0%', scaleX: 1, opacity: 1 }
        }
        transition={{
          duration: prefersReducedMotion ? 0.4 : 2.2,
          ease: [0.25, 1, 0.35, 1],
        }}
        style={{ originX: 1 }}
        className="absolute top-0 right-0 w-1/2 h-full z-10 shadow-2xl"
      >
        {/* Fabric Folds and Pleats */}
        <div
          className="w-full h-full relative"
          style={{
            background: `
              linear-gradient(to left, 
                rgba(32, 38, 66, 0.08) 0%, 
                transparent 12%, 
                rgba(255, 255, 255, 0.7) 24%, 
                rgba(141, 187, 255, 0.18) 38%, 
                rgba(32, 38, 66, 0.09) 52%, 
                rgba(255, 255, 255, 0.8) 68%, 
                rgba(220, 214, 255, 0.22) 82%, 
                rgba(32, 38, 66, 0.14) 100%
              ),
              repeating-linear-gradient(90deg, 
                #FFFFFF 0px, 
                #FFE2ED 32px, 
                #E3DCFF 64px, 
                #CFE5FF 96px, 
                #EEF5FF 128px, 
                #F8FBFF 160px
              )
            `,
            boxShadow: 'inset 8px 0 24px -4px rgba(32, 38, 66, 0.12)',
          }}
        >
          {/* Subtle Fabric Grain / Sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-[#DCD6FF]/20 pointer-events-none" />

          {/* Top Decorative Curtain Pelmet / Fringe */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/90 to-transparent border-b border-[#CFE5FF]/40 shadow-sm" />
        </div>
      </motion.div>

      {/* ================= DRIFTING PARTICLES & PETALS ================= */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {[
          { left: '20%', top: '25%', delay: 0, size: 8, color: '#8DBBFF' },
          { left: '80%', top: '30%', delay: 0.8, size: 10, color: '#DCD6FF' },
          { left: '35%', top: '65%', delay: 1.4, size: 7, color: '#FFE0EB' },
          { left: '68%', top: '75%', delay: 0.5, size: 9, color: '#CFE5FF' },
          { left: '15%', top: '80%', delay: 1.8, size: 6, color: '#FFFFFF' },
          { left: '85%', top: '15%', delay: 1.1, size: 8, color: '#8DBBFF' },
        ].map((p, idx) => (
          <motion.div
            key={`particle-${idx}`}
            animate={{
              y: [0, -25, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              duration: 4.5 + idx,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
            }}
            className="absolute rounded-full blur-[0.5px] shadow-sm"
          />
        ))}

        {/* Parting Petals during Curtain Reveal */}
        <AnimatePresence>
          {isOpen && (
            <>
              {[
                { x: -160, y: -80, rotate: -35 },
                { x: 170, y: -70, rotate: 40 },
                { x: -130, y: 90, rotate: 25 },
                { x: 150, y: 110, rotate: -30 },
                { x: 0, y: -140, rotate: 15 },
              ].map((petal, i) => (
                <motion.div
                  key={`reveal-petal-${i}`}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, x: petal.x, y: petal.y, rotate: petal.rotate }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                  className="absolute top-1/2 left-1/2 -mt-4 -ml-4 w-8 h-8 pointer-events-none"
                >
                  <svg viewBox="0 0 24 24" fill="#FFE0EB" className="w-full h-full text-[#FFE0EB] drop-shadow">
                    <path d="M12 2C8 6 4 12 12 22C20 12 16 6 12 2Z" />
                  </svg>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ================= CENTRAL EMBLEM & INVITATION ================= */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82, transition: { duration: 0.5, ease: 'easeIn' } }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Center Glass Heart Medallion */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut',
              }}
              className="relative mb-6"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/70 backdrop-blur-xl border border-white/90 shadow-glass flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                >
                  <Heart className="w-9 h-9 sm:w-11 sm:h-11 text-[#648BFF] fill-[#CFE5FF]/70" />
                </motion.div>
              </div>
              {/* Outer soft ambient glow */}
              <div className="absolute inset-0 rounded-full bg-[#8DBBFF]/30 blur-xl -z-10 animate-pulse-glow" />
            </motion.div>

            {/* Typography */}
            <div className="max-w-md mx-auto mb-8">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#648BFF] block mb-2">
                A Cinematic Journey
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-wider text-[#202642] mb-3">
                SORRYVERSE
              </h1>
              <div className="space-y-1 mb-2">
                <p className="font-editorial italic text-base sm:text-xl text-[#78809B]">
                  Some words take courage…
                </p>
                <p className="font-editorial italic text-sm sm:text-base text-[#648BFF] font-medium">
                  And some feelings deserve to be expressed.
                </p>
              </div>
            </div>

            {/* STAGE 2: LOADING INDICATOR OR STAGE 3: OPEN BUTTON */}
            <div className="min-h-[58px] flex items-center justify-center">
              {!isReady ? (
                /* Delicate Loading Indicator */
                <div className="flex flex-col items-center gap-2.5">
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          delay: dot * 0.2,
                          ease: 'easeInOut',
                        }}
                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#8DBBFF] to-[#DCD6FF]"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-sans text-[#78809B] tracking-wider uppercase font-medium">
                    Preparing heartstrings…
                  </span>
                </div>
              ) : (
                /* Opening Invitation Button */
                <motion.button
                  initial={{ opacity: 0, scale: 0.88, y: 15 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  onClick={handleOpenCurtains}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/80 backdrop-blur-2xl border border-white/90 shadow-glass text-sm sm:text-base font-semibold text-[#202642] hover:text-[#648BFF] hover:border-[#8DBBFF]/60 hover:shadow-glass-hover transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#648BFF]"
                >
                  <Sparkles className="w-4 h-4 text-[#8DBBFF] group-hover:rotate-12 transition-transform duration-300" />
                  <span>Open the Curtains</span>
                  <ArrowRight className="w-4 h-4 text-[#648BFF] group-hover:translate-x-1 transition-transform duration-300" />

                  {/* Pulsing subtle glow border */}
                  <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#CFE5FF] to-[#DCD6FF] opacity-30 blur group-hover:opacity-60 transition-opacity -z-10" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
