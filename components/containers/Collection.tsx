import { NavBar } from "@/components/layout/NavBar";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Path } from "@/utils/urlHelper";

export default function Collection() {
  const { push } = useRouter();
  const id = Path.get("id");

  return (
    <Box height="100vh">
      <NavBar />
    </Box>
  );
}
