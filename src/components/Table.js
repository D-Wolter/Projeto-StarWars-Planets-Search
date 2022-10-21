import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { dataFiltred, inputName, filterResult, titleColumns } = useContext(AppContext);
  return (
    <div>
      <section>
        <h3>filtros Ativos</h3>
        <ul>
          { filterResult?.map((res, index) => (
            <li key={ index }>{`${res.coluna} ${res.compara} ${res.valor}`}</li>
          )) }
        </ul>
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
