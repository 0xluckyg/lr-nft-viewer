import { ModalContext } from "@/providers/ModalContext";
import React from "react";

export function useModal() {
  return React.useContext(ModalContext);
}

export default useModal;
