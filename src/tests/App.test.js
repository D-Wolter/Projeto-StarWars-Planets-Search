import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import RESPONSE_MOCK from "./mocks/testData";


beforeEach(() => {
  global.fetch = jest.fn(async () =>
    Promise.resolve({
      json: async () => Promise.resolve(RESPONSE_MOCK),
    })
  );
});

describe("Testando - Star Wars Planetas - Api", () => {
  test("se a tabela dos planetas renderizada", () => {
    render(<App />);
    const tabela = screen.getByRole("table");
    expect(tabela).toBeInTheDocument();
  });
    test("se renderiza tatooine", async () => {
    const { debug } = render(<App />);
    const tatooine = await screen.findByText(/tatooine/i);

    expect(tatooine).toBeInTheDocument();
    debug();
  });
});