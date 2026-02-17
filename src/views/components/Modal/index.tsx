import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/views/components/ui/dialog.tsx';
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
      <DialogContent className="rounded-2xl max-w-[90%] md:max-w-[30%] bg-background border border-border max-h-[90%] overflow-y-auto">
        <DialogHeader className="h-12 flex flex-row items-center justify-between text-muted-foreground">
          <DialogTitle className="text-lg tracking-[-1px] font-bold">{title}</DialogTitle>
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center">{rightAction}</div>
          </div>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
