import { Card } from '@/views/components/ui/card';
import { Button } from '@/views/components/ui/button';
import { Badge } from '@/views/components/ui/badge';
import { Avatar, AvatarFallback } from '@/views/components/ui/avatar';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useCategoriesController } from './hooks/useCategoriesController';
import { useSharedAccessLevel } from '@/app/hooks/useSharedAccessLevel';
import { CategoryIcon } from '@/views/components/icons/Categories/CategoryIcon';
import { NewCategoryModal } from './components/NewCategoryModal';
import { CategoriesSkeleton } from './components/CategoriesSkeleton';
import { EditCategoryModal } from './components/EditCategoryModal';
import { ConfirmDeleteModal } from '@/views/components/ConfirmDeleteModal';
import { PageTour } from '@/views/components/Tour/PageTour';
import { categoriesTourSteps, TOUR_IDS } from '@/views/components/Tour/tours';

export function CategoriesPage() {
  const {
    categoriesWithTransactions: { summary, categories },
    isLoadingCategoriesWithTransactions,
    openNewCategoryModal,
    isNewCategoryModalOpen,
    closeNewCategoryModal,
    form,
    handleSubmit,
    isLoadingCreateCategory,
    isEditCategoryModalOpen,
    selectedCategoryForEdit,
    openEditCategoryModal,
    closeEditCategoryModal,
    editForm,
    handleUpdateSubmit,
    isLoadingUpdateCategory,
    isDeleteModalOpen,
    selectedCategoryForDelete,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm,
    isLoadingDeleteCategory,
  } = useCategoriesController();
  const { canCreate, canEdit, canDelete } = useSharedAccessLevel();

  const getBudgetStatus = (usage: number) => {
    if (usage >= 90) return { color: 'text-red-500', status: 'Crítico' };
    if (usage >= 70) return { color: 'text-orange-500', status: 'Atenção' };
    return { color: 'text-green-500', status: 'Saudável' };
  };

  if (isLoadingCategoriesWithTransactions) {
    return <CategoriesSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Categorias</h1>
        {canCreate && (
          <div data-tour="new-category-btn">
            <Button className="gap-2 w-max text-base" onClick={openNewCategoryModal}>
              <Plus size={16} />
              Nova Categoria
            </Button>
          </div>
        )}
      </div>

      <NewCategoryModal
        isOpen={isNewCategoryModalOpen}
        onClose={closeNewCategoryModal}
        form={form}
        handleSubmit={handleSubmit}
        isLoading={isLoadingCreateCategory}
      />

      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        onClose={closeEditCategoryModal}
        form={editForm}
        handleSubmit={handleUpdateSubmit}
        isLoading={isLoadingUpdateCategory}
        category={selectedCategoryForEdit}
      />

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteConfirm}
          onClose={closeDeleteModal}
          title={`Tem certeza que deseja excluir a categoria "${selectedCategoryForDelete?.name}"?`}
          description="Esta ação não pode ser desfeita."
          isLoading={isLoadingDeleteCategory}
          open={isDeleteModalOpen}
        />
      )}

      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-tour="categories-summary">
        <Card className="p-4 bg-card/50">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total de Categorias</p>
            <p className="text-2xl font-semibold">{summary?.totalCategories ?? 0}</p>
          </div>
        </Card>

        <Card className="p-4 bg-blue-500/10 border-blue-500/20">
          <div className="space-y-2">
            <p className="text-sm text-blue-600">Orçamento Total</p>
            <p className="text-2xl font-semibold text-blue-600">
              R$ {(summary?.totalBudget ?? 0).toLocaleString('pt-BR')}
            </p>
          </div>
        </Card>

        <Card className="p-4 bg-orange-500/10 border-orange-500/20">
          <div className="space-y-2">
            <p className="text-sm text-orange-600">Gasto Total</p>
            <p className="text-2xl font-semibold text-orange-600">
              R$ {(summary?.totalSpending ?? 0).toLocaleString('pt-BR')}
            </p>
          </div>
        </Card>
      </div>

      {/* Lista de Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-tour="categories-list">
        {categories.map((category) => {
          const budgetStatus = getBudgetStatus(category.percentageUsed);
          const percentageUsed = category.percentageUsed;

          return (
            <Card key={category.id} className="p-6 bg-card/50 hover:bg-card/70 transition-colors">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-transparent text-white">
                        <CategoryIcon type={category.type} category={category.icon} />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.transactionCount} transações
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {canEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditCategoryModal(category)}
                      >
                        <Edit size={14} />
                      </Button>
                    )}
                    {canDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                        onClick={() => openDeleteModal(category)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Valores */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Gasto</span>
                    <span className="font-semibold">
                      R$ {category.spending.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Orçamento</span>
                    <span className="text-sm">R$ {category.budget.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Uso do orçamento</span>
                    <Badge variant="outline" className={budgetStatus.color}>
                      {budgetStatus.status}
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        percentageUsed >= 90
                          ? 'bg-red-500'
                          : percentageUsed >= 70
                            ? 'bg-orange-500'
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{Math.round(percentageUsed)}% usado</span>
                    <span>R$ {category.remaining.toLocaleString('pt-BR')} restantes</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Card de Adicionar Categoria */}
      {canCreate && (
        <Card
          className="p-6 bg-card/30 border-dashed border-2 border-muted hover:border-primary/50 transition-colors cursor-pointer"
          onClick={openNewCategoryModal}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-2 py-8">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Plus size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-medium">Criar Nova Categoria</h3>
            <p className="text-sm text-muted-foreground">
              Organize melhor seus gastos criando categorias personalizadas
            </p>
          </div>
        </Card>
      )}

      <PageTour tourId={TOUR_IDS.CATEGORIES} steps={categoriesTourSteps} />
    </div>
  );
}
