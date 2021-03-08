import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header/header';
import Home from './components/_pages/home/home';
import DataState from './context/data/DataState';

const App = () => {
  return (
    <DataState>
      <div className="d-flex flex-column bg-dark" style={fullscreen}>
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
        </Router>
      </div>
    </DataState>
  );
};

const fullscreen = {
  width: '100vw',
  height: '100vh'
};

export default App;
