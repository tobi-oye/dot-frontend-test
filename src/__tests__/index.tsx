import {
  screen,
  waitForElementToBeRemoved,
  render,
  RenderOptions,
} from "@testing-library/react";

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Globe Awards App Test", () => {
  test("renders the Globe Awards Heading", async () => {
    render(<App />);

    const heading = screen.getByText(/golden globe awards/i);
    expect(heading).toBeInTheDocument();
  });

  test("Open Modal on Click of Submit Button", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", {
        name: /submit vote button/i,
      })
    );
    const successModalText = screen.getByText(/success modal/i);
    expect(successModalText).toBeInTheDocument();
  });

  test("Close Modal on Click of Close Button", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", {
        name: /submit vote button/i,
      })
    );
    const successModalText = screen.getByText(/success modal/i);
    expect(successModalText).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    const heading = screen.getByText(/golden globe awards/i);
    expect(heading).toBeInTheDocument();
  });
});
