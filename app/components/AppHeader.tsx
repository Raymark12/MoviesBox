import { Box, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router";

export function AppHeader() {
  return (
    <Box mb="8">
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "1.5rem",
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
        }}
        aria-label="MovieBox home"
      >
        <Image
          src="/images/tv.png"
          alt="MovieBox logo"
          width="50px"
          height="50px"
        />
        <Heading
          as="h1"
          fontSize="24px"
          fontWeight="bold"
          lineHeight="24px"
          color="text.primary"
        >
          MovieBox
        </Heading>
      </Link>
    </Box>
  );
}
