import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { AudioToggle } from './AudioToggle';

interface HeaderNavProps {
  currentScene: number;
  totalScenes: number;
  onSelectScene: (sceneIndex: number) => void;
  onOpenShowcase: () => void;
}

const SCENE_NAMES = [
  '1. Opening',
  '2. Apology',
  '3. Honest Moment',
  '4. Words From Heart',
  '5. Little Things',
  '6. Surprise',
  '7. Final Message',
  '8. Quiet Ending',
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScene,
  totalScenes,
  onSelectScene,
  onOpenShowcase,
}) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between glass-panel-subtle backdrop-blur-xl border-b border-white/60">
      {/* Brand logo */}
      <div
        onClick={() => onSelectScene(1)}
        className="flex items-center gap-2 cursor-pointer group select-none"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#CFE5FF] to-[#DCD6FF] flex items-center justify-center text-[#648BFF] shadow-sm group-hover:scale-105 transition-transform">
          <Heart className="w-4 h-4 fill-white" />
        </div>
        <div>
          <span className="font-serif font-black tracking-widest text-sm text-[#202642] group-hover:text-[#648BFF] transition-colors">
            SORRYVERSE
          </span>
          <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-wider text-[#78809B]/70">
            Cloudlight
          </span>
        </div>
      </div>

      {/* Scene Dots Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => onSelectScene(Math.max(1, currentScene - 1))}
          disabled={currentScene === 1}
          aria-label="Previous scene"
          className="p-1.5 rounded-full text-[#78809B] hover:text-[#202642] hover:bg-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 sm:gap-1.5 px-2">
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
                    ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-gradient-to-r from-[#8DBBFF] to-[#648BFF]'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#CFE5FF] hover:bg-[#8DBBFF]/60'
                }`}
              />
            );
          })}
        </div>

        <button
          onClick={() => onSelectScene(Math.min(totalScenes, currentScene + 1))}
          disabled={currentScene === totalScenes}
          aria-label="Next scene"
          className="p-1.5 rounded-full text-[#78809B] hover:text-[#202642] hover:bg-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right controls: Audio & Developer Transition Showcase Lab */}
      <div className="flex items-center gap-2 sm:gap-3">
        <AudioToggle />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenShowcase}
          title="Open Transition Verification Lab"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#CFE5FF]/80 to-[#DCD6FF]/80 border border-white text-xs font-semibold text-[#202642] shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-[#648BFF]" />
          <span className="hidden md:inline">Transition Lab</span>
          <span className="text-[10px] font-mono bg-white/70 px-1.5 py-0.5 rounded-full text-[#648BFF]">
            63
          </span>
        </motion.button>
      </div>
    </header>
  );
};
