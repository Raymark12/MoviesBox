import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MovieBox" },
    { name: "description", content: "Search and review movies" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>MovieBox</h1>
      <p>Movie search coming soon.</p>
    </div>
  );
}
