import { Button, ButtonProps, useTheme } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function CustomButton(props: CustomButtonProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <Button
      bg={colors.primary.main}
      color={colors.white}
      _hover={{ bg: `${colors.primary.dark}` }}
      _active={{ bg: `${colors.primary.light}` }}
      _focus={{
        outline: "none",
      }}
      {...props}
    />
  );
}

export function TextButton(props: CustomButtonProps) {
  return (
    <Button
      variant="ghost"
      fontWeight="normal"
      fontSize="md"
      _hover={{ bg: "transparent", textDecoration: "underline" }}
      {...props}
    />
  );
}
