import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchApiPlanets from '../services/serviceApi';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [inputName, setInputName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filterResult, setFilterResult] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchApiPlanets();
      const newResult = result.filter((e) => e !== e.residents);
      setData(newResult);
    })();
  }, []);

  const handleInputName = ({ target: { value } }) => {
    setInputName(value);
  };

  const contextValue = useMemo(() => ({
    data,
    setData,
    inputName,
    handleInputName,
    column,
    setColumn,
    comparison,
    setComparison,
    number,
    setNumber,
    filterResult,
    setFilterResult,
  }), [data, inputName, column, comparison, number, filterResult]);
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
