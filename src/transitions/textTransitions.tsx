import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TextTransitionId } from '../types/transitions';

interface AnimatedTextProps {
  text: string;
  variant: TextTransitionId;
  className?: string;
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  secondaryText?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  variant,
  className = '',
  delay = 0,
  duration = 0.5,
  as: Component = 'div',
  secondaryText = 'FORGIVENESS',
}) => {
  // Scramble text state
  const [scrambleDisplay, setScrambleDisplay] = useState(text);
  const [wordMorphIndex, setWordMorphIndex] = useState(0);

  // Scramble reveal with delay support
  useEffect(() => {
    if (variant === 'scramble-reveal') {
      const chars = '✦✧◇◈○●~*#&@%!?/\\';
      let iteration = 0;
      let interval: number;

      const timeout = window.setTimeout(() => {
        interval = window.setInterval(() => {
          setScrambleDisplay(
            text
              .split('')
              .map((char, index) => {
                if (char === ' ') return ' ';
                if (index < iteration) {
                  return text[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('')
          );

          if (iteration >= text.length) {
            clearInterval(interval);
          }
          iteration += 1 / 3;
        }, 32);
      }, delay * 1000);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [text, variant, delay]);

  // Word replacement cycler
  useEffect(() => {
    if (variant === 'word-replacement') {
      const timer = setInterval(() => {
        setWordMorphIndex((prev) => (prev === 0 ? 1 : 0));
      }, 2600);
      return () => clearInterval(timer);
    }
  }, [variant]);

  // Dynamic semantic motion component mapping
  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.div;

  // 1. Character by character
  if (variant === 'char-by-char') {
    let charIdx = 0;
    const words = text.split(' ');
    return (
      <Component className={`inline-flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 ${className}`} aria-label={text}>
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char) => {
              const i = charIdx++;
              return (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 16, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: delay + i * 0.035,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </Component>
    );
  }

  // 2. Word by word
  if (variant === 'word-by-word') {
    return (
      <Component className={`inline-flex flex-wrap justify-center gap-x-2 gap-y-1 ${className}`} aria-label={text}>
        {text.split(' ').map((word, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.12,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="inline-block whitespace-nowrap"
          >
            {word}
          </motion.span>
        ))}
      </Component>
    );
  }

  // 3. Line by line
  if (variant === 'line-by-line') {
    return (
      <Component className={`overflow-hidden ${className}`}>
        <motion.span
          className="block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {text}
        </motion.span>
      </Component>
    );
  }

  // 4. Typewriter with cursor
  if (variant === 'typewriter') {
    return (
      <Component className={`inline-flex items-center max-w-full overflow-hidden ${className}`}>
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: 'auto' }}
          transition={{ duration: Math.max(0.8, text.length * 0.04), delay, ease: 'linear' }}
          className="overflow-hidden whitespace-nowrap inline-block"
        >
          {text}
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          className="inline-block w-[2px] h-[1em] bg-[#648BFF] ml-1 align-middle flex-shrink-0"
        />
      </Component>
    );
  }

  // 5. Blur to sharp
  if (variant === 'blur-to-sharp') {
    return (
      <MotionComponent
        initial={{ filter: 'blur(16px)', opacity: 0 }}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {text}
      </MotionComponent>
    );
  }

  // 6. Fade up stagger
  if (variant === 'fade-up-stagger') {
    return (
      <MotionComponent
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {text}
      </MotionComponent>
    );
  }

  // 7. Fade down stagger
  if (variant === 'fade-down-stagger') {
    return (
      <MotionComponent
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {text}
      </MotionComponent>
    );
  }

  // 8. Letter spacing collapse
  if (variant === 'letter-spacing-collapse') {
    return (
      <MotionComponent
        initial={{ letterSpacing: '0.35em', opacity: 0, filter: 'blur(6px)' }}
        animate={{ letterSpacing: '0.02em', opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {text}
      </MotionComponent>
    );
  }

  // 9. Text scale pop
  if (variant === 'scale-pop') {
    return (
      <MotionComponent
        initial={{ scale: 0.55, opacity: 0 }}
        animate={{ scale: [0.55, 1.08, 1], opacity: 1 }}
        transition={{ duration: 0.65, delay, ease: [0.34, 1.56, 0.64, 1] }}
        className={className}
      >
        {text}
      </MotionComponent>
    );
  }

  // 10. 3D X-axis rotation
  if (variant === 'rotate-x-3d') {
    return (
      <MotionComponent
        initial={{ rotateX: 90, opacity: 0, transformPerspective: 800 }}
        animate={{ rotateX: 0, opacity: 1, transformPerspective: 800 }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {text}
      </MotionComponent>
    );
  }

  // 11. 3D Y-axis rotation
  if (variant === 'rotate-y-3d') {
    return (
      <MotionComponent
        initial={{ rotateY: 90, opacity: 0, transformPerspective: 800 }}
        animate={{ rotateY: 0, opacity: 1, transformPerspective: 800 }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {text}
      </MotionComponent>
    );
  }

  // 12. Masked text reveal
  if (variant === 'masked-reveal') {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {text}
        </motion.div>
      </div>
    );
  }

  // 13. Clip-path wipe
  if (variant === 'clip-path-wipe') {
    return (
      <MotionComponent
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 0.8, delay, ease: [0.65, 0, 0.35, 1] }}
        className={className}
      >
        {text}
      </MotionComponent>
    );
  }

  // 14. Scramble to readable
  if (variant === 'scramble-reveal') {
    return (
      <Component className={`font-mono ${className}`}>
        {scrambleDisplay}
      </Component>
    );
  }

  // 15. Word replacement or morph
  if (variant === 'word-replacement') {
    const currentWord = wordMorphIndex === 0 ? text : secondaryText;
    return (
      <span className={`inline-block relative overflow-hidden align-middle ${className}`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWord}
            initial={{ y: 22, opacity: 0, filter: 'blur(5px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -22, opacity: 0, filter: 'blur(5px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-[#648BFF] font-medium"
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  // 16. Split and reassemble letters
  if (variant === 'split-reassemble') {
    let charIdx = 0;
    const words = text.split(' ');
    return (
      <Component className={`inline-flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 ${className}`} aria-label={text}>
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char) => {
              const i = charIdx++;
              return (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  initial={{
                    opacity: 0,
                    x: (i % 2 === 0 ? -35 : 35),
                    y: (i % 3 === 0 ? -24 : 24),
                    rotate: (i % 2 === 0 ? -30 : 30)
                  }}
                  animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: delay + i * 0.04,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </Component>
    );
  }

  // 17. Gradient color sweep
  if (variant === 'gradient-sweep') {
    return (
      <MotionComponent
        initial={{ backgroundPosition: '100% 50%' }}
        animate={{ backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className={`bg-gradient-to-r from-[#648BFF] via-[#9B87F5] to-[#FFA8C5] bg-[length:250%_auto] bg-clip-text text-transparent ${className}`}
      >
        {text}
      </MotionComponent>
    );
  }

  // 18. SVG handwritten underline
  if (variant === 'svg-underline') {
    return (
      <span className={`relative inline-block ${className}`}>
        <span>{text}</span>
        <svg
          className="absolute -bottom-2 left-0 w-full h-3 overflow-visible pointer-events-none"
          viewBox="0 0 200 12"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 2 8 C 50 2, 150 12, 198 6"
            stroke="#8DBBFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.85, delay: delay + 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </span>
    );
  }

  // 19. Spring-based letter bounce
  if (variant === 'spring-bounce') {
    let charIdx = 0;
    const words = text.split(' ');
    return (
      <Component className={`inline-flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 ${className}`} aria-label={text}>
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char) => {
              const i = charIdx++;
              return (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  initial={{ y: -45, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 14,
                    delay: delay + i * 0.05
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </Component>
    );
  }

  // 20. Gentle wave reveal
  if (variant === 'gentle-wave') {
    let charIdx = 0;
    const words = text.split(' ');
    return (
      <Component className={`inline-flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 ${className}`} aria-label={text}>
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char) => {
              const i = charIdx++;
              return (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{
                    opacity: 1,
                    y: [16, -7, 0]
                  }}
                  transition={{
                    duration: 0.75,
                    delay: delay + i * 0.04,
                    ease: 'easeInOut'
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </Component>
    );
  }

  // 21. Bonus: Dissolve and reform
  return (
    <MotionComponent
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {text}
    </MotionComponent>
  );
};
