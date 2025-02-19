import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/views/components/ui/tooltip';
import { Info } from 'lucide-react';

export function InfoAccountsTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info className="ml-2 w-3 h-3" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Os valores mostrados aqui são referentes a transações já pagas.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
