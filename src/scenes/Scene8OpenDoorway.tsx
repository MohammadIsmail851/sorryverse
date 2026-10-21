import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DoorOpen, Sparkles, ArrowRight, Sun } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import type { ApologyConfig } from '../config/apologyConfig';
import { ambientSound } from '../audio/ambientSound';

interface Scene8DoorProps {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene8OpenDoorway: React.FC<Scene8DoorProps> = ({ config, onProceed }) => {
  const [isSteppingThrough, setIsSteppingThrough] = useState(false);

  const handleStepThrough = useCallback(() => {
    setIsSteppingThrough(true);
    ambientSound.playDoorwayChime();
    setTimeout(() => {
      onProceed();
    }, 1200);
  }, [onProceed]);

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 z-10 py-14 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Volumetric background sunlight glow */}
      <motion.div
        animate={{
          scale: isSteppingThrough ? [1, 2.5] : [1, 1.1, 1],
          opacity: isSteppingThrough ? [0.6, 1] : [0.35, 0.6, 0.35],
        }}
        transition={{ duration: isSteppingThrough ? 1.2 : 5, repeat: isSteppingThrough ? 0 : Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full pointer-events-none -z-10 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 248, 220, 0.8) 0%, rgba(207, 229, 255, 0.45) 45%, rgba(220, 214, 255, 0.2) 70%, transparent 90%)',
        }}
      />

      {/* Top Badge */}
      <AnimatedElement variant="fade-translate" className="mb-3">
        <span className="px-4 py-1.5 rounded-full bg-[#CFE5FF]/50 border border-[#8DBBFF]/40 text-xs font-semibold tracking-wider uppercase text-[#648BFF] inline-flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>{config.sceneOpenDoor.badge}</span>
        </span>
      </AnimatedElement>

      {/* Title */}
      <div className="mb-8 max-w-2xl mx-auto">
        <AnimatedText
          text={config.sceneOpenDoor.headline}
          variant="blur-to-sharp"
          as="h2"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#202642] tracking-tight mb-3"
        />
        <p className="text-sm sm:text-base text-[#78809B] font-light max-w-lg mx-auto">
          {config.sceneOpenDoor.subheadline}
        </p>
      </div>

      {/* 3D Glowing Doorway Archway */}
      <motion.div
        animate={
          isSteppingThrough
            ? { scale: 1.8, opacity: [1, 0.8, 0], filter: 'blur(10px)' }
            : { y: [0, -8, 0] }
        }
        transition={
          isSteppingThrough
            ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            : { repeat: Infinity, duration: 6, ease: 'easeInOut' }
        }
        style={{ perspective: '1000px' }}
        className="relative my-4 flex flex-col items-center justify-center cursor-pointer select-none group"
        onClick={handleStepThrough}
      >
        {/* Exterior Arch Frame */}
        <div className="w-48 sm:w-64 h-72 sm:h-96 rounded-t-full border-4 border-white/90 bg-white/40 backdrop-blur-xl shadow-2xl p-2.5 sm:p-3 flex flex-col items-center justify-end relative overflow-hidden group-hover:border-[#8DBBFF] transition-colors">
          {/* Light Rays pouring through door opening */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-[#FFF9E6]/70 to-[#EEF5FF]/80 rounded-t-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            {/* Soft inner sunburst */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="w-36 sm:w-48 h-36 sm:h-48 rounded-full border border-dashed border-[#F5E6B3]/60 absolute pointer-events-none"
            />

            <Sparkles className="w-8 h-8 text-amber-500/80 mb-3 drop-shadow animate-pulse" />

            <span className="font-editorial italic text-base sm:text-lg text-[#202642] font-semibold leading-relaxed">
              Step into peace and understanding
            </span>

            <span className="text-[10px] font-mono uppercase tracking-widest text-[#78809B] mt-3">
              No pressure • Just light
            </span>
          </div>

          {/* Doorway threshold bar */}
          <div className="w-full h-3 rounded-full bg-gradient-to-r from-[#CFE5FF] via-white to-[#DCD6FF] z-10 shadow-sm" />
        </div>

        {/* Ambient base shadow */}
        <div className="w-64 sm:w-72 h-4 rounded-full bg-[#8DBBFF]/25 blur-md mt-2" />
      </motion.div>

      {/* Reflection Note */}
      <div className="max-w-xl mx-auto my-6">
        <p className="font-editorial text-sm sm:text-base text-[#78809B] italic leading-relaxed">
          "{config.sceneOpenDoor.reflection}"
        </p>
      </div>

      {/* Step Through Button */}
      <div className="mt-4">
        <AnimatedElement variant="spring-overshoot">
          <Button
            size="lg"
            variant="primary"
            onClick={handleStepThrough}
            icon={<DoorOpen className="w-5 h-5 text-[#FFE0EB]" />}
            className="shadow-xl shadow-[#8DBBFF]/30"
          >
            <span>{config.sceneOpenDoor.stepThroughButton}</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </AnimatedElement>
      </div>
    </div>
  );
};
