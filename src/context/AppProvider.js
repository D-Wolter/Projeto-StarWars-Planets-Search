import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchApiPlanets from '../services/serviceApi';

function AppProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterForInput, setfilterForInput] = useState('');

  useEffect(() => {
    (async () => {
      const result = await fetchApiPlanets();
      setData(result);
    })();
  }, []);

  const handlefilterForInput = ({ target: { value } }) => {
    setfilterForInput(value);
  };

  const contextValue = useMemo(() => ({
    data,
    filterForInput,
    handlefilterForInput,
  }), [data, filterForInput]);
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
