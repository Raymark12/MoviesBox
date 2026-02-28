import { Tag } from "@chakra-ui/react";

export function TvSeriesTag() {
  return (
    <Tag.Root
      display="flex"
      alignItems="center"
      variant="subtle"
      bg="rgba(255, 255, 255, 0.7)"
      color="black"
      fontWeight="semibold"
      textTransform="uppercase"
      borderRadius="full"
      size="sm"
      px="3"
      py="1"
      borderWidth="0"
      boxShadow="0 1px 4px rgba(0, 0, 0, 0.25)"
      _focusVisible={{
        outline: "none",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Tag.Label>TV Series</Tag.Label>
    </Tag.Root>
  );
}
