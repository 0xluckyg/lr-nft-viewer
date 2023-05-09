import WalletConnectorModal from "@/components/ui/WalletConnectorModal";
import { useCallback } from "react";
import { useModal } from "@/hooks/useModal";

export function useWalletConnectorDialog() {
  const { open, close } = useModal();
  return useCallback(() => {
    open(<WalletConnectorModal onClose={close} />);
  }, [open, close]);
}
