import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import type { ApologyConfig } from '../config/apologyConfig';
import { ambientSound } from '../audio/ambientSound';

interface Scene1Props {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene1DreamyOpening: React.FC<Scene1Props> = ({ config, onProceed }) => {
  const handleOpenHeart = () => {
    // Start gentle ambient sound if not already started
    ambientSound.startAmbience();
    onProceed();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 py-12">
      {/* Little floating glowing 3D-styled heart */}
      <AnimatedElement variant="floating-idle" className="mb-6">
        <AnimatedElement variant="tilt-3d-hover">
          <div className="relative group cursor-pointer" onClick={handleOpenHeart}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#CFE5FF] via-white to-[#FFE0EB] p-0.5 shadow-glass shadow-[#8DBBFF]/20 flex items-center justify-center transform transition-transform group-hover:scale-105">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: 'easeInOut',
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] bg-white/80 backdrop-blur-md flex items-center justify-center shadow-inner"
              >
                <Heart className="w-8 h-8 text-[#648BFF] fill-[#CFE5FF]/70" />
              </motion.div>
            </div>
            {/* Soft halo glow */}
            <div className="absolute inset-0 bg-[#8DBBFF]/30 rounded-3xl blur-xl -z-10 animate-pulse-glow" />
          </div>
        </AnimatedElement>
      </AnimatedElement>

      {/* Ephemeral teaser phrases */}
      <div className="space-y-2 mb-6 max-w-lg">
        <AnimatedText
          text={config.scene1.leadText1}
          variant="char-by-char"
          as="p"
          className="text-xs sm:text-sm font-medium tracking-widest uppercase text-[#78809B]"
          delay={0.2}
        />
        <AnimatedText
          text={config.scene1.leadText2}
          variant="blur-to-sharp"
          as="p"
          className="font-editorial text-lg sm:text-2xl text-[#648BFF] italic"
          delay={0.8}
        />
      </div>

      {/* Main Title */}
      <div className="max-w-3xl mx-auto mb-8">
        <AnimatedText
          text={config.scene1.headline}
          variant="letter-spacing-collapse"
          as="h1"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#202642] leading-tight"
          delay={1.4}
        />
        <AnimatedText
          text={config.scene1.subheadline}
          variant="fade-up-stagger"
          as="p"
          className="mt-4 text-sm sm:text-base text-[#78809B] max-w-xl mx-auto font-light"
          delay={1.8}
        />
      </div>

      {/* Call to action button */}
      <AnimatedElement variant="spring-overshoot" delay={2.0} className="mb-8">
        <AnimatedElement variant="magnetic-button">
          <Button
            size="lg"
            variant="primary"
            onClick={handleOpenHeart}
            icon={<Sparkles className="w-5 h-5 text-[#FFE0EB]" />}
            className="group shadow-xl shadow-[#8DBBFF]/35"
          >
            <span>{config.scene1.ctaButton}</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </AnimatedElement>
      </AnimatedElement>

      {/* Subtle click or scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="flex flex-col items-center gap-1.5 text-xs text-[#78809B]/70"
      >
        <span>Click to begin the journey</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-1.5 h-1.5 rounded-full bg-[#8DBBFF]"
        />
      </motion.div>
    </div>
  );
};
