import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu.tsx';
import { useAuth } from '@/app/hooks/useAuth.ts';
import { useTheme } from '@/views/ThemeProvider';
import { CircleUser, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UserMenu() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-muted rounded-full w-8 h-8 flex items-center justify-center border border-border outline-none">
        <span className="text-sm tracking-[-0.5px] text-foreground font-medium">
          {user?.name.slice(0, 2).toUpperCase()}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Olá, {user?.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center gap-2 font-medium cursor-pointer">
            <CircleUser className="w-4 h-4" />
            Perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2 font-medium cursor-pointer"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDark ? 'Tema Claro' : 'Tema Escuro'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
