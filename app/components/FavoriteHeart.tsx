import { Box, Text } from "@chakra-ui/react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

type FavoriteHeartProps = {
  isFavorite: boolean;
  onToggle?: () => void;
  showLabel?: boolean;
};

export function FavoriteHeart({
  isFavorite,
  onToggle,
  showLabel,
}: FavoriteHeartProps) {
  const label = isFavorite ? "In your favorites" : "Add to favorites";

  const heartBox = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="8"
      h="8"
      flexShrink={0}
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.7)"
      color={isFavorite ? "brand.secondary" : "grey.dark"}
      boxShadow="0 1px 4px rgba(0, 0, 0, 0.25)"
    >
      <Box
        as="span"
        display="inline-flex"
        filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))"
      >
        {isFavorite ? <IoMdHeart size={20} /> : <IoMdHeartEmpty size={20} />}
      </Box>
    </Box>
  );

  if (onToggle && showLabel) {
    return (
      <Box
        as="button"
        display="flex"
        alignItems="center"
        gap="2"
        bg="transparent"
        border="none"
        cursor="pointer"
        p="0"
        aria-label={label}
        _hover={{ opacity: 0.9 }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "brand.primary",
          outlineOffset: "2px",
        }}
        onClick={onToggle}
      >
        {heartBox}
        <Text
          color="text.secondary"
          fontSize="14"
          fontWeight="medium"
          whiteSpace="nowrap"
        >
          {label}
        </Text>
      </Box>
    );
  }

  if (onToggle) {
    return (
      <Box
        as="button"
        cursor="pointer"
        border="none"
        bg="transparent"
        p="0"
        aria-label={label}
        _hover={{ opacity: 0.9 }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "brand.primary",
          outlineOffset: "2px",
        }}
        onClick={onToggle}
      >
        {heartBox}
      </Box>
    );
  }

  return <Box aria-label={label}>{heartBox}</Box>;
}
