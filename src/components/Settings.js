import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Settings() {
  const { filterForInput, handlefilterForInput } = useContext(AppContext);
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
            value={ filterForInput }
            onChange={ handlefilterForInput }
          />
        </label>
      </section>
    </form>
  );
}

export default Settings;
