import { Goal } from '@/app/entities/Goal';
import { Skeleton } from '@/views/components/ui/skeleton';
import { GoalCard } from '../GoalCard';
import { Target } from 'lucide-react';

interface GoalsListProps {
  goals: Goal[];
  isLoading: boolean;
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
  onDetails: (goal: Goal) => void;
  onAddValue: (goal: Goal) => void;
}

export function GoalsList({
  goals,
  isLoading,
  onEdit,
  onDelete,
  onDetails,
  onAddValue,
}: GoalsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[280px] rounded-lg" />
        ))}
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-zinc-800 p-6 mb-4">
          <Target className="w-12 h-12 text-zinc-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Nenhuma meta encontrada</h3>
        <p className="text-zinc-400 max-w-md">
          Você ainda não criou nenhuma meta. Comece criando uma nova meta para organizar seus
          objetivos financeiros!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetails={onDetails}
          onAddValue={onAddValue}
        />
      ))}
    </div>
  );
}
