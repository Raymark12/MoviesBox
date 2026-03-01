import {
  Box,
  Button,
  ButtonGroup,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useNavigation, useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import { AppHeader } from "~/components/AppHeader";
import { SearchBar } from "~/components/SearchBar";
import { MovieCard } from "~/components/MovieCard";
import { searchMovies } from "~/services/omdb";

const RESULTS_PER_PAGE = 10;

export function meta({ loaderData }: Route.MetaArgs) {
  const query = loaderData?.query ?? "";
  const title = query ? `MovieBox – ${query}` : "MovieBox";
  const description = query
    ? `Search results for ${query}`
    : "Search and review movies";
  return [{ title }, { name: "description", content: description }];
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";
  const page = Math.max(
    1,
    parseInt(url.searchParams.get("page") ?? "1", 10) || 1,
  );
  const result = await searchMovies(query, page);
  return {
    movies: result.movies,
    query,
    error: result.error,
    totalResults: result.totalResults,
    page,
    totalPages: result.totalResults
      ? Math.ceil(result.totalResults / RESULTS_PER_PAGE)
      : 0,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { movies, query, error, totalResults, page, totalPages } = loaderData;
  const [, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const nextPath = navigation.location?.pathname ?? "/";
  const isStayingOnHome = nextPath === "/" || nextPath === "";
  const isSearching = navigation.state === "loading" && isStayingOnHome;
  const nextParams = new URLSearchParams(navigation.location?.search ?? "");
  const isQueryChanging = isSearching && (nextParams.get("q") ?? "") !== query;

  return (
    <Box maxW="1200px" mx="auto" px="6" py="10">
      <AppHeader />
      <SearchBar />

      <Box mt="8">
        {!query && (
          <Box textAlign="center" py="20">
            <Image
              src="/images/placeholder-search.png"
              alt="Search for movies"
              maxW="442px"
              w="100%"
              mx="auto"
              mb="4"
            />
            <Text fontWeight="semibold" fontSize="30" color="text.primary">
              Don't know what to search?
            </Text>
            <Text fontWeight="semibold" fontSize="18" color="text.secondary">
              Here's an offer you can't refuse
            </Text>
          </Box>
        )}

        {isSearching && query && (
          <Box>
            <Skeleton
              height="20px"
              width="200px"
              mb="4"
              borderRadius="md"
              bg="bg.card"
            />
            <SimpleGrid columns={{ base: 2, md: 5 }} gap="5">
              {Array.from({ length: RESULTS_PER_PAGE }).map((_, i) => (
                <Box
                  key={i}
                  borderRadius="lg"
                  overflow="hidden"
                  bg="bg.card"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                >
                  <Skeleton
                    aspectRatio="2/3"
                    width="100%"
                    borderRadius="0"
                    bg="bg.card"
                  />
                  <Box p="3" pt="2">
                    <Skeleton
                      height="16px"
                      mb="2"
                      borderRadius="md"
                      bg="bg.muted"
                    />
                    <Skeleton
                      height="14px"
                      width="40%"
                      borderRadius="md"
                      bg="bg.muted"
                    />
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
            <Box mt="8" display="flex" justifyContent="flex-end" w="100%">
              <ButtonGroup gap="2">
                <Button size="sm" disabled />
                <Button size="sm" disabled />
              </ButtonGroup>
            </Box>
          </Box>
        )}

        {query && !isSearching && movies.length === 0 && !error && (
          <Text color="text.secondary" textAlign="center" py="20">
            No results found for &ldquo;{query}&rdquo;.
          </Text>
        )}

        {error && !isSearching && (
          <Text
            color="text.negative"
            textAlign="center"
            py="20"
            fontWeight="medium"
          >
            {error}
          </Text>
        )}

        {movies.length > 0 && !isQueryChanging && !isSearching && (
          <Box>
            <Text color="text.secondary" fontSize="14" mb="4">
              {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;
              {query}&rdquo;
              {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
            </Text>
            <SimpleGrid columns={{ base: 2, md: 5 }} gap="5">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </SimpleGrid>
            {totalPages > 1 && (
              <Box mt="8" display="flex" justifyContent="flex-end" w="100%">
                <ButtonGroup gap="2">
                  <Button
                    size="sm"
                    bg="brand.primary"
                    color="white"
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                    transition="background 0.2s, opacity 0.2s"
                    _hover={{ bg: "brand.primaryHover" }}
                    _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                    disabled={page <= 1}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setSearchParams((p) => ({
                        ...Object.fromEntries(p),
                        page: String(page - 1),
                      }));
                    }}
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    bg="brand.primary"
                    color="white"
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                    transition="background 0.2s, opacity 0.2s"
                    _hover={{ bg: "brand.primaryHover" }}
                    _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                    disabled={page >= totalPages}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setSearchParams((p) => ({
                        ...Object.fromEntries(p),
                        page: String(page + 1),
                      }));
                    }}
                  >
                    Next
                  </Button>
                </ButtonGroup>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
