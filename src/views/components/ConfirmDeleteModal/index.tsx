import { Modal } from '@/views/components/Modal';
import { Button } from '@/views/components/ui/button.tsx';
import { TrashIcon } from '@/views/components/icons/TrashIcon.tsx';

interface ConfirmDeleteModalProps {
  onConfirm(): void;
  onClose(): void;
  title: string;
  description?: string;
  isLoading: boolean;
}

export function ConfirmDeleteModal({
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center bg-red-50">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>

        <p className="w-[180px] text-zinc-100 font-bold tracking-[-0.5px]">{title}</p>

        {description && <p className="tracking-[-0.5px] text-zinc-300">{description}</p>}
      </div>

      <div className="mt-10 space-y-4">
        <Button className="w-full" variant="destructive" onClick={onConfirm} isLoading={isLoading}>
          Sim, desejo excluir
        </Button>
        <Button className="w-full" variant="outline" onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
