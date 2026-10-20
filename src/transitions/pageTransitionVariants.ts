import type { Variants } from 'framer-motion';
import type { PageTransitionId } from '../types/transitions';

export const pageTransitionVariants: Record<PageTransitionId, Variants> = {
  // 1. Fade through white
  'fade-through-white': {
    initial: { opacity: 0, filter: 'brightness(1.9)' },
    animate: { opacity: 1, filter: 'brightness(1)', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, filter: 'brightness(1.9)', transition: { duration: 0.45, ease: 'easeIn' } }
  },

  // 2. Horizontal slide from left
  'slide-left': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0.2
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] }
    })
  },

  // 3. Horizontal slide from right
  'slide-right': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0.2
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] }
    })
  },

  // 4. Vertical slide from bottom
  'slide-up': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      y: direction === 'forward' ? 100 : -100,
      opacity: 0
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      y: direction === 'forward' ? -80 : 80,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' }
    })
  },

  // 5. Vertical slide from top
  'slide-down': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      y: direction === 'forward' ? -100 : 100,
      opacity: 0
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      y: direction === 'forward' ? 80 : -80,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' }
    })
  },

  // 6. Scale zoom in
  'scale-zoom-in': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      scale: direction === 'forward' ? 1.2 : 0.85,
      opacity: 0
    }),
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      scale: direction === 'forward' ? 0.85 : 1.2,
      opacity: 0,
      transition: { duration: 0.45, ease: 'easeIn' }
    })
  },

  // 7. Scale zoom out
  'scale-zoom-out': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      scale: direction === 'forward' ? 0.8 : 1.2,
      opacity: 0
    }),
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      scale: direction === 'forward' ? 1.18 : 0.8,
      opacity: 0,
      transition: { duration: 0.45, ease: 'easeIn' }
    })
  },

  // 8. Directional blur reveal
  'directional-blur': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      x: direction === 'forward' ? 60 : -60,
      filter: 'blur(20px)',
      opacity: 0
    }),
    animate: {
      x: 0,
      filter: 'blur(0px)',
      opacity: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      x: direction === 'forward' ? -60 : 60,
      filter: 'blur(16px)',
      opacity: 0,
      transition: { duration: 0.45, ease: 'easeIn' }
    })
  },

  // 9. 3D card flip
  'card-flip-3d': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      rotateY: direction === 'forward' ? 90 : -90,
      opacity: 0,
      transformPerspective: 1400
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      transformPerspective: 1400,
      transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      rotateY: direction === 'forward' ? -90 : 90,
      opacity: 0,
      transformPerspective: 1400,
      transition: { duration: 0.5, ease: 'easeIn' }
    })
  },

  // 10. 3D cube rotation
  'cube-rotation-3d': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      rotateY: direction === 'forward' ? -80 : 80,
      transformOrigin: direction === 'forward' ? 'left center' : 'right center',
      opacity: 0
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      rotateY: direction === 'forward' ? 80 : -80,
      transformOrigin: direction === 'forward' ? 'right center' : 'left center',
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    })
  },

  // 11. Circular clip-path reveal
  'circular-clip': {
    initial: { clipPath: 'circle(0% at 50% 50%)', opacity: 0.5 },
    animate: { clipPath: 'circle(150% at 50% 50%)', opacity: 1, transition: { duration: 0.85, ease: [0.4, 0, 0.2, 1] } },
    exit: { clipPath: 'circle(0% at 50% 50%)', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
  },

  // 12. Expanding radial mask
  'radial-mask': {
    initial: { clipPath: 'ellipse(0% 0% at 50% 50%)', opacity: 0 },
    animate: { clipPath: 'ellipse(100% 100% at 50% 50%)', opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { clipPath: 'ellipse(0% 0% at 50% 50%)', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
  },

  // 13. Curtain reveal
  'curtain-reveal': {
    initial: { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0.3 },
    animate: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, transition: { duration: 0.75, ease: [0.65, 0, 0.35, 1] } },
    exit: { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
  },

  // 14. Split-screen opposing slides
  'split-screen-opposing': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      y: direction === 'forward' ? 60 : -60,
      x: direction === 'forward' ? -40 : 40,
      opacity: 0
    }),
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      y: direction === 'forward' ? -60 : 60,
      x: direction === 'forward' ? 40 : -40,
      opacity: 0,
      transition: { duration: 0.45, ease: 'easeIn' }
    })
  },

  // 15. Layered parallax transition
  'layered-parallax': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      y: direction === 'forward' ? 120 : -120,
      scale: 0.92,
      opacity: 0
    }),
    animate: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      y: direction === 'forward' ? -90 : 90,
      scale: 1.05,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    })
  },

  // 16. Liquid-like shape morph
  'liquid-morph': {
    initial: { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', scale: 0.86, opacity: 0 },
    animate: { borderRadius: '0% 0% 0% 0% / 0% 0% 0% 0%', scale: 1, opacity: 1, transition: { duration: 0.85, ease: [0.34, 1.56, 0.64, 1] } },
    exit: { borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%', scale: 0.86, opacity: 0, transition: { duration: 0.5, ease: 'easeIn' } }
  },

  // 17. Staggered panel cascade
  'staggered-cascade': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      y: direction === 'forward' ? 70 : -70,
      skewY: direction === 'forward' ? 2.5 : -2.5,
      opacity: 0
    }),
    animate: {
      y: 0,
      skewY: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      y: direction === 'forward' ? -70 : 70,
      skewY: direction === 'forward' ? -2.5 : 2.5,
      opacity: 0,
      transition: { duration: 0.45, ease: 'easeIn' }
    })
  },

  // 18. Perspective depth transition
  'perspective-depth': {
    initial: (direction: 'forward' | 'reverse' = 'forward') => ({
      z: direction === 'forward' ? -500 : 300,
      rotateX: direction === 'forward' ? 18 : -18,
      opacity: 0
    }),
    animate: {
      z: 0,
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: 'forward' | 'reverse' = 'forward') => ({
      z: direction === 'forward' ? 350 : -500,
      rotateX: direction === 'forward' ? -14 : 14,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' }
    })
  },

  // 19. Pixel-grid or tiled reveal
  'pixel-tiled': {
    initial: { opacity: 0, scale: 0.94, filter: 'contrast(1.5) saturate(1.3)' },
    animate: { opacity: 1, scale: 1, filter: 'contrast(1) saturate(1)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 1.04, filter: 'contrast(1.3) saturate(0.8)', transition: { duration: 0.45 } }
  },

  // 20. SVG path or organic-shape wipe
  'svg-organic-wipe': {
    initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', opacity: 0.2 },
    animate: { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1, transition: { duration: 0.75, ease: [0.77, 0, 0.175, 1] } },
    exit: { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
  },

  // 21. Bonus: Spring-driven shared-element morph
  'spring-shared-morph': {
    initial: { scale: 0.88, y: 35, opacity: 0 },
    animate: { scale: 1, y: 0, opacity: 1, transition: { type: 'spring', stiffness: 220, damping: 22 } },
    exit: { scale: 0.94, y: -25, opacity: 0, transition: { duration: 0.4 } }
  }
};
