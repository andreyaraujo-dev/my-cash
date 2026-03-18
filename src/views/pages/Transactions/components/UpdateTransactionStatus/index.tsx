import { Button } from '@/views/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/views/components/ui/dialog';
import { useToast } from '@/app/hooks/useToast';
import { queryClient } from '@/app/services/react-query/queryClient';
import { useTransactionsController } from '../../hooks/useTransactionsController';

interface UpdateTransactionStatusProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: boolean) => void;
  transactionId: string;
}

export function UpdateTransactionStatus({
  isOpen,
  setIsOpen,
  transactionId,
}: UpdateTransactionStatusProps) {
  const {
    filters,
    isLoadingUpdateTransactionStatus,
    updateTransactionStatus,
    isErrorUpdateTransactionStatus,
  } = useTransactionsController();

  const { toast } = useToast();

  async function handleUpdateStatus() {
    try {
      await updateTransactionStatus(transactionId);

      if (isErrorUpdateTransactionStatus) {
        toast({
          title: 'Erro',
          description: 'Não foi possível atualizar o status da transação.',
          duration: 3000,
        });
      }

      queryClient.refetchQueries({ queryKey: ['transactions', filters] });
      setIsOpen(false);
    } catch {
      toast({
        title: 'Ops...',
        description: 'Ocorreu um erro, tente novamente.',
        duration: 3000,
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar status da transação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja alterar o status desta transação.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            className="bg-transparent text-destructive hover:text-white border border-destructive"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="blue-primary"
            onClick={handleUpdateStatus}
            disabled={isLoadingUpdateTransactionStatus}
            isLoading={isLoadingUpdateTransactionStatus}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
