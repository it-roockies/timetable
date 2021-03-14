import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Time Table", () => {
  render(<App />);
  const linkElement = screen.getByText(/Time Table/);
  expect(linkElement).toBeInTheDocument();
});
