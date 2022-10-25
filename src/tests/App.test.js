import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RESPONSE_MOCK from './mocks/testData';

beforeEach(() => {
  global.fetch = jest.fn(async () => Promise.resolve({
    json: async () => Promise.resolve(RESPONSE_MOCK),
  }));
});

describe('Testando - Star Wars Planetas - Api', () => {
  test('se a tabela dos planetas renderizada', () => {
    render(<App />);
    const tabela = screen.getByRole('table');
    expect(tabela).toBeInTheDocument();
  });
  test('se renderiza tatooine', async () => {
    const { debug } = render(<App />);
    const tatooine = await screen.findByText(/tatooine/i);

    expect(tatooine).toBeInTheDocument();
    debug();
  });
  it('testando filtros', async () => {
    render(<App />);

    const tatoo = await screen.findByText(/Tatooine/i, {}, { timeout: 15000 });
    expect(tatoo).toBeInTheDocument();

    const planet = screen.getByPlaceholderText('Digite o Planeta');
    expect(planet).toBeInTheDocument();

    const Filter = screen.getByTestId('value-filter');
    expect(Filter).toBeInTheDocument();

    const column = screen.getByTestId('column-filter');
    expect(column).toBeInTheDocument();

    const comparisonFilter = screen.getByTestId('comparison-filter');
    const buttonFilter = screen.getByRole('button', {
      name: /filtrar/i,
    });

    userEvent.type(planet, 'Dagobah');
    userEvent.selectOptions(column, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(Filter, '0');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.click(buttonFilter);

  });
});
