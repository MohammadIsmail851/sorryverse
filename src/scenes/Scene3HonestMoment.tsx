import { ArrowRight, Feather, ShieldCheck } from 'lucide-react';
import { AnimatedText } from '../transitions/textTransitions';
import { AnimatedElement } from '../transitions/elementTransitions';
import { GlassCard } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import type { ApologyConfig } from '../config/apologyConfig';

interface Scene3Props {
  config: ApologyConfig;
  onProceed: () => void;
}

export const Scene3HonestMoment: React.FC<Scene3Props> = ({ config, onProceed }) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 z-10 py-16 max-w-4xl mx-auto">
      {/* Decorative badge */}
      <AnimatedElement variant="fade-translate" className="mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CFE5FF]/40 border border-[#8DBBFF]/30 text-xs font-semibold tracking-wider uppercase text-[#648BFF]">
          <Feather className="w-3.5 h-3.5" />
          <span>Honest Reflection</span>
        </div>
      </AnimatedElement>

      {/* Main Editorial Headline with SVG Underline */}
      <div className="text-center mb-10">
        <AnimatedText
          text={config.scene3.headline}
          variant="svg-underline"
          as="h2"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#202642] tracking-tight"
        />
      </div>

      {/* Editorial Card containing paragraphs revealed line-by-line */}
      <GlassCard className="w-full mb-10 relative overflow-hidden backdrop-blur-2xl">
        <div className="space-y-6 text-[#202642]/90 leading-relaxed font-sans text-base sm:text-lg">
          {config.scene3.paragraphs.map((para, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DBBFF] mt-2.5 flex-shrink-0" />
              <AnimatedText
                text={para}
                variant="line-by-line"
                as="p"
                delay={0.15 * idx}
                className="font-light text-base sm:text-lg text-[#202642]/80"
              />
            </div>
          ))}
        </div>

        {/* Reflection Highlight Note */}
        <div className="mt-8 pt-6 border-t border-[#CFE5FF]/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FFE0EB] flex items-center justify-center flex-shrink-0 text-[#648BFF]">
            <ShieldCheck className="w-4 h-4 text-[#648BFF]" />
          </div>
          <p className="font-editorial italic text-sm sm:text-base text-[#78809B]">
            “{config.scene3.reflectionNote}”
          </p>
        </div>
      </GlassCard>

      {/* Navigation action */}
      <AnimatedElement variant="spring-overshoot" delay={0.6}>
        <Button
          size="md"
          variant="primary"
          onClick={onProceed}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Read What Lies in My Heart
        </Button>
      </AnimatedElement>
    </div>
  );
};
