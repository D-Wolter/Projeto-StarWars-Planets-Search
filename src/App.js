import React from 'react';
import './App.css';
import Table from './components/Table';
import AppProvider from './context/AppProvider';
import Settings from './components/Settings';

function App() {
  return (
    <AppProvider>
      <section>
        <Settings />
      </section>
      <section>
        <Table />
      </section>
    </AppProvider>
  );
}

export default App;
