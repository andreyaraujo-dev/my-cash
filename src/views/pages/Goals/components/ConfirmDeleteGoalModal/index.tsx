import { useState } from 'react';
import { Modal } from '@/views/components/Modal';
import { Button } from '@/views/components/ui/button';
import { Checkbox } from '@/views/components/ui/checkbox';
import { TrashIcon } from '@/views/components/icons/TrashIcon';

interface ConfirmDeleteGoalModalProps {
  open: boolean;
  onClose(): void;
  // eslint-disable-next-line no-unused-vars
  onConfirm(deleteTransactions?: boolean): void;
  isLoading: boolean;
  goalName: string;
}

export function ConfirmDeleteGoalModal({
  open,
  onClose,
  onConfirm,
  isLoading,
  goalName,
}: ConfirmDeleteGoalModalProps) {
  const [deleteTransactions, setDeleteTransactions] = useState(false);

  const handleClose = () => {
    setDeleteTransactions(false);
    onClose();
  };

  return (
    <Modal open={open} title="Excluir" onClose={handleClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>

        <p className="w-[180px] text-zinc-100 font-bold tracking-[-0.5px]">
          Tem certeza que deseja excluir a meta &quot;{goalName}&quot;?
        </p>

        <p className="tracking-[-0.5px] text-zinc-300 text-sm">Esta ação não pode ser desfeita.</p>
      </div>

      <div className="mt-6 flex items-start gap-3 bg-zinc-900 rounded-lg p-4 border border-zinc-800">
        <Checkbox
          id="deleteTransactions"
          checked={deleteTransactions}
          onCheckedChange={(checked) => setDeleteTransactions(checked === true)}
          className="mt-0.5"
        />
        <label
          htmlFor="deleteTransactions"
          className="text-sm text-zinc-300 cursor-pointer text-left"
        >
          Excluir também as transações relacionadas a esta meta
        </label>
      </div>

      <div className="mt-6 space-y-4">
        <Button
          className="w-full"
          variant="destructive"
          onClick={() => onConfirm(deleteTransactions)}
          isLoading={isLoading}
        >
          Sim, desejo excluir
        </Button>
        <Button className="w-full" variant="outline" onClick={handleClose} disabled={isLoading}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
