import type {
  MovieSearchResult,
  OmdbSearchResponse,
  MovieDetail,
  OmdbDetailResponse,
} from "~/types";

const API_URL = "https://www.omdbapi.com";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export type SearchResult =
  | { movies: MovieSearchResult[]; totalResults: number; error?: never }
  | { movies: []; totalResults: 0; error: string };

export async function searchMovies(
  query: string,
  page = 1
): Promise<SearchResult> {
  if (!query.trim()) return { movies: [], totalResults: 0 };

  try {
    const url = `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      return { movies: [], totalResults: 0, error: "Failed to search. Please try again." };
    }

    const data: OmdbSearchResponse = await response.json();

    if (data.Response === "False") {
      const message =
        data.Error === "Too many results."
          ? "Too many results. Try adding more letters (e.g. \"marvel\")."
          : data.Error ?? "No results found.";
      return { movies: [], totalResults: 0, error: message };
    }

    const totalResults = parseInt(data.totalResults, 10) || 0;
    return { movies: data.Search, totalResults };
  } catch {
    return { movies: [], totalResults: 0, error: "Failed to connect. Please check your internet." };
  }
}

export type DetailResult =
  | { movie: MovieDetail; error?: never }
  | { movie: null; error: string };

export async function getMovieById(imdbID: string): Promise<DetailResult> {
  try {
    const url = `${API_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`;
    const response = await fetch(url);

    if (!response.ok) {
      return { movie: null, error: "Failed to fetch movie. Please try again." };
    }

    const data: OmdbDetailResponse = await response.json();

    if (data.Response === "False") {
      return { movie: null, error: data.Error ?? "Movie not found." };
    }

    const { Response: _, ...movie } = data;
    return { movie };
  } catch {
    return { movie: null, error: "Failed to connect. Please check your internet." };
  }
}
