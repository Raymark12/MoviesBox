import { describe, it, expect, beforeEach } from "vitest";
import {
  getFavorites,
  toggleFavorite,
  isFavorite,
} from "./favorites";

describe("favorites service", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("getFavorites", () => {
    it("returns empty array when no favorites stored", () => {
      expect(getFavorites()).toEqual([]);
    });

    it("returns stored favorites", () => {
      localStorage.setItem(
        "moviebox_favorites",
        JSON.stringify(["tt123", "tt456"])
      );
      expect(getFavorites()).toEqual(["tt123", "tt456"]);
    });

    it("returns empty array when stored data is invalid JSON", () => {
      localStorage.setItem("moviebox_favorites", "invalid json");
      expect(getFavorites()).toEqual([]);
    });
  });

  describe("toggleFavorite", () => {
    it("adds a favorite when not in list", () => {
      toggleFavorite("tt1234567");
      expect(isFavorite("tt1234567")).toBe(true);
      expect(getFavorites()).toEqual(["tt1234567"]);
    });

    it("removes a favorite when already in list", () => {
      toggleFavorite("tt1234567");
      toggleFavorite("tt1234567");
      expect(isFavorite("tt1234567")).toBe(false);
      expect(getFavorites()).toEqual([]);
    });

    it("keeps other favorites when removing one", () => {
      toggleFavorite("tt111");
      toggleFavorite("tt222");
      toggleFavorite("tt111");
      expect(getFavorites()).toEqual(["tt222"]);
    });
  });

  describe("isFavorite", () => {
    it("returns false when id is not in favorites", () => {
      expect(isFavorite("tt999")).toBe(false);
    });

    it("returns true when id is in favorites", () => {
      toggleFavorite("tt999");
      expect(isFavorite("tt999")).toBe(true);
    });
  });
});
