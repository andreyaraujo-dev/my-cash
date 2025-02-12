import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '@/app/config/constants.ts';
import { SliderOption } from '@/views/pages/Dashboard/components/Transactions/SliderOption.tsx';
import { SliderNavigation } from '@/views/pages/Dashboard/components/Transactions/SliderNavigation.tsx';
import { formatCurrency } from '@/app/utils/formatCurrency.ts';
import { CategoryIcon } from '@/views/components/icons/Categories/CategoryIcon.tsx';
import { cn } from '@/lib/utils.ts';
import { useTransactionsController } from '@/views/pages/Dashboard/components/Transactions/useTransactionsController.ts';
import { Spinner } from '@/views/components/Loading/Spinner';
import emptyState from '@/assets/empty-state.svg';
import { TransactionTypeDropdown } from '@/views/pages/Dashboard/components/Transactions/TransactionTypeDropdown.tsx';
import { FiltersModal } from '@/views/pages/Dashboard/components/Modals/FiltersModal';
import { formatDate } from '@/app/utils/formatDate.ts';
import { EditTransactionModal } from '@/views/pages/Dashboard/components/Modals/EditTransactionModal';
import { TotalTransactions } from '@/views/pages/Dashboard/components/Transactions/TotalTransactions.tsx';

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    handleChangeFilters,
    filters,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    hasTransactions,
    handleOpenEditModal,
    handleCloseEditModal,
    isEditModalOpen,
    transactionBeingEdited,
    handleApplyFilters,
    totalIncome,
    totalExpenses,
  } = useTransactionsController();

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-4 md:px-10 md:pt-10 pb-2 flex flex-col">
      {isInitialLoading && (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <header>
            <div className="flex justify-between items-center">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />
              <FiltersModal
                open={isFiltersModalOpen}
                onClose={handleCloseFiltersModal}
                onApplyFilters={handleApplyFilters}
                handleOpenFiltersModal={handleOpenFiltersModal}
              />
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  handleChangeFilters('month')(swiper.realIndex);
                }}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption isActive={isActive} month={month} index={index} />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>
          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center h-full justify-center">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col items-center h-full justify-center">
                <img src={emptyState} alt="empty state ilustration" />
                <p className="text-gray-700">Não encontramos nenhuma transação!</p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map((transaction) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
                  <div
                    key={transaction.id}
                    className={cn(
                      'bg-white p-4 rounded-2xl flex items-center justify-between gap-4',
                    )}
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon type={transaction.type} category={transaction.category?.icon} />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'tracking-[-0.5px] font-medium',
                        transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800',
                        !areValuesVisible && 'blur-md',
                      )}
                    >
                      {transaction.type === 'EXPENSE' ? '- ' : '+ '}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>

          {hasTransactions && !isLoading && (
            <TotalTransactions
              filtersType={filters.type}
              areValuesVisible={areValuesVisible}
              totalIncome={totalIncome}
              totalExpense={totalExpenses}
            />
          )}
        </>
      )}
    </div>
  );
}
