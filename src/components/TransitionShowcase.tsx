import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Circle,
  Play,
  Layers,
  Type,
  Sparkles,
  ArrowRightLeft,
  Search,
  CheckCheck
} from 'lucide-react';
import {
  PAGE_TRANSITIONS,
  TEXT_TRANSITIONS,
  ELEMENT_TRANSITIONS,
  ALL_TRANSITIONS,
  TRANSITION_COUNTS,
} from '../transitions/transitionRegistry';
import { PageTransitionWrapper } from '../transitions/pageTransitions';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import type { PageTransitionId, TextTransitionId, ElementTransitionId } from '../types/transitions';
import { Button } from './common/Button';

interface TransitionShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransitionShowcase: React.FC<TransitionShowcaseProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'page' | 'text' | 'element' | 'checklist'>('page');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Replay keys for triggering animations
  const [replayKeys, setReplayKeys] = useState<Record<string, number>>({});
  const [directions, setDirections] = useState<Record<string, 'forward' | 'reverse'>>({});
  
  const [verifiedIds, setVerifiedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    ALL_TRANSITIONS.forEach((t) => {
      initial[t.id] = false;
    });
    return initial;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleReplay = (id: string) => {
    setReplayKeys((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setVerifiedIds((prev) => ({ ...prev, [id]: true }));
  };

  const handleToggleDirection = (id: string) => {
    setDirections((prev) => ({
      ...prev,
      [id]: prev[id] === 'reverse' ? 'forward' : 'reverse',
    }));
    handleReplay(id);
  };

  const handleToggleVerified = (id: string) => {
    setVerifiedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleVerifyAll = () => {
    const allTrue: Record<string, boolean> = {};
    ALL_TRANSITIONS.forEach((t) => {
      allTrue[t.id] = true;
    });
    setVerifiedIds(allTrue);
  };

  const handleResetChecklist = () => {
    const allFalse: Record<string, boolean> = {};
    ALL_TRANSITIONS.forEach((t) => {
      allFalse[t.id] = false;
    });
    setVerifiedIds(allFalse);
  };

  const verifiedCount = Object.values(verifiedIds).filter(Boolean).length;
  const progressPercent = Math.round((verifiedCount / ALL_TRANSITIONS.length) * 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#202642]/30 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative w-full max-w-6xl max-h-[92vh] bg-white/95 backdrop-blur-2xl border border-white/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-[#CFE5FF]/50 flex flex-wrap items-center justify-between gap-4 bg-[#F8FBFF]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#8DBBFF]/20 text-[#648BFF] text-xs font-bold uppercase tracking-wider">
                Verification Lab
              </span>
              <span className="text-xs font-mono font-semibold text-[#78809B]">
                {verifiedCount} / {ALL_TRANSITIONS.length} Verified ({progressPercent}%)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#202642]">
              SORRYVERSE Transition System
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="glass" onClick={handleVerifyAll} icon={<CheckCheck className="w-3.5 h-3.5" />}>
              Verify All
            </Button>
            <button
              onClick={onClose}
              aria-label="Close transition showcase"
              className="p-2 rounded-full text-[#78809B] hover:text-[#202642] hover:bg-[#EEF5FF] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verification Progress Bar */}
        <div className="w-full bg-[#EEF5FF] h-1.5 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-[#8DBBFF] to-[#648BFF] h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Navigation Tabs and Search */}
        <div className="p-4 border-b border-[#EEF5FF] flex flex-wrap items-center justify-between gap-3 bg-white/60">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'page', label: 'Page Transitions', icon: <Layers className="w-3.5 h-3.5" />, count: TRANSITION_COUNTS.page },
              { id: 'text', label: 'Text Transitions', icon: <Type className="w-3.5 h-3.5" />, count: TRANSITION_COUNTS.text },
              { id: 'element', label: 'Element Transitions', icon: <Sparkles className="w-3.5 h-3.5" />, count: TRANSITION_COUNTS.element },
              { id: 'checklist', label: 'Full Checklist', icon: <CheckCircle2 className="w-3.5 h-3.5" />, count: ALL_TRANSITIONS.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#648BFF] text-white shadow-sm'
                    : 'text-[#78809B] hover:bg-[#EEF5FF] hover:text-[#202642]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-white/25 text-white' : 'bg-[#EEF5FF] text-[#78809B]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-[#78809B] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search transitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl bg-[#F8FBFF] border border-[#CFE5FF] focus:outline-none focus:border-[#648BFF]"
            />
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: PAGE TRANSITIONS */}
          {activeTab === 'page' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#78809B]">
                  21 Distinct Page & Section Transitions
                </h3>
                <span className="text-xs text-[#78809B]">
                  Live interactive container simulations
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PAGE_TRANSITIONS.filter((t) =>
                  t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t.id.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((t, idx) => {
                  const key = replayKeys[t.id] || 0;
                  const dir = directions[t.id] || 'forward';
                  const isChecked = !!verifiedIds[t.id];

                  return (
                    <div
                      key={t.id}
                      className="glass-panel p-4 rounded-2xl flex flex-col justify-between border border-white/90 bg-white/80 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#CFE5FF]/60 text-[#648BFF]">
                            #{idx + 1}
                          </span>
                          <button
                            onClick={() => handleToggleVerified(t.id)}
                            className="flex items-center gap-1 text-xs text-[#78809B] hover:text-[#648BFF] cursor-pointer"
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-[#78809B]" />
                            )}
                            <span className="text-[10px]">
                              {isChecked ? 'Verified' : 'Verify'}
                            </span>
                          </button>
                        </div>

                        <h4 className="font-serif font-bold text-sm text-[#202642] mb-1">
                          {t.name}
                        </h4>
                        <p className="text-xs text-[#78809B] mb-3 leading-relaxed">
                          {t.description}
                        </p>
                      </div>

                      {/* Mini Live Preview Box */}
                      <div className="relative h-28 w-full rounded-xl bg-gradient-to-tr from-[#EEF5FF] to-[#F8FBFF] overflow-hidden border border-[#CFE5FF]/60 mb-3 flex items-center justify-center">
                        <PageTransitionWrapper
                          transitionId={t.id as PageTransitionId}
                          sceneKey={key}
                          direction={dir}
                          className="!min-h-full h-full flex flex-col items-center justify-center p-3"
                        >
                          <div className="w-full h-full rounded-lg bg-white/90 backdrop-blur-md shadow-sm border border-white flex flex-col items-center justify-center text-center p-2">
                            <span className="text-xs font-serif font-semibold text-[#202642]">
                              Scene {key + 1}
                            </span>
                            <span className="text-[10px] text-[#648BFF] font-mono">
                              {dir}
                            </span>
                          </div>
                        </PageTransitionWrapper>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#EEF5FF]">
                        <button
                          onClick={() => handleToggleDirection(t.id)}
                          className="flex items-center gap-1 text-[11px] text-[#78809B] hover:text-[#202642] cursor-pointer"
                        >
                          <ArrowRightLeft className="w-3 h-3" />
                          <span>Flip Dir</span>
                        </button>
                        <button
                          onClick={() => handleReplay(t.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EEF5FF] hover:bg-[#CFE5FF] text-xs font-medium text-[#648BFF] transition-colors cursor-pointer"
                        >
                          <Play className="w-3 h-3" />
                          <span>Replay</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: TEXT TRANSITIONS */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#78809B]">
                  21 Distinct Animated Typography Transitions
                </h3>
                <span className="text-xs text-[#78809B]">
                  Live interactive typography triggers
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TEXT_TRANSITIONS.filter((t) =>
                  t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t.id.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((t, idx) => {
                  const key = replayKeys[t.id] || 0;
                  const isChecked = !!verifiedIds[t.id];

                  return (
                    <div
                      key={t.id}
                      className="glass-panel p-4 rounded-2xl flex flex-col justify-between border border-white/90 bg-white/80 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#DCD6FF]/60 text-[#648BFF]">
                            #{idx + 1}
                          </span>
                          <button
                            onClick={() => handleToggleVerified(t.id)}
                            className="flex items-center gap-1 text-xs text-[#78809B] hover:text-[#648BFF] cursor-pointer"
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-[#78809B]" />
                            )}
                            <span className="text-[10px]">
                              {isChecked ? 'Verified' : 'Verify'}
                            </span>
                          </button>
                        </div>

                        <h4 className="font-serif font-bold text-sm text-[#202642] mb-1">
                          {t.name}
                        </h4>
                        <p className="text-xs text-[#78809B] mb-3 leading-relaxed">
                          {t.description}
                        </p>
                      </div>

                      {/* Mini Live Preview Box */}
                      <div className="relative h-24 w-full rounded-xl bg-gradient-to-tr from-[#F8FBFF] to-[#EEF5FF] border border-[#CFE5FF]/60 mb-3 flex items-center justify-center p-3 text-center">
                        <AnimatedText
                          key={key}
                          text={t.id === 'typewriter' ? 'Sincerely sorry...' : 'I Am Truly Sorry'}
                          variant={t.id as TextTransitionId}
                          secondaryText="HEAR MY HEART"
                          className="font-serif text-base sm:text-lg font-bold text-[#202642]"
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#EEF5FF]">
                        <span className="text-[10px] font-mono text-[#78809B]">
                          ID: {t.id}
                        </span>
                        <button
                          onClick={() => handleReplay(t.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EEF5FF] hover:bg-[#CFE5FF] text-xs font-medium text-[#648BFF] transition-colors cursor-pointer"
                        >
                          <Play className="w-3 h-3" />
                          <span>Replay</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ELEMENT TRANSITIONS */}
          {activeTab === 'element' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#78809B]">
                  21 Distinct Element Transitions
                </h3>
                <span className="text-xs text-[#78809B]">
                  Hover, tilt, magnetic, and microinteractions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ELEMENT_TRANSITIONS.filter((t) =>
                  t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t.id.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((t, idx) => {
                  const key = replayKeys[t.id] || 0;
                  const isChecked = !!verifiedIds[t.id];

                  return (
                    <div
                      key={t.id}
                      className="glass-panel p-4 rounded-2xl flex flex-col justify-between border border-white/90 bg-white/80 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFE0EB] text-[#648BFF]">
                            #{idx + 1}
                          </span>
                          <button
                            onClick={() => handleToggleVerified(t.id)}
                            className="flex items-center gap-1 text-xs text-[#78809B] hover:text-[#648BFF] cursor-pointer"
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-[#78809B]" />
                            )}
                            <span className="text-[10px]">
                              {isChecked ? 'Verified' : 'Verify'}
                            </span>
                          </button>
                        </div>

                        <h4 className="font-serif font-bold text-sm text-[#202642] mb-1">
                          {t.name}
                        </h4>
                        <p className="text-xs text-[#78809B] mb-3 leading-relaxed">
                          {t.description}
                        </p>
                      </div>

                      {/* Mini Live Preview Box */}
                      <div className="relative h-28 w-full rounded-xl bg-gradient-to-tr from-[#EEF5FF] to-[#FFE0EB]/20 border border-[#CFE5FF]/60 mb-3 flex items-center justify-center p-3 text-center">
                        <AnimatedElement
                          key={key}
                          variant={t.id as ElementTransitionId}
                          onClick={() => handleReplay(t.id)}
                        >
                          <div className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md shadow-sm border border-white text-xs font-semibold text-[#648BFF] flex items-center gap-1.5 cursor-pointer">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Interact</span>
                          </div>
                        </AnimatedElement>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#EEF5FF]">
                        <span className="text-[10px] font-mono text-[#78809B]">
                          ID: {t.id}
                        </span>
                        <button
                          onClick={() => handleReplay(t.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EEF5FF] hover:bg-[#CFE5FF] text-xs font-medium text-[#648BFF] transition-colors cursor-pointer"
                        >
                          <Play className="w-3 h-3" />
                          <span>Replay</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: COMPLETE CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#78809B]">
                    Full Verification Checklist ({verifiedCount} / {ALL_TRANSITIONS.length})
                  </h3>
                  <p className="text-xs text-[#78809B]">
                    Click any item to toggle verification status or test directly.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="glass" onClick={handleResetChecklist}>
                    Reset
                  </Button>
                  <Button size="sm" variant="primary" onClick={handleVerifyAll}>
                    Mark All Done
                  </Button>
                </div>
              </div>

              <div className="divide-y divide-[#EEF5FF] bg-white rounded-2xl border border-[#CFE5FF]/60 overflow-hidden">
                {ALL_TRANSITIONS.filter((t) =>
                  t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t.category.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((t, idx) => {
                  const isChecked = !!verifiedIds[t.id];

                  return (
                    <div
                      key={t.id}
                      onClick={() => handleToggleVerified(t.id)}
                      className={`p-3.5 flex items-center justify-between hover:bg-[#F8FBFF] cursor-pointer transition-colors ${
                        isChecked ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isChecked ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#CFE5FF] flex-shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-sm text-[#202642]">
                              {idx + 1}. {t.name}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded-full uppercase bg-[#EEF5FF] text-[#648BFF]">
                              {t.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#78809B] mt-0.5">
                            {t.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReplay(t.id);
                          }}
                          className="px-2 py-1 rounded bg-[#EEF5FF] text-[10px] font-medium text-[#648BFF] hover:bg-[#CFE5FF] transition-colors"
                        >
                          Test
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Status Bar */}
        <div className="p-4 border-t border-[#EEF5FF] bg-[#F8FBFF] flex items-center justify-between text-xs text-[#78809B]">
          <span className="font-mono">
            63 Registered Motion Presets • 21 Page, 21 Text, 21 Element
          </span>
          <Button size="sm" variant="glass" onClick={onClose}>
            Close Showcase
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
