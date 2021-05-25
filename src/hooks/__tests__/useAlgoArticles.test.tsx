import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchIndex } from "algoliasearch";
import { ChangeEvent, useState } from "react";
import { useAlgoArticles } from "..";
import { IArticle } from "../useAlgoArticles";

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

const TestComponent = ({ index }: { index: SearchIndex }) => {
  const { data, loading, error, refetch } = useAlgoArticles<IArticle[]>({
    index,
  });

  const [value, setValue] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    refetch(e.target.value);
  };

  if (error) {
    return <div>error</div>;
  }
  return (
    <div>
      <input
        data-testid="test-input"
        onChange={handleOnChange}
        value={value}
      ></input>
      {loading && <div>loading</div>}
      {!loading &&
        !!data?.length &&
        data.map((d) => (
          <div key={d.objectID}>
            <div>{d.title}</div>
            <div>{d.author_name}</div>
            <div>
              {d.categories.map((c) => (
                <div key={c}>{c}</div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

describe("Test useAlgoArticles", () => {
  it("Show correct loading and data text", async () => {
    render(<TestComponent index={fakeIndex} />);
    const inputElemnt = screen.getByTestId("test-input");
    fireEvent.change(inputElemnt, {
      target: { value: "React & Redux Tutorial" },
    });
    const loadingElement = await screen.findByText("loading");
    expect(loadingElement).toBeInTheDocument();
    const titleElement = await screen.findByText("React & Redux Tutorial");
    expect(titleElement).toBeInTheDocument();
  });

  it("If error happend, show error text", async () => {
    render(<TestComponent index={fakeErrorIndex} />);
    const inputElemnt = screen.getByTestId("test-input");
    fireEvent.change(inputElemnt, {
      target: { value: "React & Redux Tutorial" },
    });
    const errorElement = await screen.findByText("error");
    expect(errorElement).toBeInTheDocument();
  });

  it("Always render last result even race condition happened", async () => {
    render(<TestComponent index={fakeIndex} />);
    let inputElemnt;
    inputElemnt = screen.getByTestId("test-input");
    fireEvent.change(inputElemnt, {
      target: { value: "React & Redux Tutorial" },
    });
    inputElemnt = screen.getByTestId("test-input");
    fireEvent.change(inputElemnt, {
      target: { value: "Elixir & Phoenix Tutorial" },
    });

    await waitFor(
      () =>
        new Promise((resolve, _) =>
          setTimeout(async () => {
            const titleElement = await screen.findByText(
              "Elixir & Phoenix Tutorial"
            );
            expect(titleElement).toBeInTheDocument();
            resolve(true);
          }, 400)
        )
    );
  });
});
