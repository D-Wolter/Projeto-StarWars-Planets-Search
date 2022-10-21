/* eslint-disable react-hooks/exhaustive-deps */
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
  const [dropdownOrigin] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [dropdownFilters, setDropdownFilters] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  console.log(dataFiltred);
  useEffect(() => {
    (async () => {
      const result = await fetchApiPlanets();
      const newResult = result.filter((e) => e !== e.residents);
      setData(newResult);
      setDataFiltred(newResult);
    })();
  }, []);

  function HandleSetFilter(col, com, num) {
    if (com.includes('maior que')) {
      const fil1 = dataFiltred.filter((e) => Number(e[col]) > Number(num));
      setDataFiltred(fil1);
    } else if (com.includes('menor que')) {
      const fil2 = dataFiltred.filter((e) => Number(e[col]) < Number(num));
      setDataFiltred(fil2);
    } else if (com.includes('igual a')) {
      const fil3 = dataFiltred.filter((e) => Number(e[col]) === Number(num));
      setDataFiltred(fil3);
    }
  }

  function ResetList(col) {
    setDataFiltred(data);
    const updateList = filterResult.filter((item) => (item.coluna !== col));
    setFilterResult(updateList);
    const dropItem = dropdownOrigin.filter((item) => item === col);
    setDropdownFilters((prev) => [...prev, ...dropItem]);
    console.log(filterResult);
    filterResult.map((a) => () => {
      if (a.compara.includes('maior que')) {
        const fil1 = dataFiltred.filter((e) => Number(e[a.coluna]) > Number(a.valor));
        setDataFiltred(fil1);
      } else if (a.compara.includes('menor que')) {
        const fil2 = dataFiltred.filter((e) => Number(e[a.coluna]) < Number(a.valor));
        setDataFiltred(fil2);
      } else if (a.compara.includes('igual a')) {
        const fil3 = dataFiltred.filter((e) => Number(e[a.coluna]) === Number(a.valor));
        setDataFiltred(fil3);
      }
    });
  }

  const handleInputName = ({ target: { value } }) => {
    setInputName(value);
  };

  const contextValue = useMemo(() => ({
    ResetList,
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
    filterResult, dropdownFilters, titleColumns, dataFiltred,
    ResetList]);
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
