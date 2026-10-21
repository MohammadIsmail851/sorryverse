import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, ArrowRight, Eye, RotateCcw } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { Button } from '../components/common/Button';
import type { ApologyConfig } from '../config/apologyConfig';
import { ambientSound } from '../audio/ambientSound';

interface Scene4LetterProps {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene4CinematicLetter: React.FC<Scene4LetterProps> = ({ config, onProceed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullImmediately, setShowFullImmediately] = useState(false);

  const handleOpenEnvelope = useCallback(() => {
    ambientSound.playPaperRustle();
    setIsOpen(true);
  }, []);

  const handleRevealAll = useCallback(() => {
    setShowFullImmediately(true);
  }, []);

  const handleReplayLetter = useCallback(() => {
    setIsOpen(false);
    setShowFullImmediately(false);
  }, []);

  return (
    <div className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 z-10 py-14 max-w-4xl mx-auto text-center">
      {/* Top Badge */}
      <AnimatedElement variant="fade-translate" className="mb-3">
        <span className="px-4 py-1.5 rounded-full bg-[#FFE0EB]/60 border border-[#FFE0EB] text-xs font-semibold tracking-wider uppercase text-[#648BFF] inline-flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5" />
          <span>{config.sceneLetter.badge}</span>
        </span>
      </AnimatedElement>

      {/* Title */}
      <div className="mb-8 max-w-2xl mx-auto">
        <AnimatedText
          text={config.sceneLetter.title}
          variant="masked-reveal"
          as="h2"
          className="font-serif text-3xl sm:text-5xl font-bold text-[#202642] tracking-tight mb-2"
        />
        <p className="text-sm sm:text-base text-[#78809B] font-light max-w-lg mx-auto">
          {config.sceneLetter.envelopeLabel}
        </p>
      </div>

      {/* 3D Envelope & Letter Presentation Container */}
      <div
        className="w-full max-w-2xl my-4 relative flex flex-col items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ================= CLOSED ENVELOPE WITH WAX SEAL ================= */
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="relative w-full max-w-lg h-64 sm:h-80 rounded-3xl bg-gradient-to-b from-[#F8FBFF] to-[#EEF5FF] border border-white/90 shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6 cursor-pointer select-none group"
              onClick={handleOpenEnvelope}
            >
              {/* Envelope Flap Fold Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl border-b border-[#CFE5FF]/60 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(207,229,255,0.2) 100%)',
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                }}
              />

              {/* Envelope Side Shadows for Depth */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 40px rgba(100, 139, 255, 0.08)',
                }}
              />

              {/* Central Wax Seal */}
              <motion.button
                whileHover={{ scale: 1.12, rotate: 6 }}
                whileTap={{ scale: 0.92 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEnvelope();
                }}
                className="relative z-10 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#648BFF] via-[#78809B] to-[#FFE0EB] p-1 shadow-lg shadow-[#8DBBFF]/40 flex items-center justify-center cursor-pointer border border-white/80"
                aria-label="Open wax seal on envelope"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFE0EB] via-[#DCD6FF] to-[#CFE5FF] flex flex-col items-center justify-center text-center shadow-inner">
                  <Heart className="w-5 h-5 sm:w-8 sm:h-8 text-[#648BFF] fill-[#648BFF]/40 mb-0.5" />
                  <span className="text-[8px] sm:text-[9px] font-serif font-black tracking-widest text-[#202642] uppercase">
                    SEAL
                  </span>
                </div>
              </motion.button>

              <span className="mt-4 sm:mt-6 text-xs sm:text-sm font-editorial italic text-[#78809B] group-hover:text-[#648BFF] transition-colors">
                {config.sceneLetter.unfoldPrompt}
              </span>
            </motion.div>
          ) : (
            /* ================= UNFOLDED PARCHMENT LETTER ================= */
            <motion.div
              key="unfolded-letter"
              initial={{ opacity: 0, scaleY: 0.3, y: 40 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ originY: 0 }}
              className="w-full max-w-2xl bg-[#FFFFFE] rounded-3xl p-4 sm:p-10 border border-[#CFE5FF]/80 shadow-2xl text-left relative overflow-hidden"
            >
              {/* Subtle paper grain texture and margin lines */}
              <div
                className="absolute left-4 sm:left-12 top-0 bottom-0 w-[1px] bg-rose-200/40 pointer-events-none"
              />
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-[#FFE0EB]/30 to-transparent pointer-events-none rounded-tr-3xl" />

              {/* Letter Header */}
              <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#EEF5FF] flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#648BFF] block">
                    Unspoken Apology
                  </span>
                  <h3 className="font-editorial text-lg sm:text-2xl text-[#202642] italic font-semibold">
                    {config.sceneLetter.salutation}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {!showFullImmediately && (
                    <button
                      onClick={handleRevealAll}
                      className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#EEF5FF] text-[10px] sm:text-[11px] font-medium text-[#648BFF] hover:bg-[#CFE5FF] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Reveal Full Letter</span>
                    </button>
                  )}
                  <button
                    onClick={handleReplayLetter}
                    title="Fold envelope again"
                    className="p-1.5 rounded-full text-[#78809B] hover:text-[#202642] hover:bg-[#EEF5FF] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-4 sm:space-y-5 text-[#202642]/90 leading-relaxed font-sans text-xs sm:text-base pl-2 sm:pl-6">
                {config.sceneLetter.paragraphs.map((para, idx) => (
                  <motion.p
                    key={idx}
                    initial={showFullImmediately ? { opacity: 1 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: showFullImmediately ? 0 : 0.25 * idx,
                    }}
                    className="font-light leading-relaxed select-text"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Closing & Signature */}
              <div className="mt-8 pt-6 border-t border-[#EEF5FF] pl-4 sm:pl-6">
                <p className="text-xs sm:text-sm font-editorial italic text-[#78809B] mb-2">
                  {config.sceneLetter.closing}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base sm:text-lg text-[#648BFF]">
                    {config.senderName}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#FFE0EB]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            {config.sceneLetter.continueButton}
          </Button>
        </AnimatedElement>
      </div>
    </div>
  );
};
