import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu.tsx';
import { useAuth } from '@/app/hooks/useAuth.ts';
import { CircleUser } from 'lucide-react';

export function UserMenu() {
  const { user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-zinc-800 rounded-full w-8 h-8 flex items-center justify-center border border-zinc-700 outline-none">
        <span className="text-sm tracking-[-0.5px] text-blue-900 font-medium">
          {user?.name.slice(0, 2).toUpperCase()}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-xs text-gray-600">Olá, {user?.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 font-medium">
          <CircleUser className="w-4 h-4" />
          Perfil
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
