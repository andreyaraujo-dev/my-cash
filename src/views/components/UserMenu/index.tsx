import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu.tsx';
import { useAuth } from '@/app/hooks/useAuth.ts';
import { ExitIcon } from '@radix-ui/react-icons';

export function UserMenu() {
  const { signout, user } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-zinc-800 rounded-full w-12 h-12 flex items-center justify-center border border-zinc-700 outline-none">
        <span className="text-sm tracking-[-0.5px] text-blue-900 font-medium">
          {user?.name.slice(0, 2).toUpperCase()}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-xs text-gray-600">Olá, {user?.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={signout}
          className="flex items-center justify-between font-medium"
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
