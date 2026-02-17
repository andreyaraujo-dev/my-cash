import { Modal } from '@/views/components/Modal';
import { Button } from '@/views/components/ui/button.tsx';
import { Repeat } from 'lucide-react';

interface RecurrenceScopeDialogProps {
  open: boolean;
  onClose(): void;
  onSelect(scope: 'single' | 'future'): void;
  title: string;
  isLoading?: boolean;
}

export function RecurrenceScopeDialog({
  open,
  onClose,
  onSelect,
  title,
  isLoading,
}: RecurrenceScopeDialogProps) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-blue-500/10 flex items-center justify-center">
          <Repeat className="w-6 h-6 text-blue-400" />
        </div>

        <p className="text-muted-foreground tracking-[-0.5px]">
          Esta transação faz parte de um grupo recorrente. O que deseja fazer?
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          className="w-full"
          variant="outline"
          onClick={() => onSelect('single')}
          disabled={isLoading}
        >
          Apenas esta transação
        </Button>
        <Button
          className="w-full"
          onClick={() => onSelect('future')}
          disabled={isLoading}
          isLoading={isLoading}
        >
          Esta e todas as futuras
        </Button>
        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
