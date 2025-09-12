/* eslint-disable no-unused-vars */
import { Modal } from '@/views/components/Modal';
import { Button } from '@/views/components/ui/button.tsx';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useFiltersModal } from '@/views/pages/Dashboard/components/Modals/FiltersModal/useFiltersModal.ts';
import { cn } from '@/lib/utils.ts';
import { FilterIcon } from '@/views/components/icons/FilterIcon.tsx';
import { NotificationBadge } from '@/views/components/ui/notification-badge.tsx';

interface FiltersModalProps {
  open: boolean;
  onClose?: () => void;
  onApplyFilters(filters: {
    bankAccountId?: string | undefined;
    year: number;
    isPaid?: boolean | undefined;
  }): void;
  handleOpenFiltersModal: () => void;
}

export function FiltersModal({
  open,
  onClose,
  onApplyFilters,
  handleOpenFiltersModal,
}: FiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts,
    handleUpdateCountFilters,
    countSelectedFilters,
    handleClearFilters,
    openNewAccountModal,
    selectedType,
    handleSelectTypeTransaction,
  } = useFiltersModal();

  return (
    <Modal
      open={open}
      title="Filtros"
      onClose={onClose}
      trigger={
        <NotificationBadge label={countSelectedFilters} show={countSelectedFilters > 0}>
          <Button
            type="button"
            variant="outline"
            className="p-3 h-auto rounded-md"
            onClick={handleOpenFiltersModal}
          >
            <FilterIcon />
          </Button>
        </NotificationBadge>
      }
      rightAction={
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
        <span
          role="button"
          className="text-zinc-100 font-medium hover:bg-zinc-800 transition-colors px-2 py-1 rounded-2xl"
          onClick={() => {
            handleClearFilters();
            onApplyFilters({
              year: new Date().getFullYear(),
            });
          }}
        >
          Limpar
        </span>
      }
    >
      <div>
        <span className="text-lg trackinh-[-1px] font-bold text-zinc-100">Conta</span>

        <div className="space-y-2 mt-2">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <Button
                key={account.id}
                variant="secondary"
                type="button"
                className={cn(
                  'rounded-2xl justify-start text-left text-zinc-100 hover:bg-zinc-800 bg-transparent shadow-none font-normal',
                  account.id === selectedBankAccountId && '!bg-zinc-800',
                )}
                onClick={() => handleSelectBankAccount(account.id)}
              >
                {account.name}
              </Button>
            ))
          ) : (
            <span className="text-sm text-gray-600">
              Nenhuma conta cadastrada. Cadastre uma{' '}
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span className="underline cursor-pointer" onClick={openNewAccountModal}>
                aqui.
              </span>
            </span>
          )}
        </div>
      </div>

      <div>
        <span className="text-lg trackinh-[-1px] font-bold text-zinc-100">Tipo</span>

        <div className="mt-2 flex gap-2 items-center justify-center">
          <Button
            variant="secondary"
            type="button"
            className={cn(
              'rounded-2xl text-zinc-100 hover:bg-zinc-800 bg-transparent shadow-none font-normal',
              selectedType === 'all' && '!bg-zinc-800',
            )}
            onClick={() => handleSelectTypeTransaction('all')}
          >
            Todas
          </Button>

          <Button
            variant="secondary"
            type="button"
            className={cn(
              'rounded-2xl text-zinc-100 hover:bg-zinc-800 bg-transparent shadow-none font-normal',
              selectedType === 'paid' && '!bg-zinc-800',
            )}
            onClick={() => handleSelectTypeTransaction('paid')}
          >
            Pagas
          </Button>

          <Button
            variant="secondary"
            type="button"
            className={cn(
              'rounded-2xl text-zinc-100 hover:bg-zinc-800 bg-transparent shadow-none font-normal',
              selectedType === 'unpaid' && '!bg-zinc-800',
            )}
            onClick={() => handleSelectTypeTransaction('unpaid')}
          >
            Não pagas
          </Button>
        </div>
      </div>

      <div className="mt-10 text-zinc-100">
        <span className="text-lg trackinh-[-1px] font-bold ">Ano</span>

        <div className="mt-2 w-52 flex items-center justify-between gap-4">
          <Button
            onClick={() => handleChangeYear(-1)}
            variant="secondary"
            className="w-12 h-12 flex items-center justify-center bg-transparent rounded-full shadow-none hover:bg-zinc-900"
          >
            <ChevronLeftIcon className="w-6 h-6 text-zinc-100" />
          </Button>
          <div className="flex-1 text-center">
            <span className="tet-sm font-medium tracking-[-0.5px]">{selectedYear}</span>
          </div>
          <Button
            onClick={() => handleChangeYear(+1)}
            variant="secondary"
            className="w-12 h-12 flex items-center justify-center bg-transparent rounded-full shadow-none hover:bg-zinc-900"
          >
            <ChevronRightIcon className="w-6 h-6 text-zinc-100" />
          </Button>
        </div>
      </div>

      <Button
        onClick={() => {
          onApplyFilters({
            bankAccountId: selectedBankAccountId || undefined,
            year: selectedYear,
            isPaid: selectedType === 'paid' ? true : selectedType === 'all' ? undefined : false,
          });
          handleUpdateCountFilters();
        }}
      >
        Aplicar Filtros
      </Button>
    </Modal>
  );
}
