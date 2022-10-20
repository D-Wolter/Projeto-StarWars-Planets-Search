import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function InpuFilter() {
  const { data, setData, inputName, handleInputName,
    column, setColumn,
    comparison, setComparison,
    number, setNumber } = useContext(AppContext);

  const handleSetFilter = () => {
    if (comparison.includes('maior que')) {
      const filtrado = data.filter((e) => Number(e[column]) > Number(number));
      setData(filtrado);
      console.log(filtrado);
    } else if (comparison.includes('menor que')) {
      const filtrado = data.filter((e) => Number(e[column]) < Number(number));
      setData(filtrado);
      console.log(filtrado);
    } else if (comparison.includes('igual a')) {
      const filtrado = data.filter((e) => Number(e[column]) === Number(number));
      setData(filtrado);
      console.log(filtrado);
    }
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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
          onClick={ handleSetFilter }
        >
          Filtrar
        </button>
      </section>
    </form>
  );
}

export default InpuFilter;
