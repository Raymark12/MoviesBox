import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("movie/:imdbId", "routes/movie.tsx"),
] satisfies RouteConfig;
