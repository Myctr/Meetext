import { render, screen } from "@testing-library/react";
import App from "./App";
import { I18nProvider } from "./i18n";

test("renders Meetext application", () => {
  render(
    <I18nProvider>
      <App />
    </I18nProvider>,
  );
  expect(screen.getByText("Meetext")).toBeInTheDocument();
});
