import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ambientSound } from '../audio/ambientSound';
import { motion } from 'framer-motion';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    const active = ambientSound.toggleMute();
    setIsPlaying(active);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      title={isPlaying ? 'Mute ambient sound' : 'Enable calming ambient chimes'}
      aria-label={isPlaying ? 'Mute ambient sound' : 'Enable calming ambient chimes'}
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel-subtle hover:bg-white/80 transition-all text-xs font-medium text-[#202642] cursor-pointer"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-[#648BFF]" />
          <span className="hidden sm:inline">Ambience</span>
          {/* Animated sound wave bars */}
          <span className="flex items-center gap-0.5 ml-0.5">
            {[0.4, 0.8, 0.5, 0.9, 0.3].map((height, i) => (
              <motion.span
                key={i}
                animate={{ scaleY: [height, 1, 0.2, height] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
                className="w-[2px] h-3 bg-[#648BFF] rounded-full origin-bottom"
              />
            ))}
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-[#78809B]" />
          <span className="hidden sm:inline text-[#78809B]">Sound Off</span>
        </>
      )}
    </motion.button>
  );
};
