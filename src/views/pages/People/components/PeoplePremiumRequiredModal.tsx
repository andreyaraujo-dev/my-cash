import { Modal } from '@/views/components/Modal';
import { Button } from '@/views/components/ui/button';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PeoplePremiumRequiredModalProps {
  open: boolean;
  onClose: () => void;
}

export function PeoplePremiumRequiredModal({ open, onClose }: PeoplePremiumRequiredModalProps) {
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
          Para compartilhar sua conta com família ou amigos, é necessário ter a assinatura Premium.
        </p>

        <p className="text-sm text-muted-foreground">
          Faça upgrade do seu plano para convidar até 4 pessoas e gerenciar os níveis de acesso.
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
