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

export type OmdbRating = {
  Source: string;
  Value: string;
};

export type MovieDetail = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings?: OmdbRating[];
  Metascore?: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
};

export type OmdbDetailResponse =
  | (MovieDetail & { Response: "True" })
  | { Response: "False"; Error: string };
