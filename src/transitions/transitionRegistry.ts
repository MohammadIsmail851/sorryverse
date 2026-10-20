import type { TransitionMetadata } from '../types/transitions';

export const PAGE_TRANSITIONS: TransitionMetadata[] = [
  { id: 'fade-through-white', name: 'Fade Through White', category: 'page', description: 'Graceful screen flash with white brightness wash', tags: ['fade', 'light', 'clean'] },
  { id: 'slide-left', name: 'Horizontal Slide Left', category: 'page', description: 'Card slides into frame from right to left', tags: ['slide', 'direction'] },
  { id: 'slide-right', name: 'Horizontal Slide Right', category: 'page', description: 'Card slides into frame from left to right', tags: ['slide', 'direction'] },
  { id: 'slide-up', name: 'Vertical Slide Up', category: 'page', description: 'Smooth upward emergence from bottom', tags: ['slide', 'vertical'] },
  { id: 'slide-down', name: 'Vertical Slide Down', category: 'page', description: 'Gentle downward entrance from top', tags: ['slide', 'vertical'] },
  { id: 'scale-zoom-in', name: 'Scale Zoom In', category: 'page', description: 'Expansive zoom-in from oversize to focus', tags: ['zoom', 'scale'] },
  { id: 'scale-zoom-out', name: 'Scale Zoom Out', category: 'page', description: 'Compact scale-up from distant focal point', tags: ['zoom', 'scale'] },
  { id: 'directional-blur', name: 'Directional Blur Reveal', category: 'page', description: 'Cinematic horizontal velocity blur clearing up', tags: ['blur', 'cinematic'] },
  { id: 'card-flip-3d', name: '3D Card Flip', category: 'page', description: '90-degree 3D perspective flip around Y-axis', tags: ['3d', 'flip', 'rotation'] },
  { id: 'cube-rotation-3d', name: '3D Cube Rotation', category: 'page', description: 'Full scene edge pivot mimicking 3D cubic facet', tags: ['3d', 'cube'] },
  { id: 'circular-clip', name: 'Circular Clip-Path Reveal', category: 'page', description: 'Expanding iris mask from center outwards', tags: ['mask', 'clip', 'iris'] },
  { id: 'radial-mask', name: 'Expanding Radial Mask', category: 'page', description: 'Radial elliptic reveal illuminating the scene', tags: ['mask', 'radial'] },
  { id: 'curtain-reveal', name: 'Curtain Reveal', category: 'page', description: 'Split curtain parting from center outwards', tags: ['curtain', 'theater'] },
  { id: 'split-screen-opposing', name: 'Split-Screen Opposing Slides', category: 'page', description: 'Counter-balanced bilateral coordinate movement', tags: ['split', 'slide'] },
  { id: 'layered-parallax', name: 'Layered Parallax Transition', category: 'page', description: 'Multi-layer depth with staggered vertical drift', tags: ['parallax', 'depth'] },
  { id: 'liquid-morph', name: 'Liquid-Like Shape Morph', category: 'page', description: 'Organic fluid blob morphing to full view', tags: ['liquid', 'organic'] },
  { id: 'staggered-cascade', name: 'Staggered Panel Cascade', category: 'page', description: 'Waterfall skew cascade settling smoothly', tags: ['cascade', 'skew'] },
  { id: 'perspective-depth', name: 'Perspective Depth Transition', category: 'page', description: 'Deep z-axis plunge through 3D atmospheric space', tags: ['3d', 'depth', 'z-axis'] },
  { id: 'pixel-tiled', name: 'Pixel-Grid / Tiled Reveal', category: 'page', description: 'High contrast digital crystal matrix reveal', tags: ['grid', 'digital'] },
  { id: 'svg-organic-wipe', name: 'SVG Path / Organic Shape Wipe', category: 'page', description: 'Diagonal polygon wave sweep reveal', tags: ['svg', 'wipe'] },
  { id: 'spring-shared-morph', name: 'Spring-Driven Shared Element Morph', category: 'page', description: 'Physics-based spring morph with dynamic damping', tags: ['spring', 'physics'] }
];

export const TEXT_TRANSITIONS: TransitionMetadata[] = [
  { id: 'char-by-char', name: 'Character-by-Character Reveal', category: 'text', description: 'Sequential letter unfolding with micro-staggers', tags: ['character', 'stagger'] },
  { id: 'word-by-word', name: 'Word-by-Word Reveal', category: 'text', description: 'Rhythmic word cadence rising softly', tags: ['word', 'cadence'] },
  { id: 'line-by-line', name: 'Line-by-Line Reveal', category: 'text', description: 'Masked editorial line reveal', tags: ['line', 'editorial'] },
  { id: 'typewriter', name: 'Typewriter with Realistic Cursor', category: 'text', description: 'Authentic monospaced character stream with blinker', tags: ['typewriter', 'cursor'] },
  { id: 'blur-to-sharp', name: 'Blur-to-Sharp Reveal', category: 'text', description: 'Soft mist clearing into high-definition clarity', tags: ['blur', 'focus'] },
  { id: 'fade-up-stagger', name: 'Fade-Up with Stagger', category: 'text', description: 'Gentle upward ascension with opacity fade', tags: ['fade', 'up'] },
  { id: 'fade-down-stagger', name: 'Fade-Down with Stagger', category: 'text', description: 'Descending waterfall text fade', tags: ['fade', 'down'] },
  { id: 'letter-spacing-collapse', name: 'Letter-Spacing Collapse', category: 'text', description: 'Wide ethereal tracking snapping to tight focus', tags: ['tracking', 'typography'] },
  { id: 'scale-pop', name: 'Text Scale Pop', category: 'text', description: 'Overshooting pop-in with tactile spring feedback', tags: ['pop', 'scale'] },
  { id: 'rotate-x-3d', name: '3D X-Axis Rotation', category: 'text', description: 'Flipping downward into position along X-axis', tags: ['3d', 'rotation'] },
  { id: 'rotate-y-3d', name: '3D Y-Axis Rotation', category: 'text', description: 'Card-style 3D letter roll along Y-axis', tags: ['3d', 'rotation'] },
  { id: 'masked-reveal', name: 'Masked Text Reveal', category: 'text', description: 'Windowed overflow curtain reveal', tags: ['mask', 'editorial'] },
  { id: 'clip-path-wipe', name: 'Clip-Path Wipe', category: 'text', description: 'Linear razor wipe across text boundaries', tags: ['wipe', 'clip'] },
  { id: 'scramble-reveal', name: 'Scramble-to-Readable Text', category: 'text', description: 'Cryptographic rune decoding sequence', tags: ['scramble', 'interactive'] },
  { id: 'word-replacement', name: 'Word Replacement / Morph', category: 'text', description: 'Crossfading semantic term substitution', tags: ['morph', 'swap'] },
  { id: 'split-reassemble', name: 'Split-and-Reassemble Letters', category: 'text', description: 'Scattered glyphs magnetizing into unified word', tags: ['reassemble', 'magnet'] },
  { id: 'gradient-sweep', name: 'Gradient Color Sweep', category: 'text', description: 'Iridescent chromatic shimmer washing over words', tags: ['gradient', 'shimmer'] },
  { id: 'svg-underline', name: 'SVG Handwritten Underline', category: 'text', description: 'Fluid calligraphic line tracing under sentence', tags: ['svg', 'handwriting'] },
  { id: 'spring-bounce', name: 'Spring-Based Letter Bounce', category: 'text', description: 'Bouncy playful kinetic letter drops', tags: ['physics', 'bounce'] },
  { id: 'gentle-wave', name: 'Gentle Wave Reveal', category: 'text', description: 'Harmonic undulating sine wave through characters', tags: ['wave', 'harmonic'] },
  { id: 'dissolve-reform', name: 'Text Dissolve and Reform', category: 'text', description: 'Vaporous particle dissipation and crystalline return', tags: ['dissolve', 'reform'] }
];

export const ELEMENT_TRANSITIONS: TransitionMetadata[] = [
  { id: 'fade-translate', name: 'Fade and Translate', category: 'element', description: 'Standard luxury UI entry with offset glide', tags: ['fade', 'glide'] },
  { id: 'scale-pop-element', name: 'Scale Pop Element', category: 'element', description: 'Snappy spring pop entrance', tags: ['scale', 'pop'] },
  { id: 'spring-overshoot', name: 'Spring Overshoot', category: 'element', description: 'Physical elastic inertia settling into rest', tags: ['spring', 'overshoot'] },
  { id: 'tilt-3d-hover', name: '3D Tilt on Hover', category: 'element', description: 'Pointer-aware dynamic perspective inclination', tags: ['3d', 'hover', 'tilt'] },
  { id: 'flip-card-3d', name: '3D Flip Card', category: 'element', description: 'Dual-faced flip card reveal with backface-visibility', tags: ['3d', 'flip'] },
  { id: 'magnetic-button', name: 'Magnetic Button Movement', category: 'element', description: 'Gravitational cursor pull on interactive CTA', tags: ['magnetic', 'cursor'] },
  { id: 'ripple-click', name: 'Ripple Click Effect', category: 'element', description: 'Expanding water-drop radial shockwave on click', tags: ['ripple', 'click'] },
  { id: 'soft-glow-pulse', name: 'Soft Glow Pulse', category: 'element', description: 'Breathing pastel ambient aura animation', tags: ['glow', 'pulse'] },
  { id: 'floating-idle', name: 'Floating Idle Motion', category: 'element', description: 'Continuous weightless levitation curve', tags: ['levitate', 'idle'] },
  { id: 'continuous-rotate', name: 'Continuous Gentle Rotation', category: 'element', description: 'Hypnotic slow celestial orbital rotation', tags: ['orbit', 'rotation'] },
  { id: 'mask-image-reveal', name: 'Image Reveal Through Mask', category: 'element', description: 'Vertical shutter unmasking artwork', tags: ['mask', 'image'] },
  { id: 'zoom-depth-image', name: 'Image Zoom with Depth', category: 'element', description: 'Subtle focal zoom simulating lens compression', tags: ['zoom', 'lens'] },
  { id: 'card-stack-expand', name: 'Card Stack Expansion', category: 'element', description: 'Fanning deck of translucent cards on hover', tags: ['cards', 'stack'] },
  { id: 'staggered-entrance', name: 'Staggered Card Entrance', category: 'element', description: 'Choreographed group entrance sequence', tags: ['group', 'stagger'] },
  { id: 'glass-blur-reveal', name: 'Glassmorphism Blur Reveal', category: 'element', description: 'Crystalline frosted pane condensation effect', tags: ['glass', 'blur'] },
  { id: 'border-drawing', name: 'Border-Drawing Animation', category: 'element', description: 'Luminous vector contour drawing its outline', tags: ['border', 'contour'] },
  { id: 'animated-gradient-border', name: 'Animated Gradient Border', category: 'element', description: 'Prismatic rotating iridescent perimeter', tags: ['gradient', 'rainbow'] },
  { id: 'particle-burst', name: 'Particle Burst', category: 'element', description: 'Ethereal starburst dispersion on touch/click', tags: ['particles', 'sparkle'] },
  { id: 'svg-path-drawing', name: 'SVG Path Drawing', category: 'element', description: 'Continuous vector stroke tracing a heart glyph', tags: ['svg', 'stroke'] },
  { id: 'cursor-parallax', name: 'Cursor-Following Parallax', category: 'element', description: 'Inverse parallax float matching pointer drift', tags: ['parallax', 'interactive'] },
  { id: 'shared-expansion-modal', name: 'Shared Element Expansion Modal', category: 'element', description: 'Smooth fluid metamorphosis into focused modal', tags: ['modal', 'expansion'] }
];

export const ALL_TRANSITIONS: TransitionMetadata[] = [
  ...PAGE_TRANSITIONS,
  ...TEXT_TRANSITIONS,
  ...ELEMENT_TRANSITIONS,
];

export const TRANSITION_COUNTS = {
  page: PAGE_TRANSITIONS.length,
  text: TEXT_TRANSITIONS.length,
  element: ELEMENT_TRANSITIONS.length,
  total: ALL_TRANSITIONS.length,
};

export const getTransitionById = (id: string): TransitionMetadata | undefined => {
  return ALL_TRANSITIONS.find((t) => t.id === id);
};
