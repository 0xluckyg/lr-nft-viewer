import { ModalContext, ModalContextInterface } from "@/providers/ModalContext";

import React from "react";

export function useModal(): ModalContextInterface {
  return React.useContext(ModalContext);
}

export default useModal;
