import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function InpuFilter() {
  const { inputName, setInputName,
    column, setColumn,
    comparison, setComparison,
    number, setNumber,
    adicionarFiltro,
    dropdownList, loading,
  } = useContext(AppContext);
  return (
    <div>
      { loading ? (<h2>Loading...</h2>) : (
        <form>
          <section>
            <h2>Project StarWars Planets</h2>
            <label htmlFor="filter">
              Search Planet:
              <input
                placeholder="Digite o Planeta"
                name="filter"
                type="text"
                data-testid="name-filter"
                value={ inputName }
                onChange={ ({ target }) => setInputName(target.value) }
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
                { dropdownList?.map((item, index) => (
                  <option key={ index } value={ item }>{item}</option>
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
              onClick={ adicionarFiltro }
            >
              Filtrar
            </button>
          </section>
        </form>
      )}

    </div>
  );
}

export default InpuFilter;
