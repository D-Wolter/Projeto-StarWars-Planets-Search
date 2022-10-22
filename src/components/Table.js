import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { copyData, inputName, filtersList,
    titles, removefilter } = useContext(AppContext);
  return (
    <main>
      <section>
        <h3>filtros Ativos</h3>
        { filtersList.map((fil) => (
          <div key={ fil.userColumn }>
            <h3>{`${fil.userColumn} ${fil.userCompare} ${fil.userNumber}`}</h3>
            <div data-testid="filter">
              <span>Remover o filtro: </span>
              <button
                type="button"
                onClick={ () => removefilter(fil, true) }
              >
                X
              </button>
            </div>
          </div>
        )) }
      </section>
      <div>
        { (filtersList.length > 0)
        && (
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => removefilter(null, true) }
          >
            Apagar todos filtros
          </button>
        ) }
      </div>
      <table>
        <thead>
          <tr>
            { titles?.filter((e) => e !== 'residents')
              .map((i) => (
                <th key={ i }>{i}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {
            copyData.length > 0 && (
              copyData?.filter((item) => item.name
                .toLowerCase().includes(inputName
                  .toLowerCase()))
                .map((item) => (
                  // <tr key={ item.name }>
                  //   <td>
                  //     {
                  //       item.name
                  //     }
                  //   </td>
                  //   <td>{ item.rotation_period }</td>
                  //   <td>{ item.orbital_period }</td>
                  //   <td>{ item.diameter }</td>
                  //   <td>{ item.climate }</td>
                  //   <td>{ item.gravity }</td>
                  //   <td>{ item.terrain }</td>
                  //   <td>{ item.surface_water }</td>
                  //   <td>{ item.population }</td>
                  //   <td>{ item.films[0] }</td>
                  //   <td>{ item.created }</td>
                  //   <td>{ item.edited }</td>
                  //   <td>{ item.url }</td>
                  // </tr>
                  <tr key={ item.name }>
                    <td>
                      { item.name }
                    </td>
                    <td>
                      { item.rotation_period }
                    </td>
                    <td>
                      { item.orbital_period }
                    </td>
                    <td>
                      { item.diameter }
                    </td>
                    <td>
                      { item.climate }
                    </td>
                    <td>
                      { item.gravity }
                    </td>
                    <td>
                      { item.terrain }
                    </td>
                    <td>
                      { item.surface_water }
                    </td>
                    <td>
                      { item.population }
                    </td>
                    <td>
                      { item.films.length }
                    </td>
                    <td>
                      { item.created }
                    </td>
                    <td>
                      { item.edited }
                    </td>
                    <td>
                      <a href={ item.url }>{ item.url }</a>
                    </td>
                  </tr>
                ))
            )
          }
        </tbody>
      </table>
    </main>
  );
}

export default Table;
