import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const spinnerVariants = cva(
  'animate-spin animate-infinite animate-ease-in-out h-6 w-6 rounded-full border-2 border-l-gray-400 border-r-gray-400 border-b-gray-400 border-t-blue-900',
);

interface SpinnerProps {
  className?: VariantProps<typeof spinnerVariants>;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div className={cn(spinnerVariants({ className }))} />
    </div>
  );
}
