# SORRYVERSE — A Cinematic, Ultra-Animated Apology Website

> Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.
> Styled in the **Cloudlight Dreamscape** aesthetic: pearl white, ice blue, soft sky blue, lavender, blush pink, and delicate frosted glassmorphism.

---

## 🌟 Highlights

- **Cinematic Opening Curtain Loader (`CurtainIntro`)**:
  - Full-screen dual-curtain theatre opening styled with light-themed romantic pearl-white, ice-blue, and blush-pink fabric folds.
  - Features real readiness detection, drifting particles, central glass heart medallion, and an "Open the Curtains" glass invitation button.
  - On click, curtains part outward with natural fabric gather physics, parting petals, and gentle ambient chimes, seamlessly handing off to Scene 1.
  - Replayable at any time via the "Curtain" button in the header or in Scene 8.
- **63 Distinct Motion Transitions** across 3 categories:
  - **21 Page / Section Transitions**: Fade through white, directional blur, 3D card flip, 3D cube rotation, circular clip-path iris, expanding radial mask, curtain reveal, liquid shape morph, layered parallax, perspective depth, pixel-grid, organic SVG wipe, and more.
  - **21 Animated Typography Transitions**: Character-by-character reveal, word-by-word reveal, line-by-line editorial reveal, typewriter with blinking cursor, blur-to-sharp, letter-spacing collapse, scale pop, 3D X/Y-axis rotation, masked text reveal, scramble-to-readable glyph decoding, word replacement morph, SVG handwritten underline, spring bounce, and more.
  - **21 Element Interactions & Microinteractions**: 3D tilt on hover, 3D dual-faced flip cards, magnetic button pull, ripple shockwave clicks, soft ambient glow pulse, floating idle motion, continuous rotation, card stack fan-out, glassmorphism blur reveals, particle bursts, SVG vector path drawings, and cursor-following parallax.
- **8 Emotional, Interactive Scenes**:
  1. **The Dreamy Opening**: Ambient canvas with floating clouds, light rays, glowing 3D heart, and "Open My Heart" CTA.
  2. **The Apology Reveal**: Kinetic typography separating "I AM..." and reforming into "SORRY." with blur and spring physics.
  3. **The Honest Moment**: Editorial card with line-by-line reveal, animated SVG underline, and reflection highlight.
  4. **Words From The Heart**: 3 floating glass cards ("What I should have done better", "What I want you to know", "What I hope you understand") with 3D tilt and expandable perspective modal.
  5. **Little Things That Matter**: Horizontally scrollable and swipeable memory token gallery with custom icons and highlight badges.
  6. **A Small Interactive Surprise**: Floating 3D crystal heart that reacts on hover and blooms into animated fragments and pastel confetti particle bursts on click.
  7. **The Final Message**: Full-width statement with respectful choices ("I hear you." & "I need some time.") and empathetic feedback.
  8. **The Quiet Ending**: Reassurance, "Replay the experience" smooth reset, and direct link to the Transition Showcase.
- **Transition Verification Lab (`?showcase=true` / Top Nav "Transition Lab")**:
  - Live interactive testing sandbox for all 63 transition presets.
  - Controls: Replay, Flip Direction, Search, and interactive verification checklist with progress bar.
- **Ethereal Web Audio Synth**:
  - Generative pentatonic chimes with smooth gain ramps. Completely self-contained, 100% offline, zero missing file 404s.
  - Off by default, starts only on intentional user interaction with visible mute/unmute toggle and animated sound equalizer waves.
- **Custom Desktop Cursor**:
  - Delicate aura dot and expanding halo with pointer detection (disabled on touch devices).
- **Personalized Configuration**:
  - Easily customize all copy, names, cards, and memories in `src/config/apologyConfig.ts` without touching components.

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

To open directly into the Transition Verification Lab:
```
http://localhost:5173/?showcase=true
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Architecture

```
src/
├── types/
│   └── transitions.ts          # Type definitions for all 63 transitions
├── config/
│   └── apologyConfig.ts        # Editable configuration for all scenes & copy
├── audio/
│   └── ambientSound.ts         # Soothing Web Audio API synthesizer
├── transitions/
│   ├── pageTransitions.tsx     # 21 Page & section transitions
│   ├── textTransitions.tsx     # 21 Animated typography transitions
│   ├── elementTransitions.tsx  # 21 Element interactions & physics
│   └── transitionRegistry.ts   # Centralized transition registry & metadata
├── components/
│   ├── HeaderNav.tsx           # Glass navigation with progress dots & audio
│   ├── CustomCursor.tsx        # Desktop pointer aura
│   ├── BackgroundDecor.tsx     # Floating clouds, light rays, petals, paper plane
│   ├── AudioToggle.tsx         # Sound toggle with animated equalizer bars
│   ├── TransitionShowcase.tsx  # Verification lab with 63 interactive tests
│   └── common/
│       ├── Button.tsx          # Magnetic, glass, and glow buttons
│       ├── GlassCard.tsx       # Translucent frosted glass card
│       └── Modal.tsx           # Keyboard-accessible dialog (Esc to close)
├── scenes/
│   ├── Scene1DreamyOpening.tsx
│   ├── Scene2ApologyReveal.tsx
│   ├── Scene3HonestMoment.tsx
│   ├── Scene4WordsFromHeart.tsx
│   ├── Scene5LittleThings.tsx
│   ├── Scene6InteractiveSurprise.tsx
│   ├── Scene7FinalMessage.tsx
│   └── Scene8QuietEnding.tsx
├── App.tsx                     # Main orchestrated experience
├── main.tsx                    # Entry point
└── index.css                   # Cloudlight Dreamscape styling & tokens
```
