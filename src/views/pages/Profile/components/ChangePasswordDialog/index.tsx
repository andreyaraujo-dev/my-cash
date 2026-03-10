import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/views/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/views/components/ui/dialog';
import { Input } from '@/views/components/ui/input';
import { Label } from '@/views/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { ChangePasswordFormData } from '../../hooks/useProfileController';

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSubmit: (_event?: BaseSyntheticEvent) => Promise<void>;
  form: UseFormReturn<ChangePasswordFormData>;
  isChangingPassword: boolean;
  showCurrentPassword: boolean;
  setShowCurrentPassword: Dispatch<SetStateAction<boolean>>;
  showNewPassword: boolean;
  setShowNewPassword: Dispatch<SetStateAction<boolean>>;
  showConfirmNewPassword: boolean;
  setShowConfirmNewPassword: Dispatch<SetStateAction<boolean>>;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
  onSubmit,
  form,
  isChangingPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmNewPassword,
  setShowConfirmNewPassword,
}: ChangePasswordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-[90%] md:max-w-md bg-background border border-border">
        <DialogHeader>
          <DialogTitle>Alterar senha</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Senha atual</Label>
            <Input
              id="currentPassword"
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Senha atual"
              {...form.register('currentPassword')}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showCurrentPassword ? 'Ocultar senha' : 'Visualizar senha'}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />
            {form.formState.errors.currentPassword && (
              <p className="text-sm text-destructive">
                {form.formState.errors.currentPassword.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nova senha</Label>
            <Input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Nova senha"
              {...form.register('newPassword')}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showNewPassword ? 'Ocultar senha' : 'Visualizar senha'}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            {form.formState.errors.newPassword && (
              <p className="text-sm text-destructive">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirmar nova senha</Label>
            <Input
              id="confirmNewPassword"
              type={showConfirmNewPassword ? 'text' : 'password'}
              placeholder="Confirmar nova senha"
              {...form.register('confirmNewPassword')}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirmNewPassword ? 'Ocultar senha' : 'Visualizar senha'}
                >
                  {showConfirmNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />
            {form.formState.errors.confirmNewPassword && (
              <p className="text-sm text-destructive">
                {form.formState.errors.confirmNewPassword.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isChangingPassword}
            >
              Cancelar
            </Button>
            <Button type="submit" isLoading={isChangingPassword}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
