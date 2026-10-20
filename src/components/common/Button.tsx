import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  title,
  'aria-label': ariaLabel,
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-xl font-medium',
    md: 'px-6 py-3 text-sm rounded-2xl font-medium tracking-wide',
    lg: 'px-8 py-4 text-base rounded-2xl font-semibold tracking-wider',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#8DBBFF] to-[#648BFF] text-white shadow-lg shadow-[#8DBBFF]/30 hover:shadow-xl hover:shadow-[#648BFF]/40 border border-white/40',
    secondary:
      'bg-gradient-to-r from-[#DCD6FF] to-[#FFE0EB] text-[#202642] shadow-md shadow-[#DCD6FF]/40 hover:shadow-lg border border-white/60',
    glass:
      'bg-white/70 backdrop-blur-md text-[#202642] border border-white/80 shadow-glass hover:bg-white/90 hover:border-[#8DBBFF]/50',
    ghost:
      'bg-transparent text-[#78809B] hover:text-[#202642] hover:bg-white/40 border border-transparent',
  };

  return (
    <motion.button
      type={type}
      title={title}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`inline-flex items-center justify-center gap-2 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#648BFF] focus-visible:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="inline-block transition-transform duration-300">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
