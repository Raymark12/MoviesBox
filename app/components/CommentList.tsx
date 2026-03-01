import { Box, RatingGroup, Text } from "@chakra-ui/react";
import type { Comment } from "~/services/comments";

type CommentListProps = {
  comments: Comment[];
};

function displayTitleCase(s: string): string {
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function capitalizeFirstLetter(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <Box
      as="ul"
      listStyleType="none"
      p="0"
      m="0"
      display="flex"
      flexDirection="column"
      gap="4"
    >
      {comments.length === 0 && (
        <Text color="text.secondary" fontSize="14">
          No comments yet. Be the first to share your thoughts!
        </Text>
      )}
      {comments.map((c) => (
        <Box key={c.id} as="li" py="3">
          <Box
            display="flex"
            alignItems="center"
            gap="2"
            mb="1"
            flexWrap="wrap"
          >
            <Text color="text.secondary" fontSize="18" fontWeight="semibold">
              {displayTitleCase(c.author)}
            </Text>
            {c.rating > 0 && (
              <RatingGroup.Root
                count={5}
                value={c.rating}
                readOnly
                size="xs"
                colorPalette="orange"
              >
                <RatingGroup.Control />
              </RatingGroup.Root>
            )}
            <Text
              as="span"
              color="text.secondary"
              fontSize="18"
              fontWeight="semibold"
            >
              –
            </Text>
            <Text color="text.secondary" fontSize="18" fontWeight="semibold">
              {new Date(c.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </Box>
          {c.title && (
            <Text
              color="text.primary"
              fontSize="18"
              fontWeight="semibold"
              mb="1"
            >
              {capitalizeFirstLetter(c.title)}
            </Text>
          )}
          <Text
            color="text.primary"
            fontSize="14"
            lineHeight="tall"
            whiteSpace="pre-wrap"
          >
            {capitalizeFirstLetter(c.text)}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
