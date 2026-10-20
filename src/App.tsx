import React, { useState, useEffect, useCallback } from 'react';
import { PageTransitionWrapper } from './transitions/pageTransitions';
import type { PageTransitionId } from './types/transitions';
import { defaultApologyConfig } from './config/apologyConfig';
import { BackgroundDecor } from './components/BackgroundDecor';
import { CustomCursor } from './components/CustomCursor';
import { HeaderNav } from './components/HeaderNav';
import { TransitionShowcase } from './components/TransitionShowcase';

// Scenes
import { Scene1DreamyOpening } from './scenes/Scene1DreamyOpening';
import { Scene2ApologyReveal } from './scenes/Scene2ApologyReveal';
import { Scene3HonestMoment } from './scenes/Scene3HonestMoment';
import { Scene4WordsFromHeart } from './scenes/Scene4WordsFromHeart';
import { Scene5LittleThings } from './scenes/Scene5LittleThings';
import { Scene6InteractiveSurprise } from './scenes/Scene6InteractiveSurprise';
import { Scene7FinalMessage } from './scenes/Scene7FinalMessage';
import { Scene8QuietEnding } from './scenes/Scene8QuietEnding';

// Distinct page transition mappings for each scene transition
const SCENE_TRANSITIONS: Record<number, PageTransitionId> = {
  1: 'fade-through-white',
  2: 'directional-blur',
  3: 'card-flip-3d',
  4: 'liquid-morph',
  5: 'circular-clip',
  6: 'layered-parallax',
  7: 'perspective-depth',
  8: 'staggered-cascade',
};

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('showcase') === 'true' || params.get('lab') === 'true';
    }
    return false;
  });
  const totalScenes = 8;

  const goToScene = useCallback((targetScene: number) => {
    setDirection(targetScene > currentScene ? 'forward' : 'reverse');
    setCurrentScene(targetScene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScene]);

  const handleNextScene = useCallback(() => {
    if (currentScene < totalScenes) {
      goToScene(currentScene + 1);
    }
  }, [currentScene, totalScenes, goToScene]);

  const handleReplay = useCallback(() => {
    setDirection('reverse');
    setCurrentScene(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If modal or showcase is open, let Esc handle it
      if (e.key === 'ArrowRight' && !isShowcaseOpen) {
        handleNextScene();
      } else if (e.key === 'ArrowLeft' && !isShowcaseOpen) {
        if (currentScene > 1) {
          goToScene(currentScene - 1);
        }
      } else if ((e.key === 'l' || e.key === 'L') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsShowcaseOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, isShowcaseOpen, handleNextScene, goToScene]);

  // Current page transition variant
  const currentTransitionId = SCENE_TRANSITIONS[currentScene] || 'fade-through-white';

  return (
    <div className="relative min-h-screen bg-mesh-dreamscape text-[#202642] flex flex-col justify-between selection:bg-[#CFE5FF] selection:text-[#202642]">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Floating Ambient Dreamscape Elements */}
      <BackgroundDecor />

      {/* Persistent Glass Navigation Header */}
      <HeaderNav
        currentScene={currentScene}
        totalScenes={totalScenes}
        onSelectScene={goToScene}
        onOpenShowcase={() => setIsShowcaseOpen(true)}
      />

      {/* Main Animated Scene Container */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center">
        <PageTransitionWrapper
          transitionId={currentTransitionId}
          sceneKey={currentScene}
          direction={direction}
        >
          {currentScene === 1 && (
            <Scene1DreamyOpening
              config={defaultApologyConfig}
              onProceed={handleNextScene}
            />
          )}
          {currentScene === 2 && (
            <Scene2ApologyReveal
              config={defaultApologyConfig}
              onProceed={handleNextScene}
            />
          )}
          {currentScene === 3 && (
            <Scene3HonestMoment
              config={defaultApologyConfig}
              onProceed={handleNextScene}
            />
          )}
          {currentScene === 4 && (
            <Scene4WordsFromHeart
              config={defaultApologyConfig}
              onProceed={handleNextScene}
            />
          )}
          {currentScene === 5 && (
            <Scene5LittleThings
              config={defaultApologyConfig}
              onProceed={handleNextScene}
            />
          )}
          {currentScene === 6 && (
            <Scene6InteractiveSurprise
              config={defaultApologyConfig}
              onProceed={handleNextScene}
            />
          )}
          {currentScene === 7 && (
            <Scene7FinalMessage
              config={defaultApologyConfig}
              onProceed={handleNextScene}
            />
          )}
          {currentScene === 8 && (
            <Scene8QuietEnding
              config={defaultApologyConfig}
              onReplay={handleReplay}
              onOpenLab={() => setIsShowcaseOpen(true)}
            />
          )}
        </PageTransitionWrapper>
      </main>

      {/* Developer Transition Verification Showcase Modal */}
      <TransitionShowcase
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
      />
    </div>
  );
};

export default App;
