import { ConfirmationModal } from "@/components/custom/ConfirmationModal";
import { useState, useCallback } from "react";

export function useConfirmationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const withConfirm = useCallback(
    async (
      fn?: () => Promise<void> | void,
      onError?: (err: unknown) => void
    ) => {
      if (!fn) {
        close();
        return;
      }

      try {
        const result = fn();

        if (result instanceof Promise) {
          setLoading(true);
          await result;
          close();
        } else {
          close();
        }
      } catch (error) {
        if (onError) onError(error);
      } finally {
        setLoading(false);
      }
    },
    [close]
  );

  const ConfirmModal = useCallback(
    (
      props: Omit<
        React.ComponentProps<typeof ConfirmationModal>,
        "isOpen" | "onClose" | "loading"
      > & {
        onError?: (err: unknown) => void;
      }
    ) => (
      <ConfirmationModal
        {...props}
        isOpen={isOpen}
        onClose={close}
        loading={loading}
        onConfirm={() => withConfirm(props.onConfirm, props.onError)}
      />
    ),
    [isOpen, close, loading, withConfirm]
  );

  return { open, close, ConfirmModal };
}
