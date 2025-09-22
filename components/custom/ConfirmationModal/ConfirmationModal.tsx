"use client";

import React, { useState } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => Promise<void> | void;
  onError?: (err: unknown) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  loading?: boolean;
  children?: React.ReactNode;
  loadingText?: string;
}

const SIZE_CLASSES: Record<
  NonNullable<ConfirmationModalProps["size"]>,
  string
> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-2xl",
  full: "sm:max-w-4xl",
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onError,
  title = "Are you sure?",
  description = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  size = "md",
  loading = false,
  loadingText,
  children,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsProcessing(true);
      await onConfirm?.();
      onClose(); // ✅ close only on success
    } catch (error) {
      if (onError) onError(error); // send error to parent
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    if (!isProcessing && !loading) {
      onClose();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isProcessing && !loading) {
      onClose();
    }
  };

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />

        <AlertDialogPrimitive.Content
          className={`fixed left-1/2 top-1/2 w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg ${SIZE_CLASSES[size]}`}
          onEscapeKeyDown={(e) => {
            if (isProcessing || loading) {
              e.preventDefault();
            }
          }}
        >
          <AlertDialogPrimitive.Title className="text-lg font-['Lato'] font-semibold text-gray-900">
            {title}
          </AlertDialogPrimitive.Title>

          <AlertDialogPrimitive.Description className="mt-2 text-sm font-['Lato'] text-gray-600">
            {children || description}
          </AlertDialogPrimitive.Description>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
            {/* Cancel button */}
            <AlertDialogPrimitive.Cancel asChild>
              <Button
                variant={"secondary-gray"}
                onClick={handleCancel}
                disabled={isProcessing || loading}
              >
                {cancelText}
              </Button>
            </AlertDialogPrimitive.Cancel>

            <Button
              isLoading={isProcessing || loading}
              onClick={handleConfirm}
              disabled={isProcessing || loading}
              variant={"primary"}
              isDestructive={variant === "destructive"}
            >
              {isProcessing || loading ? loadingText : confirmText}
            </Button>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default ConfirmationModal;
