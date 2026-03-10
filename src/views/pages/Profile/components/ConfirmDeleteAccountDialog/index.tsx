import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/views/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/views/components/ui/dialog';
import { Input } from '@/views/components/ui/input';
import { Label } from '@/views/components/ui/label';

interface ConfirmDeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  deleteAccountPassword: string;
  setDeleteAccountPassword: (_value: string) => void;
  showDeleteAccountPassword: boolean;
  setShowDeleteAccountPassword: (_value: boolean) => void;
  isDeletingAccount: boolean;
  onDeleteAccount: () => void;
  onClose: () => void;
}

export function ConfirmDeleteAccountDialog({
  open,
  onOpenChange,
  deleteAccountPassword,
  setDeleteAccountPassword,
  showDeleteAccountPassword,
  setShowDeleteAccountPassword,
  isDeletingAccount,
  onDeleteAccount,
  onClose,
}: ConfirmDeleteAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-[90%] md:max-w-md bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="text-red-900">Excluir conta?</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Esta ação é irreversível. Todos os seus dados serão perdidos. Digite sua senha atual
            para confirmar.
          </p>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deleteAccountPassword">Senha atual</Label>
            <Input
              id="deleteAccountPassword"
              type={showDeleteAccountPassword ? 'text' : 'password'}
              placeholder="Sua senha"
              value={deleteAccountPassword}
              onChange={(event) => setDeleteAccountPassword(event.target.value)}
              disabled={isDeletingAccount}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowDeleteAccountPassword(!showDeleteAccountPassword)}
                  className="inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showDeleteAccountPassword ? 'Ocultar senha' : 'Visualizar senha'}
                >
                  {showDeleteAccountPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="destructive"
              onClick={onDeleteAccount}
              disabled={isDeletingAccount || !deleteAccountPassword.trim()}
              isLoading={isDeletingAccount}
            >
              Sim, desejo excluir
            </Button>
            <Button variant="outline" onClick={onClose} disabled={isDeletingAccount}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
