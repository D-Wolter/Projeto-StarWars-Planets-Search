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

  await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
});

describe("Testando Star Wars Planes Api", () => {
  test("se a tabela esta renderizada", () => {
    render(<App />);
    const tabela = screen.getByRole("table");
    expect(tabela).toBeInTheDocument();
  });

});