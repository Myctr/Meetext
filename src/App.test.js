import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Meetext application", () => {
  render(<App />);
  expect(screen.getByText("Meetext")).toBeInTheDocument();
});
