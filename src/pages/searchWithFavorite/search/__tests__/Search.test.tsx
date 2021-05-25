import { render, screen, fireEvent } from "@testing-library/react";
import { SearchIndex } from "algoliasearch";
import { IArticle } from "../../../../hooks/useAlgoArticles";
import Search from "../index";

const fakeFavorites: IArticle[] = [
  {
    author_name: "Jon Snow",
    categories: ["react", "redux"],
    objectID: "123456",
    title: "React & Redux Tutorial",
  },
];

const fakeIndex = {
  search: async (queryString: string) => {
    const waitingTime = [100, 200];
    const randomIndex = Math.round(Math.random());

    await new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(true);
        // mock race condition
      }, waitingTime[randomIndex]);
    });
    return {
      hits: [
        {
          author_name: "Jon Snow",
          categories: ["react", "redux"],
          objectID: "123456",
          title: queryString,
        },
      ],
    };
  },
} as SearchIndex;

const fakeErrorIndex = {
  search: async (_: any) => {
    throw new Error();
  },
} as any;

describe("Search component testing", () => {
  it("Show correct loading and data text", async () => {
    render(
      <Search
        index={fakeIndex}
        handleButtonClick={() => console.log("hi")}
        favorites={fakeFavorites}
      />
    );
    const inputElemnt = screen.getByPlaceholderText("Please enter the keyword");
    fireEvent.change(inputElemnt, {
      target: { value: "React & Redux Tutorial" },
    });
    const loadingElement = await screen.findByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
    const titleElement = await screen.findByText("React & Redux Tutorial");
    expect(titleElement).toBeInTheDocument();
  });

  it("If error happend, show error text", async () => {
    render(
      <Search
        index={fakeErrorIndex}
        handleButtonClick={() => console.log("hi")}
        favorites={fakeFavorites}
      />
    );
    const inputElemnt = screen.getByPlaceholderText("Please enter the keyword");
    fireEvent.change(inputElemnt, {
      target: { value: "React & Redux Tutorial" },
    });
    const errorElement = await screen.findByText("Something went wrong :_(");
    expect(errorElement).toBeInTheDocument();
  });
});
