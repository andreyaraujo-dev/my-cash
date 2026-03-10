import { Button } from '@/views/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/views/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/views/components/ui/input-otp';
import { Label } from '@/views/components/ui/label';

interface MfaSetupDialogProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  qrCodeDataUrl: string;
  mfaSetupToken: string;
  setMfaSetupToken: (_value: string) => void;
  isLoadingSetup: boolean;
  isVerifyingSetup: boolean;
  onRetrySetup: () => void;
  onConfirmSetup: () => void;
}

export function MfaSetupDialog({
  open,
  onOpenChange,
  qrCodeDataUrl,
  mfaSetupToken,
  setMfaSetupToken,
  isLoadingSetup,
  isVerifyingSetup,
  onRetrySetup,
  onConfirmSetup,
}: MfaSetupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-[90%] md:max-w-md bg-background border border-border">
        <DialogHeader>
          <DialogTitle>Habilitar MFA por aplicativo</DialogTitle>
          <DialogDescription>
            Escaneie o QR Code com seu app autenticador e informe o código para concluir.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {qrCodeDataUrl ? (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <img
                src={qrCodeDataUrl}
                alt="QR Code de configuração MFA"
                className="mx-auto h-52 w-52 rounded-lg bg-white p-2"
              />
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
              {isLoadingSetup
                ? 'Gerando QR Code...'
                : 'Não foi possível carregar o QR Code. Tente gerar novamente.'}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="mfaSetupToken">Código do autenticador</Label>
            <InputOTP
              id="mfaSetupToken"
              maxLength={6}
              pattern="^[0-9]+$"
              autoComplete="one-time-code"
              containerClassName="justify-center md:justify-start"
              value={mfaSetupToken}
              onChange={setMfaSetupToken}
              disabled={isVerifyingSetup}
            >
              <InputOTPGroup>
                <InputOTPSlot className="w-14 h-14 text-lg" index={0} />
                <InputOTPSlot className="w-14 h-14 text-lg" index={1} />
                <InputOTPSlot className="w-14 h-14 text-lg" index={2} />
              </InputOTPGroup>

              <InputOTPSeparator />

              <InputOTPGroup>
                <InputOTPSlot className="w-14 h-14 text-lg" index={3} />
                <InputOTPSlot className="w-14 h-14 text-lg" index={4} />
                <InputOTPSlot className="w-14 h-14 text-lg" index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              onClick={() => onOpenChange(false)}
              disabled={isLoadingSetup || isVerifyingSetup}
            >
              Cancelar
            </Button>
            {!qrCodeDataUrl && !isLoadingSetup ? (
              <Button type="button" className="w-auto" onClick={onRetrySetup}>
                Gerar QR Code
              </Button>
            ) : (
              <Button
                type="button"
                className="w-auto"
                onClick={onConfirmSetup}
                isLoading={isVerifyingSetup}
              >
                Confirmar MFA
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
