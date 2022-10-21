import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function InpuFilter() {
  const { inputName, handleInputName,
    column, setColumn,
    comparison, setComparison,
    number, setNumber,
    setFilterResult,
    dropdownFilters, setDropdownFilters,
    HandleSetFilter,
  } = useContext(AppContext);

  const addFilterResult = (coluna, compara, valor) => {
    const newDropdownList = dropdownFilters.filter((e) => e !== column);
    setDropdownFilters(newDropdownList);
    setFilterResult((prev) => ([...prev, {
      coluna,
      compara,
      valor,
    }]));
  };

  const handleSetFilterValue = () => {
    addFilterResult(column, comparison, number);
    HandleSetFilter(column, comparison, number);
  };
  return (
    <form>
      <section>
        <h2>Project StarWars Planets</h2>
        <label htmlFor="filter">
          Search Planet:
          <input
            name="filter"
            type="text"
            data-testid="name-filter"
            value={ inputName }
            onChange={ handleInputName }
          />
        </label>
      </section>
      <section>
        <h2>Filtros</h2>
        <label htmlFor="column">
          <select
            name="column"
            id="column"
            value={ column }
            data-testid="column-filter"
            onChange={ ({ target }) => setColumn(target.value) }
          >
            { dropdownFilters?.map((item) => (
              <option key={ item } value={ item }>{item}</option>
            )) }
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            data-testid="comparison-filter"
            name="comparison"
            id="comparison"
            value={ comparison }
            onChange={ ({ target }) => setComparison(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="number">
          <input
            data-testid="value-filter"
            type="number"
            id="number"
            value={ number }
            onChange={ ({ target }) => setNumber(target.value) }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleSetFilterValue }
        >
          Filtrar
        </button>
      </section>
    </form>
  );
}

export default InpuFilter;