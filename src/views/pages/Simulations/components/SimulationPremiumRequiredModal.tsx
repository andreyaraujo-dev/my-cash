import { Modal } from '@/views/components/Modal';
import { Button } from '@/views/components/ui/button';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SimulationPremiumRequiredModalProps {
  open: boolean;
  onClose: () => void;
}

export function SimulationPremiumRequiredModal({
  open,
  onClose,
}: SimulationPremiumRequiredModalProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate('/profile/subscription');
  };

  return (
    <Modal open={open} title="Assinatura Premium necessária" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6 mt-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Lock className="w-8 h-8 text-primary" />
        </div>

        <p className="text-foreground font-medium">
          Para simular eventos financeiros e visualizar o impacto no seu orçamento, metas e fluxo de
          caixa, é necessário ter a assinatura Premium.
        </p>

        <p className="text-sm text-muted-foreground">
          Faça upgrade do seu plano para simular aumentos de salário, compras parceladas, quitação
          de dívidas e muito mais.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <Button className="w-full" onClick={handleUpgrade}>
          Trocar para Premium
        </Button>
        <Button className="w-full" variant="outline" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </Modal>
  );
}
