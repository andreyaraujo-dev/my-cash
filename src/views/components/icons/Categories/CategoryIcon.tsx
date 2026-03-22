import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { iconColorsMap } from './iconColorsMap';
import { iconsMap } from './iconsMap';
import { ExpenseDefault } from './Expense/ExpenseDefault';
import { IncomeDefault } from './Income/IncomeDefault';

interface CategoryIconProps {
  type: 'EXPENSE' | 'INCOME';
  category?: string;
  className?: string;
}

const DEFAULT_ICONS = [ExpenseDefault, IncomeDefault];

export function CategoryIcon({ type, category, className }: CategoryIconProps) {
  const iconKey =
    (category as keyof (typeof iconsMap.EXPENSE | typeof iconsMap.INCOME)) ?? 'default';
  const Icon = iconsMap[type][iconKey] ?? iconsMap[type].default;
  const isDefaultSvg = DEFAULT_ICONS.includes(Icon as (typeof DEFAULT_ICONS)[number]);

  const colors = iconColorsMap[type][iconKey] ?? iconColorsMap[type].default;

  if (isDefaultSvg) {
    return (
      <span
        className={cn(
          'flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full [&_svg]:h-full [&_svg]:w-full [&_svg]:min-h-0 [&_svg]:min-w-0',
          className,
        )}
      >
        <Icon />
      </span>
    );
  }

  const LucideIconComponent = Icon as LucideIcon;

  return (
    <span
      className={cn(
        'flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white [&_svg]:shrink-0',
        className,
      )}
      style={{ backgroundColor: colors.bg }}
    >
      <LucideIconComponent className="size-[65%]" style={{ color: colors.stroke }} />
    </span>
  );
}
