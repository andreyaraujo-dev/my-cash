import { Button } from '@/views/components/ui/button';
import { Checkbox } from '@/views/components/ui/checkbox';
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
import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface VerifyMfaDialogProps {
  isMfaModalOpen: boolean;
  handleMfaModalOpenChange: (_open: boolean) => void;
  handleMfaSubmit: (_event?: BaseSyntheticEvent) => Promise<void>;
  mfaControl: Control<{ token: string }>;
  mfaErrors: FieldErrors<{ token: string }>;
  trustDevice: boolean;
  setTrustDevice: Dispatch<SetStateAction<boolean>>;
  isVerifyingMfa: boolean;
}

export function VerifyMfaDialog({
  isMfaModalOpen,
  handleMfaModalOpenChange,
  handleMfaSubmit,
  mfaControl,
  mfaErrors,
  trustDevice,
  setTrustDevice,
  isVerifyingMfa,
}: VerifyMfaDialogProps) {
  return (
    <Dialog open={isMfaModalOpen} onOpenChange={handleMfaModalOpenChange}>
      <DialogContent className="rounded-2xl max-w-[90%] md:max-w-md bg-background border border-border">
        <DialogHeader className="w-full">
          <DialogTitle>Validação em duas etapas</DialogTitle>
          <DialogDescription>
            Digite o código de 6 dígitos do seu aplicativo autenticador para concluir o login.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleMfaSubmit} className="space-y-4">
          <div className="space-y-2 w-full flex items-center flex-col">
            <Controller
              control={mfaControl}
              name="token"
              render={({ field }) => (
                <InputOTP
                  id="mfaToken"
                  maxLength={6}
                  pattern="^[0-9]+$"
                  autoComplete="one-time-code"
                  containerClassName="justify-center md:justify-start"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                >
                  <InputOTPGroup>
                    <InputOTPSlot className="md:w-14 md:h-14 w-11 h-11 text-lg" index={0} />
                    <InputOTPSlot className="md:w-14 md:h-14 w-11 h-11 text-lg" index={1} />
                    <InputOTPSlot className="md:w-14 md:h-14 w-11 h-11 text-lg" index={2} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot className="md:w-14 md:h-14 w-11 h-11 text-lg" index={3} />
                    <InputOTPSlot className="md:w-14 md:h-14 w-11 h-11 text-lg" index={4} />
                    <InputOTPSlot className="md:w-14 md:h-14 w-11 h-11 text-lg" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            {mfaErrors.token && (
              <p className="text-sm text-destructive">{mfaErrors.token.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2 select-none">
            <Checkbox
              id="trustDevice"
              checked={trustDevice}
              onCheckedChange={(checked) => setTrustDevice(checked === true)}
            />
            <Label htmlFor="trustDevice" className="text-sm text-muted-foreground cursor-pointer">
              Confiar neste dispositivo por 30 dias
            </Label>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              onClick={() => handleMfaModalOpenChange(false)}
              disabled={isVerifyingMfa}
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-auto" isLoading={isVerifyingMfa}>
              Validar código
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
