import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import type { ApologyConfig } from '../config/apologyConfig';

interface Scene8Props {
  config: ApologyConfig;
  onReplay: () => void;
  onOpenLab: () => void;
  onReplayCurtain?: () => void;
}

export const Scene8QuietEnding: React.FC<Scene8Props> = ({ config, onReplay, onOpenLab, onReplayCurtain }) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-between px-4 sm:px-6 text-center z-10 py-16 max-w-4xl mx-auto">
      <div />

      {/* Center content */}
      <div className="flex flex-col items-center max-w-xl mx-auto">
        {/* Soft pearl heart */}
        <AnimatedElement variant="floating-idle" className="mb-8">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
            }}
            className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-glass flex items-center justify-center text-[#648BFF]"
          >
            <Heart className="w-8 h-8 fill-[#CFE5FF]/50 text-[#8DBBFF]" />
          </motion.div>
        </AnimatedElement>

        {/* Message */}
        <AnimatedText
          text={config.scene8Ending.finalNote}
          variant="blur-to-sharp"
          as="h2"
          className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#202642] tracking-tight mb-4"
          delay={0.2}
        />

        <AnimatedText
          text={config.scene8Ending.reassurance}
          variant="fade-up-stagger"
          as="p"
          className="font-editorial italic text-lg sm:text-2xl text-[#78809B] mb-10"
          delay={0.6}
        />

        {/* Replay Buttons & Lab button */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <AnimatedElement variant="spring-overshoot" delay={0.9}>
            <Button
              size="md"
              variant="secondary"
              onClick={onReplay}
              icon={<RotateCcw className="w-4 h-4 text-[#648BFF]" />}
            >
              {config.scene8Ending.replayButton}
            </Button>
          </AnimatedElement>

          {onReplayCurtain && (
            <AnimatedElement variant="spring-overshoot" delay={1.0}>
              <Button
                size="md"
                variant="glass"
                onClick={onReplayCurtain}
                icon={<Sparkles className="w-4 h-4 text-[#8DBBFF]" />}
              >
                Replay Curtain Opening
              </Button>
            </AnimatedElement>
          )}

          <AnimatedElement variant="spring-overshoot" delay={1.1}>
            <Button
              size="md"
              variant="glass"
              onClick={onOpenLab}
              icon={<Sparkles className="w-4 h-4 text-[#8DBBFF]" />}
            >
              Explore Transition Showcase
            </Button>
          </AnimatedElement>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="pt-12 text-xs text-[#78809B] flex items-center justify-center gap-1.5"
      >
        <span>{config.scene8Ending.signature}</span>
        <span className="text-[#648BFF]">✦</span>
        <span>SORRYVERSE</span>
      </motion.footer>
    </div>
  );
};
