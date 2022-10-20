import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { data, inputName, filterResult } = useContext(AppContext);
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
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0 && (
              data.filter((item) => item.name
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
