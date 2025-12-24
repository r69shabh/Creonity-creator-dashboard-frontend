import React, { useState, useEffect, useLayoutEffect } from 'react';
import Button from './ui/Button';

export interface TutorialStep {
  targetId: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialOverlayProps {
  steps: TutorialStep[];
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ steps, isOpen, onComplete, onSkip }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Reset if closed
  useEffect(() => {
    if (!isOpen) setCurrentStepIndex(0);
  }, [isOpen]);

  // Calculate position of the target element
  const updatePosition = () => {
    const step = steps[currentStepIndex];
    if (!step) return;

    // Handle the "Completion" step which might not have a target (center screen)
    if (step.targetId === 'center-screen') {
        setTargetRect(null);
        return;
    }

    const element = document.getElementById(step.targetId);
    if (element) {
      const rect = element.getBoundingClientRect();
      setTargetRect(rect);
      
      // Smooth scroll to element if it's out of view
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useLayoutEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready/rendered
      const timer = setTimeout(updatePosition, 100);
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isOpen, currentStepIndex, steps]);

  if (!isOpen) return null;

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  };

  // Determine Tooltip Position style
  const getTooltipStyle = () => {
    if (!targetRect) {
        // Center screen fallback
        return {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '400px',
            width: '90%'
        };
    }

    const gap = 16;
    let top = 0;
    let left = 0;
    let transform = '';

    // Simple auto-positioning logic (prefer bottom, flip if low space)
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const position = currentStep.position || (spaceBelow > 250 ? 'bottom' : 'top');

    switch (position) {
        case 'bottom':
            top = targetRect.bottom + gap;
            left = targetRect.left + (targetRect.width / 2);
            transform = 'translateX(-50%)';
            break;
        case 'top':
            top = targetRect.top - gap;
            left = targetRect.left + (targetRect.width / 2);
            transform = 'translate(-50%, -100%)';
            break;
        case 'left':
            top = targetRect.top + (targetRect.height / 2);
            left = targetRect.left - gap;
            transform = 'translate(-100%, -50%)';
            break;
        case 'right':
            top = targetRect.top + (targetRect.height / 2);
            left = targetRect.right + gap;
            transform = 'translate(0, -50%)';
            break;
    }

    // Safety check to keep tooltip on screen horizontally
    if (targetRect) {
         // (Additional logic could go here to clamp values to window width)
    }

    return { top, left, transform, width: '320px', maxWidth: '90vw' };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden isolate">
      {/* 1. The Backdrop (Dark overlay with a 'hole' cut out using CSS clip-path or simple SVG, 
          but for simplicity/responsiveness, we use a composed div structure or just 4 divs.
          Here we use a full screen dim and a high z-index 'cutout' simulator) 
      */}
      
      {/* Background Dimmer */}
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-[2px] transition-all duration-300"></div>

      {/* 2. The Spotlight Target (The 'Hole') */}
      {targetRect && (
        <div 
            className="absolute transition-all duration-300 ease-in-out border-2 border-primary shadow-[0_0_0_9999px_rgba(17,24,39,0.75)] rounded-xl"
            style={{
                top: targetRect.top - 4,
                left: targetRect.left - 4,
                width: targetRect.width + 8,
                height: targetRect.height + 8,
                boxShadow: '0 0 0 9999px rgba(17, 24, 39, 0.85), 0 0 20px rgba(228, 93, 59, 0.5)'
            }}
        >
            {/* Pulsing indicator */}
            <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
        </div>
      )}

      {/* 3. The Tooltip Card */}
      <div 
        className="absolute transition-all duration-300 ease-out z-50"
        style={getTooltipStyle()}
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-2xl border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary/20">
                        Step {currentStepIndex + 1}/{steps.length}
                    </span>
                </div>
                <button onClick={onSkip} className="text-xs font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    Skip
                </button>
            </div>
            
            <h3 className="text-lg font-bold text-text-primary dark:text-white mb-2">
                {currentStep.title}
            </h3>
            <p className="text-sm text-text-secondary dark:text-gray-400 mb-6 leading-relaxed">
                {currentStep.content}
            </p>

            <div className="flex items-center justify-between">
                 <div className="flex gap-1">
                     {steps.map((_, i) => (
                         <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStepIndex ? 'w-6 bg-primary' : 'w-1.5 bg-gray-200 dark:bg-gray-700'}`}></div>
                     ))}
                 </div>
                 <div className="flex gap-2">
                    {currentStepIndex > 0 && (
                        <Button variant="secondary" size="sm" onClick={handleBack}>Back</Button>
                    )}
                    <Button size="sm" onClick={handleNext}>
                        {isLastStep ? "Finish" : "Next"}
                    </Button>
                 </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default TutorialOverlay;