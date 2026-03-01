import { useState } from "react";
import {
  Box,
  Button,
  Input,
  RatingGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { addComment, type AddCommentPayload } from "~/services/comments";

type CommentFormProps = {
  imdbID: string;
  onCommentAdded: () => void;
};

export function CommentForm({ imdbID, onCommentAdded }: CommentFormProps) {
  const [commentText, setCommentText] = useState("");
  const [commentRating, setCommentRating] = useState(0);
  const [commentTitle, setCommentTitle] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const payload: AddCommentPayload = {
      text: commentText,
      rating: commentRating || undefined,
      title: commentTitle || undefined,
      author: commentAuthor || undefined,
    };
    addComment(imdbID, payload);

    onCommentAdded();
    setCommentText("");
    setCommentRating(0);
    setCommentTitle("");
    setCommentAuthor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap="4" mb="6">
        <Box display="flex" alignItems="center" gap="2">
          <RatingGroup.Root
            count={5}
            value={commentRating}
            onValueChange={(d) => setCommentRating(d.value ?? 0)}
            size="md"
            colorPalette="orange"
            gap="2"
          >
            <RatingGroup.Label>
              <Text
                color="text.secondary"
                fontSize="18"
                fontWeight="semibold"
                lineHeight="100%"
                as="span"
              >
                Rate:
              </Text>
            </RatingGroup.Label>
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
        </Box>
        <Box display="flex" flexDirection="row" gap="4" flexWrap="wrap">
          <Box
            display="flex"
            flexDirection="column"
            gap="1"
            flex="1"
            minW="140px"
            maxW={{ base: "100%", md: "200px" }}
          >
            <label htmlFor="comment-author">
              <Text color="text.secondary" fontSize="14" as="span">
                Name (optional)
              </Text>
            </label>
            <Input
              id="comment-author"
              placeholder="Anonymous"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              bg="white"
              borderColor="grey.border"
              color="grey.dark"
              fontSize="14"
              _placeholder={{ color: "grey.light" }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap="1"
            flex="1"
            minW="140px"
            maxW={{ base: "100%", md: "240px" }}
          >
            <label htmlFor="comment-title">
              <Text color="text.secondary" fontSize="14" as="span">
                Title (optional)
              </Text>
            </label>
            <Input
              id="comment-title"
              placeholder="Review title"
              value={commentTitle}
              onChange={(e) => setCommentTitle(e.target.value)}
              bg="white"
              borderColor="grey.border"
              color="grey.dark"
              fontSize="14"
              _placeholder={{ color: "grey.light" }}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="1">
          <Textarea
            id="comment-text"
            placeholder="Add your comments here"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            bg="white"
            borderColor="grey.border"
            color="grey.dark"
            _placeholder={{ color: "grey.light" }}
            resize="vertical"
            aria-label="Comment"
          />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            w={{ base: "100%", md: "125px" }}
            h="45px"
            bg="brand.tertiary"
            color="white"
            fontSize={{ base: "16", md: "14" }}
            _hover={{ opacity: 0.9 }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
            disabled={!commentText.trim()}
          >
            Post
          </Button>
        </Box>
      </Box>
    </form>
  );
}
