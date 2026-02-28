export type MovieSearchResult = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type OmdbSearchResponse =
  | { Response: "True"; Search: MovieSearchResult[]; totalResults: string }
  | { Response: "False"; Error: string };
