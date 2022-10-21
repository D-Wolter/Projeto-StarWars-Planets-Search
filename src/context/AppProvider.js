import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchApiPlanets from '../services/serviceApi';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataFiltred, setDataFiltred] = useState([]);
  const [inputName, setInputName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filterResult, setFilterResult] = useState([]);
  const [titleColumns] = useState([
    'Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain',
    'Surface Water', 'Population', 'Films', 'Created',
    'Edited', 'Url']);
  const [dropdownFilters, setDropdownFilters] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  console.log();
  useEffect(() => {
    (async () => {
      const result = await fetchApiPlanets();
      const newResult = result.filter((e) => e !== e.residents);
      setData(newResult);
      setDataFiltred(newResult);
    })();
  }, []);

  function HandleSetFilter(columnFil, comparisonFil, numberFil) {
    if (comparisonFil.includes('maior que')) {
      const fil1 = dataFiltred.filter((e) => Number(e[columnFil]) > Number(numberFil));
      setDataFiltred(fil1);
    } else if (comparisonFil.includes('menor que')) {
      const fil2 = dataFiltred.filter((e) => Number(e[columnFil]) < Number(numberFil));
      setDataFiltred(fil2);
    } else if (comparisonFil.includes('igual a')) {
      const fil3 = dataFiltred.filter((e) => Number(e[columnFil]) === Number(numberFil));
      setDataFiltred(fil3);
    }
  }

  const handleInputName = ({ target: { value } }) => {
    setInputName(value);
  };

  const contextValue = useMemo(() => ({
    titleColumns,
    data,
    setData,
    inputName,
    handleInputName,
    HandleSetFilter,
    column,
    setColumn,
    comparison,
    setComparison,
    number,
    setNumber,
    filterResult,
    setFilterResult,
    dropdownFilters,
    setDropdownFilters,
    dataFiltred,
    setDataFiltred,
  }), [data, inputName, HandleSetFilter, column, comparison, number,
    filterResult, dropdownFilters, titleColumns, dataFiltred]);
  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
