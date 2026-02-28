import { useState, useEffect } from "react";
import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router";
import { IoMdArrowBack } from "react-icons/io";
import type { Route } from "./+types/movie";
import { getMovieById } from "~/services/omdb";
import type { MovieDetail } from "~/types";

const PLACEHOLDER_POSTER = "/images/tv.png";

function valueOrHide(value: string): string | null {
  if (!value || value.trim() === "" || value === "N/A") return null;
  return value;
}

function commaList(items: string): string[] {
  return items
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

type MovieLoaderData = { movie: MovieDetail | null; error: string | null };

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const imdbId = params.imdbId ?? "";
  const result = await getMovieById(imdbId);
  if (result.error) {
    return { movie: null, error: result.error };
  }
  return { movie: result.movie, error: null };
}

export default function Movie() {
  const loaderData = useLoaderData() as MovieLoaderData | undefined;
  const navigate = useNavigate();
  const movie = loaderData?.movie ?? null;
  const error = loaderData?.error ?? null;

  const hasPoster =
    movie?.Poster && movie.Poster.trim() !== "" && movie.Poster !== "N/A";
  const posterUrl = hasPoster ? movie!.Poster : PLACEHOLDER_POSTER;
  const [posterError, setPosterError] = useState(false);
  const poster = posterError ? PLACEHOLDER_POSTER : posterUrl;

  useEffect(() => {
    setPosterError(false);
  }, [movie?.imdbID]);

  const runtimeRated =
    movie &&
    [valueOrHide(movie.Runtime), valueOrHide(movie.Rated)]
      .filter(Boolean)
      .join(" - ");
  const hasYear = movie ? valueOrHide(movie.Year) : null;

  return (
    <Box maxW="1200px" mx="auto" px="6" py="10">
      <Box display="flex" alignItems="center" gap="6" mb="8">
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
      </Box>
      <Box
        as="button"
        onClick={() => navigate(-1)}
        color="text.secondary"
        mb="2"
        p="0"
        bg="transparent"
        border="none"
        cursor="pointer"
        aria-label="Back to previous page"
        _hover={{
          color: "text.highlight",
          "& > *": { transform: "scale(1.15)" },
        }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "brand.primary",
          outlineOffset: "2px",
        }}
      >
        <Box as="span" display="inline-block" transition="transform 0.2s">
          <IoMdArrowBack size={32} />
        </Box>
      </Box>

      {error && <Text color="text.negative">{error}</Text>}
      {!error && !movie && <Text color="text.secondary">Loading…</Text>}
      {!error && movie && (
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ md: "flex-start" }}
          gap={{ base: "4", md: "6" }}
        >
          <Box
            flexShrink={0}
            width={{ base: "100%", md: "377px" }}
            maxW={{ base: "100%", md: "377px" }}
            aspectRatio="377/558"
            borderRadius="5px"
            overflow="hidden"
            bg="bg.card"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
          >
            <Image
              src={poster}
              alt={movie.Title}
              width="100%"
              height="100%"
              objectFit="cover"
              onError={() => setPosterError(true)}
            />
          </Box>
          <Box
            flex="1"
            minW="0"
            width={{ base: "100%", md: "0" }}
            textAlign="left"
            height={{ base: "auto", md: "558px" }}
            maxHeight={{ md: "558px" }}
            overflowY={{ md: "auto" }}
            overflowX="hidden"
            display="block"
          >
            <Text
              as="h2"
              fontSize={{ base: "30", md: "67" }}
              fontWeight="bold"
              color="text.primary"
              mb="1"
              lineHeight="1.2"
              mt="-3"
              wordBreak="break-word"
            >
              {movie.Title}
            </Text>
            {(hasYear || runtimeRated) && (
              <Text color="text.secondary" fontSize="14" mb="4">
                {[hasYear, runtimeRated].filter(Boolean).join(" - ")}
              </Text>
            )}
            {valueOrHide(movie.imdbRating) && (
              <Box mb="4" display="flex" alignItems="center">
                <Box display="flex" alignItems="center" gap="2">
                  <Image
                    src="/images/imdb-icon.svg"
                    alt="IMDb"
                    width="64px"
                    height="32px"
                    borderRadius="5px"
                  />
                  <Text
                    color="text.primary"
                    fontWeight="medium"
                    fontSize="24px"
                    lineHeight="100%"
                  >
                    {movie.imdbRating}
                  </Text>
                </Box>
                <Text
                  color="text.primary"
                  fontWeight="regular"
                  fontSize="16px"
                  lineHeight="100%"
                  transform="translateY(3px)"
                >
                  /10
                </Text>
              </Box>
            )}

            {valueOrHide(movie.Plot) && (
              <Box mb="4">
                <Text
                  color="text.secondary"
                  fontWeight="semibold"
                  fontSize="18"
                  lineHeight="100%"
                  mb="1"
                >
                  Overview
                </Text>
                <Text color="text.primary" fontSize="14" lineHeight="tall">
                  {movie.Plot}
                </Text>
              </Box>
            )}
            <SimpleGrid columns={{ base: 2, md: 4 }} gap="4">
              {valueOrHide(movie.Actors) && (
                <Box>
                  <Text
                    color="text.secondary"
                    fontWeight="semibold"
                    fontSize="18"
                    lineHeight="100%"
                    mb="1"
                  >
                    Cast
                  </Text>
                  <Box as="ul" listStyleType="none" p="0" m="0">
                    {commaList(movie.Actors).map((name) => (
                      <Text
                        key={name}
                        as="li"
                        color="text.primary"
                        fontSize="14"
                        mb="0.5"
                      >
                        {name}
                      </Text>
                    ))}
                  </Box>
                </Box>
              )}
              {valueOrHide(movie.Genre) && (
                <Box>
                  <Text
                    color="text.secondary"
                    fontWeight="semibold"
                    fontSize="18"
                    lineHeight="100%"
                    mb="1"
                  >
                    Genre
                  </Text>
                  <Box as="ul" listStyleType="none" p="0" m="0">
                    {commaList(movie.Genre).map((item) => (
                      <Text
                        key={item}
                        as="li"
                        color="text.primary"
                        fontSize="14"
                        mb="0.5"
                      >
                        {item}
                      </Text>
                    ))}
                  </Box>
                </Box>
              )}
              {valueOrHide(movie.Director) && (
                <Box>
                  <Text
                    color="text.secondary"
                    fontWeight="semibold"
                    fontSize="18"
                    lineHeight="100%"
                    mb="1"
                  >
                    Director
                  </Text>
                  <Box as="ul" listStyleType="none" p="0" m="0">
                    {commaList(movie.Director).map((name) => (
                      <Text
                        key={name}
                        as="li"
                        color="text.primary"
                        fontSize="14"
                        mb="0.5"
                      >
                        {name}
                      </Text>
                    ))}
                  </Box>
                </Box>
              )}
              {valueOrHide(movie.Writer) && (
                <Box>
                  <Text
                    color="text.secondary"
                    fontWeight="semibold"
                    fontSize="18"
                    lineHeight="100%"
                    mb="1"
                  >
                    Writers
                  </Text>
                  <Box as="ul" listStyleType="none" p="0" m="0">
                    {commaList(movie.Writer).map((name) => (
                      <Text
                        key={name}
                        as="li"
                        color="text.primary"
                        fontSize="14"
                        mb="0.5"
                      >
                        {name}
                      </Text>
                    ))}
                  </Box>
                </Box>
              )}
            </SimpleGrid>
          </Box>
        </Box>
      )}
    </Box>
  );
}
