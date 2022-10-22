/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchApiPlanets from '../services/serviceApi';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [inputName, setInputName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filtersList, setFiltersList] = useState([]);
  const [titleColumns] = useState([
    'Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain',
    'Surface Water', 'Population', 'Films', 'Created',
    'Edited', 'Url']);
  const [dropdownList] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [copydropdownList, setCopyDropDownList] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  // console.log(copyData);
  console.log(data);

  useEffect(() => {
    (async () => {
      const result = await fetchApiPlanets();
      const newResult = result.filter((e) => e !== e.residents);
      setData(newResult);
      setCopyData(newResult);
    })();
  }, []);

  function FilterItens(col, com, num) {
    if (com.includes('maior que')) {
      const fil1 = copyData.filter((e) => Number(e[col]) > Number(num));
      setCopyData(fil1);
    } else if (com.includes('menor que')) {
      const fil2 = copyData.filter((e) => Number(e[col]) < Number(num));
      setCopyData(fil2);
    } else if (com.includes('igual a')) {
      const fil3 = copyData.filter((e) => Number(e[col]) === Number(num));
      setCopyData(fil3);
    }
  }

  function removefilterAndAddDropdown(col) {
    const atualizaFiltro = filtersList.filter((item) => (item.coluna !== col));
    setFiltersList(atualizaFiltro);
    // acima retiro do array o filtro
    const atualizaDropDown = dropdownList.filter((item) => item === col);
    setCopyDropDownList((prev) => [...prev, ...atualizaDropDown]);
    // acima adiciono filtro dropDown
    console.log(filtersList);
  }

  const addFilterResult = (coluna, compara, valor) => {
    const newDropdownList = copydropdownList.filter((e) => e !== column);
    setCopyDropDownList(newDropdownList);
    // removendo item do dropdown
    setFiltersList((prev) => ([...prev, {
      coluna,
      compara,
      valor,
    }]));
    // adicionando filtro ao array
  };

  const adicionarFiltro = () => {
    addFilterResult(column, comparison, number);
    FilterItens(column, comparison, number);
  };

  const deleteFilter = (col) => {
    const newFilterList = filtersList.filter((i) => i.coluna !== col);
    setFiltersList(newFilterList);
    removefilterAndAddDropdown(col);
  };

  const handleInputName = ({ target: { value } }) => {
    setInputName(value);
  };

  const contextValue = useMemo(() => ({
    deleteFilter,
    titleColumns,
    inputName,
    handleInputName,
    column,
    setColumn,
    comparison,
    setComparison,
    number,
    setNumber,
    filtersList,
    copydropdownList,
    copyData,
    adicionarFiltro,
  }), [inputName, column, comparison, number,
    filtersList, copydropdownList, titleColumns, copyData,
    removefilterAndAddDropdown]);
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
