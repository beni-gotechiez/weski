import React from 'react';
import NavBar from './components/navbar/nav-bar';
import Hotels from './components/hotels/hotels';
import { HotelsProvider } from './contexts/HotelsContext';

const App: React.FC = () => {
  return (
    <HotelsProvider>
      <div className="app">
        <NavBar />
        <Hotels />
      </div>
    </HotelsProvider>
  );
};

export default App;
