import { Person } from '@/app/entities/Person';
import { Card } from '@/views/components/ui/card';
import { Button } from '@/views/components/ui/button';
import { Badge } from '@/views/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { formatDate } from '@/app/utils/formatDate';

const ACCESS_LEVEL_LABELS: Record<Person['accessLevel'], string> = {
  READ_ONLY: 'Leitura',
  READ_WRITE: 'Leitura e escrita',
  READ_WRITE_RESTRICTED: 'Leitura e escrita (sem excluir)',
};

const STATUS_LABELS: Record<Person['status'], string> = {
  PENDING: 'Pendente',
  ACTIVE: 'Ativo',
  REMOVED: 'Removido',
};

interface PeopleListProps {
  people: Person[];
  isLoading: boolean;
  onEdit: (person: Person) => void;
  onRemove: (person: Person) => void;
}

export function PeopleList({ people, isLoading, onEdit, onRemove }: PeopleListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-5 bg-muted rounded w-1/3 mb-2" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Nenhuma pessoa com acesso à conta.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Convide alguém para compartilhar o acesso.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {people.map((person) => (
        <Card key={person.id} className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">{person.name}</p>
              <p className="text-sm text-muted-foreground truncate">{person.email}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {ACCESS_LEVEL_LABELS[person.accessLevel]}
                </Badge>
                <Badge
                  variant={person.status === 'ACTIVE' ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {STATUS_LABELS[person.status]}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Convidado em {formatDate(new Date(person.createdAt))}
              </p>
            </div>
            {person.status !== 'REMOVED' && (
              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onEdit(person)}
                >
                  <Edit size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => onRemove(person)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
