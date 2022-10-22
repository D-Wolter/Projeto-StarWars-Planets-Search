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
  console.log(copyData);
  console.log(titles);

  useEffect(() => {
    setDropdownList(['orbital_period', 'population',
      'diameter', 'rotation_period', 'surface_water']);
    (async () => {
      const result = await fetchApiPlanets();
      const newResult = result.filter((e) => e !== e.residents);
      const titulos = Object.keys(result[0]);
      setTitles(titulos);
      setData(newResult);
      setCopyData(newResult);
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
  }, [dropdownList, filtersList, data]);

  const adicionarFiltro = useCallback(() => {
    setFiltersList((prevFilters) => [
      ...prevFilters,
      {
        userColumn: column,
        userCompare: comparison,
        userNumber: number,
      },
    ]);
    setColumn(dropdownList[0]);
    setRenderFilter(true);
    const newDropdownList = dropdownList?.filter((e) => e !== column);
    setDropdownList(newDropdownList);
  }, [dropdownList, number, comparison, column]);

  const contextValue = useMemo(() => ({
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
    removefilter, adicionarFiltro]);
  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// const addFilterResult = (coluna, compara, valor) => {
//   setFiltersList((prev) => ([...prev, {
//     userColumn: coluna,
//     userCompare: compara,
//     userNumber: valor,
//   }]));
//   const newDropdownList = copydropdownList.filter((e) => e !== column);
//   setCopyDropDownList(newDropdownList);
//   // removendo item do dropdown

//   // adicionando filtro ao array
// };

// function FilterItens(col, com, num) {
//   if (com.includes('maior que')) {
//     const fil1 = copyData.filter((e) => Number(e[col]) > Number(num));
//     setCopyData(fil1);
//   } else if (com.includes('menor que')) {
//     const fil2 = copyData.filter((e) => Number(e[col]) < Number(num));
//     setCopyData(fil2);
//   } else if (com.includes('igual a')) {
//     const fil3 = copyData.filter((e) => Number(e[col]) === Number(num));
//     setCopyData(fil3);
//   }
// }

// function removefilterAndAddDropdown(col) {
//   const atualizaFiltro = filtersList.filter((item) => (item.userColumn !== col));
//   setFiltersList(atualizaFiltro);
//   // acima retiro do array o filtro
//   const atualizaDropDown = dropdownList.filter((item) => item === col);
//   setCopyDropDownList((prev) => [...prev, ...atualizaDropDown]);
//   // acima adiciono filtro dropDown
//   console.log(filtersList);
// }

export default AppProvider;
