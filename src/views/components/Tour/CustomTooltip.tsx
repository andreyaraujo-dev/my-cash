import type { TooltipRenderProps } from 'react-joyride';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/views/components/ui/card';
import { Button } from '@/views/components/ui/button';
import { X } from 'lucide-react';

export function CustomTooltip({
  continuous,
  index,
  step,
  size,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
  isLastStep,
}: TooltipRenderProps) {
  return (
    <div {...tooltipProps} className="z-[10000]">
      <Card className="w-[340px] max-w-[90vw] shadow-2xl border-border/60 bg-card">
        <CardHeader className="pb-2 pr-10 relative">
          {step.title && <CardTitle className="text-base font-semibold">{step.title}</CardTitle>}
          <button
            {...closeProps}
            type="button"
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </CardHeader>

        <CardContent className="pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{step.content}</p>
        </CardContent>

        <CardFooter className="flex items-center justify-between pb-4">
          <span className="text-xs text-muted-foreground">
            {index + 1} de {size}
          </span>

          <div className="flex gap-2">
            {index > 0 && (
              <Button {...backProps} variant="outline" size="sm" className="w-auto">
                Voltar
              </Button>
            )}

            {continuous && (
              <Button {...primaryProps} variant="default" size="sm" className="w-auto">
                {isLastStep ? 'Concluir' : 'Próximo'}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
