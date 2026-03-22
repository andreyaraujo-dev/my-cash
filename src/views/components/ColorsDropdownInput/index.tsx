/* eslint-disable no-unused-vars */
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuItem,
} from '@/views/components/ui/dropdown-menu.tsx';
import { cn } from '@/lib/utils.ts';
import { ColorIcon } from '@/views/components/icons/ColorIcon.tsx';

interface ColorsDropdownInputProps {
  error?: string;
  className?: string;
  value?: string;
  onChange?(value: string): void;
}

type Color = {
  color: string;
  bg: string;
};

const colors: Color[] = [
  { color: '#212529', bg: '#F1F3F5' },
  { color: '#868E96', bg: '#F8F9FA' },
  { color: '#FA5252', bg: '#FFF5F5' },
  { color: '#E64980', bg: '#FFF0F6' },
  { color: '#BE4BDB', bg: '#F8F0FC' },
  { color: '#7950F2', bg: '#F3F0FF' },
  { color: '#4C6EF5', bg: '#EDF2FF' },
  { color: '#228BE6', bg: '#E7F5FF' },
  { color: '#15AABF', bg: '#E3FAFC' },
  { color: '#12B886', bg: '#E6FCF5' },
  { color: '#40C057', bg: '#EBFBEE' },
  { color: '#82C91E', bg: '#F4FCE3' },
  { color: '#FAB005', bg: '#FFF9DB' },
  { color: '#FD7E14', bg: '#FFF4E6' },
];

export function ColorsDropdownInput({
  className,
  error,
  value,
  onChange,
}: ColorsDropdownInputProps) {
  const [selectedColor, setSelectedColor] = useState<null | Color>(() => {
    if (!value) return null;

    return colors.find((c) => c.color === value) ?? null;
  });

  function handleSelect(color: Color) {
    setSelectedColor(color);
    onChange?.(color.color);
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              'bg-transparent rounded-lg w-full border border-border px-3 h-[52px] text-foreground placeholder-shown:pt-0 focus:border-muted-foreground transition-all outline-none text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            Cor
            <div className="text-foreground absolute right-3 top-1/2 -translate-y-1/2">
              {!selectedColor && <ChevronDownIcon className="h-4 w-4 opacity-50" />}
              {selectedColor && <ColorIcon color={selectedColor.color} bg={selectedColor.bg} />}
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-[110] grid grid-cols-4 border-border w-48">
          {colors.map((color) => (
            <DropdownMenuItem key={color.color} onSelect={() => handleSelect(color)}>
              <ColorIcon color={color.color} bg={color.bg} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
