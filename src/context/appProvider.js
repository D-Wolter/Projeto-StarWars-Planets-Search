import AppContext from './appContext';

function appProvider({ children }) {
  return (
    <AppContext.Provider>
      { children }
    </AppContext.Provider>
  );
}

export default appProvider;
