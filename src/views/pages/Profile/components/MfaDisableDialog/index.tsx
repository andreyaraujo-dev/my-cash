import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/views/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/views/components/ui/dialog';
import { Input } from '@/views/components/ui/input';
import { Label } from '@/views/components/ui/label';

interface MfaDisableDialogProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  mfaDisablePassword: string;
  setMfaDisablePassword: (_value: string) => void;
  showMfaDisablePassword: boolean;
  setShowMfaDisablePassword: (_value: boolean) => void;
  isDisablingMfa: boolean;
  onDisableMfa: () => void;
}

export function MfaDisableDialog({
  open,
  onOpenChange,
  mfaDisablePassword,
  setMfaDisablePassword,
  showMfaDisablePassword,
  setShowMfaDisablePassword,
  isDisablingMfa,
  onDisableMfa,
}: MfaDisableDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-[90%] md:max-w-md bg-background border border-border">
        <DialogHeader>
          <DialogTitle>Desabilitar MFA</DialogTitle>
          <DialogDescription>
            Informe sua senha atual para confirmar a desativação da autenticação em duas etapas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mfaDisablePassword">Senha atual</Label>
            <Input
              id="mfaDisablePassword"
              type={showMfaDisablePassword ? 'text' : 'password'}
              placeholder="Sua senha"
              value={mfaDisablePassword}
              onChange={(event) => setMfaDisablePassword(event.target.value)}
              disabled={isDisablingMfa}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowMfaDisablePassword(!showMfaDisablePassword)}
                  className="inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showMfaDisablePassword ? 'Ocultar senha' : 'Visualizar senha'}
                >
                  {showMfaDisablePassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              onClick={() => onOpenChange(false)}
              disabled={isDisablingMfa}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="w-auto"
              onClick={onDisableMfa}
              isLoading={isDisablingMfa}
            >
              Confirmar desativação
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
