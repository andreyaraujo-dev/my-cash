import { useCategoriesWithTransactions } from '@/app/hooks/useCategories';

export function useCategoriesController() {
  const { categoriesWithTransactions, isFetching: isLoadingCategoriesWithTransactions } =
    useCategoriesWithTransactions();

  return { categoriesWithTransactions, isLoadingCategoriesWithTransactions };
}
