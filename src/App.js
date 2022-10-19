import React from 'react';
import './App.css';
import appProvider from './context/appProvider';

function App() {
  return (
    <appProvider>
      <span>Hello, App!</span>
    </appProvider>
  );
}

export default App;
