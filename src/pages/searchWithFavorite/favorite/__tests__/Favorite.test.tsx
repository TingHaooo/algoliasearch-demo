import { fireEvent, render, screen } from "@testing-library/react";
import { IArticle } from "../../../../hooks/useAlgoArticles";
import FavoriteItem from "../FavoriteItem";

const fakeArticle: IArticle = {
  author_name: "Jon Snow",
  categories: ["react", "redux"],
  objectID: "123456",
  title: "React & Redux Tutorial",
};

describe("FavoriteItem Unit Testing", () => {
  it("The button inside FavoriteItem show ['Saved'] at first", () => {
    render(
      <FavoriteItem
        handleButtonClick={() => console.log("hi")}
        favorite={fakeArticle}
      />
    );
    const buttonElement = screen.getByText(/Saved/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("The button inside FavoriteItem show ['Unsave'] when hover it", () => {
    render(
      <FavoriteItem
        handleButtonClick={() => console.log("hi")}
        favorite={fakeArticle}
      />
    );
    const itemElement = screen.getByText("Jon Snow");
    fireEvent.mouseEnter(itemElement, {
      bubbles: true,
      cancelable: true,
    });
    const buttonElement = screen.getByText(/Unsave/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
