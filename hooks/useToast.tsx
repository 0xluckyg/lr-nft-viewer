import { UseToastOptions, useToast } from "@chakra-ui/react";

const useAppToast = () => {
  const toast = useToast();

  const showAppToast = (options: UseToastOptions) => {
    toast({
      colorScheme: "teal",
      position: "bottom",
      duration: 2000,
      isClosable: true,
      ...options,
    });
  };

  return showAppToast;
};

export default useAppToast;
