import React from 'react';
import { render, screen } from '@testing-library/react';
import RESPONSE_MOCK from './mocks/testData';
import App from "../App";
import { AppContext } from "../context/AppContext";
import { userEvent } from "@testing-library/user-event";

describe("App", () => {
  beforeEach (async () => {
    global.fetch = jest.fn(async () =>
      Promise.resolve({json: async () => Promise.resolve(RESPONSE_MOCK),}));
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
  });

  it("1. should call api on mount", async () => {
    const endpoint = "https://swapi.dev/api/planets";
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(endpoint);
  });

});