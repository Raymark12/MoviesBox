import { describe, it, expect, beforeEach } from "vitest";
import { getComments, addComment } from "./comments";

describe("comments service", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const imdbID = "tt1234567";

  describe("getComments", () => {
    it("returns empty array when no comments for movie", () => {
      expect(getComments(imdbID)).toEqual([]);
    });

    it("returns comments sorted by newest first", () => {
      addComment(imdbID, { text: "First", author: "A" });
      addComment(imdbID, { text: "Second", author: "B" });
      addComment(imdbID, { text: "Third", author: "C" });

      const comments = getComments(imdbID);
      expect(comments).toHaveLength(3);
      expect(comments[0].text).toBe("Third");
      expect(comments[1].text).toBe("Second");
      expect(comments[2].text).toBe("First");
    });

    it("returns only comments for the given imdbID", () => {
      addComment(imdbID, { text: "For this movie" });
      addComment("tt9999999", { text: "Other movie" });

      const comments = getComments(imdbID);
      expect(comments).toHaveLength(1);
      expect(comments[0].text).toBe("For this movie");
    });
  });

  describe("addComment", () => {
    it("creates comment with required fields", () => {
      const comment = addComment(imdbID, { text: "Great movie!" });

      expect(comment.imdbID).toBe(imdbID);
      expect(comment.text).toBe("Great movie!");
      expect(comment.author).toBe("Anonymous");
      expect(comment.rating).toBe(0);
      expect(comment.id).toBeDefined();
      expect(comment.createdAt).toBeDefined();
    });

    it("uses provided author", () => {
      const comment = addComment(imdbID, {
        text: "Nice",
        author: "John Doe",
      });
      expect(comment.author).toBe("John Doe");
    });

    it("defaults author to Anonymous when empty string", () => {
      const comment = addComment(imdbID, {
        text: "Nice",
        author: "   ",
      });
      expect(comment.author).toBe("Anonymous");
    });

    it("includes optional title when provided", () => {
      const comment = addComment(imdbID, {
        text: "Body",
        title: "My Review",
      });
      expect(comment.title).toBe("My Review");
    });

    it("omits title when not provided", () => {
      const comment = addComment(imdbID, { text: "Body" });
      expect(comment).not.toHaveProperty("title");
    });

    it("clamps rating to 0 when negative or zero", () => {
      const c1 = addComment(imdbID, { text: "A", rating: 0 });
      const c2 = addComment(imdbID, { text: "B", rating: -1 });
      expect(c1.rating).toBe(0);
      expect(c2.rating).toBe(0);
    });

    it("clamps rating to 5 when above 5", () => {
      const comment = addComment(imdbID, { text: "A", rating: 10 });
      expect(comment.rating).toBe(5);
    });

    it("stores rating 1-5 as given", () => {
      const c3 = addComment(imdbID, { text: "A", rating: 3 });
      expect(c3.rating).toBe(3);
    });

    it("persists comment so getComments returns it", () => {
      addComment(imdbID, { text: "Persisted", author: "Me" });
      const comments = getComments(imdbID);
      expect(comments).toHaveLength(1);
      expect(comments[0].text).toBe("Persisted");
      expect(comments[0].author).toBe("Me");
    });

    it("trims text", () => {
      const comment = addComment(imdbID, { text: "  trimmed  " });
      expect(comment.text).toBe("trimmed");
    });
  });
});
