import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundDecor: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Subtle ambient light rays */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-gradient-to-b from-[#CFE5FF]/40 via-[#EEF5FF]/20 to-transparent rounded-full blur-3xl transform -rotate-12" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-b from-[#DCD6FF]/30 via-[#FFE0EB]/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-[550px] h-[550px] bg-gradient-to-tr from-[#FFE0EB]/35 via-[#CFE5FF]/25 to-transparent rounded-full blur-3xl" />

      {/* Floating Cloud 1 */}
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -12, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[8%] left-[5%] opacity-40 blur-[1px]"
      >
        <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
          <ellipse cx="70" cy="55" rx="50" ry="28" fill="#FFFFFF" />
          <ellipse cx="120" cy="42" rx="60" ry="34" fill="#FFFFFF" />
          <ellipse cx="170" cy="55" rx="45" ry="25" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Floating Cloud 2 */}
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[55%] right-[4%] opacity-35 blur-[1px]"
      >
        <svg width="260" height="110" viewBox="0 0 260 110" fill="none">
          <ellipse cx="80" cy="70" rx="60" ry="32" fill="#FFFFFF" />
          <ellipse cx="150" cy="55" rx="70" ry="42" fill="#FFFFFF" />
          <ellipse cx="210" cy="70" rx="50" ry="30" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Floating Glass Heart 1 */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 6, -4, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[22%] right-[14%] opacity-45"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#CFE5FF]/60 to-[#DCD6FF]/60 backdrop-blur-sm border border-white/80 p-2 shadow-sm flex items-center justify-center">
          <svg className="w-5 h-5 text-[#8DBBFF]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </motion.div>

      {/* Floating Glass Heart 2 */}
      <motion.div
        animate={{
          y: [0, 16, 0],
          rotate: [0, -8, 5, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[20%] left-[10%] opacity-40"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFE0EB]/60 to-[#CFE5FF]/60 backdrop-blur-sm border border-white/80 p-1.5 shadow-sm flex items-center justify-center">
          <svg className="w-4 h-4 text-[#FFE0EB]" viewBox="0 0 24 24" fill="#FFE0EB">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </motion.div>

      {/* Floating Delicate Petals */}
      {[
        { top: '15%', left: '30%', delay: 0, dur: 14, scale: 0.8 },
        { top: '40%', left: '75%', delay: 2, dur: 18, scale: 1 },
        { top: '70%', left: '45%', delay: 4, dur: 15, scale: 0.9 },
        { top: '85%', left: '80%', delay: 1, dur: 16, scale: 0.7 },
        { top: '30%', left: '15%', delay: 3, dur: 19, scale: 0.85 },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          animate={{
            y: [0, -35, 0],
            x: [0, (idx % 2 === 0 ? 15 : -15), 0],
            rotate: [0, 45, -20, 0],
          }}
          transition={{
            duration: item.dur,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: item.top, left: item.left, transform: `scale(${item.scale})` }}
          className="absolute opacity-35"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8 6 4 12 12 22C20 12 16 6 12 2Z"
              fill={idx % 2 === 0 ? '#FFE0EB' : '#DCD6FF'}
              stroke="#FFFFFF"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating Paper Plane */}
      <motion.div
        animate={{
          x: [0, 40, -10, 0],
          y: [0, -25, -10, 0],
          rotate: [15, 22, 10, 15],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[28%] left-[78%] opacity-35"
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8DBBFF" strokeWidth="1.5">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="rgba(207, 229, 255, 0.4)" />
        </svg>
      </motion.div>

      {/* Subtle Star Sparkles */}
      {[
        { top: '12%', left: '85%', delay: 0 },
        { top: '48%', left: '8%', delay: 1.5 },
        { top: '65%', left: '92%', delay: 2.5 },
        { top: '80%', left: '25%', delay: 3.5 },
      ].map((star, idx) => (
        <motion.div
          key={`star-${idx}`}
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + idx,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: star.top, left: star.left }}
          className="absolute"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#8DBBFF" className="text-[#8DBBFF]">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
