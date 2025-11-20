import { Swiper, SwiperSlide } from 'swiper/react';
import { MONTHS } from '@/app/config/constants.ts';
import { SliderOption } from '@/views/pages/Dashboard/components/Transactions/SliderOption.tsx';
import { SliderNavigation } from '@/views/pages/Dashboard/components/Transactions/SliderNavigation.tsx';
import { formatCurrency } from '@/app/utils/formatCurrency.ts';
import { CategoryIcon } from '@/views/components/icons/Categories/CategoryIcon.tsx';
import { cn } from '@/lib/utils.ts';
import { useTransactionsController } from '@/views/pages/Transactions/hooks/useTransactionsController';
import { Spinner } from '@/views/components/Loading/Spinner';
import emptyState from '@/assets/empty-state.svg';
import { TransactionTypeDropdown } from '@/views/pages/Dashboard/components/Transactions/TransactionTypeDropdown.tsx';
import { FiltersModal } from '@/views/pages/Dashboard/components/Modals/FiltersModal';
import { formatDate } from '@/app/utils/formatDate.ts';
import { EditTransactionModal } from '@/views/pages/Transactions/components/EditTransactionModal';
import { TotalTransactions } from '@/views/pages/Dashboard/components/Transactions/TotalTransactions.tsx';
import { Button } from '@/views/components/ui/button';
import { Check, Clock } from 'lucide-react';
import { Fab } from '../Fab';

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

  function onTogglePaid() {}

  return (
    <div className="border-l border-zinc-800 h-full p-4 pr-0 flex flex-col">
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
                <p className="text-zinc-300">Não encontramos nenhuma transação!</p>
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
                      'p-4 flex items-center justify-between gap-4 hover:bg-zinc-900 transition-all rounded-sm',
                      transaction.isPaid && 'opacity-60',
                    )}
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <div className="relative">
                        <CategoryIcon
                          type={transaction.type}
                          category={transaction.category?.icon}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className={`h-4 w-4 absolute -bottom-1 -right-1 border-2 ${
                            transaction.isPaid
                              ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
                              : 'bg-background border-muted-foreground text-muted-foreground hover:bg-muted'
                          }`}
                          onClick={onTogglePaid}
                        >
                          {transaction.isPaid ? <Check size={10} /> : <Clock size={10} />}
                        </Button>
                      </div>

                      <div>
                        <strong className={cn('font-bold tracking-[-0.5px] block text-zinc-100')}>
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-zinc-300">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'tracking-[-0.5px] font-semibold flex flex-col items-end text-sm',
                        transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800',
                        !areValuesVisible && 'blur-md',
                      )}
                    >
                      {transaction.type === 'EXPENSE' ? '- ' : '+ '}
                      {formatCurrency(transaction.value)}
                      {transaction.isPaid ? (
                        <span className="text-zinc-100 text-xs font-normal">Pago</span>
                      ) : (
                        <span className="text-zinc-100 text-xs font-normal">Pendente</span>
                      )}
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

          <Fab />
        </>
      )}
    </div>
  );
}
