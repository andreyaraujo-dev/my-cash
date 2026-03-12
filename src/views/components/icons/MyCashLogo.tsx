import { MyCashIcon } from './MyCashIcon';
import { cn } from '@/lib/utils';

interface MyCashLogoProps {
  showText?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function MyCashLogo({
  showText = true,
  className,
  iconClassName,
  textClassName,
}: MyCashLogoProps) {
  return (
    <div className={cn('flex items-center gap-2 shrink-0', className)}>
      <MyCashIcon className={cn('h-8 w-8 shrink-0', iconClassName)} />
      {showText && (
        <span className={cn('text-xl font-semibold', textClassName)}>
          <span className="text-foreground">my</span>
          <span className="bg-gradient-to-r from-[#7B3EBF] to-[#3A4CFF] bg-clip-text text-transparent">
            Cash
          </span>
        </span>
      )}
    </div>
  );
}
