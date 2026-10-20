export type PageTransitionId =
  | 'fade-through-white'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'scale-zoom-in'
  | 'scale-zoom-out'
  | 'directional-blur'
  | 'card-flip-3d'
  | 'cube-rotation-3d'
  | 'circular-clip'
  | 'radial-mask'
  | 'curtain-reveal'
  | 'split-screen-opposing'
  | 'layered-parallax'
  | 'liquid-morph'
  | 'staggered-cascade'
  | 'perspective-depth'
  | 'pixel-tiled'
  | 'svg-organic-wipe'
  | 'spring-shared-morph';

export type TextTransitionId =
  | 'char-by-char'
  | 'word-by-word'
  | 'line-by-line'
  | 'typewriter'
  | 'blur-to-sharp'
  | 'fade-up-stagger'
  | 'fade-down-stagger'
  | 'letter-spacing-collapse'
  | 'scale-pop'
  | 'rotate-x-3d'
  | 'rotate-y-3d'
  | 'masked-reveal'
  | 'clip-path-wipe'
  | 'scramble-reveal'
  | 'word-replacement'
  | 'split-reassemble'
  | 'gradient-sweep'
  | 'svg-underline'
  | 'spring-bounce'
  | 'gentle-wave'
  | 'dissolve-reform';

export type ElementTransitionId =
  | 'fade-translate'
  | 'scale-pop-element'
  | 'spring-overshoot'
  | 'tilt-3d-hover'
  | 'flip-card-3d'
  | 'magnetic-button'
  | 'ripple-click'
  | 'soft-glow-pulse'
  | 'floating-idle'
  | 'continuous-rotate'
  | 'mask-image-reveal'
  | 'zoom-depth-image'
  | 'card-stack-expand'
  | 'staggered-entrance'
  | 'glass-blur-reveal'
  | 'border-drawing'
  | 'animated-gradient-border'
  | 'particle-burst'
  | 'svg-path-drawing'
  | 'cursor-parallax'
  | 'shared-expansion-modal'
  | 'fade-scale';

export interface TransitionMetadata {
  id: string;
  name: string;
  category: 'page' | 'text' | 'element';
  description: string;
  tags: string[];
}
