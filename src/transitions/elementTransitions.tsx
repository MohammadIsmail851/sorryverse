import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ElementTransitionId } from '../types/transitions';

interface ElementTransitionProps {
  variant: ElementTransitionId;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  backContent?: React.ReactNode;
  badgeText?: string;
}

export const AnimatedElement: React.FC<ElementTransitionProps> = ({
  variant,
  children,
  className = '',
  delay = 0,
  onClick,
  backContent,
}) => {
  // 3D Tilt on hover state
  const tiltRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Magnetic button state
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });

  // Ripple state
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  // Flip state
  const [isFlipped, setIsFlipped] = useState(false);

  // Particle burst state
  const [burstParticles, setBurstParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([]);

  // 1. Fade & Translate
  if (variant === 'fade-translate') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 2. Scale Pop Element
  if (variant === 'scale-pop-element') {
    return (
      <motion.div
        initial={{ scale: 0.72, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay, type: 'spring', stiffness: 300, damping: 18 }}
        className={className}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 3. Spring Overshoot
  if (variant === 'spring-overshoot') {
    return (
      <motion.div
        initial={{ scale: 0.4, opacity: 0, y: 32 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 14, delay }}
        className={className}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 4. 3D Tilt on Hover
  if (variant === 'tilt-3d-hover') {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      // Disable on touch devices
      if (window.matchMedia('(pointer: coarse)').matches) return;
      if (!tiltRef.current) return;
      const rect = tiltRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setRotateX(-y / 12);
      setRotateY(x / 12);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    return (
      <div style={{ perspective: 1000 }} className="inline-block">
        <motion.div
          ref={tiltRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ rotateX, rotateY }}
          transition={{ type: 'spring', stiffness: 320, damping: 20 }}
          className={`transform-gpu ${className}`}
          onClick={onClick}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // 5. 3D Flip Card
  if (variant === 'flip-card-3d') {
    const toggleFlip = () => {
      setIsFlipped(!isFlipped);
      if (onClick) onClick();
    };

    return (
      <div
        role="button"
        tabIndex={0}
        aria-label="Interactive 3D flip card, press Enter or click to flip"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFlip();
          }
        }}
        onClick={toggleFlip}
        className={`perspective-1000 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#648BFF] rounded-3xl ${className}`}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full h-full preserve-3d"
        >
          {/* Front Face */}
          <div className="w-full h-full backface-hidden">
            {children}
          </div>
          {/* Back Face */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            {backContent || (
              <div className="glass-panel p-6 rounded-3xl h-full flex flex-col justify-center items-center text-center shadow-glass bg-white/90">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#648BFF] mb-1">
                  Card Reverse
                </span>
                <span className="text-sm font-serif text-[#202642]">
                  Deep emotional sincerity & reflection
                </span>
                <span className="text-[10px] text-[#78809B] mt-3">
                  (Click or press Enter to flip back)
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // 6. Magnetic Button Movement
  if (variant === 'magnetic-button') {
    const handleMagnetMove = (e: React.MouseEvent<HTMLDivElement>) => {
      // Don't apply magnetic coordinates on touch screens
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
      const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
      setMagnetPos({ x, y });
    };

    const handleMagnetLeave = () => {
      setMagnetPos({ x: 0, y: 0 });
    };

    return (
      <motion.div
        onMouseMove={handleMagnetMove}
        onMouseLeave={handleMagnetLeave}
        animate={{ x: magnetPos.x, y: magnetPos.y }}
        transition={{ type: 'spring', stiffness: 280, damping: 16 }}
        className={`inline-block ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 7. Ripple Click Effect
  if (variant === 'ripple-click') {
    const handleRipple = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { x, y, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 650);
      if (onClick) onClick();
    };

    return (
      <div
        className={`relative overflow-hidden cursor-pointer ${className}`}
        onClick={handleRipple}
      >
        {children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none bg-[#8DBBFF]/35 animate-ping"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
            }}
          />
        ))}
      </div>
    );
  }

  // 8. Soft Glow Pulse
  if (variant === 'soft-glow-pulse') {
    return (
      <motion.div
        animate={{
          boxShadow: [
            '0 0 15px rgba(141, 187, 255, 0.2)',
            '0 0 38px rgba(141, 187, 255, 0.7)',
            '0 0 15px rgba(141, 187, 255, 0.2)',
          ],
        }}
        transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
        className={`rounded-3xl ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 9. Floating Idle Motion
  if (variant === 'floating-idle') {
    return (
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className={className}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 10. Continuous Gentle Rotation
  if (variant === 'continuous-rotate') {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        className={`inline-block ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 11. Image Reveal Through Mask
  if (variant === 'mask-image-reveal') {
    return (
      <div className={`relative overflow-hidden ${className}`} onClick={onClick}>
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // 12. Image Zoom with Depth
  if (variant === 'zoom-depth-image') {
    return (
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`overflow-hidden cursor-pointer ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 13. Card Stack Expansion
  if (variant === 'card-stack-expand') {
    return (
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`relative ${className}`}
        onClick={onClick}
      >
        {/* Layer 1 behind */}
        <div className="absolute inset-0 bg-[#DCD6FF]/40 rounded-3xl transform rotate-2 translate-y-2 -z-10 transition-transform duration-300 group-hover:rotate-4" />
        {/* Layer 2 behind */}
        <div className="absolute inset-0 bg-[#FFE0EB]/40 rounded-3xl transform -rotate-2 translate-y-1 -z-20 transition-transform duration-300 group-hover:-rotate-4" />
        {children}
      </motion.div>
    );
  }

  // 14. Staggered Card Entrance
  if (variant === 'staggered-entrance') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 15. Glassmorphism Blur Reveal
  if (variant === 'glass-blur-reveal') {
    return (
      <motion.div
        initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
        animate={{ backdropFilter: 'blur(18px)', opacity: 1 }}
        transition={{ duration: 0.75, delay, ease: 'easeOut' }}
        className={`glass-panel ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 16. Border-Drawing Animation
  if (variant === 'border-drawing') {
    return (
      <div className={`relative p-[2px] rounded-3xl overflow-hidden group ${className}`} onClick={onClick}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <motion.rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            rx="22"
            ry="22"
            fill="none"
            stroke="#8DBBFF"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    );
  }

  // 17. Animated Gradient Border
  if (variant === 'animated-gradient-border') {
    return (
      <div className={`p-[2px] rounded-3xl animated-gradient-border shadow-sm ${className}`} onClick={onClick}>
        <div className="bg-white/90 backdrop-blur-md rounded-[22px] w-full h-full p-4">
          {children}
        </div>
      </div>
    );
  }

  // 18. Particle Burst
  if (variant === 'particle-burst') {
    const triggerBurst = () => {
      const colors = ['#8DBBFF', '#DCD6FF', '#FFE0EB', '#648BFF', '#CFE5FF'];
      const newParticles = Array.from({ length: 14 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 140,
        y: (Math.random() - 0.5) * 140,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setBurstParticles(newParticles);
      setTimeout(() => setBurstParticles([]), 750);
      if (onClick) onClick();
    };

    return (
      <div className={`relative inline-block cursor-pointer ${className}`} onClick={triggerBurst}>
        {children}
        <AnimatePresence>
          {burstParticles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 rounded-full pointer-events-none shadow-sm"
              style={{ width: p.size, height: p.size, backgroundColor: p.color }}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  }

  // 19. SVG Path Drawing
  if (variant === 'svg-path-drawing') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} onClick={onClick}>
        <svg className="w-10 h-10 overflow-visible" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="#648BFF"
            strokeWidth="1.8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </svg>
        <div className="ml-2">{children}</div>
      </div>
    );
  }

  // 20. Cursor Following Parallax
  if (variant === 'cursor-parallax') {
    return (
      <motion.div
        whileHover={{ x: 8, y: -6 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        className={className}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 21. Bonus: Shared Expansion Modal
  if (variant === 'shared-expansion-modal') {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        className={`glass-panel-subtle rounded-3xl p-4 cursor-pointer hover:border-[#648BFF]/50 transition-all ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // 22. Fade Scale
  if (variant === 'fade-scale') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay, ease: [0.34, 1.56, 0.64, 1] }}
        className={className}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  // Fallback
  return <div className={className} onClick={onClick}>{children}</div>;
};
