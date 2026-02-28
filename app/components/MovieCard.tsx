import { useState, useEffect, useRef, memo } from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import type { MovieSearchResult } from "~/types";
import { isFavorite } from "~/services/favorites";
import { TvSeriesTag } from "~/components/TvSeriesTag";
import { FavoriteHeart } from "~/components/FavoriteHeart";

const PLACEHOLDER_POSTER = "/images/tv.png";

function MovieCardComponent({ movie }: { movie: MovieSearchResult }) {
  const hasPoster =
    movie.Poster && movie.Poster.trim() !== "" && movie.Poster !== "N/A";
  const posterUrl = hasPoster ? movie.Poster : PLACEHOLDER_POSTER;
  const [posterError, setPosterError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const poster = posterError ? PLACEHOLDER_POSTER : posterUrl;
  const favorite = isFavorite(movie.imdbID);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setPosterError(false);
    setImageLoaded(false);
  }, [movie.imdbID]);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, [poster]);

  return (
    <Box
      position="relative"
      borderRadius="lg"
      overflow="hidden"
      bg="bg.card"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
    >
      <Box
        asChild
        display="block"
        textDecoration="none"
        _hover={{ opacity: 0.8 }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "brand.primary",
          outlineOffset: "2px",
          borderRadius: "lg",
        }}
        transition="opacity 0.2s"
      >
        <Link to={`/movie/${movie.imdbID}`}>
          <Image
            ref={imgRef}
            src={poster}
            alt={movie.Title}
            width="100%"
            height="auto"
            aspectRatio="2/3"
            objectFit="cover"
            loading="lazy"
            opacity={imageLoaded ? 1 : 0}
            transition="opacity 0.25s ease-out"
            onLoad={() => setImageLoaded(true)}
            onError={() => setPosterError(true)}
          />

          <Box
            position="absolute"
            top="3"
            left={{ base: "3", md: "4" }}
            right={{ base: "3", md: "4" }}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={{
              base: "flex-end",
              md: movie.Type === "series" ? "space-between" : "flex-end",
            }}
            alignItems={{ base: "flex-end", md: "flex-start" }}
            gap="2"
          >
            {movie.Type === "series" && <TvSeriesTag />}

            <FavoriteHeart isFavorite={favorite} />
          </Box>

          <Box p="3" pt="2">
            <Text
              fontWeight="semibold"
              fontSize={{ base: "14", md: "16" }}
              truncate
              title={movie.Title}
            >
              {movie.Title}
            </Text>
            <Text color="text.secondary" fontSize={{ base: "12", md: "14" }}>
              {movie.Year}
            </Text>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}

export const MovieCard = memo(MovieCardComponent);
