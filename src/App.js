import React from 'react';
import './App.css';
import Table from './components/Table';
import AppProvider from './context/AppProvider';
import InputFilter from './components/InputFilter';

function App() {
  return (
    <AppProvider>
      <section>
        <InputFilter />
      </section>
      <section>
        <Table />
      </section>
    </AppProvider>
  );
}

export default App;
