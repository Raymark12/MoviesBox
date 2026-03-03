import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CommentForm } from "./CommentForm";
import { Provider } from "~/components/ui/provider";

vi.mock("~/services/comments", () => ({
  addComment: vi.fn(),
}));

import { addComment } from "~/services/comments";

function renderWithProvider(ui: React.ReactElement) {
  return render(<Provider>{ui}</Provider>);
}

describe("CommentForm", () => {
  const imdbID = "tt1234567";
  const onCommentAdded = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders comment textarea, rating, name, title inputs and Post button", () => {
    renderWithProvider(
      <CommentForm imdbID={imdbID} onCommentAdded={onCommentAdded} />
    );

    expect(screen.getByPlaceholderText("Add your comments here")).toBeInTheDocument();
    expect(screen.getByText("Rate:")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Anonymous")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Review title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Post" })).toBeInTheDocument();
  });

  it("disables Post button when comment text is empty", () => {
    renderWithProvider(
      <CommentForm imdbID={imdbID} onCommentAdded={onCommentAdded} />
    );

    const button = screen.getByRole("button", { name: "Post" });
    expect(button).toBeDisabled();
  });

  it("enables Post button when comment text is not empty", () => {
    renderWithProvider(
      <CommentForm imdbID={imdbID} onCommentAdded={onCommentAdded} />
    );

    const textarea = screen.getByPlaceholderText("Add your comments here");
    fireEvent.change(textarea, { target: { value: "Great movie!" } });

    expect(screen.getByRole("button", { name: "Post" })).not.toBeDisabled();
  });

  it("calls addComment and onCommentAdded when form is submitted", () => {
    renderWithProvider(
      <CommentForm imdbID={imdbID} onCommentAdded={onCommentAdded} />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Add your comments here"),
      { target: { value: "Great movie!" } }
    );
    fireEvent.click(screen.getByRole("button", { name: "Post" }));

    expect(addComment).toHaveBeenCalledTimes(1);
    expect(addComment).toHaveBeenCalledWith(imdbID, {
      text: "Great movie!",
      rating: undefined,
      title: undefined,
      author: undefined,
    });
    expect(onCommentAdded).toHaveBeenCalledTimes(1);
  });

  it("resets form after submit", () => {
    renderWithProvider(
      <CommentForm imdbID={imdbID} onCommentAdded={onCommentAdded} />
    );

    const textarea = screen.getByPlaceholderText("Add your comments here");
    const nameInput = screen.getByPlaceholderText("Anonymous");
    const titleInput = screen.getByPlaceholderText("Review title");

    fireEvent.change(textarea, { target: { value: "My review" } });
    fireEvent.change(nameInput, { target: { value: "Jane" } });
    fireEvent.change(titleInput, { target: { value: "Loved it" } });
    fireEvent.click(screen.getByRole("button", { name: "Post" }));

    expect(textarea).toHaveValue("");
    expect(nameInput).toHaveValue("");
    expect(titleInput).toHaveValue("");
  });

  it("passes optional name, title and rating to addComment when filled", () => {
    renderWithProvider(
      <CommentForm imdbID={imdbID} onCommentAdded={onCommentAdded} />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Add your comments here"),
      { target: { value: "Comment" } }
    );
    fireEvent.change(screen.getByPlaceholderText("Anonymous"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Review title"), {
      target: { value: "My Title" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Post" }));

    expect(addComment).toHaveBeenCalledWith(imdbID, {
      text: "Comment",
      rating: undefined,
      title: "My Title",
      author: "John",
    });
  });
});
