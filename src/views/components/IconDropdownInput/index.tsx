/* eslint-disable no-unused-vars */
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
} from '@/views/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { iconsMap } from '@/views/components/icons/Categories/iconsMap';
import { CategoryIcon } from '@/views/components/icons/Categories/CategoryIcon';

interface IconDropdownInputProps {
  error?: string;
  className?: string;
  value?: string;
  type?: 'INCOME' | 'EXPENSE';
  onChange?(value: string): void;
}

export function IconDropdownInput({
  className,
  error,
  value,
  type,
  onChange,
}: IconDropdownInputProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(() => {
    return value || null;
  });

  useEffect(() => {
    setSelectedIcon(value || null);
  }, [value]);

  const availableIcons = type ? Object.keys(iconsMap[type]) : [];

  function handleSelect(iconKey: string) {
    setSelectedIcon(iconKey);
    onChange?.(iconKey);
  }

  if (!type) {
    return null;
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              'bg-transparent rounded-lg w-full border border-border px-3 h-[52px] text-foreground placeholder-shown:pt-0 focus:border-muted-foreground transition-all outline-none text-left relative flex items-center justify-between',
              error && '!border-red-900',
              className,
            )}
          >
            <span className="text-foreground">Ícone</span>
            <div className="text-foreground flex items-center">
              {!selectedIcon && <ChevronDownIcon className="h-4 w-4 opacity-50" />}
              {selectedIcon && type && (
                <div className="w-8 h-8 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                  <CategoryIcon type={type} category={selectedIcon} />
                </div>
              )}
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="grid grid-cols-4 border-border w-64 p-2">
          {availableIcons.map((iconKey) => (
            <DropdownMenuItem
              key={iconKey}
              onSelect={() => handleSelect(iconKey)}
              className="flex items-center justify-center p-2"
            >
              {type && (
                <div className="w-8 h-8 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                  <CategoryIcon type={type} category={iconKey} />
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
