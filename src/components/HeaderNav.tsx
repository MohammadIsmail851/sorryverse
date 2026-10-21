import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { AudioToggle } from './AudioToggle';

interface HeaderNavProps {
  currentScene: number;
  totalScenes: number;
  onSelectScene: (sceneIndex: number) => void;
  onOpenShowcase: () => void;
  onReplayCurtain?: () => void;
}

const SCENE_NAMES = [
  '1. The First Breath',
  '2. Sincere Apology',
  '3. The Hourglass (Time Reversal)',
  '4. The Unspoken Letter',
  '5. Words From The Heart',
  '6. Cherished Memories',
  '7. The Healing Heart',
  '8. The Open Doorway',
  '9. Final Choice',
  '10. Quiet Ending',
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScene,
  totalScenes,
  onSelectScene,
  onOpenShowcase,
  onReplayCurtain,
}) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-40 px-2.5 sm:px-6 md:px-8 py-2.5 sm:py-3.5 flex items-center justify-between glass-panel-subtle backdrop-blur-xl border-b border-white/60 min-w-0">
      {/* Brand logo */}
      <div
        onClick={() => onSelectScene(1)}
        className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group select-none flex-shrink-0"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#CFE5FF] to-[#DCD6FF] flex items-center justify-center text-[#648BFF] shadow-sm group-hover:scale-105 transition-transform">
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
        </div>
        <div>
          <span className="font-serif font-black tracking-wider sm:tracking-widest text-xs sm:text-sm text-[#202642] group-hover:text-[#648BFF] transition-colors">
            SORRYVERSE
          </span>
          <span className="hidden lg:inline-block ml-2 text-[10px] uppercase font-bold tracking-wider text-[#78809B]/70">
            Cloudlight
          </span>
        </div>
      </div>

      {/* Scene Navigation */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
        <button
          onClick={() => onSelectScene(Math.max(1, currentScene - 1))}
          disabled={currentScene === 1}
          aria-label="Previous scene"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#78809B] hover:text-[#202642] hover:bg-white/80 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Desktop Dots (md+) */}
        <div className="hidden md:flex items-center gap-1.5 px-2">
          {Array.from({ length: totalScenes }).map((_, idx) => {
            const sceneNum = idx + 1;
            const isActive = currentScene === sceneNum;
            return (
              <button
                key={sceneNum}
                onClick={() => onSelectScene(sceneNum)}
                title={SCENE_NAMES[idx]}
                aria-label={SCENE_NAMES[idx]}
                className={`transition-all rounded-full cursor-pointer relative ${
                  isActive
                    ? 'w-7 lg:w-8 h-2.5 bg-gradient-to-r from-[#8DBBFF] to-[#648BFF]'
                    : 'w-2.5 h-2.5 bg-[#CFE5FF] hover:bg-[#8DBBFF]/60'
                }`}
              />
            );
          })}
        </div>

        {/* Mobile / Tablet Compact Pill (< md) */}
        <div
          title={SCENE_NAMES[currentScene - 1]}
          className="md:hidden flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-white/80 border border-[#CFE5FF]/80 text-[11px] sm:text-xs font-mono font-bold text-[#648BFF] shadow-xs select-none"
        >
          <span>{currentScene}</span>
          <span className="text-[#78809B]/40 font-normal">/</span>
          <span className="text-[#78809B] font-medium">{totalScenes}</span>
        </div>

        <button
          onClick={() => onSelectScene(Math.min(totalScenes, currentScene + 1))}
          disabled={currentScene === totalScenes}
          aria-label="Next scene"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#78809B] hover:text-[#202642] hover:bg-white/80 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right controls: Replay Curtain, Audio, & Developer Transition Showcase Lab */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {onReplayCurtain && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReplayCurtain}
            title="Replay Opening Curtain"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white/90 border border-white text-xs font-medium text-[#202642] shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8DBBFF]" />
            <span className="hidden lg:inline">Curtain</span>
          </motion.button>
        )}

        <AudioToggle />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenShowcase}
          title="Open Transition Verification Lab"
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-gradient-to-r from-[#CFE5FF]/80 to-[#DCD6FF]/80 border border-white text-xs font-semibold text-[#202642] shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-[#648BFF]" />
          <span className="hidden md:inline">Transition Lab</span>
          <span className="text-[10px] font-mono bg-white/80 px-1.5 py-0.2 rounded-full text-[#648BFF] font-bold">
            63
          </span>
        </motion.button>
      </div>
    </header>
  );
};
