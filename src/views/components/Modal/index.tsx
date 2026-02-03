import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/views/components/ui/dialog.tsx';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  children: ReactNode;
  rightAction?: ReactNode;
  trigger?: ReactNode;
}

export function Modal({ open, children, onClose, title, rightAction, trigger }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {trigger}
      <DialogContent className="rounded-2xl max-w-[90%] md:max-w-[30%] bg-zinc-950 border border-zinc-800 max-h-[90%] overflow-y-auto">
        <DialogHeader className="h-12 flex flex-row items-center justify-between text-zinc-300">
          <DialogTitle className="text-lg tracking-[-1px] font-bold">{title}</DialogTitle>
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center">{rightAction}</div>
            <button
              type="button"
              className="w-12 h-12 flex items-center justify-center outline-none p-1 hover:bg-zinc-900 rounded-full transition-colors"
              onClick={onClose}
            >
              <Cross2Icon className="w-6 h-6" />
            </button>
          </div>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
