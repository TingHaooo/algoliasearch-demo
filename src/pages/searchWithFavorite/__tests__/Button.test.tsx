import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe("Button Component Unit Testing", () => {
  it("Button show correct children", () => {
    render(
      <Button handleButtonClick={() => console.log("hi")} isActive>
        Save
      </Button>
    );
    const buttonElement = screen.getByText(/Save/i);
    expect(buttonElement).toBeInTheDocument();
  });
  it("Button show correct style when is active", () => {
    render(
      <Button handleButtonClick={() => console.log("hi")} isActive>
        Save
      </Button>
    );
    const buttonElement = screen.getByText(/Save/i);
    expect(buttonElement.style.backgroundColor).toBe("white");
    expect(buttonElement.style.color).toBe("black");
    expect(buttonElement.style.border).toBe("1px solid black");
    expect(buttonElement.style.padding).toBe("5px");
  });

  it("Button show correct style when is inactive", () => {
    render(
      <Button handleButtonClick={() => console.log("hi")} isActive={false}>
        Save
      </Button>
    );
    const buttonElement = screen.getByText(/Save/i);
    expect(buttonElement.style.backgroundColor).toBe("rgb(153, 153, 153)");
    expect(buttonElement.style.color).toBe("white");
    expect(buttonElement.style.border).toBe("");
    expect(buttonElement.style.padding).toBe("3px");
  });
});
