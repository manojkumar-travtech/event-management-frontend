export type ConfirmationModalVariant = "default" | "destructive";
export type ConfirmationModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  onError?: (err: unknown) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmationModalVariant;
  size?: ConfirmationModalSize;
  loading?: boolean;
  children?: React.ReactNode;
}
