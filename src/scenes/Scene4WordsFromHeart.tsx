import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, BookOpen, Sparkles, HeartHandshake, Eye } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import type { ApologyConfig } from '../config/apologyConfig';

interface Scene4Props {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene4WordsFromHeart: React.FC<Scene4Props> = ({ config, onProceed }) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const selectedCard = config.scene4Cards.find((c) => c.id === selectedCardId);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 z-10 py-16 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-12">
        <AnimatedElement variant="fade-translate">
          <span className="px-4 py-1.5 rounded-full bg-[#DCD6FF]/40 border border-[#8DBBFF]/30 text-xs font-semibold tracking-wider uppercase text-[#648BFF] inline-block mb-3">
            Open Reflections
          </span>
        </AnimatedElement>
        <AnimatedText
          text="Words From The Heart"
          variant="masked-reveal"
          as="h2"
          className="font-serif text-3xl sm:text-5xl font-bold text-[#202642] tracking-tight"
        />
        <p className="mt-3 text-sm sm:text-base text-[#78809B] max-w-xl mx-auto font-light">
          Three deep considerations that deserve your unhurried attention. Tap any card to open its full perspective.
        </p>
      </div>

      {/* 3 Floating Glass Cards Grid with 3D tilt and expansion */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 w-full mb-12">
        {config.scene4Cards.map((card, idx) => (
          <AnimatedElement
            key={card.id}
            variant="staggered-entrance"
            delay={idx * 0.15}
            className="h-full"
          >
            <AnimatedElement variant="tilt-3d-hover" className="w-full h-full">
              <motion.div
                whileHover={{ y: -6 }}
                onClick={() => setSelectedCardId(card.id)}
                className="group relative glass-panel rounded-3xl p-5 sm:p-8 h-full flex flex-col justify-between cursor-pointer border border-white/80 hover:border-[#8DBBFF]/60 hover:shadow-glass-hover transition-all duration-300"
              >
                {/* Header tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#EEF5FF] text-[#648BFF] border border-[#CFE5FF]/60">
                      {card.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#F8FBFF] flex items-center justify-center text-[#78809B] group-hover:text-[#648BFF] transition-colors">
                      {idx === 0 && <BookOpen className="w-4 h-4" />}
                      {idx === 1 && <HeartHandshake className="w-4 h-4" />}
                      {idx === 2 && <Eye className="w-4 h-4" />}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#202642] mb-2 group-hover:text-[#648BFF] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#78809B] font-medium mb-4">
                    {card.subtitle}
                  </p>
                  <p className="text-sm text-[#78809B] line-clamp-3 leading-relaxed">
                    {card.preview}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="mt-6 pt-4 border-t border-[#CFE5FF]/40 flex items-center justify-between text-xs font-semibold text-[#648BFF]">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Expand perspective</span>
                  </span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </AnimatedElement>
          </AnimatedElement>
        ))}
      </div>

      {/* Expanded Modal for detail view */}
      <Modal
        isOpen={!!selectedCard}
        onClose={() => setSelectedCardId(null)}
        title={selectedCard?.title}
      >
        {selectedCard && (
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-[#EEF5FF] text-xs font-semibold text-[#648BFF]">
              {selectedCard.badge} • {selectedCard.subtitle}
            </div>

            <p className="text-base sm:text-lg text-[#202642] leading-relaxed font-editorial italic bg-[#F8FBFF]/70 p-5 rounded-2xl border border-[#CFE5FF]/50">
              “{selectedCard.content}”
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#EEF5FF]">
              <span className="text-xs text-[#78809B]">
                Feel free to pause, close, or review the others.
              </span>
              <Button size="sm" variant="glass" onClick={() => setSelectedCardId(null)}>
                Close Perspective
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Continue */}
      <AnimatedElement variant="spring-overshoot" delay={0.5}>
        <Button
          size="md"
          variant="primary"
          onClick={onProceed}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          View The Little Things That Matter
        </Button>
      </AnimatedElement>
    </div>
  );
};
