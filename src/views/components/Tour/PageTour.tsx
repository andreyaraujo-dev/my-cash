import { useEffect, useState, useCallback } from 'react';
import Joyride, { type Step, type CallBackProps, STATUS, EVENTS } from 'react-joyride';
import { useTourStore } from '@/app/store/useTourStore';
import { CustomTooltip } from './CustomTooltip';

interface PageTourProps {
  tourId: string;
  steps: Step[];
  delay?: number;
}

export function PageTour({ tourId, steps, delay = 800 }: PageTourProps) {
  const [run, setRun] = useState(false);
  const { completedTours, completeTour } = useTourStore();

  const isCompleted = completedTours.includes(tourId);

  useEffect(() => {
    if (isCompleted) return;

    const timer = setTimeout(() => {
      const allTargetsExist = steps.every((step) => {
        if (typeof step.target === 'string') {
          return document.querySelector(step.target) !== null;
        }
        return true;
      });

      if (allTargetsExist) {
        setRun(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isCompleted, steps, delay]);

  const handleCallback = useCallback(
    (data: CallBackProps) => {
      const { status, type } = data;

      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        setRun(false);
        completeTour(tourId);
      }

      if (type === EVENTS.TARGET_NOT_FOUND) {
        setRun(false);
      }
    },
    [tourId, completeTour],
  );

  if (isCompleted) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      hideCloseButton
      disableOverlayClose
      disableScrolling={false}
      spotlightPadding={8}
      callback={handleCallback}
      tooltipComponent={CustomTooltip}
      locale={{
        back: 'Voltar',
        close: 'Fechar',
        last: 'Concluir',
        next: 'Próximo',
        skip: 'Pular',
      }}
      styles={{
        options: {
          zIndex: 10000,
          arrowColor: 'hsl(var(--card))',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    />
  );
}
