import { Button, ButtonProps, useTheme } from "@chakra-ui/react";

export default function CustomButton(props: ButtonProps) {
  const { colors } = useTheme();

  return (
    <Button
      bg={colors.primary.main}
      color={colors.white}
      _hover={{ bg: `${colors.primary.dark}` }}
      _active={{ bg: `${colors.primary.light}` }}
      _focus={{
        outline: "none",
        // boxShadow: `0 0 0 3px ${colors.primary.dark}`,
      }}
      {...props}
    />
  );
}

export function TextButton(props: ButtonProps) {
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
