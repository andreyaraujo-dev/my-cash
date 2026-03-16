import { Modal } from '@/views/components/Modal';
import { AccessLog, Person } from '@/app/entities/Person';
import { formatDate } from '@/app/utils/formatDate';

const ACTION_LABELS: Record<string, string> = {
  CREATED: 'Convidado',
  UPDATED: 'Nível alterado',
  REMOVED: 'Removido',
  ACTIVATED: 'Conta ativada',
};

interface AccessHistoryModalProps {
  open: boolean;
  onClose: () => void;
  accessHistory: AccessLog[];
  isLoading: boolean;
  person?: Person | null;
}

export function AccessHistoryModal({
  open,
  onClose,
  accessHistory,
  isLoading,
  person,
}: AccessHistoryModalProps) {
  const sortedHistory = [...accessHistory].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const title = person
    ? `Histórico de acesso - ${person.name}`
    : 'Histórico de acesso';

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="mt-6 max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                <div className="h-3 bg-muted rounded w-full" />
              </div>
            ))}
          </div>
        ) : sortedHistory.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhum registro no histórico.
          </p>
        ) : (
          <div className="space-y-3">
            {sortedHistory.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-lg bg-muted/50 border border-border"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {ACTION_LABELS[log.action] ?? log.action}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(new Date(log.createdAt))}
                  </span>
                </div>
                <p className="text-sm mt-1">{log.description}</p>
                {!person && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {log.sharedPerson.name} ({log.sharedPerson.email})
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
