import { Person } from '@/app/entities/Person';
import { Badge } from '@/views/components/ui/badge';
import { Button } from '@/views/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/views/components/ui/table';
import { Edit, History, MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu';

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
  onViewHistory: (person: Person) => void;
}

export function PeopleList({
  people,
  isLoading,
  onEdit,
  onRemove,
  onViewHistory,
}: PeopleListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">Nenhuma pessoa com acesso à conta.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Convide alguém para compartilhar o acesso.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Nível</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people.map((person) => (
          <TableRow key={person.id}>
            <TableCell className="font-medium">{person.name}</TableCell>
            <TableCell className="text-muted-foreground">{person.email}</TableCell>
            <TableCell>
              <Badge variant="secondary" className="text-xs">
                {ACCESS_LEVEL_LABELS[person.accessLevel]}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={person.status === 'ACTIVE' ? 'default' : 'outline'}
                className="text-xs"
              >
                {STATUS_LABELS[person.status]}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {person.status !== 'REMOVED' && (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(person)}>
                      <Edit size={14} className="mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        setTimeout(() => onViewHistory(person), 0);
                      }}
                    >
                      <History size={14} className="mr-2" />
                      Ver histórico de acesso
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRemove(person)}
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <Trash2 size={14} className="mr-2" />
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
