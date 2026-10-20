import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useSpring, useMotionValue, animate } from 'framer-motion';

interface GlassHeartProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  enablePointerTilt?: boolean;
  idleFloat?: boolean;
  glowColor?: string;
}

const SIZE_MAP = {
  sm: { outer: 'w-14 h-14', inner: 'w-10 h-10', icon: 28 },
  md: { outer: 'w-20 h-20', inner: 'w-14 h-14', icon: 36 },
  lg: { outer: 'w-28 h-28', inner: 'w-20 h-20', icon: 48 },
  xl: { outer: 'w-36 h-36', inner: 'w-28 h-28', icon: 64 },
};

export const GlassHeart: React.FC<GlassHeartProps> = ({
  size = 'md',
  className = '',
  onClick,
  enablePointerTilt = true,
  idleFloat = true,
  glowColor = '#8DBBFF',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [burstParticles, setBurstParticles] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);
  const dims = SIZE_MAP[size];

  // Spring values for pointer tilt
  const rotateX = useSpring(0, { stiffness: 280, damping: 28 });
  const rotateY = useSpring(0, { stiffness: 280, damping: 28 });
  const scale = useSpring(1, { stiffness: 400, damping: 30 });
  const glowOpacity = useMotionValue(0.35);

  // Idle float motion
  const floatY = useMotionValue(0);

  useEffect(() => {
    if (!idleFloat) return;
    const controls = animate(floatY, [0, -10, 0], {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    return () => controls.stop();
  }, [idleFloat, floatY]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!enablePointerTilt || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(dx * 18);
    rotateX.set(-dy * 14);
    glowOpacity.set(0.55 + Math.abs(dx) * 0.2);
  }, [enablePointerTilt, rotateX, rotateY, glowOpacity]);

  const handlePointerLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glowOpacity.set(0.35);
  }, [rotateX, rotateY, scale, glowOpacity]);

  const handlePointerEnter = useCallback(() => {
    scale.set(1.06);
    glowOpacity.set(0.55);
  }, [scale, glowOpacity]);

  const handleClick = useCallback(() => {
    if (isClicked) return;
    setIsClicked(true);
    // Burst particles
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      angle: (i / 8) * 360,
    }));
    setBurstParticles(particles);
    scale.set(1.25);
    setTimeout(() => scale.set(1), 300);
    setTimeout(() => {
      setBurstParticles([]);
      setIsClicked(false);
    }, 900);
    onClick?.();
  }, [isClicked, scale, onClick]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative select-none cursor-pointer ${className}`}
      style={{
        rotateX,
        rotateY,
        scale,
        y: floatY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      onClick={handleClick}
    >
      {/* Outer glass ring */}
      <div
        className={`${dims.outer} rounded-full bg-white/60 backdrop-blur-2xl border border-white/90 shadow-glass flex items-center justify-center`}
        style={{
          background: 'radial-gradient(ellipse at 35% 30%, rgba(255,255,255,0.85), rgba(207,229,255,0.45) 60%, rgba(220,214,255,0.35))',
          boxShadow: '0 8px 32px rgba(141,187,255,0.25), inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -1px 1px rgba(141,187,255,0.15)',
        }}
      >
        {/* Inner glass button */}
        <div
          className={`${dims.inner} rounded-full flex items-center justify-center`}
          style={{
            background: 'radial-gradient(ellipse at 40% 35%, rgba(255,255,255,0.95), rgba(207,229,255,0.6) 70%)',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(141,187,255,0.2)',
          }}
        >
          {/* SVG Heart with gradient */}
          <motion.svg
            viewBox="0 0 32 30"
            width={dims.icon}
            height={dims.icon}
            animate={isClicked ? { scale: [1, 1.35, 0.95, 1.1, 1] } : { scale: [1, 1.06, 1] }}
            transition={isClicked
              ? { duration: 0.5, ease: 'easeInOut' }
              : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
            }
          >
            <defs>
              <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8DBBFF" />
                <stop offset="50%" stopColor="#648BFF" />
                <stop offset="100%" stopColor="#DCD6FF" />
              </linearGradient>
              <filter id="heartGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path
              d="M16 27.5C16 27.5 2 18 2 9.5C2 5.5 5 2.5 9 2.5C11.5 2.5 13.8 3.8 16 6C18.2 3.8 20.5 2.5 23 2.5C27 2.5 30 5.5 30 9.5C30 18 16 27.5 16 27.5Z"
              fill="url(#heartGrad)"
              filter="url(#heartGlow)"
              opacity={0.9}
            />
            {/* Specular highlight */}
            <ellipse cx="11" cy="9" rx="3.5" ry="2.5" fill="white" opacity={0.45} />
          </motion.svg>
        </div>
      </div>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full -z-10 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${glowColor}60, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Burst particles */}
      {burstParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: `hsl(${220 + Math.random() * 60}, 80%, 75%)`,
          }}
          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * 55,
            y: Math.sin((p.angle * Math.PI) / 180) * 55,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        />
      ))}

      {/* Rotating shimmer ring */}
      <motion.div
        className="absolute inset-[-4px] rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent 60%, rgba(141,187,255,0.5) 70%, transparent 80%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
};
