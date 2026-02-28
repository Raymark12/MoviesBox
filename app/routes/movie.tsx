import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export default function Movie() {
  return (
    <Box maxW="1200px" mx="auto" px="6" py="10">
      <Text color="text.secondary">Movie detail coming soon.</Text>
      <Link to="/">
        <Text color="text.highlight" mt="4">
          Back to search
        </Text>
      </Link>
    </Box>
  );
}
