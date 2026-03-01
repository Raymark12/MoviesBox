const STORAGE_KEY = "moviebox_comments";

export type Comment = {
  id: string;
  imdbID: string;
  text: string;
  rating: number;
  title?: string;
  author: string;
  createdAt: string;
};

type StoredComments = Record<string, Comment[]>;

function getStored(): StoredComments {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStored(data: StoredComments): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    // console.log only for development
    console.error("Failed to persist comments to localStorage:", error);
  }
}

export function getComments(imdbID: string): Comment[] {
  const data = getStored();
  const list = data[imdbID] ?? [];
  return [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addComment(
  imdbID: string,
  payload: { text: string; rating?: number; title?: string; author?: string }
): Comment {
  const data = getStored();
  const list = data[imdbID] ?? [];
  const raw = Math.round(payload.rating ?? 0);
  const rating = raw < 1 ? 0 : Math.min(5, raw);
  const author = (payload.author ?? "Anonymous").trim() || "Anonymous";
  const text = payload.text.trim();
  const titleTrimmed = payload.title?.trim();
  const comment: Comment = {
    id: crypto.randomUUID(),
    imdbID,
    text,
    rating,
    ...(titleTrimmed && { title: titleTrimmed }),
    author,
    createdAt: new Date().toISOString(),
  };
  data[imdbID] = [comment, ...list];
  setStored(data);
  return comment;
}
