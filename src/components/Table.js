import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { dataFiltred, inputName, filterResult,
    titleColumns, setFilterResult, ResetList } = useContext(AppContext);

  const deleteFilter = (col) => {
    const newFilterList = filterResult.filter((i) => i.coluna !== col);
    setFilterResult(newFilterList);
    ResetList(col);
  };
  return (
    <div>
      <section>
        <h3>filtros Ativos</h3>
        { filterResult.map((fil, index) => (
          <div key={ index }>
            <h3>{`${fil.coluna} ${fil.compara} ${fil.valor}`}</h3>
            <div data-testid="filter">
              <span>Remover o filtro: </span>
              <button
                type="button"
                onClick={ () => deleteFilter(fil.coluna) }
              >
                X
              </button>
            </div>
          </div>
        )) }
      </section>
      <table>
        <thead>
          <tr>
            { titleColumns.map((i) => (
              <th key={ i }>{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            dataFiltred.length > 0 && (
              dataFiltred.filter((item) => item.name
                .toLowerCase().includes(inputName
                  .toLowerCase()))
                .map((item) => (
                  <tr key={ item.url }>
                    <td>{ item.name }</td>
                    <td>{ item.rotation_period }</td>
                    <td>{ item.orbital_period }</td>
                    <td>{ item.diameter }</td>
                    <td>{ item.climate }</td>
                    <td>{ item.gravity }</td>
                    <td>{ item.terrain }</td>
                    <td>{ item.surface_water }</td>
                    <td>{ item.population }</td>
                    <td>{ item.films[0] }</td>
                    <td>{ item.created }</td>
                    <td>{ item.edited }</td>
                    <td>{ item.url }</td>
                  </tr>
                ))
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
