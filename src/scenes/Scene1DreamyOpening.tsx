import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import { GlassHeart } from '../components/GlassHeart';
import type { ApologyConfig } from '../config/apologyConfig';
import { ambientSound } from '../audio/ambientSound';

interface Scene1Props {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene1DreamyOpening: React.FC<Scene1Props> = ({ config, onProceed }) => {
  const handleOpenHeart = () => {
    ambientSound.startAmbience();
    onProceed();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 py-12">
      {/* Large ambient orb behind heart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(207,229,255,0.4) 0%, rgba(220,214,255,0.25) 45%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Living 3D Glass Heart — Main CTA */}
      <AnimatedElement variant="floating-idle" className="mb-8">
        <GlassHeart
          size="xl"
          onClick={handleOpenHeart}
          enablePointerTilt={true}
          idleFloat={false}
          glowColor="#8DBBFF"
        />
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

      {/* Main Title with cinematic letter animation */}
      <div className="max-w-xl sm:max-w-2xl mx-auto mb-8 px-2 text-center">
        <AnimatedText
          text={config.scene1.headline}
          variant="split-reassemble"
          as="h1"
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#202642] leading-[1.18] sm:leading-tight"
          delay={1.2}
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

      {/* Subtle scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="flex flex-col items-center gap-1.5 text-xs text-[#78809B]/70"
      >
        <span>Click the heart or button to begin</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-1.5 h-1.5 rounded-full bg-[#8DBBFF]"
        />
      </motion.div>
    </div>
  );
};
