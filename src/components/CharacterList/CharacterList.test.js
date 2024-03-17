import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterList from "./CharacterList";
import CharacterPage from "../CharacterPage/CharacterPage";

describe("Test CharacterList component", () => {
  test("checking render form", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<CharacterList />} />
        </Routes>
      </BrowserRouter>
    );
    const form = screen.getByTestId("form");
    expect(form).toBeVisible();
  });

  test("checking render grid container", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<CharacterList />} />
        </Routes>
      </BrowserRouter>
    );
    const container = screen.getByTestId("grid-container");
    expect(container).toBeVisible();
  });

  test("checking input", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<CharacterList />} />
        </Routes>
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/Поиск/i);
    expect(screen.queryByTestId("search")).toContainHTML("");
    userEvent.type(input, "da");
    expect(screen.queryByTestId("search")).toContainHTML("da");
  });

  test("checking render page", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterPage />} />
        </Routes>
      </BrowserRouter>
    );
    const dataList = screen.getByTestId("data-list");
    expect(dataList).toBeVisible();
  });
});
