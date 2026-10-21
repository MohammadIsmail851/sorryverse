import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, Clock, Compass } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import { GlassCard } from '../components/common/GlassCard';
import type { ApologyConfig } from '../config/apologyConfig';
import { ambientSound } from '../audio/ambientSound';

interface Scene3HourglassProps {
  config: ApologyConfig;
  onProceed: () => void;
}

interface SandParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  inTop: boolean;
  alpha: number;
}

export const Scene3Hourglass: React.FC<Scene3HourglassProps> = ({ config, onProceed }) => {
  const [isReversed, setIsReversed] = useState(false);
  const [hasReversedOnce, setHasReversedOnce] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<SandParticle[]>([]);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Initialize sand particles inside canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 280;
    const height = 360;
    canvas.width = width;
    canvas.height = height;

    // Create 160 fine sand particles
    const particles: SandParticle[] = [];
    const colors = ['#8DBBFF', '#CFE5FF', '#DCD6FF', '#FFE0EB', '#F5E6B3', '#FFFFFF'];

    for (let i = 0; i < 160; i++) {
      // Half in top bulb (y: 40 to 140), half in bottom (y: 220 to 320)
      const inTop = i < 100;
      const centerY = inTop ? 95 : 275;
      const radius = inTop ? 45 : 48;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;

      particles.push({
        x: width / 2 + Math.cos(angle) * r,
        y: centerY + Math.sin(angle) * (r * 0.7),
        vx: (Math.random() - 0.5) * 0.4,
        vy: inTop ? 0.8 + Math.random() * 0.8 : 0.2,
        size: 1.5 + Math.random() * 1.5,
        color: colors[i % colors.length],
        inTop,
        alpha: 0.6 + Math.random() * 0.4,
      });
    }

    particlesRef.current = particles;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw hourglass glass outline softly on canvas
      ctx.save();
      ctx.strokeStyle = 'rgba(207, 229, 255, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Top bulb
      ctx.moveTo(cx - 55, 30);
      ctx.bezierCurveTo(cx - 55, 120, cx - 14, cy - 10, cx - 6, cy);
      // Bottom bulb
      ctx.bezierCurveTo(cx - 14, cy + 10, cx - 55, 240, cx - 55, 330);
      ctx.lineTo(cx + 55, 330);
      ctx.bezierCurveTo(cx + 55, 240, cx + 14, cy + 10, cx + 6, cy);
      ctx.bezierCurveTo(cx + 14, cy - 10, cx + 55, 120, cx + 55, 30);
      ctx.closePath();
      ctx.stroke();

      // Soft glass glow fill
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(0.5, 'rgba(207, 229, 255, 0.06)');
      grad.addColorStop(1, 'rgba(220, 214, 255, 0.15)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // Update & Draw particles
      particlesRef.current.forEach((p) => {
        if (!isReversed) {
          // Normal downward flow
          if (p.y < 310) {
            p.y += p.vy;
            // Funneling towards neck when near center
            if (p.y > 110 && p.y < cy + 10) {
              const dx = cx - p.x;
              p.x += dx * 0.08;
            }
          } else {
            // At bottom mound
            p.x += (Math.random() - 0.5) * 0.3;
          }
        } else {
          // REVERSED TIME FLOW — Particles rise upward through the neck!
          if (p.y > 55) {
            p.y -= p.vy * 1.5;
            // Funneling towards neck from bottom
            if (p.y > cy - 10 && p.y < 250) {
              const dx = cx - p.x;
              p.x += dx * 0.1;
            }
          } else {
            // At top mound
            p.x += (Math.random() - 0.5) * 0.3;
          }
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) {
      animFrameRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isReversed, prefersReducedMotion]);

  const toggleReverse = useCallback(() => {
    setIsReversed((prev) => {
      const next = !prev;
      if (next) {
        setHasReversedOnce(true);
        ambientSound.playTimeReverseSwoosh();
      } else {
        ambientSound.playGentleChime(1.2);
      }
      return next;
    });
  }, []);

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 z-10 py-12 max-w-5xl mx-auto text-center">
      {/* Background Volumetric Beam */}
      <motion.div
        animate={{
          opacity: isReversed ? [0.35, 0.7, 0.45] : 0.25,
          scale: isReversed ? [1, 1.15, 1] : 1,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] h-[480px] sm:h-[650px] rounded-full pointer-events-none -z-10 blur-3xl"
        style={{
          background: isReversed
            ? 'radial-gradient(ellipse at center, rgba(245,230,179,0.45) 0%, rgba(207,229,255,0.3) 40%, rgba(220,214,255,0.15) 70%, transparent 85%)'
            : 'radial-gradient(ellipse at center, rgba(207,229,255,0.4) 0%, rgba(220,214,255,0.2) 50%, transparent 80%)',
        }}
      />

      {/* Header Badge */}
      <AnimatedElement variant="fade-translate" className="mb-3">
        <span className="px-4 py-1.5 rounded-full bg-[#CFE5FF]/40 border border-[#8DBBFF]/40 text-xs font-semibold tracking-wider uppercase text-[#648BFF] inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{config.sceneHourglass.badge}</span>
        </span>
      </AnimatedElement>

      {/* Title */}
      <div className="mb-8 max-w-2xl mx-auto">
        <AnimatedText
          text={config.sceneHourglass.headline}
          variant="blur-to-sharp"
          as="h2"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#202642] tracking-tight mb-3"
        />
        <p className="text-sm sm:text-base text-[#78809B] font-light max-w-xl mx-auto">
          {config.sceneHourglass.subheadline}
        </p>
      </div>

      {/* The Hourglass Centerpiece */}
      <div className="relative flex flex-col items-center justify-center my-4 select-none">
        {/* Floating Paper Fragments drifting around */}
        <AnimatePresence>
          {[
            { x: -140, y: -60, rot: -15, text: 'A hasty word' },
            { x: 140, y: -40, rot: 12, text: 'Unheard silence' },
            { x: -130, y: 80, rot: 20, text: 'A missed pause' },
            { x: 135, y: 90, rot: -18, text: 'Pride in haste' },
          ].map((frag, idx) => (
            <motion.div
              key={`frag-${idx}`}
              animate={{
                x: isReversed ? frag.x * 0.4 : frag.x,
                y: isReversed ? frag.y * 0.3 : frag.y,
                opacity: isReversed ? [0.4, 0.8, 0.4] : 0.6,
                rotate: isReversed ? -frag.rot : frag.rot,
              }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="absolute hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/75 backdrop-blur-md border border-white/80 shadow-sm text-[11px] font-editorial italic text-[#78809B] pointer-events-none"
            >
              <Compass className="w-3 h-3 text-[#8DBBFF]" />
              <span>{frag.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Hourglass Container with 3D tilt hover */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={toggleReverse}
          className="relative cursor-pointer group"
          title="Click to toggle time flow reversal"
        >
          {/* Hourglass Decorative Frame Caps */}
          <div className="w-28 sm:w-36 h-3.5 sm:h-4 mx-auto rounded-full bg-gradient-to-r from-[#CFE5FF] via-white to-[#DCD6FF] border border-white/90 shadow-md mb-1" />

          {/* HTML5 Canvas Simulation Area */}
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/80 p-1 shadow-glass group-hover:shadow-glass-hover transition-all">
            <canvas
              ref={canvasRef}
              className="w-[210px] sm:w-[280px] h-[280px] sm:h-[360px] block"
            />
            {/* Soft inner glow */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/30 via-transparent to-[#CFE5FF]/20" />
          </div>

          <div className="w-28 sm:w-36 h-3.5 sm:h-4 mx-auto rounded-full bg-gradient-to-r from-[#DCD6FF] via-white to-[#CFE5FF] border border-white/90 shadow-md mt-1" />

          {/* Glowing pulse on reversal */}
          {isReversed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.98, 1.04, 0.98] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-3xl bg-[#F5E6B3]/30 blur-xl pointer-events-none -z-10"
            />
          )}
        </motion.div>

        {/* Interaction hint */}
        <div className="mt-4 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleReverse}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
              isReversed
                ? 'bg-gradient-to-r from-[#F5E6B3]/80 to-[#FFE0EB]/80 text-[#202642] border-[#F5E6B3] shadow-md'
                : 'bg-white/80 text-[#648BFF] border-white/90 hover:bg-white shadow-sm'
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 transition-transform duration-700 ${isReversed ? 'rotate-180 text-amber-600' : ''}`} />
            <span>{isReversed ? config.sceneHourglass.normalButtonText : config.sceneHourglass.reverseButtonText}</span>
          </motion.button>
        </div>
      </div>

      {/* Central Philosophical Message Card */}
      <AnimatePresence>
        {hasReversedOnce && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="my-6 w-full max-w-xl"
          >
            <GlassCard className="p-6 sm:p-8 backdrop-blur-2xl border border-white/90 shadow-glass">
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#648BFF] block mb-2">
                A Moment of Clarity
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#202642] italic font-semibold mb-3 leading-snug">
                "{config.sceneHourglass.coreQuote}"
              </h3>
              <p className="text-xs sm:text-sm text-[#78809B] leading-relaxed font-light">
                {config.sceneHourglass.reflectionText}
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue */}
      <div className="mt-6">
        <AnimatedElement variant="spring-overshoot">
          <Button
            size="md"
            variant="primary"
            onClick={onProceed}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {config.sceneHourglass.continueButton}
          </Button>
        </AnimatedElement>
      </div>
    </div>
  );
};
