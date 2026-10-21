import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import { GlassCard } from '../components/common/GlassCard';
import type { ApologyConfig } from '../config/apologyConfig';
import { ambientSound } from '../audio/ambientSound';

interface Scene7HealingHeartProps {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene7HealingHeart: React.FC<Scene7HealingHeartProps> = ({ config, onProceed }) => {
  const [completedPromises, setCompletedPromises] = useState<Record<string, boolean>>({});

  const togglePromise = useCallback((id: string) => {
    setCompletedPromises((prev) => {
      const nextState = !prev[id];
      const updated = { ...prev, [id]: nextState };
      
      if (nextState) {
        ambientSound.playHeartPulse();
      }

      // Check if all 4 are now completed
      const allDone = config.sceneHealingHeart.promises.every((p) => updated[p.id]);
      if (allDone && !prev[id]) {
        ambientSound.playHarmonicChord();
        try {
          confetti({
            particleCount: 50,
            spread: 80,
            origin: { y: 0.45, x: 0.5 },
            colors: ['#F5E6B3', '#FFE0EB', '#CFE5FF', '#8DBBFF', '#DCD6FF'],
          });
        } catch {
          // Non-blocking
        }
      }

      return updated;
    });
  }, [config.sceneHealingHeart.promises]);

  const completedCount = Object.values(completedPromises).filter(Boolean).length;
  const isFullyMended = completedCount === config.sceneHealingHeart.promises.length;

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 z-10 py-14 max-w-5xl mx-auto text-center">
      {/* Top Badge */}
      <AnimatedElement variant="fade-translate" className="mb-3">
        <span className="px-4 py-1.5 rounded-full bg-[#F5E6B3]/60 border border-[#F5E6B3] text-xs font-semibold tracking-wider uppercase text-amber-700 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{config.sceneHealingHeart.badge}</span>
        </span>
      </AnimatedElement>

      {/* Title */}
      <div className="mb-8 max-w-2xl mx-auto">
        <AnimatedText
          text={config.sceneHealingHeart.headline}
          variant="blur-to-sharp"
          as="h2"
          className="font-serif text-3xl sm:text-5xl font-bold text-[#202642] tracking-tight mb-2"
        />
        <p className="text-sm sm:text-base text-[#78809B] font-light max-w-xl mx-auto leading-relaxed">
          {config.sceneHealingHeart.description}
        </p>
      </div>

      {/* The Central Kintsugi 3D Heart */}
      <div className="relative my-6 flex flex-col items-center justify-center select-none">
        {/* Glow behind the heart */}
        <motion.div
          animate={{
            scale: isFullyMended ? [1, 1.25, 1] : [1, 1.08, 1],
            opacity: isFullyMended ? 0.8 : 0.4,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-56 sm:w-64 h-56 sm:h-64 rounded-full -z-10 blur-2xl"
          style={{
            background: isFullyMended
              ? 'radial-gradient(circle, rgba(245, 230, 179, 0.75) 0%, rgba(255, 224, 235, 0.4) 60%, transparent 80%)'
              : 'radial-gradient(circle, rgba(207, 229, 255, 0.6) 0%, rgba(220, 214, 255, 0.3) 60%, transparent 80%)',
          }}
        />

        {/* SVG Kintsugi Heart with illuminated crack paths */}
        <div className="relative w-44 sm:w-52 h-44 sm:h-52 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
            <defs>
              <linearGradient id="kintsugiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.9} />
                <stop offset="50%" stopColor="#EEF5FF" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#DCD6FF" stopOpacity={0.7} />
              </linearGradient>

              <filter id="kintsugiGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="glow" />
                <feComposite in="SourceGraphic" in2="glow" operator="over" />
              </filter>
            </defs>

            {/* Base Heart Body */}
            <path
              d="M50 88 C20 62 5 44 5 26 C5 14 14 5 26 5 C34 5 43 9 50 18 C57 9 66 5 74 5 C86 5 95 14 95 26 C95 44 80 62 50 88 Z"
              fill="url(#kintsugiGrad)"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="2"
            />

            {/* Crack 1 — Top Left (Mended by Promise 1) */}
            <motion.path
              d="M30 18 Q38 32 45 42 Q40 50 48 65"
              fill="none"
              stroke={completedPromises['listening'] ? '#E6A122' : 'rgba(120, 128, 155, 0.3)'}
              strokeWidth={completedPromises['listening'] ? '3' : '1.5'}
              strokeLinecap="round"
              filter={completedPromises['listening'] ? 'url(#kintsugiGlow)' : undefined}
              animate={{
                strokeDashoffset: [0, 10, 0],
              }}
              transition={{ repeat: Infinity, duration: 4 }}
            />

            {/* Crack 2 — Top Right (Mended by Promise 2) */}
            <motion.path
              d="M70 18 Q62 30 55 42 Q60 52 52 68"
              fill="none"
              stroke={completedPromises['accountability'] ? '#E6A122' : 'rgba(120, 128, 155, 0.3)'}
              strokeWidth={completedPromises['accountability'] ? '3' : '1.5'}
              strokeLinecap="round"
              filter={completedPromises['accountability'] ? 'url(#kintsugiGlow)' : undefined}
            />

            {/* Crack 3 — Bottom Center (Mended by Promise 3) */}
            <motion.path
              d="M50 85 Q48 70 52 58 Q46 50 50 40"
              fill="none"
              stroke={completedPromises['boundaries'] ? '#E6A122' : 'rgba(120, 128, 155, 0.3)'}
              strokeWidth={completedPromises['boundaries'] ? '3' : '1.5'}
              strokeLinecap="round"
              filter={completedPromises['boundaries'] ? 'url(#kintsugiGlow)' : undefined}
            />

            {/* Crack 4 — Across the Center (Mended by Promise 4) */}
            <motion.path
              d="M20 38 Q35 44 50 40 Q65 42 80 38"
              fill="none"
              stroke={completedPromises['growth'] ? '#E6A122' : 'rgba(120, 128, 155, 0.3)'}
              strokeWidth={completedPromises['growth'] ? '3' : '1.5'}
              strokeLinecap="round"
              filter={completedPromises['growth'] ? 'url(#kintsugiGlow)' : undefined}
            />

            {/* Center golden emblem if mended */}
            {isFullyMended && (
              <circle cx="50" cy="45" r="5" fill="#E6A122" filter="url(#kintsugiGlow)" />
            )}
          </svg>
        </div>

        <span className="mt-3 text-xs font-mono text-[#78809B]">
          {completedCount} of {config.sceneHealingHeart.promises.length} Commitments Illuminated
        </span>
      </div>

      {/* 4 Interactive Commitment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-8 text-left">
        {config.sceneHealingHeart.promises.map((p) => {
          const isDone = !!completedPromises[p.id];
          return (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => togglePromise(p.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isDone
                  ? 'bg-gradient-to-br from-[#F5E6B3]/35 to-white/90 border-amber-300 shadow-md shadow-amber-200/40'
                  : 'bg-white/70 border-white/90 hover:bg-white hover:border-[#8DBBFF]/60 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-100/60 px-2.5 py-0.5 rounded-full">
                    {p.tag}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isDone ? 'bg-amber-500 text-white' : 'bg-[#EEF5FF] text-[#78809B]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="font-serif font-bold text-base text-[#202642] mb-1">
                  {p.title}
                </h4>
                <p className="text-xs text-[#78809B] leading-relaxed">
                  {p.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completion Banner */}
      <AnimatePresence>
        {isFullyMended && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 240, damping: 20 }}
            className="mb-8 w-full max-w-xl"
          >
            <GlassCard className="p-6 backdrop-blur-2xl border-amber-200 bg-amber-50/50">
              <div className="flex items-center justify-center gap-2 mb-2 text-amber-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Kintsugi Complete</span>
              </div>
              <p className="font-editorial text-lg sm:text-xl text-[#202642] italic font-semibold">
                "{config.sceneHealingHeart.repairedMessage}"
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue */}
      <AnimatedElement variant="spring-overshoot">
        <Button
          size="md"
          variant="primary"
          onClick={onProceed}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {config.sceneHealingHeart.continueButton}
        </Button>
      </AnimatedElement>
    </div>
  );
};
