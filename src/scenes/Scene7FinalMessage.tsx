import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import { GlassCard } from '../components/common/GlassCard';
import { GlassHeart } from '../components/GlassHeart';
import type { ApologyConfig } from '../config/apologyConfig';

interface Scene7Props {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene7FinalMessage: React.FC<Scene7Props> = ({ config, onProceed }) => {
  const [selectedChoice, setSelectedChoice] = useState<'hear' | 'time' | null>(null);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 py-16 max-w-4xl mx-auto">
      {/* Three sequential statements */}
      <div className="space-y-6 mb-12 max-w-2xl">
        <AnimatedText
          text={config.scene7Choices.quote1}
          variant="fade-up-stagger"
          as="p"
          className="font-editorial text-2xl sm:text-3xl text-[#78809B] italic"
          delay={0.2}
        />

        <AnimatedText
          text={config.scene7Choices.quote2}
          variant="blur-to-sharp"
          as="p"
          className="font-editorial text-2xl sm:text-3xl text-[#202642] italic font-semibold"
          delay={0.8}
        />

        <div className="pt-4">
          <AnimatedText
            text={config.scene7Choices.finalApology}
            variant="spring-bounce"
            as="h2"
            className="font-serif text-4xl sm:text-6xl font-bold text-[#648BFF] tracking-tight"
            delay={1.4}
          />
        </div>
      </div>

      {/* Glass Heart — quiet presence above the choice */}
      <AnimatedElement variant="fade-scale" delay={0.3} className="mb-6">
        <GlassHeart
          size="sm"
          enablePointerTilt={false}
          idleFloat={true}
          glowColor="#FFE0EB"
        />
      </AnimatedElement>

      {/* Choice Card Area */}
      <GlassCard className="w-full max-w-xl mb-10 text-left backdrop-blur-2xl">
        <h4 className="text-center font-sans text-xs uppercase tracking-widest text-[#78809B] font-semibold mb-6">
          How does this sit with your heart today?
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Option 1: "I hear you." */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedChoice('hear')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedChoice === 'hear'
                ? 'bg-[#EEF5FF] border-[#648BFF] shadow-md shadow-[#8DBBFF]/20'
                : 'bg-white/60 border-white/80 hover:bg-white/90 hover:border-[#8DBBFF]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif font-bold text-lg text-[#202642]">
                {config.scene7Choices.option1Text}
              </span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedChoice === 'hear' ? 'bg-[#648BFF] text-white' : 'bg-[#EEF5FF] text-[#8DBBFF]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-[#78809B] leading-relaxed">
              Acknowledging receipt with openness and calm.
            </p>
          </motion.button>

          {/* Option 2: "I need some time." */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedChoice('time')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedChoice === 'time'
                ? 'bg-[#FFE0EB]/30 border-[#DCD6FF] shadow-md shadow-[#FFE0EB]/30'
                : 'bg-white/60 border-white/80 hover:bg-white/90 hover:border-[#DCD6FF]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif font-bold text-lg text-[#202642]">
                {config.scene7Choices.option2Text}
              </span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedChoice === 'time' ? 'bg-[#648BFF] text-white' : 'bg-[#FFE0EB] text-[#648BFF]'
                }`}
              >
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-[#78809B] leading-relaxed">
              Taking personal space without any rush or pressure.
            </p>
          </motion.button>
        </div>

        {/* Gentle Response Display */}
        <AnimatePresence mode="wait">
          {selectedChoice && (
            <motion.div
              key={selectedChoice}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="p-4 rounded-2xl bg-white/80 border border-[#CFE5FF]/60 text-xs sm:text-sm text-[#202642] leading-relaxed font-light"
            >
              <div className="flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-[#648BFF] flex-shrink-0 mt-0.5 fill-[#FFE0EB]" />
                <p>
                  {selectedChoice === 'hear'
                    ? config.scene7Choices.option1Response
                    : config.scene7Choices.option2Response}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>

      {/* Continue */}
      <AnimatedElement variant="spring-overshoot">
        <Button
          size="md"
          variant="primary"
          onClick={onProceed}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          To The Quiet Ending
        </Button>
      </AnimatedElement>
    </div>
  );
};
