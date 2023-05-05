import {
  useTheme,
  Modal as ModalComponent,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: Props) {
  const { colors } = useTheme();
  return (
    <ModalComponent onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody px="6" pb="6">
          {children}
        </ModalBody>
      </ModalContent>
    </ModalComponent>
  );
}
