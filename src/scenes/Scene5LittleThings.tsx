import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import type { ApologyConfig } from '../config/apologyConfig';

interface Scene5Props {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene5LittleThings: React.FC<Scene5Props> = ({ config, onProceed }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 z-10 py-16 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <AnimatedElement variant="fade-translate">
          <span className="px-4 py-1.5 rounded-full bg-[#CFE5FF]/40 border border-[#8DBBFF]/30 text-xs font-semibold tracking-wider uppercase text-[#648BFF] inline-block mb-3">
            Cherished Tokens
          </span>
        </AnimatedElement>
        <AnimatedText
          text="Little Things That Matter"
          variant="scale-pop"
          as="h2"
          className="font-serif text-3xl sm:text-5xl font-bold text-[#202642] tracking-tight"
        />
        <p className="mt-3 text-sm sm:text-base text-[#78809B] font-light">
          A gallery of the delicate foundations worth protecting and treating with honor.
        </p>
      </div>

      {/* Horizontal Carousel Controls */}
      <div className="flex items-center justify-end w-full max-w-5xl gap-2 mb-4 px-2">
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll memories left"
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-[#78809B] hover:text-[#648BFF] hover:border-[#8DBBFF]/60 transition-all cursor-pointer shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll memories right"
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-[#78809B] hover:text-[#648BFF] hover:border-[#8DBBFF]/60 transition-all cursor-pointer shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontally scrollable memory container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto w-full max-w-5xl pb-6 px-2 scrollbar-thin scrollbar-thumb-[#CFE5FF] scrollbar-track-transparent snap-x snap-mandatory"
      >
        {config.scene5Memories.map((mem, idx) => (
          <div
            key={mem.id}
            className="flex-shrink-0 w-[260px] sm:w-[320px] snap-center"
          >
            <AnimatedElement variant="card-stack-expand" className="h-full">
              <div className="glass-panel rounded-3xl p-6 h-full flex flex-col justify-between border border-white/90 bg-white/75 backdrop-blur-xl shadow-glass hover:shadow-glass-hover transition-all">
                {/* Visual token illustration area */}
                <div>
                  <div className="w-full h-36 rounded-2xl bg-gradient-to-tr from-[#EEF5FF] via-[#CFE5FF]/40 to-[#FFE0EB]/40 flex flex-col items-center justify-center relative overflow-hidden mb-5 border border-white/70">
                    <motion.div
                      animate={{
                        scale: [1, 1.12, 1],
                        rotate: [0, (idx % 2 === 0 ? 5 : -5), 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4 + idx,
                        ease: 'easeInOut',
                      }}
                      className="text-4xl"
                    >
                      {mem.accentEmojiOrIcon}
                    </motion.div>
                    <span className="absolute bottom-2 left-3 text-[10px] uppercase font-bold tracking-widest text-[#648BFF]/80">
                      {mem.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#202642] mb-2">
                    {mem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78809B] leading-relaxed mb-4 font-sans">
                    {mem.description}
                  </p>
                </div>

                {/* Highlight banner */}
                <div className="pt-3 border-t border-[#EEF5FF] flex items-center gap-1.5 text-xs text-[#648BFF] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#8DBBFF]" />
                  <span>{mem.highlight}</span>
                </div>
              </div>
            </AnimatedElement>
          </div>
        ))}
      </div>

      {/* Continue */}
      <div className="mt-8">
        <AnimatedElement variant="spring-overshoot">
          <Button
            size="md"
            variant="primary"
            onClick={onProceed}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            A Small Interactive Surprise Awaits
          </Button>
        </AnimatedElement>
      </div>
    </div>
  );
};
