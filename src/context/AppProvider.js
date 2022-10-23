/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchApiPlanets from '../services/serviceApi';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [copyData, setCopyData] = useState([]);
  const [titles, setTitles] = useState([]);
  const [inputName, setInputName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filtersList, setFiltersList] = useState([]);
  const [dropdownList, setDropdownList] = useState([]);
  const [renderFilter, setRenderFilter] = useState(false);
  const [loading, setLoading] = useState([false]);

  useEffect(() => {
    setLoading(true);
    setDropdownList(['orbital_period', 'population',
      'diameter', 'rotation_period', 'surface_water']);
    (async () => {
      const result = await fetchApiPlanets();
      const newResult = result.filter((e) => e !== e.residents);
      setData(newResult);
      setCopyData(newResult);
      const titulos = Object.keys(result[0]);
      setTitles(titulos);
      setLoading(false);
    })();
  }, []);

  const filterItens = useCallback(() => {
    filtersList.forEach((item) => {
      switch (item.userCompare) {
      case 'maior que': {
        setCopyData(copyData
          .filter((valor) => valor[item.userColumn] > Number(item.userNumber)));
        break;
      }
      case 'menor que': {
        setCopyData(copyData
          .filter((valor) => valor[item.userColumn] < Number(item.userNumber)));
        break;
      }
      case 'igual a': {
        setCopyData(copyData
          .filter((valor) => valor[item.userColumn] === item.userNumber));
        break;
      }
      default: return copyData;
      }
    });
    setRenderFilter(false);
  }, [copyData, filtersList]);

  useEffect(() => {
    if (renderFilter) {
      filterItens();
    }
  }, [filtersList, renderFilter, filterItens]);

  const removefilter = useCallback((objFilter, allObjFilters) => {
    if (allObjFilters) {
      setFiltersList([]);
    } else {
      setFiltersList(filtersList.filter((v) => v.userColumn !== objFilter.userColumn));
    }
    setCopyData(data);
    setRenderFilter(true);
    const atualizaDropDown = dropdownList?.filter((item) => item === column);
    setDropdownList((prev) => [...prev, ...atualizaDropDown]);
  }, [dropdownList, filtersList, data, column]);

  const adicionarFiltro = useCallback(() => {
    setFiltersList((prevState) => [
      ...prevState,
      {
        userColumn: column,
        userCompare: comparison,
        userNumber: number,
      },
    ]);
    setColumn(dropdownList[0]);
    setRenderFilter(true);
    setDropdownList(dropdownList?.filter((e) => e !== column));
  }, [dropdownList, number, comparison, column]);

  const contextValue = useMemo(() => ({
    loading,
    setInputName,
    titles,
    inputName,
    column,
    setColumn,
    comparison,
    setComparison,
    number,
    setNumber,
    filtersList,
    dropdownList,
    copyData,
    adicionarFiltro,
    removefilter,
  }), [inputName, column, comparison, number,
    filtersList, dropdownList, titles, copyData,
    loading, removefilter, adicionarFiltro]);
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
