import { Button, ButtonProps, useTheme } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  onClick?: () => void;
}

export default function CustomButton(props: CustomButtonProps) {
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
