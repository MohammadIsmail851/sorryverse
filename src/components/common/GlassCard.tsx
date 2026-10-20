import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
}) => {
  const isClickable = !!onClick;

  return (
    <motion.div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      onClick={onClick}
      className={`glass-panel rounded-3xl p-6 sm:p-8 transition-shadow duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#648BFF] ${
        hoverEffect && isClickable ? 'hover:shadow-glass-hover hover:border-[#8DBBFF]/40 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};
