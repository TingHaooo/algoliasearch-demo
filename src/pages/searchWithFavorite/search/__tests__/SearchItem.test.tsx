import { fireEvent, render, screen } from "@testing-library/react";
import { IArticle } from "../../../../hooks/useAlgoArticles";
import SearchItem from "../SearchItem";

const fakeArticle: IArticle = {
  author_name: "Jon Snow",
  categories: ["react", "redux"],
  objectID: "123456",
  title: "React & Redux Tutorial",
};

const fakeFavoritesOne = [
  {
    author_name: "Jon Snow",
    categories: ["elixir", "phoenix"],
    objectID: "654321",
    title: "Elixr & Phoenix Tutorial",
  },
];

const fakeFavoritesTwo = [
  {
    author_name: "Jon Snow",
    categories: ["react", "redux"],
    objectID: "123456",
    title: "React & Redux Tutorial",
  },
];

describe("SearchItem Unit Testing", () => {
  describe("When SearchItem is not in favorites", () => {
    it("Then button is not inside SearchItem", () => {
      render(
        <SearchItem
          handleButtonClick={() => console.log("hi")}
          data={fakeArticle}
          favorites={fakeFavoritesOne}
        />
      );
      const buttonElement = screen.queryByText(/Save/i);
      expect(buttonElement).not.toBeInTheDocument();
    });

    it("When user hover item, the button inside SearchItem shows ['Save']", () => {
      render(
        <SearchItem
          handleButtonClick={() => console.log("hi")}
          data={fakeArticle}
          favorites={fakeFavoritesOne}
        />
      );
      const itemElement = screen.getByText("Jon Snow");
      fireEvent.mouseEnter(itemElement, {
        bubbles: true,
        cancelable: true,
      });
      const buttonElement = screen.getByText("Save");
      expect(buttonElement).toBeInTheDocument();
    });
  });

  describe("When SearchItem is in favorites", () => {
    it("Then button inside SearchItem shows ['Saved'] at first", () => {
      render(
        <SearchItem
          handleButtonClick={() => console.log("hi")}
          data={fakeArticle}
          favorites={fakeFavoritesTwo}
        />
      );
      const buttonElement = screen.queryByText(/Saved/i);
      expect(buttonElement).toBeInTheDocument();
    });

    it("When user hover item, the button inside SearchItem shows ['Unsave']", () => {
      render(
        <SearchItem
          handleButtonClick={() => console.log("hi")}
          data={fakeArticle}
          favorites={fakeFavoritesTwo}
        />
      );
      const itemElement = screen.getByText("Jon Snow");
      fireEvent.mouseEnter(itemElement, {
        bubbles: true,
        cancelable: true,
      });
      const buttonElement = screen.getByText("Unsave");
      expect(buttonElement).toBeInTheDocument();
    });
  });
});
